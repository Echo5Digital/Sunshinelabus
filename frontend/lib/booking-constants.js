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

// ── Expansion-area time blocks ────────────────────────────────────────────────
// Early-morning block: 30-min increments, 03:00–07:00 (last slot 07:00).
// Morning block: 15-min increments, 09:00–14:00 (last slot 14:00) — starts later than
// In-Office's 08:00 start since the phlebotomist needs travel time between early-AM stops.
export const EARLY_AM_START = '03:00';
export const EARLY_AM_END = '07:30';
export const EARLY_AM_INTERVAL = 30;
export const EXPANSION_MORNING_START = '09:00';

// ── Home-visit zone definitions ───────────────────────────────────────────────
// `expansion` zones are dispatched to a separate phlebotomist from the core Trinity/Nearby zone.
export const LOCATION_ZONES = {
  trinity_nearby: {
    label: 'Home Visit — Trinity & Nearby',
    shortLabel: 'Home Visit (Trinity & Nearby)',
    expansion: false,
    zipCodes: null, // broad coverage area — no zip mismatch check
  },
  wesley_chapel: {
    label: 'Home Visit — Wesley Chapel',
    shortLabel: 'Home Visit (Wesley Chapel)',
    expansion: true,
    zipCodes: ['33544', '33545'],
  },
  zephyrhills_dade_city: {
    label: 'Home Visit — Zephyrhills & Dade City',
    shortLabel: 'Home Visit (Zephyrhills & Dade City)',
    expansion: true,
    zipCodes: ['33539', '33540', '33541', '33542', '33523', '33524', '33525', '33526', '33576'],
  },
  bushnell_villages: {
    label: 'Home Visit — Bushnell & The Villages Area',
    shortLabel: 'Home Visit (Bushnell & The Villages)',
    expansion: true,
    zipCodes: ['33515'],
  },
};

// ── Preferred language options ────────────────────────────────────────────────
export const LANGUAGE_OPTIONS = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Spanish / Español' },
];

// ── Deep-link location param → locationZone mapping ───────────────────────────
// Maps the short `?location=` slug used on landing-page booking CTAs to a real zone key.
export const DEEP_LINK_LOCATION_ZONES = {
  trinity: 'trinity_nearby',
  'wesley-chapel': 'wesley_chapel',
  zephyrhills: 'zephyrhills_dade_city',
  villages: 'bushnell_villages',
};
