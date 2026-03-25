const express = require('express');
const router = express.Router();
const { body, query, param, validationResult } = require('express-validator');
const supabase = require('../config/supabase');
const { verifyAdmin } = require('../middleware/auth');

// All routes in this file require admin auth
router.use(verifyAdmin);

// GET /api/admin/stats — dashboard metrics
router.get('/stats', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [totalResult, todayResult, pendingResult, noShowResult] = await Promise.all([
      supabase.from('appointments').select('id', { count: 'exact', head: true }),
      supabase
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .eq('appointment_date', today),
      supabase
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'booked'),
      supabase
        .from('appointments')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'no_show'),
    ]);

    return res.json({
      total: totalResult.count || 0,
      today: todayResult.count || 0,
      pending: pendingResult.count || 0,
      no_shows: noShowResult.count || 0,
    });
  } catch (err) {
    console.error('Stats error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/admin/calendar?date=YYYY-MM-DD — day view appointments
router.get('/calendar', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Valid date required (YYYY-MM-DD)' });
    }

    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id, appointment_time, status, location_type,
        patient_name, patient_phone,
        services(name, slug, duration_minutes)
      `)
      .eq('appointment_date', date)
      .order('appointment_time');

    if (error) throw error;

    // Also fetch time blocks for this day
    const { data: blocks } = await supabase
      .from('time_blocks')
      .select('id, block_time, reason')
      .eq('block_date', date);

    return res.json({ date, appointments: data || [], timeBlocks: blocks || [] });
  } catch (err) {
    console.error('Calendar error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch calendar data' });
  }
});

// POST /api/admin/time-blocks — block a slot or full day
router.post(
  '/time-blocks',
  [
    body('block_date')
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Valid date required (YYYY-MM-DD)'),
    body('block_time')
      .optional({ nullable: true, checkFalsy: true })
      .matches(/^\d{2}:\d{2}$/)
      .withMessage('Time must be HH:MM format'),
    body('reason').optional().isString().isLength({ max: 200 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { block_date, block_time, reason } = req.body;
      const { data, error } = await supabase
        .from('time_blocks')
        .insert({ block_date, block_time: block_time || null, reason: reason || null })
        .select('id, block_date, block_time, reason, created_at')
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    } catch (err) {
      console.error('Time block create error:', err.message);
      return res.status(500).json({ error: 'Failed to create time block' });
    }
  }
);

// DELETE /api/admin/time-blocks/:id
router.delete(
  '/time-blocks/:id',
  [param('id').isUUID()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { error } = await supabase
        .from('time_blocks')
        .delete()
        .eq('id', req.params.id);

      if (error) throw error;
      return res.json({ message: 'Time block removed' });
    } catch (err) {
      console.error('Time block delete error:', err.message);
      return res.status(500).json({ error: 'Failed to delete time block' });
    }
  }
);

// GET /api/admin/time-blocks?date=YYYY-MM-DD&endDate=YYYY-MM-DD
router.get('/time-blocks', async (req, res) => {
  try {
    const { date, endDate } = req.query;

    let q = supabase
      .from('time_blocks')
      .select('id, block_date, block_time, reason, created_at')
      .order('block_date')
      .order('block_time');

    if (date) q = q.gte('block_date', date);
    if (endDate) q = q.lte('block_date', endDate);

    const { data, error } = await q;
    if (error) throw error;
    return res.json(data || []);
  } catch (err) {
    console.error('Time blocks list error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch time blocks' });
  }
});

module.exports = router;
