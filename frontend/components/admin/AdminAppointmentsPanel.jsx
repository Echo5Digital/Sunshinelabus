'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, X, ChevronLeft, ChevronRight, Eye,
  RefreshCw, AlertCircle, MapPin, Pencil, Trash2, Loader2,
} from 'lucide-react';
import { fetchAdminAppointments, updateAppointmentStatus, deleteAppointment } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';
import AppointmentDetailModal from './AppointmentDetailModal';
import AppointmentEditModal from './AppointmentEditModal';

const PAGE_SIZE = 20;


export default function AdminAppointmentsPanel() {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, patient_name }
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Filters
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
      const params = {
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
      };
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

  useEffect(() => {
    load();
  }, [load]);

  // Auto-refresh every 30s — pause while any modal is open to avoid disrupting interactions
  const isModalOpen = !!(selectedId || editId || deleteTarget);
  useEffect(() => {
    if (isModalOpen) return;
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load, isModalOpen]);

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic update
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    try {
      await updateAppointmentStatus(id, newStatus);
    } catch {
      load(); // Revert on failure
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError('');
    try {
      await deleteAppointment(deleteTarget.id);
      setDeleteTarget(null);
      load();
    } catch {
      setDeleteError('Failed to delete appointment. Please try again.');
      setDeleting(false);
    }
  };

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
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] p-4 shadow-sm">
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

          <button
            onClick={load}
            className="p-2 rounded-xl text-white/40 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors ml-auto"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
        {error && (
          <div className="flex items-center gap-2 m-4 bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-white/[0.06] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-white/50 text-sm">No appointments found.</p>
          </div>
        ) : (
          <>
            {/* Mobile card list */}
            <div className="block md:hidden divide-y divide-white/[0.05]">
              {appointments.map((appt) => (
                <div key={appt.id} className={`p-4 ${getRowBg(appt.status)}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white text-sm truncate">{appt.patient_name}</p>
                      <p className="text-xs text-white/55 truncate">{appt.patient_phone}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => setSelectedId(appt.id)}
                        className="p-1.5 rounded-lg text-white/55 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditId(appt.id)}
                        className="p-1.5 rounded-lg text-white/55 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
                        title="Edit appointment"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ id: appt.id, patient_name: appt.patient_name })}
                        className="p-1.5 rounded-lg text-white/55 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete appointment"
                      >
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
                      onChange={(e) => handleStatusChange(appt.id, e.target.value)}
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
                    <th className="text-left px-5 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Date & Time</th>
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
                          onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                          className="text-xs border border-white/[0.10] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sunshine-blue bg-[#1a2535] text-white"
                        >
                          {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedId(appt.id)}
                            className="p-1.5 rounded-lg text-white/55 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditId(appt.id)}
                            className="p-1.5 rounded-lg text-white/55 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
                            title="Edit appointment"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ id: appt.id, patient_name: appt.patient_name })}
                            className="p-1.5 rounded-lg text-white/55 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete appointment"
                          >
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

      {/* Detail modal */}
      <AppointmentDetailModal
        appointmentId={selectedId}
        onClose={() => setSelectedId(null)}
        onSaved={load}
      />

      {/* Edit modal */}
      <AppointmentEditModal
        appointmentId={editId}
        onClose={() => setEditId(null)}
        onSaved={load}
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
