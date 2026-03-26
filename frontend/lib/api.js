import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ── Public API client ─────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ── Admin token helpers (sessionStorage — cleared on tab close) ───────────────
export const getAdminToken = () => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('admin_token');
};
export const setAdminToken = (token) => sessionStorage.setItem('admin_token', token);
export const clearAdminToken = () => sessionStorage.removeItem('admin_token');

// ── Admin API client (auto-attaches Bearer token) ─────────────────────────────
const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});
adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Public endpoints ──────────────────────────────────────────────────────────

export const submitContact = async (data) => {
  const res = await api.post('/api/contact', data);
  return res.data;
};

// Legacy — kept for any remaining references
export const submitAppointment = async (data) => {
  const res = await api.post('/api/appointments', data);
  return res.data;
};

export const fetchServices = async () => {
  const res = await api.get('/api/services');
  return res.data;
};

export const fetchAvailability = async (date) => {
  const res = await api.get(`/api/availability?date=${date}`);
  return res.data;
};

export const fetchDateBlocks = async (start, end) => {
  const res = await api.get(`/api/availability/blocks?start=${start}&end=${end}`);
  return res.data;
};

export const submitBooking = async (data) => {
  const res = await api.post('/api/appointments', data);
  return res.data;
};

export const uploadDocuments = async (appointmentId, formData) => {
  const res = await api.post(`/api/appointments/${appointmentId}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000,
  });
  return res.data;
};

// ── Admin auth ────────────────────────────────────────────────────────────────

export const adminLogin = async ({ email, password }) => {
  const res = await api.post('/api/auth/admin-login', { email, password });
  return res.data;
};

// ── Admin dashboard endpoints ─────────────────────────────────────────────────

export const fetchAdminStats = async () => {
  const res = await adminApi.get('/api/admin/stats');
  return res.data;
};

export const fetchAdminAppointments = async (params = {}) => {
  const res = await adminApi.get('/api/appointments/admin', { params });
  return res.data;
};

export const fetchAdminAppointmentById = async (id) => {
  const res = await adminApi.get(`/api/appointments/admin/${id}`);
  return res.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const res = await adminApi.patch(`/api/appointments/admin/${id}/status`, { status });
  return res.data;
};

export const updateAppointmentNotes = async (id, notes) => {
  const res = await adminApi.patch(`/api/appointments/admin/${id}/notes`, { notes });
  return res.data;
};

export const fetchCalendarDay = async (date) => {
  const res = await adminApi.get(`/api/admin/calendar?date=${date}`);
  return res.data;
};

export const createTimeBlock = async (data) => {
  const res = await adminApi.post('/api/admin/time-blocks', data);
  return res.data;
};

export const deleteTimeBlock = async (id) => {
  const res = await adminApi.delete(`/api/admin/time-blocks/${id}`);
  return res.data;
};

export const fetchTimeBlocks = async (startDate, endDate) => {
  const res = await adminApi.get('/api/admin/time-blocks', {
    params: { date: startDate, endDate },
  });
  return res.data;
};
