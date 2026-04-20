import {
  Truck,
  Building2,
  Baby,
  Dna,
  FlaskConical,
  Syringe,
  ShieldCheck,
  Microscope,
} from 'lucide-react';

// ── Service icon map (slug → Lucide component) ────────────────────────────────
export const SERVICE_ICONS = {
  'home-draw': Truck,
  'onsite-blood-draw': Building2,
  'gender-reveal': Baby,
  'dna-testing': Dna,
  'trt-test': FlaskConical,
  'trt-shot': Syringe,
  'drug-testing': ShieldCheck,
  'hematology-panel': Microscope,
};

// ── Status display config ─────────────────────────────────────────────────────
export const STATUS_CONFIG = {
  booked: {
    label: 'Booked',
    bg: 'rgba(59,130,246,0.18)',
    text: '#93c5fd',
    dotColor: '#60a5fa',
  },
  confirmed: {
    label: 'Confirmed',
    bg: 'rgba(34,197,94,0.18)',
    text: '#86efac',
    dotColor: '#4ade80',
  },
  checked_in: {
    label: 'Checked In',
    bg: 'rgba(234,179,8,0.18)',
    text: '#fde047',
    dotColor: '#facc15',
  },
  completed: {
    label: 'Completed',
    bg: 'rgba(16,185,129,0.18)',
    text: '#6ee7b7',
    dotColor: '#34d399',
  },
  no_show: {
    label: 'No Show',
    bg: 'rgba(239,68,68,0.18)',
    text: '#fca5a5',
    dotColor: '#f87171',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'rgba(255,255,255,0.08)',
    text: 'rgba(255,255,255,0.5)',
    dotColor: 'rgba(255,255,255,0.35)',
  },
};

// ── Wizard step definitions ───────────────────────────────────────────────────
export const WIZARD_STEPS = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Location' },
  { id: 3, label: 'Date' },
  { id: 4, label: 'Time' },
  { id: 5, label: 'Info' },
  { id: 6, label: 'Docs' },
  { id: 7, label: 'Confirm' },
];

// ── Document type definitions ─────────────────────────────────────────────────
export const DOCUMENT_TYPES = [
  { key: 'id', label: 'Photo ID', hint: 'Driver\'s license or passport' },
  { key: 'lab_order', label: 'Lab Order / Rx', hint: 'Doctor\'s lab requisition' },
  { key: 'insurance_front', label: 'Insurance (Front)', hint: 'Front of insurance card' },
  { key: 'insurance_back', label: 'Insurance (Back)', hint: 'Back of insurance card' },
];

// ── Time slot generator ───────────────────────────────────────────────────────
// generateTimeSlots('08:00', '17:00', 15) → ['08:00', '08:15', ..., '16:45']
export function generateTimeSlots(start, end, intervalMin) {
  const slots = [];
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let current = sh * 60 + sm;
  const endTotal = eh * 60 + em;

  while (current < endTotal) {
    const h = Math.floor(current / 60).toString().padStart(2, '0');
    const m = (current % 60).toString().padStart(2, '0');
    slots.push(`${h}:${m}`);
    current += intervalMin;
  }
  return slots;
}

// ── Time display formatter ────────────────────────────────────────────────────
// '08:00' → '8:00 AM', '13:30' → '1:30 PM'
export function formatTimeSlot(slot) {
  const [h, m] = slot.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

// ── Minimum advance booking hours ─────────────────────────────────────────────
export const MIN_ADVANCE_HOURS = 0;
