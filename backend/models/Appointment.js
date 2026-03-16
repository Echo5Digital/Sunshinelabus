const mongoose = require('mongoose');

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

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[\d\s\-().]{7,20}$/, 'Invalid phone number format'],
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    enum: {
      values: SERVICES,
      message: 'Invalid service selected',
    },
  },
  date: {
    type: Date,
    required: [true, 'Appointment date is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
