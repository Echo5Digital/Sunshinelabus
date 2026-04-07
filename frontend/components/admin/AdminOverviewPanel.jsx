'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CalendarDays, Clock, AlertCircle, UserX, RefreshCw,
  ChevronRight, Bell, MessageSquare, BarChart2,
  CheckCircle, XCircle, LogIn,
} from 'lucide-react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
  PieChart, Pie,
} from 'recharts';
import { fetchAdminStats, fetchAdminAppointments, fetchCalendarRange } from '@/lib/api';
import { STATUS_CONFIG, formatTimeSlot } from '@/lib/booking-constants';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function addDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function buildDateRange(startDate, endDate) {
  const days = [];
  let cur = startDate;
  while (cur <= endDate) {
    days.push(cur);
    cur = addDays(cur, 1);
  }
  return days;
}

function weekLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function monthLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTodayLong(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatActivityTime(rawTimestamp, appointmentDate) {
  const today = todayStr();
  const yesterday = addDays(today, -1);

  let dateStr = appointmentDate;
  let timeStr = null;

  if (rawTimestamp) {
    const dt = new Date(rawTimestamp);
    dateStr = dt.toISOString().split('T')[0];
    const h = dt.getHours();
    const m = dt.getMinutes().toString().padStart(2, '0');
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    timeStr = `${hour}:${m} ${period}`;
  }

  let prefix;
  if (dateStr === today) prefix = 'Today';
  else if (dateStr === yesterday) prefix = 'Yesterday';
  else {
    const d = new Date(dateStr + 'T00:00:00');
    prefix = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  return timeStr ? `${prefix} · ${timeStr}` : prefix;
}

// Deterministic avatar color from patient name
const AVATAR_COLORS = [
  { bg: '#1e3a5f', text: '#60a5fa' },
  { bg: '#1a3a2a', text: '#4ade80' },
  { bg: '#3b2a1a', text: '#fb923c' },
  { bg: '#2a1a3b', text: '#c084fc' },
  { bg: '#3b1a1a', text: '#f87171' },
  { bg: '#1a3a3a', text: '#22d3ee' },
  { bg: '#3a3a1a', text: '#facc15' },
  { bg: '#2a1a2a', text: '#f472b6' },
];

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffff;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const BREAKDOWN_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899', '#f97316'];

const ACTIVITY_CONFIG = {
  booked:     { icon: CalendarDays, bg: '#1e3a5f', color: '#60a5fa', label: (svc) => `booked a ${svc || 'test'}` },
  confirmed:  { icon: CheckCircle,  bg: '#1a3a2a', color: '#4ade80', label: () => 'booking confirmed' },
  no_show:    { icon: UserX,        bg: '#3b1a1a', color: '#f87171', label: () => 'marked as no show' },
  cancelled:  { icon: XCircle,      bg: '#2a2a2a', color: '#9ca3af', label: () => 'booking cancelled' },
  completed:  { icon: CheckCircle,  bg: '#1a2e2a', color: '#34d399', label: (svc) => `completed ${svc || 'appointment'}` },
  checked_in: { icon: LogIn,        bg: '#3a3a1a', color: '#facc15', label: () => 'checked in' },
  rescheduled:{ icon: RefreshCw,    bg: '#1a2535', color: '#818cf8', label: () => 'rescheduled appointment' },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color, glowColor, onClick, subLabel, subLabelColor }) {
  return (
    <button
      onClick={onClick}
      style={{ '--glow': glowColor }}
      className="group w-full text-left bg-[#1a2535] rounded-2xl border border-white/[0.07] p-5 shadow-sm
        hover:bg-[#1e2d42] hover:border-[var(--glow)]/40
        hover:[box-shadow:0_0_0_1px_var(--glow)/25,0_8px_32px_-4px_var(--glow)/30]
        hover:-translate-y-0.5
        active:translate-y-0 active:shadow-sm
        transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glow)]/60"
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all duration-200 group-hover:scale-110 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all duration-200 mt-1 flex-shrink-0" />
      </div>
      <p className="text-2xl font-bold text-white group-hover:text-white transition-colors mb-0.5">{value ?? '—'}</p>
      <p className="text-sm text-white/50 group-hover:text-white/75 transition-colors">{label}</p>
      {subLabel && (
        <p className="text-xs mt-1 truncate" style={{ color: subLabelColor || 'rgba(255,255,255,0.35)' }}>{subLabel}</p>
      )}
    </button>
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

const SERVICE_COLORS = [
  '#3b82f6', '#06b6d4', '#8b5cf6', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#f97316',
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const services = payload[0].payload?.services || {};
  const segment = payload[0].payload?.segment;
  const entries = Object.entries(services).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-[#0f1923] border border-white/[0.15] rounded-xl px-3.5 py-2.5 shadow-xl text-sm min-w-[150px] max-w-[220px]">
      <div className="flex items-center gap-1.5 mb-2">
        <p className="text-white/50 text-xs">{label}</p>
        {segment === 'today' && (
          <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded-full">today</span>
        )}
        {segment === 'future' && (
          <span className="text-[10px] font-semibold text-sky-400/80 bg-sky-400/10 px-1.5 py-0.5 rounded-full">upcoming</span>
        )}
      </div>
      {entries.length > 0 ? (
        <div className="space-y-1.5">
          {entries.map(([name, count], i) => (
            <div key={name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: SERVICE_COLORS[i % SERVICE_COLORS.length] }}
                />
                <span className="text-white/70 text-xs truncate">{name}</span>
              </div>
              <span className="text-white font-semibold text-xs flex-shrink-0">{count}</span>
            </div>
          ))}
          {entries.length > 1 && (
            <div className="pt-1.5 mt-0.5 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-white/40 text-xs">Total</span>
              <span className="text-white font-bold text-xs">{val}</span>
            </div>
          )}
        </div>
      ) : (
        <>
          <p className="text-white font-bold text-base">{val}</p>
          <p className="text-white/40 text-xs">{val === 1 ? 'booking' : 'bookings'}</p>
        </>
      )}
    </div>
  );
}

// ── Test Breakdown (donut chart) ──────────────────────────────────────────────

function TestBreakdownChart({ data, loading }) {
  return (
    <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm flex flex-col h-full">
      <div className="px-6 py-4 border-b border-white/[0.07]">
        <h2 className="font-semibold text-white">Test breakdown</h2>
        <p className="text-xs text-white/40 mt-0.5">By test type this month</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 min-h-[240px]">
        {loading ? (
          <div className="w-5 h-5 border-2 border-sunshine-blue border-t-transparent rounded-full animate-spin" />
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center gap-2">
            <BarChart2 className="w-8 h-8 text-white/15" />
            <p className="text-white/40 text-sm">No data this month</p>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={90}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {data.map((entry, i) => (
                      <Cell key={entry.name} fill={BREAKDOWN_COLORS[i % BREAKDOWN_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-1 px-1">
              {data.map((entry, i) => (
                <div key={entry.name} className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: BREAKDOWN_COLORS[i % BREAKDOWN_COLORS.length] }}
                    />
                    <span className="text-white/65 truncate">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className="text-white/40">{entry.count}</span>
                    <span className="text-white/55 font-medium w-9 text-right">{entry.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Today's Appointments widget ───────────────────────────────────────────────

function TodayAppointmentsWidget({ appointments, loading, onViewAll, dateStr }) {
  return (
    <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.07]">
        <div>
          <h2 className="font-semibold text-white">Today's appointments</h2>
          <p className="text-xs text-white/40 mt-0.5">{formatTodayLong(dateStr)}</p>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs text-sunshine-blue font-medium hover:underline whitespace-nowrap flex-shrink-0"
        >
          View all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {loading ? (
        <div className="divide-y divide-white/[0.05]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-white/[0.07] flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-white/[0.07] rounded w-2/3" />
                <div className="h-2.5 bg-white/[0.05] rounded w-1/2" />
              </div>
              <div className="h-3 bg-white/[0.05] rounded w-12" />
            </div>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <div className="py-10 flex flex-col items-center gap-2 text-center px-6">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-white/20" />
          </div>
          <p className="text-white/50 text-sm">No appointments today</p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.05]">
          {appointments.slice(0, 5).map((appt) => {
            const colors = avatarColor(appt.patient_name || 'U');
            const initials = getInitials(appt.patient_name || 'Unknown');
            const timeDisplay = appt.appointment_time
              ? formatTimeSlot(appt.appointment_time.slice(0, 5))
              : '—';
            return (
              <div key={appt.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.025] transition-colors">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{appt.patient_name}</p>
                  <p className="text-xs text-white/40 truncate">{appt.services?.name || '—'}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-xs font-medium text-white/65">{timeDisplay}</span>
                  <StatusBadge status={appt.status} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Recent Activity widget ────────────────────────────────────────────────────

function RecentActivityWidget({ items, loading }) {
  return (
    <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.07]">
        <h2 className="font-semibold text-white">Recent activity</h2>
        <p className="text-xs text-white/40 mt-0.5">Latest updates</p>
      </div>

      {loading ? (
        <div className="divide-y divide-white/[0.05]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-white/[0.07] flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-white/[0.07] rounded w-3/4" />
                <div className="h-2.5 bg-white/[0.05] rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="py-10 flex flex-col items-center gap-2 text-center px-6">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
            <Clock className="w-4 h-4 text-white/20" />
          </div>
          <p className="text-white/50 text-sm">No recent activity</p>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.05]">
          {items.map((item, i) => {
            const cfg = ACTIVITY_CONFIG[item.status] || ACTIVITY_CONFIG.booked;
            const Icon = cfg.icon;
            return (
              <div key={i} className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.025] transition-colors">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: cfg.bg }}
                >
                  <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white leading-snug">
                    <span className="font-semibold">{item.patient_name}</span>{' '}
                    <span className="text-white/60">{cfg.label(item.serviceName)}</span>
                  </p>
                  <p className="text-xs text-white/35 mt-0.5">{item.timeLabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminOverviewPanel({ onViewAll, onViewMessages, unreadMessages = 0, onCardClick }) {
  const today = todayStr();

  // ── Stats ──────────────────────────────────────────────────────────────────
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Chart ──────────────────────────────────────────────────────────────────
  const [chartRange, setChartRange] = useState('week');
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  // ── Refresh tick — increments every 30s to trigger chart + table reload ───
  const [tick, setTick] = useState(0);

  // ── NEW: Test breakdown ───────────────────────────────────────────────────
  const [breakdownData, setBreakdownData] = useState([]);
  const [breakdownLoading, setBreakdownLoading] = useState(false);

  // ── NEW: Today's appointments (independent of table state) ────────────────
  const [todayAppts, setTodayAppts] = useState([]);
  const [todayLoading, setTodayLoading] = useState(false);

  // ── NEW: Recent activity ──────────────────────────────────────────────────
  const [activityItems, setActivityItems] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);

  // ── Load stats ─────────────────────────────────────────────────────────────
  const loadStats = useCallback(async () => {
    try {
      const statsData = await fetchAdminStats();
      setStats(statsData);
    } catch {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
    const interval = setInterval(() => {
      loadStats();
      setTick((t) => t + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, [loadStats]);

  // ── Load chart data ────────────────────────────────────────────────────────
  const loadChart = useCallback(async (range) => {
    setChartLoading(true);
    try {
      const pastDays = range === 'week' ? 3 : 14;
      const futureDays = range === 'week' ? 3 : 14;
      const start = addDays(today, -pastDays);
      const end = addDays(today, futureDays);
      const result = await fetchCalendarRange(start, end);
      const appointments = result.appointments || [];

      const counts = {};
      const serviceCounts = {};
      appointments.forEach((a) => {
        counts[a.appointment_date] = (counts[a.appointment_date] || 0) + 1;
        const svcName = a.services?.name || 'Unknown';
        if (!serviceCounts[a.appointment_date]) serviceCounts[a.appointment_date] = {};
        serviceCounts[a.appointment_date][svcName] =
          (serviceCounts[a.appointment_date][svcName] || 0) + 1;
      });

      const dates = buildDateRange(start, end);
      const labelFn = range === 'week' ? weekLabel : monthLabel;
      const data = dates.map((d) => ({
        date: d,
        label: labelFn(d),
        count: counts[d] || 0,
        services: serviceCounts[d] || {},
        segment: d < today ? 'past' : d === today ? 'today' : 'future',
      }));

      setChartData(data);
    } catch {
      setChartData([]);
    } finally {
      setChartLoading(false);
    }
  }, [today]);

  useEffect(() => {
    loadChart(chartRange);
  }, [chartRange, loadChart, tick]);

  // ── NEW: Load test breakdown (this month) ─────────────────────────────────
  const loadBreakdown = useCallback(async () => {
    setBreakdownLoading(true);
    try {
      const d = new Date(today + 'T00:00:00');
      const firstOfMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
      const result = await fetchCalendarRange(firstOfMonth, today);
      const appointments = result.appointments || [];

      const counts = {};
      appointments.forEach((a) => {
        const name = a.services?.name || 'Unknown';
        counts[name] = (counts[name] || 0) + 1;
      });

      const total = Object.values(counts).reduce((s, v) => s + v, 0);
      const data = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({
          name,
          count,
          percent: total > 0 ? Math.round((count / total) * 100) : 0,
        }));

      setBreakdownData(data);
    } catch {
      setBreakdownData([]);
    } finally {
      setBreakdownLoading(false);
    }
  }, [today]);

  // ── NEW: Load today's appointments for the mini-list ──────────────────────
  const loadTodayAppts = useCallback(async () => {
    setTodayLoading(true);
    try {
      const result = await fetchAdminAppointments({ date: today, limit: 20, offset: 0 });
      const sorted = (result.data || []).slice().sort((a, b) =>
        (a.appointment_time || '').localeCompare(b.appointment_time || '')
      );
      setTodayAppts(sorted);
    } catch {
      setTodayAppts([]);
    } finally {
      setTodayLoading(false);
    }
  }, [today]);

  // ── NEW: Load recent activity ─────────────────────────────────────────────
  const loadActivity = useCallback(async () => {
    setActivityLoading(true);
    try {
      const result = await fetchAdminAppointments({ limit: 15, offset: 0 });
      const appts = result.data || [];
      const items = appts.slice(0, 5).map((a) => ({
        status: a.status,
        patient_name: a.patient_name || 'Unknown',
        serviceName: a.services?.name || '',
        timeLabel: formatActivityTime(a.created_at, a.appointment_date),
      }));
      setActivityItems(items);
    } catch {
      setActivityItems([]);
    } finally {
      setActivityLoading(false);
    }
  }, []);

  // ── Mount + tick: fire all new loaders ───────────────────────────────────
  useEffect(() => {
    loadBreakdown();
    loadTodayAppts();
    loadActivity();
  }, [loadBreakdown, loadTodayAppts, loadActivity, tick]);

  // ── Derived values ─────────────────────────────────────────────────────────
  const chartPast = chartData.filter((d) => d.segment === 'past' || d.segment === 'today').reduce((s, d) => s + d.count, 0);
  const chartFuture = chartData.filter((d) => d.segment === 'future').reduce((s, d) => s + d.count, 0);
  const todayEntry = chartData.find((d) => d.segment === 'today');
  const todayBarLabel = todayEntry?.label ?? null;

  // Today sub-label for stat card
  const todayConfirmed = todayAppts.filter((a) => a.status === 'confirmed').length;
  const todayPending = todayAppts.filter((a) => a.status === 'booked').length;
  const todaySubLabel = todayAppts.length > 0
    ? `${todayConfirmed} confirmed · ${todayPending} pending`
    : null;

  // ── Render guards ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#1a2535] rounded-2xl border border-white/[0.07] p-5 animate-pulse h-28" />
          ))}
        </div>
        <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] animate-pulse h-72" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-white/60">{error}</p>
        <button onClick={loadStats} className="flex items-center gap-2 text-sunshine-blue text-sm font-medium hover:underline">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Stat cards — each navigates to the Appointments panel */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarDays} label="Total Bookings" value={stats?.total}
          color="bg-sunshine-blue/20 text-sunshine-blue" glowColor="#3b82f6"
          onClick={onCardClick}
          subLabel="All bookings"
        />
        <StatCard
          icon={Clock} label="Today" value={stats?.today}
          color="bg-sunshine-sky/20 text-sunshine-sky" glowColor="#06b6d4"
          onClick={onCardClick}
          subLabel={todaySubLabel}
        />
        <StatCard
          icon={AlertCircle} label="Pending review" value={stats?.pending}
          color="bg-sunshine-yellow/20 text-sunshine-yellow" glowColor="#f59e0b"
          onClick={onCardClick}
          subLabel="Needs action"
          subLabelColor="rgba(234,179,8,0.7)"
        />
        <StatCard
          icon={UserX} label="No shows" value={stats?.no_shows}
          color="bg-red-500/20 text-red-400" glowColor="#ef4444"
          onClick={onCardClick}
          subLabel="Follow up needed"
          subLabelColor="rgba(248,113,113,0.7)"
        />
      </div>

      {/* New messages notification banner */}
      {unreadMessages > 0 && (
        <div className="flex items-center gap-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-amber-400" />
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

      {/* ── Row: Booking Trends + Test Breakdown ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Booking Trends Chart — col-span-3 on lg */}
        {/* Note: no overflow-hidden here — needed so Y-axis labels are not clipped */}
        <div className="lg:col-span-3 bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.07]">
            <div>
              <h2 className="font-semibold text-white">Booking Trends</h2>
              <p className="text-xs text-white/40 mt-0.5">Past &amp; upcoming bookings</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {!chartLoading && chartData.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/50 bg-white/[0.05] border border-white/[0.07] px-2.5 py-1 rounded-full">
                    {chartPast} past
                  </span>
                  <span className="text-xs text-sky-400/80 bg-sky-400/[0.08] border border-sky-400/20 px-2.5 py-1 rounded-full">
                    {chartFuture} upcoming
                  </span>
                </div>
              )}
              <div className="flex items-center gap-0.5 bg-white/[0.05] rounded-lg p-1">
                {['week', 'month'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setChartRange(r)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      chartRange === r
                        ? 'bg-sunshine-blue text-white shadow-sm'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {r === 'week' ? 'Week' : 'Month'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 pt-4 pb-3 sm:px-6 [&_.recharts-cartesian-grid-bg]:hidden">
            {chartLoading ? (
              <div className="h-[240px] flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-sunshine-blue border-t-transparent rounded-full animate-spin" />
              </div>
            ) : chartData.length === 0 ? (
              <div className="h-[240px] flex flex-col items-center justify-center gap-3">
                <BarChart2 className="w-8 h-8 text-white/15" />
                <p className="text-white/40 text-sm">No booking data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: 'rgba(255,255,255,0.40)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    interval={chartRange === 'month' ? 4 : 0}
                    minTickGap={20}
                    dy={4}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: 'rgba(255,255,255,0.40)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                    dx={-2}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)', radius: 4 }} />
                  {todayBarLabel && (
                    <ReferenceLine x={todayBarLabel} stroke="rgba(255,255,255,0.22)" strokeDasharray="4 3" label={false} />
                  )}
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={44}>
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.date}
                        fill={
                          entry.segment === 'today'
                            ? '#06b6d4'
                            : entry.segment === 'future'
                            ? 'rgba(59,130,246,0.38)'
                            : '#3b82f6'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Test Breakdown — col-span-2 on lg */}
        <div className="lg:col-span-2">
          <TestBreakdownChart data={breakdownData} loading={breakdownLoading} />
        </div>
      </div>

      {/* ── Row: Today's Appointments + Recent Activity ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayAppointmentsWidget
          appointments={todayAppts}
          loading={todayLoading}
          onViewAll={onViewAll}
          dateStr={today}
        />
        <RecentActivityWidget
          items={activityItems}
          loading={activityLoading}
        />
      </div>


    </div>
  );
}
