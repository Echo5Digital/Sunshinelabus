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
    color: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-500',
  },
  confirmed: {
    label: 'Confirmed',
    color: 'bg-green-100 text-green-700',
    dot: 'bg-green-500',
  },
  checked_in: {
    label: 'Checked In',
    color: 'bg-yellow-100 text-yellow-700',
    dot: 'bg-yellow-500',
  },
  completed: {
    label: 'Completed',
    color: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
  },
  no_show: {
    label: 'No Show',
    color: 'bg-red-100 text-red-700',
    dot: 'bg-red-500',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-gray-100 text-gray-500',
    dot: 'bg-gray-400',
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
export const MIN_ADVANCE_HOURS = 24;
