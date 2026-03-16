const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');

const SERVICES = [
  'Hematology',
  'Chemistry',
  'Immunochemistry',
  'Coagulation Service',
  'Drug Testing',
  'Molecular Testing',
  'Phlebotomy Service',
  'DNA Testing',
];

const validateAppointment = [
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
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[\d\s\-().]{7,20}$/)
    .withMessage('Invalid phone number format'),
  body('service')
    .isIn(SERVICES)
    .withMessage('Please select a valid service'),
  body('date')
    .isISO8601()
    .withMessage('A valid date is required')
    .custom((value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(value) < today) {
        throw new Error('Appointment date must be today or in the future');
      }
      return true;
    }),
];

router.post('/', validateAppointment, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const appointment = new Appointment({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      date: new Date(req.body.date),
    });
    await appointment.save();
    res.status(201).json({ message: 'Your appointment has been booked successfully. We will confirm it shortly.' });
  } catch (err) {
    console.error('Appointment save error:', err.message);
    res.status(500).json({ error: 'Failed to book appointment. Please try again.' });
  }
});

module.exports = router;
