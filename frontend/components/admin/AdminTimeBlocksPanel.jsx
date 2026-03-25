'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Ban, Trash2, Plus, Lightbulb, Loader2, Check, AlertCircle, RefreshCw,
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import { fetchTimeBlocks, createTimeBlock, deleteTimeBlock } from '@/lib/api';
import { generateTimeSlots, formatTimeSlot } from '@/lib/booking-constants';

const ALL_SLOTS = generateTimeSlots('08:00', '17:00', 15);

export default function AdminTimeBlocksPanel() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Create form state
  const [blockDate, setBlockDate] = useState('');
  const [allDay, setAllDay] = useState(true);
  const [blockTime, setBlockTime] = useState('');
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
    if (!blockDate) {
      setError('Please select a date.');
      return;
    }
    if (!allDay && !blockTime) {
      setError('Please select a time or enable All Day.');
      return;
    }

    setCreating(true);
    setError('');
    try {
      await createTimeBlock({
        block_date: blockDate,
        block_time: allDay ? null : blockTime,
        reason: blockReason.trim() || null,
      });
      setSuccess('Time block created.');
      setTimeout(() => setSuccess(''), 3000);
      setBlockDate('');
      setBlockTime('');
      setBlockReason('');
      setAllDay(true);
      load();
    } catch {
      setError('Failed to create time block.');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this time block?')) return;
    try {
      await deleteTimeBlock(id);
      setBlocks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError('Failed to delete time block.');
    }
  };

  // Group blocks by date
  const grouped = blocks.reduce((acc, block) => {
    const d = block.block_date;
    if (!acc[d]) acc[d] = [];
    acc[d].push(block);
    return acc;
  }, {});

  const inputBase = 'border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-sunshine-dark focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white';

  return (
    <div className="space-y-5">
      {/* Info box */}
      <div className="flex items-start gap-3 bg-sunshine-yellow/15 border border-sunshine-yellow/30 rounded-2xl px-5 py-4">
        <Lightbulb className="w-5 h-5 text-sunshine-dark/70 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-sunshine-dark/70 leading-relaxed">
          Blocking a time slot prevents <strong>new bookings</strong> during that period.
          Existing appointments in that slot are <strong>not affected</strong> and must be managed separately.
        </p>
      </div>

      {/* Create block form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-sunshine-dark mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-sunshine-blue" />
          Block a Time Slot
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Date *</label>
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
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Scope</label>
            <div className="flex items-center gap-3 h-10">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setAllDay(!allDay)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer flex-shrink-0
                    ${allDay ? 'bg-sunshine-blue' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform
                    ${allDay ? 'translate-x-5' : 'translate-x-0.5'}`}
                  />
                </div>
                <span className="text-sm text-sunshine-dark font-medium">All Day</span>
              </label>
            </div>
          </div>

          {/* Specific time */}
          {!allDay && (
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Time *</label>
              <select
                value={blockTime}
                onChange={(e) => setBlockTime(e.target.value)}
                className={`${inputBase} w-full`}
              >
                <option value="">Select time...</option>
                {ALL_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{formatTimeSlot(slot)}</option>
                ))}
              </select>
            </div>
          )}

          {/* Reason */}
          <div className={!allDay ? '' : 'sm:col-span-1'}>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Reason</label>
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
          <div className="flex items-center gap-2 mt-3 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2.5 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 mt-3 text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2.5 rounded-xl">
            <Check className="w-4 h-4 flex-shrink-0" /> {success}
          </div>
        )}

        <button
          onClick={handleCreate}
          disabled={creating}
          className="mt-4 flex items-center gap-2 bg-sunshine-blue text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-sunshine-blue/90 disabled:opacity-60 transition-all shadow-sm"
        >
          {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban className="w-4 h-4" />}
          Block Slot
        </button>
      </div>

      {/* Existing blocks */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-sunshine-dark">Existing Blocks (next 60 days)</h2>
          <button onClick={load} className="p-1.5 rounded-xl text-gray-400 hover:text-sunshine-blue hover:bg-sunshine-soft transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-sunshine-blue animate-spin" />
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">No time blocks in the next 60 days.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([date, dateBlocks]) => (
                <div key={date} className="px-5 py-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{date}</p>
                  <div className="space-y-2">
                    {dateBlocks.map((block) => (
                      <div key={block.id} className="flex items-center gap-3 bg-red-50/60 rounded-xl px-3 py-2 border border-red-100">
                        <Ban className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium text-sunshine-dark">
                            {block.block_time ? formatTimeSlot(block.block_time.slice(0, 5)) : 'All Day'}
                          </span>
                          {block.reason && (
                            <span className="text-xs text-gray-500 ml-2">— {block.reason}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(block.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                          title="Remove block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
