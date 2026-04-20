const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Business hours: Mon-Fri, 08:00 – 14:00 (last slot 14:00)
const BUSINESS_START = '08:00';
const BUSINESS_END = '14:15';
const SLOT_INTERVAL = 15; // minutes
const MIN_ADVANCE_HOURS = 0;

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

// GET /api/availability/blocks?start=YYYY-MM-DD&end=YYYY-MM-DD
// Returns fully-blocked and partially-blocked dates in range (public, no auth)
router.get('/blocks', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (
      !start || !end ||
      !/^\d{4}-\d{2}-\d{2}$/.test(start) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(end)
    ) {
      return res.status(400).json({ error: 'Valid start and end dates required (YYYY-MM-DD).' });
    }

    const { data, error } = await supabase
      .from('time_blocks')
      .select('block_date, block_time')
      .gte('block_date', start)
      .lte('block_date', end);

    if (error) throw error;

    const byDate = {};
    for (const row of data || []) {
      if (!byDate[row.block_date]) byDate[row.block_date] = [];
      byDate[row.block_date].push(row.block_time);
    }

    const fullyBlocked = [];
    const partiallyBlocked = [];
    for (const [date, times] of Object.entries(byDate)) {
      if (times.includes(null)) fullyBlocked.push(date);
      else partiallyBlocked.push(date);
    }

    return res.json({ fullyBlocked, partiallyBlocked });
  } catch (err) {
    console.error('Blocks range error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch block info' });
  }
});

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

    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const isToday = date === todayStr;

    const allSlots = generateTimeSlots(BUSINESS_START, BUSINESS_END, SLOT_INTERVAL);
    const available = allSlots.filter((slot) => {
      if (bookedTimes.has(slot) || blockedTimes.has(slot)) return false;
      if (isToday) {
        const [h, m] = slot.split(':').map(Number);
        const slotTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
        if (slotTime <= now) return false;
      }
      return true;
    });
    const blockedSlotsArr = [...blockedTimes];

    return res.json({ date, slots: available, blockedSlots: blockedSlotsArr });
  } catch (err) {
    console.error('Availability error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

module.exports = router;
