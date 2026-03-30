'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarX, RefreshCw, Clock, Lock } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fetchAvailability } from '@/lib/api';
import { formatTimeSlot, generateTimeSlots } from '@/lib/booking-constants';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

function TimeSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="h-10 rounded-xl bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

export default function Step4Time({ bookingData, updateBookingData, onNext, onPrev }) {
  const { date, timeSlot } = bookingData;
  const [slots, setSlots] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    setMessage('');
    try {
      const data = await fetchAvailability(date);
      setSlots(data.slots || []);
      setBlockedSlots(data.blockedSlots || []);
      if (data.message) setMessage(data.message);
    } catch {
      setError('Could not load available times. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!date) return;
    load();
  }, [date]); // eslint-disable-line react-hooks/exhaustive-deps

  const formattedDate = date
    ? format(parseISO(date), 'EEEE, MMMM d, yyyy')
    : '';

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sunshine-dark">Select a Time</h2>
        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-sunshine-blue" />
          {formattedDate}
        </p>
      </div>

      {loading && <TimeSkeleton />}

      {!loading && error && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={load}
            className="flex items-center gap-2 text-sunshine-blue text-sm font-medium hover:underline"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {!loading && !error && message && slots.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <CalendarX className="w-12 h-12 text-gray-300" />
          <p className="text-gray-600 font-medium">{message}</p>
          <p className="text-gray-400 text-sm">Please go back and choose a different date.</p>
          <button
            onClick={onPrev}
            className="text-sunshine-blue text-sm font-medium hover:underline mt-1"
          >
            ← Choose another date
          </button>
        </div>
      )}

      {!loading && !error && (slots.length > 0 || blockedSlots.length > 0) && (
        <>
          {(() => {
            const ALL_SLOTS = generateTimeSlots('08:00', '17:00', 15);
            const availableSet = new Set(slots);
            const blockedSet = new Set(blockedSlots);
            const displaySlots = ALL_SLOTS.filter((s) => availableSet.has(s) || blockedSet.has(s));
            return (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {displaySlots.map((slot) => {
                  const isSelected = timeSlot === slot;
                  const isBlockedSlot = blockedSet.has(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => !isBlockedSlot && updateBookingData({ timeSlot: slot })}
                      disabled={isBlockedSlot}
                      className={`py-2.5 sm:py-3 px-1 rounded-xl text-sm font-medium border-2 transition-all duration-150
                        ${isBlockedSlot
                          ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-sunshine-blue border-sunshine-blue text-white shadow-md shadow-sunshine-blue/25'
                          : 'border-sunshine-sky/30 text-sunshine-dark hover:border-sunshine-blue hover:bg-sunshine-soft hover:text-sunshine-blue'
                        }`}
                    >
                      <span className="flex items-center justify-center gap-1">
                        {formatTimeSlot(slot)}
                        {isBlockedSlot && <Lock className="w-3 h-3 opacity-60" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })()}
          <p className="text-xs text-gray-400 mt-3">
            {slots.length} time slot{slots.length !== 1 ? 's' : ''} available
          </p>
        </>
      )}

      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          onClick={onPrev}
          className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 hover:text-sunshine-dark font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <ShimmerButton
          onClick={onNext}
          disabled={!timeSlot}
          className={`w-full sm:w-auto bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md transition-opacity ${
            !timeSlot ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-1" />
        </ShimmerButton>
      </div>
    </div>
  );
}
