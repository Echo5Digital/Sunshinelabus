'use client';

import { useState, useMemo } from 'react';
import {
  startOfMonth, endOfMonth, eachDayOfInterval,
  format, addMonths, subMonths, isWeekend,
  isBefore, addHours, isSameDay, getDay,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import { MIN_ADVANCE_HOURS } from '@/lib/booking-constants';

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function Step3Date({ bookingData, updateBookingData, onNext, onPrev, onGoToStep }) {
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const minAllowedDate = addHours(today, MIN_ADVANCE_HOURS);
  const selectedDate = bookingData.date;

  // Build the calendar grid (only Mon–Fri visible)
  const calendarDays = useMemo(() => {
    const days = eachDayOfInterval({
      start: startOfMonth(displayMonth),
      end: endOfMonth(displayMonth),
    });
    // Filter to weekdays only
    return days.filter((d) => !isWeekend(d));
  }, [displayMonth]);

  // Get the ISO week-day offset for the first weekday of the month
  // to pad the grid correctly (Mon=0, Tue=1, ..., Fri=4)
  const firstDayOffset = useMemo(() => {
    const firstWeekday = calendarDays[0];
    if (!firstWeekday) return 0;
    const day = getDay(firstWeekday); // 0=Sun,1=Mon,...,5=Fri
    return day === 0 ? 4 : day - 1; // Map to Mon=0
  }, [calendarDays]);

  // Disable a date only if its last bookable slot (16:45) is within the advance window.
  // This prevents valid dates from being greyed out just because their midnight < now+24h.
  const isPast = (date) => {
    const lastSlot = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16, 45, 0);
    return isBefore(lastSlot, minAllowedDate);
  };

  const handleSelect = (date) => {
    if (isPast(date)) return;
    updateBookingData({ date: format(date, 'yyyy-MM-dd'), timeSlot: '' });
  };

  const canGoPrev =
    displayMonth.getMonth() > today.getMonth() ||
    displayMonth.getFullYear() > today.getFullYear();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-sunshine-dark">Select a Date</h2>
        <p className="text-gray-500 text-sm mt-1">
          Appointments available Monday–Friday.
        </p>
      </div>

      {/* Calendar */}
      <div className="bg-sunshine-soft/20 rounded-2xl border border-sunshine-sky/20 shadow-sm p-4 sm:p-6">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => setDisplayMonth((m) => subMonths(m, 1))}
            disabled={!canGoPrev}
            className="p-2 rounded-xl text-gray-400 hover:text-sunshine-blue hover:bg-sunshine-soft disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-semibold text-sunshine-dark text-base">
            {format(displayMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={() => setDisplayMonth((m) => addMonths(m, 1))}
            className="p-2 rounded-xl text-gray-400 hover:text-sunshine-blue hover:bg-sunshine-soft transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-5 gap-1 mb-2">
          {WEEKDAY_LABELS.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-semibold text-sunshine-blue/70 uppercase tracking-wide py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date grid — 5 columns (Mon–Fri) */}
        <div className="grid grid-cols-5 gap-1">
          {/* Offset padding */}
          {[...Array(firstDayOffset)].map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {calendarDays.map((date) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const past = isPast(date);
            const isToday = isSameDay(date, today);
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={dateStr}
                onClick={() => handleSelect(date)}
                className={`relative aspect-square flex items-center justify-center rounded-xl text-sm font-medium
                  transition-all duration-150
                  ${past
                    ? 'text-gray-400 line-through cursor-not-allowed bg-gray-50/60'
                    : isSelected
                    ? 'bg-sunshine-blue text-white font-bold shadow-md shadow-sunshine-blue/30'
                    : isToday
                    ? 'ring-2 ring-sunshine-blue/40 text-sunshine-blue bg-white hover:bg-sunshine-soft'
                    : 'text-sunshine-dark bg-white hover:bg-sunshine-soft hover:text-sunshine-blue shadow-sm'
                  }`}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 mt-4 px-1 text-xs text-gray-400">
        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        <span>We operate Monday–Friday, 8:00 AM – 5:00 PM. Bookings require {MIN_ADVANCE_HOURS}h advance notice.</span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => {
            const { service } = bookingData;
            const locationAutoSkipped = service?.requires_address || (service && !service.allows_home_visit);
            locationAutoSkipped ? onGoToStep(1) : onPrev();
          }}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-sunshine-dark font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <ShimmerButton
          onClick={onNext}
          disabled={!selectedDate}
          className={`bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-8 py-3 rounded-full font-semibold text-sm shadow-md transition-opacity ${
            !selectedDate ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          Continue
          <ChevronRight className="w-4 h-4 ml-1" />
        </ShimmerButton>
      </div>
    </div>
  );
}
