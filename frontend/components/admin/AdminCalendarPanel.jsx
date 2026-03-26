'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isSameDay,
  parseISO,
} from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  Lock,
  X,
  CalendarDays,
} from 'lucide-react';
import { fetchCalendarRange, fetchCalendarDay } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';
import AppointmentDetailModal from './AppointmentDetailModal';

// ── Status dot colors (hex — use style prop to avoid Tailwind purging) ─────────
const STATUS_DOT_COLORS = {
  booked:     '#2B7DBF',  // sunshine-blue
  confirmed:  '#22c55e',  // green-500
  checked_in: '#FFC72C',  // sunshine-yellow
  completed:  '#10b981',  // emerald-500
  no_show:    '#ef4444',  // red-500
  cancelled:  '#9ca3af',  // gray-400
};

const STATUS_ORDER = ['booked', 'confirmed', 'checked_in', 'completed', 'no_show', 'cancelled'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildMonthDays(month) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 });
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

function getDotsForDate(statuses = []) {
  const unique = [...new Set(statuses)].sort(
    (a, b) => STATUS_ORDER.indexOf(a) - STATUS_ORDER.indexOf(b)
  );
  return unique.slice(0, 4);
}

function buildDotMap(appointments) {
  return appointments.reduce((map, a) => {
    if (!map[a.appointment_date]) map[a.appointment_date] = [];
    map[a.appointment_date].push(a.status);
    return map;
  }, {});
}

function formatMonthTitle(base, second) {
  const baseYear   = format(base,   'yyyy');
  const secondYear = format(second, 'yyyy');
  if (baseYear === secondYear) {
    return `${format(base, 'MMMM')} – ${format(second, 'MMMM yyyy')}`;
  }
  return `${format(base, 'MMMM yyyy')} – ${format(second, 'MMMM yyyy')}`;
}

function formatMonthTitleShort(base, second) {
  const baseYear   = format(base,   'yy');
  const secondYear = format(second, 'yy');
  if (baseYear === secondYear) {
    return `${format(base, 'MMM')} – ${format(second, "MMM ''yy")}`;
  }
  return `${format(base, "MMM ''yy")} – ${format(second, "MMM ''yy")}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CalendarHeader({ baseMonth, secondMonth, onPrev, onNext }) {
  return (
    <div className="bg-gradient-to-r from-sunshine-dark to-[#2B7DBF] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <button
          onClick={onPrev}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous months"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          {/* Full title — hidden on xs */}
          <p className="hidden sm:block font-semibold text-white text-base">
            {formatMonthTitle(baseMonth, secondMonth)}
          </p>
          {/* Short title — visible on xs only */}
          <p className="sm:hidden font-semibold text-white text-sm">
            {formatMonthTitleShort(baseMonth, secondMonth)}
          </p>
          <p className="text-white/60 text-xs mt-0.5">
            {data_note(baseMonth, secondMonth)}
          </p>
        </div>

        <button
          onClick={onNext}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next months"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function data_note(base, second) {
  const now = new Date();
  const baseYear  = base.getFullYear();
  const baseMonth = base.getMonth();
  if (baseYear === now.getFullYear() && baseMonth === now.getMonth()) {
    return 'Current & next month';
  }
  return `${format(base, 'MMM')} – ${format(second, 'MMM')} view`;
}

function DayCell({ date, isCurrentMonth, dotMap, isSelected, isLoading, onClick }) {
  const dateStr = format(date, 'yyyy-MM-dd');
  const today   = isToday(date);
  const dots    = isCurrentMonth ? getDotsForDate(dotMap[dateStr]) : [];

  if (!isCurrentMonth) {
    return (
      <div className="flex flex-col items-center py-1.5 px-1 min-h-[52px]">
        <span className="text-sm text-white/15">{format(date, 'd')}</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => onClick(dateStr)}
      className={`flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl min-h-[52px] w-full transition-colors
        ${isSelected
          ? 'bg-sunshine-blue/15 ring-2 ring-sunshine-blue ring-inset'
          : 'hover:bg-white/[0.06]'
        }`}
    >
      <span
        className={`flex items-center justify-center w-7 h-7 text-sm rounded-full font-medium leading-none
          ${today
            ? 'bg-sunshine-blue text-white font-bold'
            : 'text-white'
          }`}
      >
        {format(date, 'd')}
      </span>

      <div className="flex items-center gap-0.5 flex-wrap justify-center min-h-[8px]">
        {isLoading ? (
          <div className="w-6 h-1.5 bg-white/[0.10] rounded-full animate-pulse" />
        ) : (
          dots.map((status, i) => (
            <span
              key={i}
              style={{ backgroundColor: STATUS_DOT_COLORS[status] }}
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            />
          ))
        )}
      </div>
    </button>
  );
}

function MonthGrid({ month, dotMap, selectedDate, onDayClick, rangeLoading }) {
  const days = buildMonthDays(month);

  return (
    <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
      {/* Month name header */}
      <div className="bg-white/[0.06] px-4 py-3 text-center border-b border-white/[0.06]">
        <h3 className="font-bold text-white text-sm tracking-wide">
          {format(month, 'MMMM yyyy')}
        </h3>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-white/[0.04] border-b border-white/[0.04]">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center py-2">
            <span className="text-[11px] font-semibold text-sunshine-sky/60 uppercase tracking-wide">
              {d}
            </span>
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5 p-3">
        {days.map((date, i) => (
          <DayCell
            key={i}
            date={date}
            isCurrentMonth={isSameMonth(date, month)}
            dotMap={dotMap}
            isSelected={selectedDate === format(date, 'yyyy-MM-dd') && isSameMonth(date, month)}
            isLoading={rangeLoading}
            onClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
}

function StatusLegend() {
  return (
    <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm px-5 py-4">
      <p className="text-[11px] font-semibold text-white/35 uppercase tracking-wide mb-2.5">
        Appointment Status
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        {Object.entries(STATUS_DOT_COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span
              style={{ backgroundColor: color }}
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
            />
            <span className="text-xs text-white/55 font-medium">
              {STATUS_CONFIG[status]?.label ?? status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DayDetailPanel({ date, dayData, dayLoading, onClose, onAppointmentClick }) {
  const parsed = parseISO(date);
  const today  = isToday(parsed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e2d42] to-[#1a2535] px-5 py-4 flex items-center justify-between border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sunshine-blue/20 flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-sunshine-sky" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">
              {format(parsed, 'EEEE, MMMM d')}
            </p>
            <p className="text-xs text-white/35">{format(parsed, 'yyyy')}</p>
          </div>
          {today && (
            <span className="bg-sunshine-blue text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Time blocks */}
      {!dayLoading && dayData.timeBlocks && dayData.timeBlocks.length > 0 && (
        <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2 border-b border-white/[0.07]">
          {dayData.timeBlocks.map((block) => (
            <div
              key={block.id}
              className="bg-red-900/25 border border-red-500/25 text-red-400 text-xs font-medium
                         px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <Lock className="w-3 h-3 flex-shrink-0" />
              {block.block_time
                ? `${block.block_time.slice(0, 5)} — ${block.reason || 'Blocked'}`
                : block.reason || 'All day blocked'}
            </div>
          ))}
        </div>
      )}

      {/* Body */}
      {dayLoading ? (
        <div className="p-4 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 bg-white/[0.07] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : dayData.appointments.length === 0 ? (
        <div className="py-12 text-center">
          <CalendarDays className="w-10 h-10 text-white/10 mx-auto mb-2" />
          <p className="text-white/30 text-sm">No appointments on this date</p>
        </div>
      ) : (
        <div>
          <div className="px-4 pt-3 pb-1">
            <p className="text-[11px] font-semibold text-white/35 uppercase tracking-wide">
              {dayData.appointments.length} appointment{dayData.appointments.length !== 1 ? 's' : ''}
            </p>
          </div>
          {dayData.appointments.map((appt) => (
            <button
              key={appt.id}
              onClick={() => onAppointmentClick(appt.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5
                         hover:bg-white/[0.04] transition-colors text-left
                         border-b border-white/[0.05] last:border-b-0"
            >
              <span
                style={{ backgroundColor: STATUS_DOT_COLORS[appt.status] || '#9ca3af' }}
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {appt.patient_name}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {appt.services?.name}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-mono bg-sunshine-blue/20 text-sunshine-sky
                                 px-2 py-1 rounded-lg font-semibold">
                  {appt.appointment_time?.slice(0, 5)}
                </span>
                <div className="p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors">
                  <Eye className="w-4 h-4 text-white/50" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Main Panel ────────────────────────────────────────────────────────────────

export default function AdminCalendarPanel() {
  const [monthOffset, setMonthOffset]                   = useState(0);
  const [dotMap, setDotMap]                             = useState({});
  const [rangeLoading, setRangeLoading]                 = useState(true);
  const [selectedDate, setSelectedDate]                 = useState(null);
  const [dayData, setDayData]                           = useState({ appointments: [], timeBlocks: [] });
  const [dayLoading, setDayLoading]                     = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Derived: two visible months
  const baseMonth   = useMemo(
    () => addMonths(startOfMonth(new Date()), monthOffset * 2),
    [monthOffset]
  );
  const secondMonth = useMemo(() => addMonths(baseMonth, 1), [baseMonth]);
  const rangeStart  = useMemo(() => format(baseMonth,   'yyyy-MM-dd'), [baseMonth]);
  const rangeEnd    = useMemo(() => format(endOfMonth(secondMonth), 'yyyy-MM-dd'), [secondMonth]);

  // Fetch dot data for the visible 2-month window
  useEffect(() => {
    setRangeLoading(true);
    fetchCalendarRange(rangeStart, rangeEnd)
      .then(({ appointments }) => setDotMap(buildDotMap(appointments)))
      .catch(() => setDotMap({}))
      .finally(() => setRangeLoading(false));
  }, [rangeStart, rangeEnd]);

  // Fetch day detail when a date is selected
  useEffect(() => {
    if (!selectedDate) return;
    setDayLoading(true);
    fetchCalendarDay(selectedDate)
      .then(setDayData)
      .catch(() => setDayData({ appointments: [], timeBlocks: [] }))
      .finally(() => setDayLoading(false));
  }, [selectedDate]);

  const handleDayClick = (dateStr) => {
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
  };

  return (
    <div className="space-y-4">
      {/* Gradient header with navigation */}
      <CalendarHeader
        baseMonth={baseMonth}
        secondMonth={secondMonth}
        onPrev={() => { setMonthOffset((o) => o - 1); setSelectedDate(null); }}
        onNext={() => { setMonthOffset((o) => o + 1); setSelectedDate(null); }}
      />

      {/* Two-calendar grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MonthGrid
          month={baseMonth}
          dotMap={dotMap}
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
          rangeLoading={rangeLoading}
        />
        <MonthGrid
          month={secondMonth}
          dotMap={dotMap}
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
          rangeLoading={rangeLoading}
        />
      </div>

      {/* Status legend */}
      <StatusLegend />

      {/* Day detail panel */}
      <AnimatePresence>
        {selectedDate && (
          <DayDetailPanel
            key={selectedDate}
            date={selectedDate}
            dayData={dayData}
            dayLoading={dayLoading}
            onClose={() => setSelectedDate(null)}
            onAppointmentClick={setSelectedAppointmentId}
          />
        )}
      </AnimatePresence>

      {/* Appointment detail modal */}
      <AppointmentDetailModal
        appointmentId={selectedAppointmentId}
        onClose={() => setSelectedAppointmentId(null)}
      />
    </div>
  );
}
