const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/auth/admin-login
// Validates email + password against env vars, returns a signed JWT
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body || {};

  if (
    !email ||
    !password ||
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    // Same error for both wrong email and wrong password (no enumeration)
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { role: 'superadmin', email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return res.json({ token, expiresIn: 28800 });
});

module.exports = router;
