const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');
const { verifyAdmin, verifyRole } = require('../middleware/auth');

const SALT_ROUNDS = 12;

// Normalise legacy 'superadmin' role from old tokens
const normaliseRole = (role) => (role === 'superadmin' ? 'super_admin' : role);

// ── GET /api/users ────────────────────────────────────────────────────────────
// Super Admin → all users (except password_hash)
// Admin       → all users except super_admin rows
router.get(
  '/',
  verifyAdmin,
  verifyRole(['super_admin', 'admin']),
  async (req, res) => {
    try {
      const callerRole = normaliseRole(req.admin.role);
      const { search, role: roleFilter, limit = 50, offset = 0 } = req.query;

      let query = supabase
        .from('admin_users')
        .select('id, name, email, role, is_active, created_at', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(Number(offset), Number(offset) + Number(limit) - 1);

      // Admins cannot see super_admin accounts
      if (callerRole === 'admin') {
        query = query.neq('role', 'super_admin');
      }

      // Optional role filter
      if (roleFilter && ['super_admin', 'admin', 'staff'].includes(roleFilter)) {
        // Admin can only filter among visible roles
        if (callerRole === 'admin' && roleFilter === 'super_admin') {
          return res.json({ data: [], total: 0 });
        }
        query = query.eq('role', roleFilter);
      }

      // Optional search (name or email)
      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return res.json({ data: data || [], total: count || 0 });
    } catch (err) {
      console.error('GET /api/users error:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
);

// ── POST /api/users ───────────────────────────────────────────────────────────
// Super Admin + Admin can create users
// Role must be 'admin' or 'staff' (super_admin cannot be created via API)
router.post(
  '/',
  verifyAdmin,
  verifyRole(['super_admin', 'admin']),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').isIn(['admin', 'staff']).withMessage('Role must be admin or staff'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { name, email, password, role } = req.body;
    const callerRole = normaliseRole(req.admin.role);
    const callerId = req.admin.id;

    // Admin cannot create admin-level users (only staff)
    if (callerRole === 'admin' && role === 'admin') {
      return res.status(403).json({ error: 'Admins can only create Staff users' });
    }

    try {
      // Check for duplicate email
      const { data: existing } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        return res.status(409).json({ error: 'A user with this email already exists' });
      }

      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          name,
          email,
          password_hash,
          role,
          created_by: callerId || null,
        })
        .select('id, name, email, role, is_active, created_at')
        .single();

      if (error) throw error;

      return res.status(201).json(data);
    } catch (err) {
      console.error('POST /api/users error:', err);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }
);

// ── PATCH /api/users/:id/password ─────────────────────────────────────────────
// Super Admin only — change any user's password
router.patch(
  '/:id/password',
  verifyAdmin,
  verifyRole(['super_admin']),
  [
    body('password').trim().notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { id } = req.params;
    const { password } = req.body;

    try {
      // Verify target user exists
      const { data: target } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', id)
        .maybeSingle();

      if (!target) {
        return res.status(404).json({ error: 'User not found' });
      }

      const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

      const { error } = await supabase
        .from('admin_users')
        .update({ password_hash })
        .eq('id', id);

      if (error) throw error;

      return res.json({ message: 'Password updated successfully' });
    } catch (err) {
      console.error('PATCH /api/users/:id/password error:', err);
      return res.status(500).json({ error: 'Failed to update password' });
    }
  }
);

// ── DELETE /api/users/:id ─────────────────────────────────────────────────────
// Super Admin only — delete any user (cannot delete self)
router.delete(
  '/:id',
  verifyAdmin,
  verifyRole(['super_admin']),
  async (req, res) => {
    const { id } = req.params;
    const callerId = req.admin.id;

    if (callerId && callerId === id) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }

    try {
      const { data: target } = await supabase
        .from('admin_users')
        .select('id, role')
        .eq('id', id)
        .maybeSingle();

      if (!target) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('DELETE /api/users/:id error:', err);
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  }
);

module.exports = router;
