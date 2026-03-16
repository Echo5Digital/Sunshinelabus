import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export const submitContact = async (data) => {
  const res = await api.post('/api/contact', data);
  return res.data;
};

export const submitAppointment = async (data) => {
  const res = await api.post('/api/appointments', data);
  return res.data;
};
