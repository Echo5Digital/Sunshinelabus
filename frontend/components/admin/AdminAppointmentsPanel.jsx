'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, X, ChevronLeft, ChevronRight, Eye,
  RefreshCw, AlertCircle, MapPin,
} from 'lucide-react';
import { fetchAdminAppointments, updateAppointmentStatus } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';
import AppointmentDetailModal from './AppointmentDetailModal';

const PAGE_SIZE = 20;

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.booked;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function AdminAppointmentsPanel() {
  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

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
    if (status === 'no_show') return 'bg-red-50/60';
    if (status === 'cancelled') return 'opacity-60';
    if (status === 'completed') return 'bg-emerald-50/20';
    return '';
  };

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Date filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setPage(0); }}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-sunshine-dark focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white w-40"
          />

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-sunshine-dark focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white"
          >
            <option value="">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search patient name or email..."
              className="w-full border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-sm text-sunshine-dark focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white"
            />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-sunshine-dark font-medium transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}

          <button
            onClick={load}
            className="p-2 rounded-xl text-gray-400 hover:text-sunshine-blue hover:bg-sunshine-soft transition-colors ml-auto"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {error && (
          <div className="flex items-center gap-2 m-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-sm">No appointments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date & Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Service</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.map((appt) => (
                  <tr key={appt.id} className={`hover:bg-gray-50/50 transition-colors ${getRowBg(appt.status)}`}>
                    <td className="px-5 py-3">
                      <p className="font-medium text-sunshine-dark">{appt.appointment_date}</p>
                      <p className="text-xs text-gray-400">{appt.appointment_time?.slice(0, 5)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-sunshine-dark">{appt.patient_name}</p>
                      <p className="text-xs text-gray-400">{appt.patient_phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{appt.services?.name || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {appt.location_type === 'home_visit' ? 'Home' : 'Clinic'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={appt.status}
                        onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-sunshine-blue bg-white text-sunshine-dark"
                      >
                        {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedId(appt.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-sunshine-blue hover:bg-sunshine-soft transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg text-gray-400 hover:text-sunshine-blue disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-500">Page {page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-1.5 rounded-lg text-gray-400 hover:text-sunshine-blue disabled:opacity-30 disabled:cursor-not-allowed"
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
      />
    </div>
  );
}
