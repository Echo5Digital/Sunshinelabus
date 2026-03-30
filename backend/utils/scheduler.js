const cron = require('node-cron');
const supabase = require('../config/supabase');
const { sendReminder24Email, sendReminder2HrEmail } = require('./mailer');

const WINDOW_MS = 5 * 60 * 1000; // ±5 minutes

function toDateString(date) {
  return date.toISOString().split('T')[0];
}

async function processReminders() {
  const now = Date.now();
  const today = toDateString(new Date(now));
  const twoDaysAhead = toDateString(new Date(now + 2 * 24 * 60 * 60 * 1000));

  const { data: appointments, error } = await supabase
    .from('appointments')
    .select(
      `id, appointment_date, appointment_time, patient_name, patient_email,
       location_type, reminder_24_sent, reminder_2hr_sent, booking_token,
       services(name)`
    )
    .in('status', ['booked', 'confirmed'])
    .or('reminder_24_sent.eq.false,reminder_2hr_sent.eq.false')
    .gte('appointment_date', today)
    .lte('appointment_date', twoDaysAhead);

  if (error) {
    console.error('Reminder scheduler: DB query failed:', error.message);
    return;
  }

  for (const appt of appointments) {
    const apptTime = new Date(`${appt.appointment_date}T${appt.appointment_time}:00`).getTime();
    const diff = apptTime - now;
    const serviceName = appt.services?.name || 'Lab Service';

    // 24-hour reminder
    if (!appt.reminder_24_sent && Math.abs(diff - 24 * 60 * 60 * 1000) <= WINDOW_MS) {
      const manageUrl = `${process.env.FRONTEND_URL}/manage-booking?token=${appt.booking_token}`;
      try {
        await sendReminder24Email({
          patientEmail: appt.patient_email,
          patientName: appt.patient_name,
          serviceName,
          appointmentDate: appt.appointment_date,
          appointmentTime: appt.appointment_time,
          locationType: appt.location_type,
          manageUrl,
        });
        const { error: updateErr } = await supabase
          .from('appointments')
          .update({ reminder_24_sent: true })
          .eq('id', appt.id);
        if (updateErr) console.error(`Failed to mark reminder_24_sent for ${appt.id}:`, updateErr.message);
      } catch (err) {
        console.error(`24h reminder failed for appointment ${appt.id}:`, err.message);
      }
    }

    // 2-hour reminder
    if (!appt.reminder_2hr_sent && Math.abs(diff - 2 * 60 * 60 * 1000) <= WINDOW_MS) {
      try {
        await sendReminder2HrEmail({
          patientEmail: appt.patient_email,
          patientName: appt.patient_name,
          serviceName,
          appointmentDate: appt.appointment_date,
          appointmentTime: appt.appointment_time,
          locationType: appt.location_type,
        });
        const { error: updateErr } = await supabase
          .from('appointments')
          .update({ reminder_2hr_sent: true })
          .eq('id', appt.id);
        if (updateErr) console.error(`Failed to mark reminder_2hr_sent for ${appt.id}:`, updateErr.message);
      } catch (err) {
        console.error(`2h reminder failed for appointment ${appt.id}:`, err.message);
      }
    }
  }
}

function startScheduler() {
  cron.schedule('*/5 * * * *', () => {
    processReminders().catch((err) => console.error('Scheduler uncaught error:', err.message));
  });
  console.log('Reminder scheduler started (runs every 5 minutes)');
}

module.exports = { startScheduler };
