'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarX, RefreshCw, Clock, Lock, Info, Moon, Sun } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fetchAvailability } from '@/lib/api';
import {
  formatTimeSlot, generateTimeSlots,
  EARLY_AM_START, EARLY_AM_END, EARLY_AM_INTERVAL, EXPANSION_MORNING_START,
  LOCATION_ZONES,
} from '@/lib/booking-constants';
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

const HOME_DRAW_MIN = 9 * 60;  // 09:00
const HOME_DRAW_MAX = 12 * 60; // 12:00 (inclusive)

const BUSINESS_START = '08:00';
const BUSINESS_END = '14:15';
const BUSINESS_INTERVAL = 15;

function TimeGrid({ slots, availableSet, blockedSet, timeSlot, onSelect, isTimeRestricted }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {slots.map((slot) => {
        const isSelected = timeSlot === slot;
        const isBlockedSlot = blockedSet.has(slot);
        const isRestrictedSlot = isTimeRestricted ? isTimeRestricted(slot) : false;
        const isDisabled = isBlockedSlot || isRestrictedSlot;
        return (
          <button
            key={slot}
            onClick={() => !isDisabled && onSelect(slot)}
            disabled={isDisabled}
            className={`py-2.5 sm:py-3 px-1 rounded-xl text-sm font-medium border-2 transition-all duration-150
              ${isBlockedSlot
                ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed'
                : isRestrictedSlot
                ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
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
}

export default function Step4Time({ bookingData, updateBookingData, onNext, onPrev }) {
  const { date, timeSlot, locationType, locationZone } = bookingData;
  const isHomeDraw = bookingData?.service?.slug === 'home-draw';
  const isExpansionArea = locationType === 'home_visit' && LOCATION_ZONES[locationZone]?.expansion;

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

  const availableSet = new Set(slots);
  const blockedSet = new Set(blockedSlots);

  const isTimeRestricted = (slot) => {
    if (!isHomeDraw) return false;
    const [h, m] = slot.split(':').map(Number);
    const total = h * 60 + m;
    return total < HOME_DRAW_MIN || total > HOME_DRAW_MAX;
  };

  const BUSINESS_SLOTS = generateTimeSlots(BUSINESS_START, BUSINESS_END, BUSINESS_INTERVAL)
    .filter((s) => availableSet.has(s) || blockedSet.has(s));

  const EARLY_AM_SLOTS = generateTimeSlots(EARLY_AM_START, EARLY_AM_END, EARLY_AM_INTERVAL)
    .filter((s) => availableSet.has(s) || blockedSet.has(s));

  // Expansion areas' Morning Block starts at 9:00 AM (not 8:00) to allow the
  // phlebotomist travel time after the Early Morning Block.
  const EXPANSION_MORNING_SLOTS = generateTimeSlots(EXPANSION_MORNING_START, BUSINESS_END, BUSINESS_INTERVAL)
    .filter((s) => availableSet.has(s) || blockedSet.has(s));

  const hasSlotsToShow = isExpansionArea
    ? (EARLY_AM_SLOTS.length > 0 || EXPANSION_MORNING_SLOTS.length > 0)
    : BUSINESS_SLOTS.length > 0;

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

      {!loading && !error && message && !hasSlotsToShow && (
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

      {!loading && !error && hasSlotsToShow && (
        <>
          {isHomeDraw && !isExpansionArea && (
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4">
              <Info className="w-4 h-4 text-sunshine-blue mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Online appointments are available from 9:00 AM to 12:00 PM. For appointments outside these hours or special home visit arrangements, please call our office directly.
              </p>
            </div>
          )}

          {isExpansionArea && (
            <div className="flex items-start gap-2.5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4">
              <Info className="w-4 h-4 text-sunshine-blue mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Early morning appointments (3:00–7:30 AM) are ideal for fasting blood work before your workday. Morning appointments (9:00 AM–2:30 PM) are available for all services. Phlebotomist travels to your home — please allow a 15-minute arrival window.
              </p>
            </div>
          )}

          {isExpansionArea ? (
            <div className="space-y-4">
              {/* Early morning block */}
              <div className="rounded-2xl border-2 border-sunshine-sky/20 bg-sunshine-soft/10 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="w-4 h-4 text-sunshine-blue" />
                  <h3 className="text-sm font-bold text-sunshine-dark uppercase tracking-wide">Early Morning Block</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">Ideal for fasting blood work before work</p>
                {EARLY_AM_SLOTS.length > 0 ? (
                  <TimeGrid
                    slots={EARLY_AM_SLOTS}
                    availableSet={availableSet}
                    blockedSet={blockedSet}
                    timeSlot={timeSlot}
                    onSelect={(slot) => updateBookingData({ timeSlot: slot })}
                  />
                ) : (
                  <p className="text-xs text-gray-400">No early morning slots available for this date.</p>
                )}
              </div>

              {/* Gap divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">7:30 AM – 9:00 AM Not Available</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Morning block */}
              <div className="rounded-2xl border-2 border-sunshine-sky/20 bg-sunshine-soft/10 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4 text-sunshine-blue" />
                  <h3 className="text-sm font-bold text-sunshine-dark uppercase tracking-wide">Morning Block</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">Available for all services</p>
                {EXPANSION_MORNING_SLOTS.length > 0 ? (
                  <TimeGrid
                    slots={EXPANSION_MORNING_SLOTS}
                    availableSet={availableSet}
                    blockedSet={blockedSet}
                    timeSlot={timeSlot}
                    onSelect={(slot) => updateBookingData({ timeSlot: slot })}
                  />
                ) : (
                  <p className="text-xs text-gray-400">No morning slots available for this date.</p>
                )}
              </div>
            </div>
          ) : (
            <TimeGrid
              slots={BUSINESS_SLOTS}
              availableSet={availableSet}
              blockedSet={blockedSet}
              timeSlot={timeSlot}
              onSelect={(slot) => updateBookingData({ timeSlot: slot })}
              isTimeRestricted={isTimeRestricted}
            />
          )}

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
