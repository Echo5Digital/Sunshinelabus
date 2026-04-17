-- ============================================================
-- Sunshine Clinical Lab — Row Level Security (RLS) Policies
-- ============================================================
-- HOW TO APPLY:
--   Run this file ONCE in the Supabase SQL Editor
--   (Dashboard → SQL Editor → paste → Run)
--
-- SAFETY GUARANTEE:
--   All existing backend queries use the service_role key,
--   which bypasses ALL RLS policies unconditionally.
--   No backend code changes are needed. Every existing API
--   endpoint continues to work without any modification.
--
-- PURPOSE (defense-in-depth):
--   - Blocks any accidental anon key usage from leaking data
--   - Prevents direct Supabase client access to sensitive tables
--   - Future-proofs for Supabase Auth migration
--
-- NOTE ON auth.jwt() CLAIMS:
--   The current system uses a custom JWT signed with JWT_SECRET
--   (not Supabase's internal secret). Therefore the `authenticated`
--   role policies using auth.jwt() claims are inactive today — they
--   take effect only after migrating to Supabase Auth. The anon
--   deny policies are active immediately.
-- ============================================================


-- ============================================================
-- STEP 1: Enable Row Level Security on all tables
-- ============================================================

ALTER TABLE services              ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments          ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_blocks           ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts              ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users           ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- STEP 2: SERVICES
-- Sensitivity: LOW — public catalog data
-- anon:          SELECT active services only (needed for booking form)
-- authenticated: SELECT all (incl. inactive); admin can write
-- ============================================================

DROP POLICY IF EXISTS "services_anon_read"          ON services;
DROP POLICY IF EXISTS "services_authenticated_read" ON services;
DROP POLICY IF EXISTS "services_admin_write"        ON services;

-- Public: read only active services
CREATE POLICY "services_anon_read"
ON services
FOR SELECT
TO anon
USING (is_active = TRUE);

-- Authenticated (future admin portal): read all services
CREATE POLICY "services_authenticated_read"
ON services
FOR SELECT
TO authenticated
USING (TRUE);

-- Authenticated super_admin / admin: full write access
CREATE POLICY "services_admin_write"
ON services
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
);


-- ============================================================
-- STEP 3: APPOINTMENTS
-- Sensitivity: HIGH — contains patient PHI
-- anon:          DENIED entirely
-- staff:         SELECT only
-- admin / super_admin: full CRUD
-- ============================================================

DROP POLICY IF EXISTS "appointments_anon_deny"  ON appointments;
DROP POLICY IF EXISTS "appointments_admin_all"  ON appointments;
DROP POLICY IF EXISTS "appointments_staff_read" ON appointments;

-- Block every anonymous query unconditionally
CREATE POLICY "appointments_anon_deny"
ON appointments
FOR ALL
TO anon
USING (FALSE)
WITH CHECK (FALSE);

-- Admin and super_admin: full CRUD
CREATE POLICY "appointments_admin_all"
ON appointments
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
);

-- Staff: read-only, no inserts/updates/deletes
CREATE POLICY "appointments_staff_read"
ON appointments
FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role') = 'staff'
);


-- ============================================================
-- STEP 4: APPOINTMENT_DOCUMENTS
-- Sensitivity: HIGH — health documents (IDs, lab orders, insurance)
-- anon:          DENIED entirely
-- staff:         SELECT only
-- admin / super_admin: full CRUD
-- ============================================================

DROP POLICY IF EXISTS "appointment_documents_anon_deny"  ON appointment_documents;
DROP POLICY IF EXISTS "appointment_documents_admin_all"  ON appointment_documents;
DROP POLICY IF EXISTS "appointment_documents_staff_read" ON appointment_documents;

CREATE POLICY "appointment_documents_anon_deny"
ON appointment_documents
FOR ALL
TO anon
USING (FALSE)
WITH CHECK (FALSE);

CREATE POLICY "appointment_documents_admin_all"
ON appointment_documents
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
);

CREATE POLICY "appointment_documents_staff_read"
ON appointment_documents
FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role') = 'staff'
);


-- ============================================================
-- STEP 5: TIME_BLOCKS
-- Sensitivity: MEDIUM — admin schedule management
-- anon:          DENIED (public availability is served via backend)
-- staff:         SELECT only
-- admin / super_admin: full CRUD
-- ============================================================

DROP POLICY IF EXISTS "time_blocks_anon_deny"  ON time_blocks;
DROP POLICY IF EXISTS "time_blocks_admin_all"  ON time_blocks;
DROP POLICY IF EXISTS "time_blocks_staff_read" ON time_blocks;

CREATE POLICY "time_blocks_anon_deny"
ON time_blocks
FOR ALL
TO anon
USING (FALSE)
WITH CHECK (FALSE);

CREATE POLICY "time_blocks_admin_all"
ON time_blocks
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
);

CREATE POLICY "time_blocks_staff_read"
ON time_blocks
FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role') = 'staff'
);


-- ============================================================
-- STEP 6: CONTACTS
-- Sensitivity: MEDIUM — PII from public contact form
-- anon:          DENIED (form submissions go through backend service_role)
-- staff:         SELECT only
-- admin / super_admin: full CRUD
-- ============================================================

DROP POLICY IF EXISTS "contacts_anon_deny"  ON contacts;
DROP POLICY IF EXISTS "contacts_admin_all"  ON contacts;
DROP POLICY IF EXISTS "contacts_staff_read" ON contacts;

CREATE POLICY "contacts_anon_deny"
ON contacts
FOR ALL
TO anon
USING (FALSE)
WITH CHECK (FALSE);

CREATE POLICY "contacts_admin_all"
ON contacts
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
)
WITH CHECK (
  (auth.jwt() ->> 'role') IN ('super_admin', 'admin')
);

CREATE POLICY "contacts_staff_read"
ON contacts
FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role') = 'staff'
);


-- ============================================================
-- STEP 7: ADMIN_USERS
-- Sensitivity: CRITICAL — contains bcrypt password hashes
-- anon:          DENIED entirely
-- staff:         DENIED (cannot see any user records)
-- admin:         SELECT only, cannot see super_admin records
-- super_admin:   Full CRUD on all records
-- any role:      SELECT own record (for session/profile use)
-- ============================================================

DROP POLICY IF EXISTS "admin_users_anon_deny"          ON admin_users;
DROP POLICY IF EXISTS "admin_users_super_admin_all"    ON admin_users;
DROP POLICY IF EXISTS "admin_users_admin_limited_read" ON admin_users;
DROP POLICY IF EXISTS "admin_users_self_read"          ON admin_users;

-- Hard block on all anonymous queries
CREATE POLICY "admin_users_anon_deny"
ON admin_users
FOR ALL
TO anon
USING (FALSE)
WITH CHECK (FALSE);

-- super_admin: unrestricted access to every record
CREATE POLICY "admin_users_super_admin_all"
ON admin_users
FOR ALL
TO authenticated
USING (
  (auth.jwt() ->> 'role') = 'super_admin'
)
WITH CHECK (
  (auth.jwt() ->> 'role') = 'super_admin'
);

-- admin: read-only, cannot see super_admin accounts
-- (mirrors the application-level RBAC in userRoutes.js)
CREATE POLICY "admin_users_admin_limited_read"
ON admin_users
FOR SELECT
TO authenticated
USING (
  (auth.jwt() ->> 'role') = 'admin'
  AND role != 'super_admin'
);

-- Any authenticated user can read their own record
CREATE POLICY "admin_users_self_read"
ON admin_users
FOR SELECT
TO authenticated
USING (
  id::text = (auth.jwt() ->> 'id')
);


-- ============================================================
-- STEP 8: STORAGE — appointment-docs bucket
-- The bucket is already Private in Supabase Dashboard.
-- These policies add a secondary RLS layer on storage.objects.
-- ============================================================

DROP POLICY IF EXISTS "appointment_docs_anon_deny"    ON storage.objects;
DROP POLICY IF EXISTS "appointment_docs_admin_access" ON storage.objects;

-- Block all anonymous access to the private bucket
CREATE POLICY "appointment_docs_anon_deny"
ON storage.objects
FOR ALL
TO anon
USING (bucket_id = 'appointment-docs' AND FALSE)
WITH CHECK (FALSE);

-- Authenticated admins and staff can read/write bucket objects
CREATE POLICY "appointment_docs_admin_access"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'appointment-docs'
  AND (auth.jwt() ->> 'role') IN ('super_admin', 'admin', 'staff')
)
WITH CHECK (
  bucket_id = 'appointment-docs'
  AND (auth.jwt() ->> 'role') IN ('super_admin', 'admin', 'staff')
);


-- ============================================================
-- VERIFICATION QUERIES
-- Run these after applying the policies to confirm correct setup
-- ============================================================

-- List all tables with RLS status (should all show rowsecurity = true)
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY tablename;

-- List all active policies
-- SELECT schemaname, tablename, policyname, roles, cmd, qual
-- FROM pg_policies
-- WHERE schemaname IN ('public', 'storage')
-- ORDER BY tablename, policyname;


-- ============================================================
-- SCHEMA IMPROVEMENTS (optional — run manually after review)
-- ============================================================

-- Audit trail columns for admin_users
-- ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS updated_at   TIMESTAMPTZ DEFAULT NOW();
-- ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

-- Index for contact deduplication / lookup by email
-- CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Composite index matching common admin appointment query pattern
-- CREATE INDEX IF NOT EXISTS idx_appointments_date_status
--   ON appointments(appointment_date, status);


-- ============================================================
-- FUTURE SUPABASE AUTH MIGRATION NOTES
-- ============================================================
-- When migrating to Supabase Auth:
--
-- 1. Store `role` in Supabase Auth app_metadata (server-side only)
-- 2. Update policy claim paths:
--      auth.jwt() ->> 'role'
--    becomes:
--      auth.jwt() -> 'app_metadata' ->> 'role'
--
-- 3. For user-scoped data (e.g. patient appointments):
--      USING (user_id = auth.uid())
--
-- 4. Replace custom JWT issuance in authRoutes.js with:
--      supabase.auth.signInWithPassword()
--
-- 5. Replace verifyAdmin middleware with Supabase session verification
-- ============================================================
