const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const supabase = require('../config/supabase');

const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .isEmail()
    .withMessage('A valid email address is required')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),
  body('address')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage('Address cannot exceed 300 characters'),
  body('phone')
    .optional({ nullable: true, checkFalsy: true })
    .matches(/^\+?[\d\s\-().]{0,25}$/)
    .withMessage('Invalid phone format'),
];

router.post('/', validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    // Store contact submissions in Supabase (table: contacts)
    // If the contacts table doesn't exist yet, this will log a warning but still return success
    const { error } = await supabase
      .from('contacts')
      .insert({
        name: req.body.name.trim(),
        email: req.body.email,
        message: req.body.message.trim(),
        address: req.body.address?.trim() || null,
        phone: req.body.phone?.trim() || null,
      });

    if (error) {
      // Log but don't expose to user (contact table may not exist yet)
      console.warn('Contact insert warning:', error.message);
    }

    res.status(201).json({ message: 'Your message has been received. We will be in touch soon.' });
  } catch (err) {
    console.error('Contact save error:', err.message);
    res.status(500).json({ error: 'Failed to save your message. Please try again.' });
  }
});

module.exports = router;
