'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, X, ChevronLeft, ChevronRight, Eye,
  RefreshCw, AlertCircle, MapPin, Pencil, Trash2, Loader2,
  CalendarDays, Calendar, Clock, ChevronDown, ChevronUp,
} from 'lucide-react';
import { fetchAdminAppointments, updateAppointmentStatus, deleteAppointment } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';
import AppointmentDetailModal from './AppointmentDetailModal';
import AppointmentEditModal from './AppointmentEditModal';

const PAGE_SIZE = 20;

// ── Helpers ───────────────────────────────────────────────────────────────────

function getWeekRange() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const diffToMon = (day === 0 ? -6 : 1 - day);
  const mon = new Date(now);
  mon.setDate(now.getDate() + diffToMon);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const fmt = (d) => d.toISOString().slice(0, 10);
  return { weekStart: fmt(mon), weekEnd: fmt(sun) };
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { label: status, color: 'gray' };
  const colorMap = {
    scheduled: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    confirmed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    completed: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
    no_show: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    rescheduled: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${colorMap[status] || 'bg-white/10 text-white/60 border-white/10'}`}>
      {cfg.label || status}
    </span>
  );
}

// ── Week Section ───────────────────────────────────────────────────────────────

function WeekAppointments({ onView, onEdit, onDelete }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const { weekStart, weekEnd } = getWeekRange();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all appts for the week by iterating Mon–Sun as date filters
      // The API supports `date` filter; we fetch a large window using start_date/end_date if available,
      // otherwise we use a high limit and filter client-side by week range.
      const data = await fetchAdminAppointments({
        limit: 200,
        offset: 0,
        start_date: weekStart,
        end_date: weekEnd,
      });
      const all = data.data || [];
      // Client-side guard: keep only this week's dates
      const filtered = all.filter((a) => {
        const d = a.appointment_date;
        return d >= weekStart && d <= weekEnd;
      });
      // Sort by date then time
      filtered.sort((a, b) => {
        const dc = a.appointment_date.localeCompare(b.appointment_date);
        if (dc !== 0) return dc;
        return (a.appointment_time || '').localeCompare(b.appointment_time || '');
      });
      setAppointments(filtered);
    } catch {
      setError('Failed to load this week\'s appointments.');
    } finally {
      setLoading(false);
    }
  }, [weekStart, weekEnd]);

  useEffect(() => { load(); }, [load]);

  // Group by date
  const grouped = appointments.reduce((acc, appt) => {
    const d = appt.appointment_date;
    if (!acc[d]) acc[d] = [];
    acc[d].push(appt);
    return acc;
  }, {});
  const dates = Object.keys(grouped).sort();

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-sunshine-blue/20">
            <CalendarDays className="w-4 h-4 text-sunshine-sky" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">This Week&apos;s Bookings</h2>
            <p className="text-xs text-white/40">
              {formatDate(weekStart)} – {formatDate(weekEnd)}
              {!loading && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-sunshine-blue/20 text-sunshine-sky text-[10px] font-bold">
                  {appointments.length}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-1.5 rounded-xl text-white/40 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="p-1.5 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {error && (
            <div className="flex items-center gap-2 m-4 bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}

          {loading ? (
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-white/[0.05] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-12 text-center">
              <CalendarDays className="w-10 h-10 text-white/15 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No bookings this week.</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {dates.map((date) => (
                <div key={date}>
                  {/* Day heading */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      date === today
                        ? 'bg-sunshine-blue/30 text-sunshine-sky'
                        : 'bg-white/[0.07] text-white/50'
                    }`}>
                      {date === today ? '📅 Today' : formatDate(date)}
                    </span>
                    <span className="text-[10px] text-white/30 font-medium">
                      {grouped[date].length} booking{grouped[date].length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {grouped[date].map((appt) => (
                      <div
                        key={appt.id}
                        className="group relative bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-3.5 transition-all duration-150"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white truncate">{appt.patient_name}</p>
                            <p className="text-[11px] text-white/45 truncate">{appt.patient_phone}</p>
                          </div>
                          <StatusBadge status={appt.status} />
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-white/50 mb-2">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span className="font-medium text-white/70">{appt.appointment_time?.slice(0, 5)}</span>
                          <span className="text-white/30">·</span>
                          <span className="truncate">{appt.services?.name || '—'}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 text-[10px] text-white/40">
                            <MapPin className="w-2.5 h-2.5" />
                            {appt.location_type === 'home_visit' ? 'Home Visit' : 'Clinic'}
                          </span>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => onView(appt.id)}
                              className="p-1 rounded-lg text-white/40 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
                              title="View"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onEdit(appt.id)}
                              className="p-1 rounded-lg text-white/40 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDelete({ id: appt.id, patient_name: appt.patient_name })}
                              className="p-1 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── All Bookings Section ───────────────────────────────────────────────────────

function AllAppointments({ onView, onEdit, onDelete, onStatusChange }) {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimer = useRef(null);

  const onSearchChange = (v) => {
    setSearch(v);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(v);
      setPage(0);
    }, 300);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { limit: PAGE_SIZE, offset: page * PAGE_SIZE };
      if (dateFilter) params.date = dateFilter;
      if (statusFilter) params.status = statusFilter;
      if (debouncedSearch) params.search = debouncedSearch;

      const data = await fetchAdminAppointments(params);
      setAppointments(data.data || []);
      setTotal(data.total || 0);
    } catch {
      setError('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  }, [page, dateFilter, statusFilter, debouncedSearch]);

  useEffect(() => { load(); }, [load]);

  const clearFilters = () => {
    setDateFilter('');
    setStatusFilter('');
    setSearch('');
    setDebouncedSearch('');
    setPage(0);
  };

  const hasFilters = dateFilter || statusFilter || debouncedSearch;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const getRowBg = (status) => {
    if (status === 'no_show') return 'bg-red-900/20';
    if (status === 'cancelled') return 'opacity-60';
    if (status === 'completed') return 'bg-emerald-900/10';
    return '';
  };

  return (
    <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-500/20">
            <Calendar className="w-4 h-4 text-violet-300" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">All Bookings</h2>
            <p className="text-xs text-white/40">
              {!loading && `${total.toLocaleString()} total record${total !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
        <button
          onClick={load}
          className="p-1.5 rounded-xl text-white/40 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter bar */}
      <div className="px-4 py-3 border-b border-white/[0.07] bg-white/[0.02]">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Date filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setPage(0); }}
            className="border border-white/[0.10] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06] w-40 [color-scheme:dark]"
          />

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
            className="shrink-0 border border-white/[0.10] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-[#1a2535]"
          >
            <option value="">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search patient name or email..."
              className="w-full border border-white/[0.10] rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06]"
            />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white font-medium transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {error && (
        <div className="flex items-center gap-2 m-4 bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-white/[0.05] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="py-14 text-center">
          <Calendar className="w-10 h-10 text-white/15 mx-auto mb-3" />
          <p className="text-white/40 text-sm">No appointments found.</p>
          {hasFilters && (
            <button onClick={clearFilters} className="mt-2 text-xs text-sunshine-sky hover:underline">
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="block md:hidden divide-y divide-white/[0.05]">
            {appointments.map((appt) => (
              <div key={appt.id} className={`p-4 ${getRowBg(appt.status)}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white text-sm truncate">{appt.patient_name}</p>
                    <p className="text-xs text-white/55 truncate">{appt.patient_phone}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => onView(appt.id)} className="p-1.5 rounded-lg text-white/55 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors" title="View details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => onEdit(appt.id)} className="p-1.5 rounded-lg text-white/55 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors" title="Edit appointment">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete({ id: appt.id, patient_name: appt.patient_name })} className="p-1.5 rounded-lg text-white/55 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete appointment">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/55 mb-2">
                  <span className="font-medium text-white">{appt.appointment_date}</span>
                  <span>·</span>
                  <span>{appt.appointment_time?.slice(0, 5)}</span>
                  <span>·</span>
                  <span>{appt.services?.name || '—'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={appt.status}
                    onChange={(e) => onStatusChange(appt.id, e.target.value)}
                    className="text-xs border border-white/[0.10] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sunshine-blue bg-[#1a2535] text-white"
                  >
                    {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  <span className="inline-flex items-center gap-1 text-xs text-white/60">
                    <MapPin className="w-3 h-3" />
                    {appt.location_type === 'home_visit' ? 'Home' : 'Clinic'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.04] border-b border-white/[0.07]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Date &amp; Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Patient</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Service</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {appointments.map((appt) => (
                  <tr key={appt.id} className={`hover:bg-white/[0.03] transition-colors ${getRowBg(appt.status)}`}>
                    <td className="px-5 py-3">
                      <p className="font-medium text-white">{appt.appointment_date}</p>
                      <p className="text-xs text-white/55">{appt.appointment_time?.slice(0, 5)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{appt.patient_name}</p>
                      <p className="text-xs text-white/55">{appt.patient_phone}</p>
                    </td>
                    <td className="px-4 py-3 text-white/70">{appt.services?.name || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-white/60">
                        <MapPin className="w-3 h-3" />
                        {appt.location_type === 'home_visit' ? 'Home' : 'Clinic'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={appt.status}
                        onChange={(e) => onStatusChange(appt.id, e.target.value)}
                        className="text-xs border border-white/[0.10] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sunshine-blue bg-[#1a2535] text-white"
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => onView(appt.id)} className="p-1.5 rounded-lg text-white/55 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors" title="View details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => onEdit(appt.id)} className="p-1.5 rounded-lg text-white/55 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors" title="Edit appointment">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete({ id: appt.id, patient_name: appt.patient_name })} className="p-1.5 rounded-lg text-white/55 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete appointment">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.07]">
          <p className="text-xs text-white/50">
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-lg text-white/40 hover:text-sunshine-sky disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/50">Page {page + 1} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg text-white/40 hover:text-sunshine-sky disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Root Panel ─────────────────────────────────────────────────────────────────

export default function AdminAppointmentsPanel() {
  const [selectedId, setSelectedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Shared status update — optimistic, used from both sections via callback
  const handleStatusChange = async (id, newStatus) => {
    // We can't do cross-section optimistic updates easily without lifting state,
    // so just call the API; each section has its own auto-refresh on next poll.
    try {
      await updateAppointmentStatus(id, newStatus);
    } catch {
      // silent – user can manually refresh
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await deleteAppointment(deleteTarget.id);
      setDeleteTarget(null);
    } catch {
      setDeleteError('Failed to delete appointment. Please try again.');
      setDeleting(false);
    }
  };

  const sharedProps = {
    onView: setSelectedId,
    onEdit: setEditId,
    onDelete: setDeleteTarget,
  };

  return (
    <div className="space-y-6">
      {/* ── Section 1: Current week ── */}
      <WeekAppointments {...sharedProps} />

      {/* ── Section 2: All bookings with filters ── */}
      <AllAppointments {...sharedProps} onStatusChange={handleStatusChange} />

      {/* Detail modal */}
      <AppointmentDetailModal
        appointmentId={selectedId}
        onClose={() => setSelectedId(null)}
        onSaved={() => {}}
      />

      {/* Edit modal */}
      <AppointmentEditModal
        appointmentId={editId}
        onClose={() => setEditId(null)}
        onSaved={() => {}}
      />

      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => { if (!deleting) { setDeleteTarget(null); setDeleteError(''); } }}
          />
          <div className="relative bg-[#1a2535] border border-white/[0.10] rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-white text-base mb-2">Delete Appointment</h3>
            <p className="text-sm text-white/60 mb-5">
              Delete appointment for <span className="text-white font-medium">{deleteTarget.patient_name}</span>? This cannot be undone.
            </p>
            {deleteError && (
              <p className="text-xs text-red-400 bg-red-900/20 border border-red-500/30 rounded-xl px-3 py-2 mb-4">{deleteError}</p>
            )}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => { setDeleteTarget(null); setDeleteError(''); }}
                disabled={deleting}
                className="px-4 py-2 text-sm text-white/50 hover:text-white transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
