'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, RefreshCw, AlertCircle, Users, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { fetchFieldVisitsToday } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';

// Leaflet touches window/document — must never render on the server.
const FieldVisitsMap = dynamic(() => import('./FieldVisitsMap'), { ssr: false });

function StatPill({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 bg-[#1a2535] rounded-2xl border border-white/[0.07] px-5 py-4">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xl font-bold text-white leading-none">{value}</p>
        <p className="text-xs text-white/50 mt-1">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.booked;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.dotColor }} />
      {cfg.label}
    </span>
  );
}

function VisitRow({ visit, expanded, onToggle }) {
  const hasDetail = visit.visit_notes || visit.signature_file_url;
  const staffName = visit.admin_users?.name;

  return (
    <div className="px-5 py-3.5">
      <div
        className={`flex items-center justify-between gap-3 ${hasDetail ? 'cursor-pointer' : ''}`}
        onClick={() => hasDetail && onToggle(visit.id)}
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{visit.patient_name}</p>
          <p className="text-xs text-white/40 truncate">
            {visit.appointment_time?.slice(0, 5)}
            {staffName ? ` · ${staffName}` : ''}
            {visit.address_city ? ` · ${visit.address_city}` : ''}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <StatusBadge status={visit.status} />
          {hasDetail && (
            <span className="text-[11px] text-white/35 hover:text-white/60 underline">
              {expanded ? 'Hide' : 'View visit'}
            </span>
          )}
        </div>
      </div>

      {expanded && hasDetail && (
        <div className="mt-3 pt-3 border-t border-dashed border-white/[0.08] space-y-3">
          {visit.visit_notes && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-white/40 mb-1">Visit Notes</p>
              <p className="text-sm text-white/80 leading-snug">{visit.visit_notes}</p>
            </div>
          )}
          {visit.signature_file_url && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-white/40 mb-1">Client Signature</p>
              <img
                src={visit.signature_file_url}
                alt="Client signature"
                className="max-w-[200px] rounded-lg border border-white/10 bg-white"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminFieldVisitsPanel() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const load = useCallback(async () => {
    try {
      const result = await fetchFieldVisitsToday();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to load field visits.');
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

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

  if (!data) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-[#1a2535] rounded-2xl border border-white/[0.07] p-5 animate-pulse h-20" />
          ))}
        </div>
        <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] animate-pulse h-80" />
      </div>
    );
  }

  const pins = data.appointments
    .filter((a) => a.check_in_lat != null)
    .map((a) => ({
      lat: a.check_in_lat,
      lng: a.check_in_lng,
      status: a.status,
      label: a.patient_name,
    }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatPill icon={CalendarCheck} label="Visits Today" value={data.visits_today} color="bg-sunshine-blue/20 text-sunshine-blue" />
        <StatPill icon={CheckCircle2} label="Completed" value={data.completed_today} color="bg-emerald-500/20 text-emerald-400" />
        <StatPill icon={Users} label="Active Staff" value={data.active_staff} color="bg-violet-500/20 text-violet-300" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm flex flex-col">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.07]">
            <MapPin className="w-4 h-4 text-white/40" />
            <h2 className="font-semibold text-white">Staff &amp; Visit Locations</h2>
          </div>
          <div className="flex-1 min-h-[340px] rounded-b-2xl overflow-hidden">
            <FieldVisitsMap pins={pins} />
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.07]">
            <h2 className="font-semibold text-white">Today's Visits</h2>
            <p className="text-xs text-white/40 mt-0.5">Field staff check-in/out status</p>
          </div>
          {data.appointments.length === 0 ? (
            <div className="py-10 flex flex-col items-center gap-2 text-center px-6">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                <CalendarCheck className="w-4 h-4 text-white/20" />
              </div>
              <p className="text-white/50 text-sm">No field visits scheduled today.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.05]">
              {data.appointments.map((visit) => (
                <VisitRow
                  key={visit.id}
                  visit={visit}
                  expanded={expandedId === visit.id}
                  onToggle={(id) => setExpandedId((prev) => (prev === id ? null : id))}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
