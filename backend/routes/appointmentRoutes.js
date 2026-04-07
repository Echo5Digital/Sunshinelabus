const express = require('express');
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const supabase = require('../config/supabase');
const { verifyAdmin } = require('../middleware/auth');
const {
  sendConfirmationEmail,
  sendAppointmentUpdatedEmail,
  sendAppointmentRejectedEmail,
} = require('../utils/mailer');

const MIN_ADVANCE_HOURS = 24;

// ── Helpers ───────────────────────────────────────────────────────────────────

function isWeekday(dateString) {
  const d = new Date(dateString + 'T00:00:00');
  const day = d.getDay();
  return day !== 0 && day !== 6;
}

function isAtLeastNHoursAhead(dateString, timeString, hours) {
  const dt = new Date(`${dateString}T${timeString}:00`);
  return dt.getTime() - Date.now() >= hours * 60 * 60 * 1000;
}

async function isSlotAvailable(date, time) {
  const { data, error } = await supabase
    .from('appointments')
    .select('id')
    .eq('appointment_date', date)
    .eq('appointment_time', time)
    .not('status', 'eq', 'cancelled');

  if (error) throw error;
  return data.length === 0;
}

// ── Public Routes ─────────────────────────────────────────────────────────────

// POST /api/appointments — create a new booking
router.post(
  '/',
  [
    body('service_id').isUUID().withMessage('Valid service ID required'),
    body('location_type')
      .isIn(['on_site', 'home_visit'])
      .withMessage('Location type must be on_site or home_visit'),
    body('appointment_date')
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Date must be YYYY-MM-DD format')
      .custom((value) => {
        if (!isWeekday(value)) throw new Error('Appointments are only available Monday–Friday');
        return true;
      }),
    body('appointment_time')
      .matches(/^\d{2}:\d{2}$/)
      .withMessage('Time must be HH:MM format')
      .custom((value, { req }) => {
        if (!isAtLeastNHoursAhead(req.body.appointment_date, value, MIN_ADVANCE_HOURS)) {
          throw new Error(`Appointments require at least ${MIN_ADVANCE_HOURS} hours advance notice`);
        }
        return true;
      }),
    body('patient_name').trim().notEmpty().isLength({ max: 100 }).withMessage('Full name is required'),
    body('patient_phone')
      .matches(/^\+?[\d\s\-().]{7,20}$/)
      .withMessage('Valid phone number required'),
    body('patient_email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('patient_dob')
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage('Date of birth must be a valid date'),
    body('address_street').custom((value, { req }) => {
      if (req.body.location_type === 'home_visit' && (!value || value.trim().length < 5)) {
        throw new Error('Street address is required for home visits');
      }
      return true;
    }),
    body('address_city').custom((value, { req }) => {
      if (req.body.location_type === 'home_visit' && (!value || !value.trim())) {
        throw new Error('City is required for home visits');
      }
      return true;
    }),
    body('address_zip').custom((value, { req }) => {
      if (req.body.location_type === 'home_visit' && !/^\d{5}(-\d{4})?$/.test(value)) {
        throw new Error('Valid ZIP code required for home visits');
      }
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const {
        service_id, location_type, appointment_date, appointment_time,
        patient_name, patient_dob, patient_phone, patient_email,
        address_street, address_city, address_state, address_zip,
      } = req.body;

      // Re-check availability (race condition guard)
      const available = await isSlotAvailable(appointment_date, appointment_time);
      if (!available) {
        return res.status(409).json({
          error: 'That time slot is no longer available. Please go back and select another time.',
        });
      }

      // Check for full-day time block
      const { data: blocks } = await supabase
        .from('time_blocks')
        .select('id')
        .eq('block_date', appointment_date)
        .is('block_time', null);

      if (blocks && blocks.length > 0) {
        return res.status(409).json({ error: 'This date is not available for booking.' });
      }

      const { data, error } = await supabase
        .from('appointments')
        .insert({
          service_id,
          location_type,
          appointment_date,
          appointment_time,
          patient_name: patient_name.trim(),
          patient_dob: patient_dob || null,
          patient_phone,
          patient_email,
          address_street: address_street?.trim() || null,
          address_city: address_city?.trim() || null,
          address_state: address_state?.trim() || 'FL',
          address_zip: address_zip || null,
          status: 'booked',
        })
        .select('id')
        .single();

      if (error) throw error;

      // Fire-and-forget: fetch service name then send confirmation email
      supabase
        .from('services')
        .select('name')
        .eq('id', service_id)
        .single()
        .then(({ data: svc }) => {
          sendConfirmationEmail({
            patientEmail: patient_email,
            patientName: patient_name.trim(),
            serviceName: svc?.name || 'Lab Service',
            appointmentDate: appointment_date,
            appointmentTime: appointment_time,
            locationType: location_type,
          });
        })
        .catch((err) => console.error('Service lookup for email failed:', err.message));

      return res.status(201).json({
        id: data.id,
        message: 'Appointment booked successfully. A confirmation email has been sent.',
      });
    } catch (err) {
      console.error('Booking error:', err.message);
      return res.status(500).json({ error: 'Failed to book appointment. Please try again.' });
    }
  }
);

// ── Token-Based Booking Management (public, no auth) ─────────────────────────

// GET /api/appointments/manage?token=xxx — fetch booking details by token
router.get(
  '/manage',
  [query('token').isUUID().withMessage('Valid token required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(
          `id, appointment_date, appointment_time, location_type, status,
           patient_name, services(name)`
        )
        .eq('booking_token', req.query.token)
        .single();

      if (error || !data) return res.status(404).json({ error: 'Booking not found.' });

      const today = new Date().toISOString().split('T')[0];
      if (data.appointment_date < today) {
        return res.status(410).json({ error: 'This booking link has expired.' });
      }

      return res.json({
        id: data.id,
        service_name: data.services?.name || 'Lab Service',
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        location_type: data.location_type,
        status: data.status,
        patient_name: data.patient_name,
      });
    } catch (err) {
      console.error('Manage booking lookup error:', err.message);
      return res.status(500).json({ error: 'Failed to fetch booking.' });
    }
  }
);

// POST /api/appointments/cancel — cancel a booking by token
router.post(
  '/cancel',
  [body('token').isUUID().withMessage('Valid token required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('id, appointment_date, status')
        .eq('booking_token', req.body.token)
        .single();

      if (error || !data) return res.status(404).json({ error: 'Booking not found.' });

      const today = new Date().toISOString().split('T')[0];
      if (data.appointment_date < today) {
        return res.status(410).json({ error: 'This booking link has expired.' });
      }
      if (!['booked', 'confirmed'].includes(data.status)) {
        return res.status(409).json({ error: 'This appointment cannot be cancelled.' });
      }

      const { error: updateErr } = await supabase
        .from('appointments')
        .update({ status: 'cancelled' })
        .eq('id', data.id);

      if (updateErr) throw updateErr;
      return res.json({ message: 'Appointment cancelled successfully.' });
    } catch (err) {
      console.error('Cancel booking error:', err.message);
      return res.status(500).json({ error: 'Failed to cancel appointment.' });
    }
  }
);

// POST /api/appointments/reschedule — reschedule a booking by token
router.post(
  '/reschedule',
  [
    body('token').isUUID().withMessage('Valid token required'),
    body('appointment_date')
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Date must be YYYY-MM-DD format')
      .custom((value) => {
        if (!isWeekday(value)) throw new Error('Appointments are only available Monday–Friday');
        return true;
      }),
    body('appointment_time')
      .matches(/^\d{2}:\d{2}$/)
      .withMessage('Time must be HH:MM format')
      .custom((value, { req }) => {
        if (!isAtLeastNHoursAhead(req.body.appointment_date, value, MIN_ADVANCE_HOURS)) {
          throw new Error(`Appointments require at least ${MIN_ADVANCE_HOURS} hours advance notice`);
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { token, appointment_date, appointment_time } = req.body;

      const { data, error } = await supabase
        .from('appointments')
        .select('id, appointment_date, status')
        .eq('booking_token', token)
        .single();

      if (error || !data) return res.status(404).json({ error: 'Booking not found.' });

      const today = new Date().toISOString().split('T')[0];
      if (data.appointment_date < today) {
        return res.status(410).json({ error: 'This booking link has expired.' });
      }
      if (!['booked', 'confirmed'].includes(data.status)) {
        return res.status(409).json({ error: 'This appointment cannot be rescheduled.' });
      }

      // Check new slot availability (exclude current appointment)
      const { data: conflicts } = await supabase
        .from('appointments')
        .select('id')
        .eq('appointment_date', appointment_date)
        .eq('appointment_time', appointment_time)
        .not('status', 'eq', 'cancelled')
        .neq('id', data.id);

      if (conflicts && conflicts.length > 0) {
        return res.status(409).json({ error: 'That time slot is not available. Please choose another.' });
      }

      const { error: updateErr } = await supabase
        .from('appointments')
        .update({
          appointment_date,
          appointment_time,
          reminder_24_sent: false,
          reminder_2hr_sent: false,
        })
        .eq('id', data.id);

      if (updateErr) throw updateErr;
      return res.json({ message: 'Appointment rescheduled successfully.' });
    } catch (err) {
      console.error('Reschedule booking error:', err.message);
      return res.status(500).json({ error: 'Failed to reschedule appointment.' });
    }
  }
);

// ── Admin Routes ──────────────────────────────────────────────────────────────

// GET /api/admin/appointments — filtered list with pagination
router.get('/admin', verifyAdmin, async (req, res) => {
  try {
    const { date, status, search, limit = 20, offset = 0 } = req.query;

    let q = supabase
      .from('appointments')
      .select(
        `id, appointment_date, appointment_time, status, location_type,
         patient_name, patient_email, patient_phone, created_at,
         services(name, slug, duration_minutes)`,
        { count: 'exact' }
      )
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: true })
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (date) q = q.eq('appointment_date', date);
    if (status) q = q.eq('status', status);
    if (search) {
      q = q.or(`patient_name.ilike.%${search}%,patient_email.ilike.%${search}%`);
    }

    const { data, error, count } = await q;
    if (error) throw error;

    return res.json({ data, total: count, limit: Number(limit), offset: Number(offset) });
  } catch (err) {
    console.error('Admin list error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// GET /api/admin/appointments/:id — single appointment with documents
router.get(
  '/admin/:id',
  verifyAdmin,
  [param('id').isUUID()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { data: appt, error: apptErr } = await supabase
        .from('appointments')
        .select(`*, services(name, slug, duration_minutes, requires_address, allows_home_visit)`)
        .eq('id', req.params.id)
        .single();

      if (apptErr) throw apptErr;
      if (!appt) return res.status(404).json({ error: 'Appointment not found' });

      const { data: docs } = await supabase
        .from('appointment_documents')
        .select('id, document_type, file_url, file_name, file_size_bytes, uploaded_at')
        .eq('appointment_id', req.params.id);

      return res.json({ ...appt, documents: docs || [] });
    } catch (err) {
      console.error('Admin detail error:', err.message);
      return res.status(500).json({ error: 'Failed to fetch appointment' });
    }
  }
);

// PATCH /api/admin/appointments/:id/status
router.patch(
  '/admin/:id/status',
  verifyAdmin,
  [
    param('id').isUUID(),
    body('status').isIn(['booked', 'confirmed', 'checked_in', 'completed', 'no_show', 'cancelled']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: req.body.status })
        .eq('id', req.params.id);

      if (error) throw error;
      return res.json({ message: 'Status updated' });
    } catch (err) {
      console.error('Status update error:', err.message);
      return res.status(500).json({ error: 'Failed to update status' });
    }
  }
);

// PATCH /api/appointments/admin/:id — update appointment core fields
router.patch(
  '/admin/:id',
  verifyAdmin,
  [
    param('id').isUUID(),
    body('service_id').optional().isUUID().withMessage('Valid service ID required'),
    body('location_type')
      .isIn(['on_site', 'home_visit'])
      .withMessage('Location type must be on_site or home_visit'),
    body('appointment_date')
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Date must be YYYY-MM-DD format'),
    body('appointment_time')
      .matches(/^\d{2}:\d{2}$/)
      .withMessage('Time must be HH:MM format'),
    body('patient_name').trim().notEmpty().isLength({ max: 100 }).withMessage('Full name is required'),
    body('patient_phone')
      .matches(/^\+?[\d\s\-().]{7,20}$/)
      .withMessage('Valid phone number required'),
    body('patient_email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('patient_dob')
      .optional({ nullable: true, checkFalsy: true })
      .isISO8601()
      .withMessage('Date of birth must be a valid date'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const {
        service_id,
        location_type,
        appointment_date,
        appointment_time,
        patient_name,
        patient_dob,
        patient_phone,
        patient_email,
        address_street,
        address_city,
        address_state,
        address_zip,
      } = req.body;

      // Fetch existing appointment to detect date/time changes
      const { data: existing, error: fetchErr } = await supabase
        .from('appointments')
        .select('appointment_date, appointment_time, service_id')
        .eq('id', req.params.id)
        .single();

      if (fetchErr || !existing) return res.status(404).json({ error: 'Appointment not found' });

      // Check slot availability if date/time changed (exclude current appointment)
      const dateChanged = appointment_date !== existing.appointment_date;
      const timeChanged = appointment_time !== existing.appointment_time;
      if (dateChanged || timeChanged) {
        const { data: conflicts } = await supabase
          .from('appointments')
          .select('id')
          .eq('appointment_date', appointment_date)
          .eq('appointment_time', appointment_time)
          .not('status', 'eq', 'cancelled')
          .neq('id', req.params.id);

        if (conflicts && conflicts.length > 0) {
          return res.status(409).json({ error: 'That time slot is already booked. Please choose another.' });
        }
      }

      const updatePayload = {
        location_type,
        appointment_date,
        appointment_time,
        patient_name: patient_name.trim(),
        patient_dob: patient_dob || null,
        patient_phone,
        patient_email,
        address_street: address_street?.trim() || null,
        address_city: address_city?.trim() || null,
        address_state: address_state?.trim() || null,
        address_zip: address_zip || null,
      };

      if (service_id) updatePayload.service_id = service_id;
      if (dateChanged || timeChanged) {
        updatePayload.reminder_24_sent = false;
        updatePayload.reminder_2hr_sent = false;
      }

      const { error: updateErr } = await supabase
        .from('appointments')
        .update(updatePayload)
        .eq('id', req.params.id);

      if (updateErr) throw updateErr;

      // Fire-and-forget: send updated email
      const resolvedServiceId = service_id || existing.service_id;
      supabase
        .from('services')
        .select('name')
        .eq('id', resolvedServiceId)
        .single()
        .then(({ data: svc }) => {
          sendAppointmentUpdatedEmail({
            patientEmail: patient_email,
            patientName: patient_name.trim(),
            serviceName: svc?.name || 'Lab Service',
            appointmentDate: appointment_date,
            appointmentTime: appointment_time,
            locationType: location_type,
          });
        })
        .catch((err) => console.error('Service lookup for update email failed:', err.message));

      return res.json({ message: 'Appointment updated' });
    } catch (err) {
      console.error('Appointment update error:', err.message);
      return res.status(500).json({ error: 'Failed to update appointment' });
    }
  }
);

// PATCH /api/admin/appointments/:id/notes
router.patch(
  '/admin/:id/notes',
  verifyAdmin,
  [param('id').isUUID(), body('notes').isString().isLength({ max: 2000 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { error } = await supabase
        .from('appointments')
        .update({ admin_notes: req.body.notes })
        .eq('id', req.params.id);

      if (error) throw error;
      return res.json({ message: 'Notes saved' });
    } catch (err) {
      console.error('Notes update error:', err.message);
      return res.status(500).json({ error: 'Failed to save notes' });
    }
  }
);

// DELETE /api/appointments/admin/:id — delete appointment, email patient if active
router.delete(
  '/admin/:id',
  verifyAdmin,
  [param('id').isUUID()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { data: appt, error: fetchErr } = await supabase
        .from('appointments')
        .select(`
          id, status, patient_email, patient_name,
          appointment_date, appointment_time, service_id,
          services(name)
        `)
        .eq('id', req.params.id)
        .single();

      if (fetchErr || !appt) return res.status(404).json({ error: 'Appointment not found' });

      const { error: deleteErr } = await supabase
        .from('appointments')
        .delete()
        .eq('id', req.params.id);

      if (deleteErr) throw deleteErr;

      // Send rejection email only for active (non-terminal) statuses
      const noEmailStatuses = ['cancelled', 'completed', 'checked_in'];
      if (!noEmailStatuses.includes(appt.status)) {
        sendAppointmentRejectedEmail({
          patientEmail: appt.patient_email,
          patientName: appt.patient_name,
          serviceName: appt.services?.name || 'Lab Service',
          appointmentDate: appt.appointment_date,
          appointmentTime: appt.appointment_time,
        });
      }

      return res.json({ message: 'Appointment deleted' });
    } catch (err) {
      console.error('Appointment delete error:', err.message);
      return res.status(500).json({ error: 'Failed to delete appointment' });
    }
  }
);

module.exports = router;
