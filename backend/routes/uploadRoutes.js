const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('crypto');
const supabase = require('../config/supabase');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const STORAGE_BUCKET = 'appointment-docs';

const VALID_DOC_TYPES = ['id', 'lab_order', 'insurance_front', 'insurance_back', 'other'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: 4 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and PDF files are allowed'));
    }
  },
});

// POST /api/appointments/:id/documents
// Accepts multipart/form-data with files[] and docTypes[] arrays
router.post('/:id/documents', upload.array('files', 4), async (req, res) => {
  try {
    const { id: appointmentId } = req.params;

    // Verify appointment exists
    const { data: appt, error: apptErr } = await supabase
      .from('appointments')
      .select('id')
      .eq('id', appointmentId)
      .single();

    if (apptErr || !appt) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const docTypes = Array.isArray(req.body.docTypes)
      ? req.body.docTypes
      : [req.body.docTypes];

    const uploadedDocs = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const docType = docTypes[i] && VALID_DOC_TYPES.includes(docTypes[i])
        ? docTypes[i]
        : 'other';

      const ext = file.mimetype === 'application/pdf' ? 'pdf'
        : file.mimetype === 'image/png' ? 'png' : 'jpg';

      // Generate a unique random ID for the file path
      const fileId = Math.random().toString(36).slice(2) + Date.now().toString(36);
      const storagePath = `appointments/${appointmentId}/${docType}-${fileId}.${ext}`;

      // Upload to Supabase Storage
      const { error: storageErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (storageErr) {
        console.error('Storage upload error:', storageErr.message);
        continue; // Skip this file but continue with others
      }

      // Get a signed URL (valid 7 days — admin can view)
      const { data: urlData } = await supabase.storage
        .from(STORAGE_BUCKET)
        .createSignedUrl(storagePath, 60 * 60 * 24 * 7);

      const fileUrl = urlData?.signedUrl || storagePath;

      // Insert document record
      const { data: doc, error: docErr } = await supabase
        .from('appointment_documents')
        .insert({
          appointment_id: appointmentId,
          document_type: docType,
          file_url: fileUrl,
          file_name: file.originalname,
          file_size_bytes: file.size,
        })
        .select('id, document_type, file_url, file_name, uploaded_at')
        .single();

      if (!docErr && doc) {
        uploadedDocs.push(doc);
      }
    }

    return res.status(201).json({
      message: `${uploadedDocs.length} document(s) uploaded successfully`,
      documents: uploadedDocs,
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    return res.status(500).json({ error: 'Failed to upload documents' });
  }
});

// Multer error handler
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Only JPEG')) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

module.exports = router;
