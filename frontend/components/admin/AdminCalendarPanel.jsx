'use client';

import { useState, useEffect } from 'react';
import { format, addDays, subDays, isToday, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Lock, Loader2 } from 'lucide-react';
import { fetchCalendarDay } from '@/lib/api';
import { STATUS_CONFIG, formatTimeSlot } from '@/lib/booking-constants';
import AppointmentDetailModal from './AppointmentDetailModal';

// Business hours grid: 8 AM – 5 PM, 30-min rows = 18 rows
const GRID_ROWS = 18;
const GRID_START_HOUR = 8;
const ROW_HEIGHT_PX = 52; // px per 30-min row

function timeToGridOffset(timeStr) {
  // '08:30' → row index (0 = 8:00 AM)
  const [h, m] = timeStr.slice(0, 5).split(':').map(Number);
  return (h - GRID_START_HOUR) * 2 + (m >= 30 ? 1 : 0);
}

function durationToRows(minutes) {
  return Math.max(1, Math.ceil(minutes / 30));
}

function timeLabel(hour, half) {
  const h = hour;
  const m = half ? '30' : '00';
  const period = h >= 12 ? 'PM' : 'AM';
  const display = h % 12 || 12;
  return `${display}:${m} ${period}`;
}

const STATUS_COLORS = {
  booked: 'bg-sunshine-blue/10 border-sunshine-blue text-sunshine-dark',
  confirmed: 'bg-green-50 border-green-500 text-green-800',
  checked_in: 'bg-sunshine-yellow/20 border-sunshine-yellow text-sunshine-dark',
  completed: 'bg-emerald-50 border-emerald-500 text-emerald-800',
  no_show: 'bg-red-50/60 border-red-300 text-red-700 opacity-60',
  cancelled: 'bg-gray-50 border-gray-300 text-gray-400 opacity-50',
};

export default function AdminCalendarPanel() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState({ appointments: [], timeBlocks: [] });
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const dateStr = format(currentDate, 'yyyy-MM-dd');

  useEffect(() => {
    setLoading(true);
    fetchCalendarDay(dateStr)
      .then(setData)
      .catch(() => setData({ appointments: [], timeBlocks: [] }))
      .finally(() => setLoading(false));
  }, [dateStr]);

  const formattedDateLabel = format(currentDate, 'EEEE, MMMM d, yyyy');

  return (
    <div className="space-y-4">
      {/* Date navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentDate((d) => subDays(d, 1))}
          className="p-2 rounded-xl text-gray-400 hover:text-sunshine-blue hover:bg-sunshine-soft transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <p className="font-semibold text-sunshine-dark">{formattedDateLabel}</p>
          {isToday(currentDate) && (
            <span className="text-xs bg-sunshine-blue/10 text-sunshine-blue font-semibold px-2 py-0.5 rounded-full">Today</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="text-xs text-sunshine-blue font-semibold hover:underline"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate((d) => addDays(d, 1))}
            className="p-2 rounded-xl text-gray-400 hover:text-sunshine-blue hover:bg-sunshine-soft transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Time grid */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 text-sunshine-blue animate-spin" />
          </div>
        ) : (
          <div className="flex overflow-x-auto">
            {/* Time labels */}
            <div className="flex-shrink-0 w-20 border-r border-gray-100">
              <div className="h-10 border-b border-gray-100" />
              {Array.from({ length: GRID_ROWS }).map((_, i) => {
                const hour = GRID_START_HOUR + Math.floor(i / 2);
                const half = i % 2 === 1;
                return (
                  <div
                    key={i}
                    style={{ height: ROW_HEIGHT_PX }}
                    className={`flex items-start justify-end pr-3 pt-1.5 ${
                      !half ? 'border-t border-gray-100' : 'border-t border-gray-50'
                    }`}
                  >
                    {!half && (
                      <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                        {timeLabel(hour, false)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Appointments column */}
            <div className="flex-1 min-w-[220px] relative">
              {/* Header */}
              <div className="h-10 border-b border-gray-100 flex items-center px-4">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {data.appointments.length} appointment{data.appointments.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Grid lines */}
              <div className="relative" style={{ height: GRID_ROWS * ROW_HEIGHT_PX }}>
                {Array.from({ length: GRID_ROWS }).map((_, i) => (
                  <div
                    key={i}
                    style={{ top: i * ROW_HEIGHT_PX, height: ROW_HEIGHT_PX }}
                    className={`absolute inset-x-0 ${
                      i % 2 === 0 ? 'border-t border-gray-100' : 'border-t border-gray-50'
                    }`}
                  />
                ))}

                {/* Time blocks */}
                {data.timeBlocks
                  .filter((b) => b.block_time)
                  .map((block) => {
                    const row = timeToGridOffset(block.block_time);
                    if (row < 0 || row >= GRID_ROWS) return null;
                    return (
                      <div
                        key={block.id}
                        style={{ top: row * ROW_HEIGHT_PX + 2, height: ROW_HEIGHT_PX - 4, left: 8, right: 8 }}
                        className="absolute rounded-xl bg-red-50 border-l-4 border-red-400 px-3 flex items-center gap-2 opacity-80"
                      >
                        <Lock className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span className="text-xs text-red-600 font-medium truncate">
                          {block.reason || 'Blocked'}
                        </span>
                      </div>
                    );
                  })}

                {/* Appointments */}
                {data.appointments.map((appt) => {
                  const row = timeToGridOffset(appt.appointment_time);
                  const rows = durationToRows(appt.services?.duration_minutes || 30);
                  if (row < 0 || row >= GRID_ROWS) return null;
                  const colorClass = STATUS_COLORS[appt.status] || STATUS_COLORS.booked;

                  return (
                    <button
                      key={appt.id}
                      onClick={() => setSelectedId(appt.id)}
                      style={{
                        top: row * ROW_HEIGHT_PX + 2,
                        height: rows * ROW_HEIGHT_PX - 4,
                        left: 8,
                        right: 8,
                      }}
                      className={`absolute rounded-xl border-l-4 px-3 py-1.5 text-left hover:brightness-95 transition-all ${colorClass}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate leading-tight">
                            {appt.patient_name}
                          </p>
                          <p className="text-[11px] opacity-70 truncate leading-tight">
                            {appt.services?.name}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold flex-shrink-0 opacity-70">
                          {appt.appointment_time?.slice(0, 5)}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {data.appointments.length === 0 && data.timeBlocks.filter(b => b.block_time).length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-300 text-sm">No appointments scheduled</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <AppointmentDetailModal
        appointmentId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
