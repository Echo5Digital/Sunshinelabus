const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET /api/services
// Returns all active services ordered by name (public, no auth required)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('id, name, slug, description, duration_minutes, requires_address, allows_home_visit')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return res.json(data);
  } catch (err) {
    console.error('Failed to fetch services:', err.message);
    return res.status(500).json({ error: 'Failed to fetch services' });
  }
});

module.exports = router;
