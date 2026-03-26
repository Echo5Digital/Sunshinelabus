'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  startOfMonth, endOfMonth, eachDayOfInterval,
  format, addMonths, subMonths, isWeekend,
  isBefore, addHours, isSameDay, getDay,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import { MIN_ADVANCE_HOURS } from '@/lib/booking-constants';
import { fetchDateBlocks } from '@/lib/api';

const ALL_DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Step3Date({ bookingData, updateBookingData, onNext, onPrev, onGoToStep }) {
  const today = new Date();
  const [displayMonth, setDisplayMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const minAllowedDate = addHours(today, MIN_ADVANCE_HOURS);
  const selectedDate = bookingData.date;
  const [fullyBlockedDates, setFullyBlockedDates] = useState(new Set());

  useEffect(() => {
    const start = format(startOfMonth(displayMonth), 'yyyy-MM-dd');
    const end = format(endOfMonth(displayMonth), 'yyyy-MM-dd');
    fetchDateBlocks(start, end)
      .then((data) => setFullyBlockedDates(new Set(data.fullyBlocked || [])))
      .catch(() => {});
  }, [displayMonth]);

  // Build the calendar grid (all days Mon–Sun)
  const calendarDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(displayMonth),
      end: endOfMonth(displayMonth),
    });
  }, [displayMonth]);

  // Get the offset for the first day of the month in a Mon-first 7-col grid
  // Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
  const firstDayOffset = useMemo(() => {
    const firstDay = calendarDays[0];
    if (!firstDay) return 0;
    const day = getDay(firstDay); // 0=Sun,1=Mon,...,6=Sat
    return day === 0 ? 6 : day - 1;
  }, [calendarDays]);

  // Disable a date only if its last bookable slot (16:45) is within the advance window.
  // This prevents valid dates from being greyed out just because their midnight < now+24h.
  const isPast = (date) => {
    const lastSlot = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16, 45, 0);
    return isBefore(lastSlot, minAllowedDate);
  };

  const handleSelect = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (isPast(date) || isWeekend(date) || fullyBlockedDates.has(dateStr)) return;
    updateBookingData({ date: dateStr, timeSlot: '' });
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

        {/* Day header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {ALL_DAY_LABELS.map((d) => (
            <div
              key={d}
              className={`text-center text-xs font-semibold uppercase tracking-wide py-1 ${
                d === 'Sat' || d === 'Sun'
                  ? 'text-gray-300'
                  : 'text-sunshine-blue/70'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date grid — 7 columns (Mon–Sun) */}
        <div className="grid grid-cols-7 gap-1">
          {/* Offset padding */}
          {[...Array(firstDayOffset)].map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {calendarDays.map((date) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const weekend = isWeekend(date);
            const past = isPast(date);
            const isBlocked = !past && !weekend && fullyBlockedDates.has(dateStr);
            const isDisabled = past || isBlocked || weekend;
            const isToday = isSameDay(date, today);
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={dateStr}
                onClick={() => handleSelect(date)}
                disabled={isDisabled}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium
                  transition-all duration-150
                  ${weekend
                    ? 'text-gray-300 cursor-not-allowed bg-gray-50/40'
                    : past
                    ? 'text-gray-400 line-through cursor-not-allowed bg-gray-50/60'
                    : isBlocked
                    ? 'text-gray-400 cursor-not-allowed bg-gray-50/60'
                    : isSelected
                    ? 'bg-sunshine-blue text-white font-bold shadow-md shadow-sunshine-blue/30'
                    : isToday
                    ? 'ring-2 ring-sunshine-blue/40 text-sunshine-blue bg-white hover:bg-sunshine-soft'
                    : 'text-sunshine-dark bg-white hover:bg-sunshine-soft hover:text-sunshine-blue shadow-sm'
                  }`}
              >
                <span>{format(date, 'd')}</span>
                {isBlocked && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-0.5" />
                )}
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
      <div className="flex items-center gap-1.5 mt-2 px-1 text-xs text-gray-400">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block flex-shrink-0" />
        <span>Dates marked with a red dot are fully unavailable.</span>
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
