const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Business hours: Mon-Fri, 08:00 – 17:00
const BUSINESS_START = '08:00';
const BUSINESS_END = '17:00';
const SLOT_INTERVAL = 15; // minutes
const MIN_ADVANCE_HOURS = 24;

// Generate all HH:MM time slots between start and end (exclusive)
function generateTimeSlots(start, end, intervalMin) {
  const slots = [];
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let totalStart = sh * 60 + sm;
  const totalEnd = eh * 60 + em;

  while (totalStart < totalEnd) {
    const h = Math.floor(totalStart / 60).toString().padStart(2, '0');
    const m = (totalStart % 60).toString().padStart(2, '0');
    slots.push(`${h}:${m}`);
    totalStart += intervalMin;
  }
  return slots;
}

// GET /api/availability?date=YYYY-MM-DD
// Returns available 15-minute time slots for a given weekday date (public, no auth)
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;

    // Validate date format
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const requestedDate = new Date(date + 'T00:00:00');

    // Must be a weekday
    const dayOfWeek = requestedDate.getDay(); // 0=Sun, 6=Sat
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.json({ date, slots: [], message: 'We are closed on weekends.' });
    }

    // Must be at least MIN_ADVANCE_HOURS from now
    const now = new Date();
    const minDate = new Date(now.getTime() + MIN_ADVANCE_HOURS * 60 * 60 * 1000);
    if (requestedDate < minDate) {
      return res.json({ date, slots: [], message: `Bookings require at least ${MIN_ADVANCE_HOURS} hours advance notice.` });
    }

    // Parallel queries: existing appointments + time blocks for this date
    const [appointmentsResult, blocksResult] = await Promise.all([
      supabase
        .from('appointments')
        .select('appointment_time')
        .eq('appointment_date', date)
        .not('status', 'eq', 'cancelled'),
      supabase
        .from('time_blocks')
        .select('block_time, id')
        .eq('block_date', date),
    ]);

    if (appointmentsResult.error) throw appointmentsResult.error;
    if (blocksResult.error) throw blocksResult.error;

    // Check for full-day block
    const fullDayBlock = blocksResult.data.find((b) => b.block_time === null);
    if (fullDayBlock) {
      return res.json({ date, slots: [], blocked: true, message: 'This date is not available for booking.' });
    }

    // Collect booked and blocked times as HH:MM strings
    const bookedTimes = new Set(
      (appointmentsResult.data || []).map((a) => a.appointment_time.slice(0, 5))
    );
    const blockedTimes = new Set(
      (blocksResult.data || [])
        .filter((b) => b.block_time !== null)
        .map((b) => b.block_time.slice(0, 5))
    );

    const allSlots = generateTimeSlots(BUSINESS_START, BUSINESS_END, SLOT_INTERVAL);
    const available = allSlots.filter((slot) => !bookedTimes.has(slot) && !blockedTimes.has(slot));

    return res.json({ date, slots: available });
  } catch (err) {
    console.error('Availability error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

module.exports = router;
