const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

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
];

router.post('/', validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    await contact.save();
    res.status(201).json({ message: 'Your message has been received. We will be in touch soon.' });
  } catch (err) {
    console.error('Contact save error:', err.message);
    res.status(500).json({ error: 'Failed to save your message. Please try again.' });
  }
});

module.exports = router;
