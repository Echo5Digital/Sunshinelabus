'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Clock, AlertCircle, UserX, RefreshCw, ChevronRight } from 'lucide-react';
import { fetchAdminStats, fetchAdminAppointments } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-sunshine-dark mb-0.5">{value ?? '—'}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.booked;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function AdminOverviewPanel({ onViewAll }) {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const [statsData, apptsData] = await Promise.all([
        fetchAdminStats(),
        fetchAdminAppointments({ limit: 10, offset: 0 }),
      ]);
      setStats(statsData);
      setRecent(apptsData.data || []);
    } catch {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-28" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-gray-600">{error}</p>
        <button onClick={load} className="flex items-center gap-2 text-sunshine-blue text-sm font-medium hover:underline">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarDays} label="Total Bookings" value={stats?.total} color="bg-sunshine-blue/10 text-sunshine-blue" />
        <StatCard icon={Clock} label="Today" value={stats?.today} color="bg-sunshine-sky/20 text-sunshine-sky" />
        <StatCard icon={AlertCircle} label="Pending" value={stats?.pending} color="bg-sunshine-yellow/20 text-sunshine-dark" />
        <StatCard icon={UserX} label="No Shows" value={stats?.no_shows} color="bg-red-100 text-red-500" />
      </div>

      {/* Recent appointments */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-sunshine-dark">Recent Appointments</h2>
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs text-sunshine-blue font-medium hover:underline"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recent.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">No appointments yet.</p>
        ) : (
          <>
            {/* Mobile card list */}
            <div className="block md:hidden divide-y divide-gray-50">
              {recent.map((appt) => (
                <div key={appt.id} className="p-4 hover:bg-gray-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <p className="font-medium text-sunshine-dark text-sm">{appt.patient_name}</p>
                      <p className="text-xs text-gray-400">{appt.patient_email}</p>
                    </div>
                    <StatusBadge status={appt.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <span className="font-medium text-sunshine-dark">{appt.appointment_date}</span>
                    <span>·</span>
                    <span>{appt.appointment_time?.slice(0, 5)}</span>
                    <span>·</span>
                    <span>{appt.services?.name || '—'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Service</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date & Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recent.map((appt) => (
                    <tr key={appt.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-3">
                        <p className="font-medium text-sunshine-dark">{appt.patient_name}</p>
                        <p className="text-xs text-gray-400">{appt.patient_email}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{appt.services?.name || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">
                        <p>{appt.appointment_date}</p>
                        <p className="text-xs text-gray-400">{appt.appointment_time?.slice(0, 5)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={appt.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
