-- ============================================================
-- Sunshine Clinical Lab — Supabase Schema
-- Run this once in the Supabase SQL editor
-- ============================================================

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  requires_address BOOLEAN DEFAULT FALSE,
  allows_home_visit BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id),
  location_type TEXT NOT NULL CHECK (location_type IN ('on_site', 'home_visit')),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'booked'
    CHECK (status IN ('booked', 'confirmed', 'checked_in', 'completed', 'no_show', 'cancelled')),
  patient_name TEXT NOT NULL,
  patient_dob DATE,
  patient_phone TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  address_street TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- APPOINTMENT DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS appointment_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL
    CHECK (document_type IN ('id', 'lab_order', 'insurance_front', 'insurance_back', 'other')),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size_bytes INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- TIME BLOCKS TABLE (admin-controlled slot blocking)
CREATE TABLE IF NOT EXISTS time_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_date DATE NOT NULL,
  block_time TIME,          -- NULL = entire day is blocked
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(patient_email);
CREATE INDEX IF NOT EXISTS idx_time_blocks_date ON time_blocks(block_date);
CREATE INDEX IF NOT EXISTS idx_docs_appointment ON appointment_documents(appointment_id);

-- AUTO-UPDATE updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS appointments_updated_at ON appointments;

CREATE TRIGGER appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED DATA — 8 services
-- ============================================================
INSERT INTO services (name, slug, description, duration_minutes, requires_address, allows_home_visit)
VALUES
  ('Home Draw',          'home-draw',         'Mobile blood draw performed at your home or location of choice. Our phlebotomist comes to you.',  60, TRUE,  TRUE),
  ('On-Site Blood Draw', 'onsite-blood-draw',  'Blood draw performed at our New Port Richey clinic. Walk-ins welcome.',                           45, FALSE, FALSE),
  ('Peekaboo Gender Reveal', 'gender-reveal',  'Early gender determination blood test. Results in 5-7 business days.',                           30, FALSE, TRUE),
  ('DNA Testing',        'dna-testing',        'Paternity, ancestry, and relationship DNA testing with certified results.',                       45, FALSE, TRUE),
  ('TRT Test',           'trt-test',           'Testosterone replacement therapy blood panel and comprehensive hormone testing.',                 30, FALSE, FALSE),
  ('TRT Shot',           'trt-shot',           'Testosterone injection administered by our licensed clinical staff.',                            30, FALSE, FALSE),
  ('Drug Testing',       'drug-testing',       'DOT and non-DOT urine drug screening. Chain-of-custody available. Same-day results.',             30, FALSE, FALSE),
  ('Hematology Panel',   'hematology-panel',   'Complete blood count (CBC) and comprehensive hematology analysis.',                              45, FALSE, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- CONTACTS TABLE (for the public contact form)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Storage bucket: appointment-docs
-- Create manually in Supabase Dashboard → Storage → New Bucket
-- Name: appointment-docs, Private (not public)
-- ============================================================
