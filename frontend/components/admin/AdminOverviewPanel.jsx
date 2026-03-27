'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Clock, AlertCircle, UserX, RefreshCw, ChevronRight, Bell, MessageSquare } from 'lucide-react';
import { fetchAdminStats, fetchAdminAppointments } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] p-5 shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-white mb-0.5">{value ?? '—'}</p>
      <p className="text-sm text-white/50">{label}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.booked;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.dotColor }} />
      {cfg.label}
    </span>
  );
}

export default function AdminOverviewPanel({ onViewAll, onViewMessages, unreadMessages = 0 }) {
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
            <div key={i} className="bg-[#1a2535] rounded-2xl border border-white/[0.07] p-5 animate-pulse h-28" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-white/60">{error}</p>
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
        <StatCard icon={CalendarDays} label="Total Bookings" value={stats?.total} color="bg-sunshine-blue/20 text-sunshine-blue" />
        <StatCard icon={Clock} label="Today" value={stats?.today} color="bg-sunshine-sky/20 text-sunshine-sky" />
        <StatCard icon={AlertCircle} label="Pending" value={stats?.pending} color="bg-sunshine-yellow/20 text-sunshine-yellow" />
        <StatCard icon={UserX} label="No Shows" value={stats?.no_shows} color="bg-red-500/20 text-red-400" />
      </div>

      {/* New messages notification banner */}
      {unreadMessages > 0 && (
        <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4.5 h-4.5 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-300">
              {unreadMessages === 1 ? '1 new message' : `${unreadMessages} new messages`}
            </p>
            <p className="text-xs text-amber-400/70 mt-0.5">You have unread contact form submissions</p>
          </div>
          <button
            onClick={onViewMessages}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-amber-100 bg-amber-500/20 hover:bg-amber-500/30 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            View Messages
          </button>
        </div>
      )}

      {/* Recent appointments */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <h2 className="font-semibold text-white">Recent Appointments</h2>
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs text-sunshine-blue font-medium hover:underline"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recent.length === 0 ? (
          <p className="text-center text-white/40 text-sm py-10">No appointments yet.</p>
        ) : (
          <>
            {/* Mobile card list */}
            <div className="block md:hidden divide-y divide-white/[0.05]">
              {recent.map((appt) => (
                <div key={appt.id} className="p-4 hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <p className="font-medium text-white text-sm">{appt.patient_name}</p>
                      <p className="text-xs text-white/55">{appt.patient_email}</p>
                    </div>
                    <StatusBadge status={appt.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/55">
                    <span className="font-medium text-white">{appt.appointment_date}</span>
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
                  <tr className="bg-white/[0.04] border-b border-white/[0.07]">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Patient</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Service</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Date & Time</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {recent.map((appt) => (
                    <tr key={appt.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-3">
                        <p className="font-medium text-white">{appt.patient_name}</p>
                        <p className="text-xs text-white/55">{appt.patient_email}</p>
                      </td>
                      <td className="px-4 py-3 text-white/70">{appt.services?.name || '—'}</td>
                      <td className="px-4 py-3 text-white/60">
                        <p>{appt.appointment_date}</p>
                        <p className="text-xs text-white/55">{appt.appointment_time?.slice(0, 5)}</p>
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
