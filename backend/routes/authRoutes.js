const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

const SALT_ROUNDS = 12;

// Auto-seed the Super Admin from env vars into the DB (called on first login)
async function seedSuperAdmin(email, plainPassword) {
  const password_hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  const name = 'Super Admin';

  const { data, error } = await supabase
    .from('admin_users')
    .insert({ name, email, password_hash, role: 'super_admin' })
    .select('id, name, email, role')
    .single();

  if (error) {
    // Race condition or other insert error — try to fetch existing row
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id, name, email, role')
      .eq('email', email)
      .single();
    return existing || null;
  }
  return data;
}

// POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    // 1. Look up user in admin_users table
    const { data: user, error: dbError } = await supabase
      .from('admin_users')
      .select('id, name, email, role, password_hash, is_active')
      .eq('email', email)
      .maybeSingle();

    let adminUser = user;

    if (!user) {
      // 2. Not in DB — check env var credentials for initial Super Admin setup
      const envEmail = process.env.ADMIN_EMAIL;
      const envPassword = process.env.ADMIN_PASSWORD;

      if (!envEmail || !envPassword || email !== envEmail || password !== envPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Auto-seed super admin into DB
      adminUser = await seedSuperAdmin(email, password);
      if (!adminUser) {
        return res.status(500).json({ error: 'Failed to initialise admin user' });
      }
    } else {
      // 3. User found in DB — verify password
      if (!user.is_active) {
        return res.status(401).json({ error: 'Account is inactive' });
      }
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    // 4. Issue JWT with full user info
    const token = jwt.sign(
      {
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ token, expiresIn: 28800 });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
