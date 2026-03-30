'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getBookingByToken, cancelBooking, rescheduleBooking, fetchAvailability } from '@/lib/api';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateString) {
  const d = new Date(dateString + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatTime(timeString) {
  const [h, m] = timeString.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

function todayString() {
  return new Date().toISOString().split('T')[0];
}

function isWeekday(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  return day !== 0 && day !== 6;
}

function minRescheduleDate() {
  // Must be at least 24h from now
  const d = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return d.toISOString().split('T')[0];
}

// ── Main component (inner — uses useSearchParams) ─────────────────────────────

function ManageBookingInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // Page state: 'loading' | 'found' | 'not_found' | 'expired' | 'cancelled' | 'rescheduled' | 'error'
  const [pageState, setPageState] = useState('loading');
  const [booking, setBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Cancel flow
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // Reschedule flow
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);
  const [rescheduleError, setRescheduleError] = useState('');

  // ── Load booking on mount ──────────────────────────────────────────────────

  useEffect(() => {
    if (!token) {
      setPageState('not_found');
      return;
    }
    getBookingByToken(token)
      .then((data) => {
        setBooking(data);
        setPageState('found');
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 404) setPageState('not_found');
        else if (status === 410) setPageState('expired');
        else setPageState('error');
      });
  }, [token]);

  // ── Load available slots when reschedule date changes ─────────────────────

  useEffect(() => {
    if (!rescheduleDate) {
      setAvailableSlots([]);
      setSelectedTime('');
      return;
    }
    setLoadingSlots(true);
    setSelectedTime('');
    fetchAvailability(rescheduleDate)
      .then((data) => {
        setAvailableSlots(data.slots || []);
      })
      .catch(() => setAvailableSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [rescheduleDate]);

  // ── Actions ───────────────────────────────────────────────────────────────

  async function handleCancel() {
    setCancelling(true);
    try {
      await cancelBooking(token);
      setPageState('cancelled');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Failed to cancel. Please call us at (727) 233-5223.');
      setShowCancelConfirm(false);
    } finally {
      setCancelling(false);
    }
  }

  async function handleReschedule(e) {
    e.preventDefault();
    if (!rescheduleDate || !selectedTime) return;
    setRescheduling(true);
    setRescheduleError('');
    try {
      await rescheduleBooking(token, rescheduleDate, selectedTime);
      setPageState('rescheduled');
      setBooking((prev) => ({ ...prev, appointment_date: rescheduleDate, appointment_time: selectedTime }));
    } catch (err) {
      setRescheduleError(err.response?.data?.error || 'Failed to reschedule. Please try again.');
    } finally {
      setRescheduling(false);
    }
  }

  // ── Render states ─────────────────────────────────────────────────────────

  if (pageState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pageState === 'not_found') {
    return <StatusCard icon="!" title="Booking Not Found" message="We couldn't find an appointment with this link. Please check the link in your email or contact us." />;
  }

  if (pageState === 'expired') {
    return <StatusCard icon="⏰" title="Link Expired" message="This booking link is no longer active because the appointment date has passed." />;
  }

  if (pageState === 'error') {
    return <StatusCard icon="!" title="Something Went Wrong" message="We were unable to load your booking. Please try again or call us at (727) 233-5223." />;
  }

  if (pageState === 'cancelled') {
    return (
      <StatusCard
        icon="✓"
        iconColor="text-green-600"
        title="Appointment Cancelled"
        message="Your appointment has been cancelled. If you'd like to book a new appointment, you can do so below."
      >
        <Link href="/book-appointment" className="inline-block mt-4 px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
          Book New Appointment
        </Link>
      </StatusCard>
    );
  }

  if (pageState === 'rescheduled') {
    return (
      <StatusCard
        icon="✓"
        iconColor="text-green-600"
        title="Appointment Rescheduled"
        message={`Your appointment has been moved to ${formatDate(booking.appointment_date)} at ${formatTime(booking.appointment_time)}.`}
      >
        <p className="mt-2 text-sm text-gray-500">A new confirmation has been noted. Call us at (727) 233-5223 with any questions.</p>
      </StatusCard>
    );
  }

  // pageState === 'found'
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Your Appointment</h1>
        <p className="text-gray-500 mb-8">Review your upcoming appointment and make changes if needed.</p>

        {/* Booking card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-4">Appointment Details</p>
          <dl className="space-y-3">
            <Row label="Patient" value={booking.patient_name} />
            <Row label="Service" value={booking.service_name} />
            <Row label="Date" value={formatDate(booking.appointment_date)} />
            <Row label="Time" value={formatTime(booking.appointment_time)} />
            <Row label="Location" value={booking.location_type === 'home_visit' ? 'Home Visit' : 'On-Site (Clinic)'} />
            <Row label="Status" value={<span className="capitalize">{booking.status}</span>} />
          </dl>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{errorMsg}</div>
        )}

        {/* Action buttons */}
        {!showCancelConfirm && !showReschedule && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowReschedule(true)}
              className="flex-1 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Reschedule
            </button>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="flex-1 py-3 bg-white border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Cancel Appointment
            </button>
          </div>
        )}

        {/* Cancel confirmation */}
        {showCancelConfirm && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <p className="font-semibold text-red-800 mb-1">Cancel this appointment?</p>
            <p className="text-sm text-red-600 mb-4">This action cannot be undone. You can always book again.</p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {cancelling ? 'Cancelling…' : 'Yes, Cancel'}
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Keep Appointment
              </button>
            </div>
          </div>
        )}

        {/* Reschedule form */}
        {showReschedule && (
          <form onSubmit={handleReschedule} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="font-semibold text-gray-800 mb-4">Select a new date and time</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Date</label>
              <input
                type="date"
                min={minRescheduleDate()}
                value={rescheduleDate}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v && !isWeekday(v)) {
                    setRescheduleError('Appointments are only available Monday–Friday.');
                    setRescheduleDate('');
                  } else {
                    setRescheduleError('');
                    setRescheduleDate(v);
                  }
                }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {rescheduleDate && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Times</label>
                {loadingSlots ? (
                  <p className="text-sm text-gray-400">Loading slots…</p>
                ) : availableSlots.length === 0 ? (
                  <p className="text-sm text-red-500">No available slots on this date. Please choose another day.</p>
                ) : (
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- Select a time --</option>
                    {availableSlots.map((s) => (
                      <option key={s} value={s}>
                        {formatTime(s)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {rescheduleError && (
              <p className="mb-3 text-sm text-red-600">{rescheduleError}</p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={rescheduling || !rescheduleDate || !selectedTime}
                className="flex-1 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                {rescheduling ? 'Rescheduling…' : 'Confirm Reschedule'}
              </button>
              <button
                type="button"
                onClick={() => { setShowReschedule(false); setRescheduleDate(''); setRescheduleError(''); }}
                className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-400">
          Need help? Call us at{' '}
          <a href="tel:+17272335223" className="text-blue-600 hover:underline">(727) 233-5223</a>
        </p>
      </div>
    </div>
  );
}

// ── Helper sub-components ─────────────────────────────────────────────────────

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <dt className="text-gray-500 font-medium w-28 shrink-0">{label}</dt>
      <dd className="text-gray-900 text-right">{value}</dd>
    </div>
  );
}

function StatusCard({ icon, iconColor = 'text-red-500', title, message, children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className={`text-4xl mb-4 ${iconColor}`}>{icon}</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm">{message}</p>
        {children}
        <Link href="/" className="block mt-6 text-sm text-blue-600 hover:underline">Return to Homepage</Link>
      </div>
    </div>
  );
}

// ── Export with Suspense boundary (required for useSearchParams in Next.js) ───

export default function ManageBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ManageBookingInner />
    </Suspense>
  );
}
