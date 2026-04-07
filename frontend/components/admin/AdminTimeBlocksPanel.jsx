'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Ban, Trash2, Plus, Lightbulb, Loader2, Check, AlertCircle, RefreshCw, ChevronDown,
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { fetchTimeBlocks, createTimeBlock, deleteTimeBlock } from '@/lib/api';
import { generateTimeSlots, formatTimeSlot } from '@/lib/booking-constants';

const ALL_SLOTS = generateTimeSlots('08:00', '17:00', 15);

const timeToMinutes = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

function groupConsecutiveBlocks(blocks) {
  if (!blocks.length) return [];

  const allDay = blocks.filter((b) => b.block_time === null);
  const timed = blocks
    .filter((b) => b.block_time !== null)
    .sort((a, b) => a.block_time.localeCompare(b.block_time));

  const result = [];

  if (allDay.length) {
    result.push({
      label: 'All Day',
      reason: allDay[0].reason,
      ids: allDay.map((b) => b.id),
    });
  }

  if (!timed.length) return result;

  let start = timed[0];
  let end = timed[0];
  let ids = [timed[0].id];

  for (let i = 1; i < timed.length; i++) {
    const prevMin = timeToMinutes(end.block_time.slice(0, 5));
    const currMin = timeToMinutes(timed[i].block_time.slice(0, 5));
    if (currMin - prevMin === 15) {
      end = timed[i];
      ids.push(timed[i].id);
    } else {
      const startFmt = formatTimeSlot(start.block_time.slice(0, 5));
      const endFmt = formatTimeSlot(end.block_time.slice(0, 5));
      result.push({
        label: start.id === end.id ? startFmt : `${startFmt} – ${endFmt}`,
        reason: start.reason,
        ids: [...ids],
      });
      start = timed[i];
      end = timed[i];
      ids = [timed[i].id];
    }
  }

  const startFmt = formatTimeSlot(start.block_time.slice(0, 5));
  const endFmt = formatTimeSlot(end.block_time.slice(0, 5));
  result.push({
    label: start.id === end.id ? startFmt : `${startFmt} – ${endFmt}`,
    reason: start.reason,
    ids: [...ids],
  });

  return result;
}

// Custom dropdown — avoids native <select> dark-theme rendering issues
function TimeSelect({ value, onChange, options, placeholder, disabled = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 border rounded-xl px-3 py-2.5 text-sm transition-colors
          bg-white/[0.06] border-white/[0.10]
          focus:outline-none focus:ring-2 focus:ring-sunshine-blue
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-white/20'}
          ${open ? 'ring-2 ring-sunshine-blue border-sunshine-blue/60' : ''}`}
      >
        <span className={selected ? 'text-white' : 'text-white/35'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-[#1a2d42] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden">
          <div className="max-h-52 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors
                  ${opt.value === value
                    ? 'bg-sunshine-blue text-white font-medium'
                    : 'text-white/80 hover:bg-white/[0.08] hover:text-white'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminTimeBlocksPanel() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [blockDate, setBlockDate] = useState('');
  const [allDay, setAllDay] = useState(true);
  const [blockTimeFrom, setBlockTimeFrom] = useState('');
  const [blockTimeTo, setBlockTimeTo] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [creating, setCreating] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const endDate = format(addDays(new Date(), 60), 'yyyy-MM-dd');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTimeBlocks(today, endDate);
      setBlocks(data);
    } catch {
      setError('Failed to load time blocks.');
    } finally {
      setLoading(false);
    }
  }, [today, endDate]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!blockDate) { setError('Please select a date.'); return; }
    if (!allDay) {
      if (!blockTimeFrom || !blockTimeTo) {
        setError('Please select both from and to times.');
        return;
      }
      if (timeToMinutes(blockTimeFrom) >= timeToMinutes(blockTimeTo)) {
        setError('"To" time must be after "From" time.');
        return;
      }
    }

    setCreating(true);
    setError('');
    try {
      if (allDay) {
        await createTimeBlock({ block_date: blockDate, block_time: null, reason: blockReason.trim() || null });
      } else {
        const fromMin = timeToMinutes(blockTimeFrom);
        const toMin = timeToMinutes(blockTimeTo);
        const slotsToBlock = ALL_SLOTS.filter((s) => {
          const m = timeToMinutes(s);
          return m >= fromMin && m <= toMin;
        });
        for (const slot of slotsToBlock) {
          await createTimeBlock({ block_date: blockDate, block_time: slot, reason: blockReason.trim() || null });
        }
      }
      setSuccess('Time block created.');
      setTimeout(() => setSuccess(''), 3000);
      setBlockDate('');
      setBlockTimeFrom('');
      setBlockTimeTo('');
      setBlockReason('');
      setAllDay(true);
      load();
    } catch {
      setError('Failed to create time block.');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (ids) => {
    const label = ids.length > 1 ? `this time range (${ids.length} slots)` : 'this time block';
    if (!confirm(`Remove ${label}?`)) return;
    try {
      for (const id of ids) await deleteTimeBlock(id);
      setBlocks((prev) => prev.filter((b) => !ids.includes(b.id)));
    } catch {
      setError('Failed to delete time block.');
    }
  };

  const grouped = blocks.reduce((acc, block) => {
    const d = block.block_date;
    if (!acc[d]) acc[d] = [];
    acc[d].push(block);
    return acc;
  }, {});

  const inputBase = 'border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06]';

  const fromOptions = ALL_SLOTS.map((s) => ({ value: s, label: formatTimeSlot(s) }));
  const toOptions = ALL_SLOTS
    .filter((s) => !blockTimeFrom || timeToMinutes(s) > timeToMinutes(blockTimeFrom))
    .map((s) => ({ value: s, label: formatTimeSlot(s) }));

  return (
    <div className="space-y-5">
      {/* Info box */}
      <div className="flex items-start gap-3 bg-sunshine-yellow/10 border border-sunshine-yellow/20 rounded-2xl px-5 py-4">
        <Lightbulb className="w-5 h-5 text-sunshine-yellow/70 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white/60 leading-relaxed">
          Blocking a time slot prevents <strong>new bookings</strong> during that period.
          Existing appointments in that slot are <strong>not affected</strong> and must be managed separately.
        </p>
      </div>

      {/* Create block form */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm p-5">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-sunshine-blue" />
          Block a Time Slot
        </h2>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 items-end ${allDay ? 'lg:grid-cols-3' : 'lg:grid-cols-5'}`}>
          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wide">Date *</label>
            <input
              type="date"
              min={today}
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              className={`${inputBase} w-full`}
            />
          </div>

          {/* All day toggle */}
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wide">Scope</label>
            <div className="flex items-center gap-3 h-10">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => { setAllDay(!allDay); setBlockTimeFrom(''); setBlockTimeTo(''); }}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer flex-shrink-0
                    ${allDay ? 'bg-sunshine-blue' : 'bg-white/20'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
                    ${allDay ? 'translate-x-5' : 'translate-x-0.5'}`}
                  />
                </div>
                <span className="text-sm text-white font-medium">All Day</span>
              </label>
            </div>
          </div>

          {/* From / To custom dropdowns */}
          {!allDay && (
            <>
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wide">From *</label>
                <TimeSelect
                  value={blockTimeFrom}
                  onChange={(v) => { setBlockTimeFrom(v); setBlockTimeTo(''); }}
                  options={fromOptions}
                  placeholder="From time..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wide">To *</label>
                <TimeSelect
                  value={blockTimeTo}
                  onChange={setBlockTimeTo}
                  options={toOptions}
                  placeholder="To time..."
                  disabled={!blockTimeFrom}
                />
              </div>
            </>
          )}

          {/* Reason */}
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5 uppercase tracking-wide">Reason</label>
            <input
              type="text"
              placeholder="e.g. Staff training"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              maxLength={100}
              className={`${inputBase} w-full`}
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 mt-3 text-sm text-red-400 bg-red-900/30 border border-red-500/30 px-3 py-2.5 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 mt-3 text-sm text-green-400 bg-green-900/30 border border-green-500/30 px-3 py-2.5 rounded-xl">
            <Check className="w-4 h-4 flex-shrink-0" /> {success}
          </div>
        )}

        <button
          onClick={handleCreate}
          disabled={creating}
          className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto bg-sunshine-blue text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-sunshine-blue/90 disabled:opacity-60 transition-all shadow-sm"
        >
          {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban className="w-4 h-4" />}
          Block Slot
        </button>
      </div>

      {/* Existing blocks */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
          <h2 className="font-semibold text-white">Existing Blocks (next 60 days)</h2>
          <button onClick={load} className="p-1.5 rounded-xl text-white/40 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-sunshine-blue animate-spin" />
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-center text-white/30 text-sm py-10">No time blocks in the next 60 days.</p>
        ) : (
          <div className="divide-y divide-white/[0.05]">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([date, dateBlocks]) => {
                const ranges = groupConsecutiveBlocks(dateBlocks);
                return (
                  <div key={date} className="px-5 py-3">
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">{date}</p>
                    <div className="space-y-2">
                      {ranges.map((range, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-red-900/20 rounded-xl px-3 py-2 border border-red-500/20">
                          <Ban className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium text-white">{range.label}</span>
                            {range.reason && (
                              <span className="text-xs text-white/40 ml-2">— {range.reason}</span>
                            )}
                          </div>
                          <button
                            onClick={() => handleDelete(range.ids)}
                            className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-900/20 transition-colors flex-shrink-0"
                            title="Remove block"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
