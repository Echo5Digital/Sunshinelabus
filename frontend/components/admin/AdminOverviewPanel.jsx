'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CalendarDays, Clock, AlertCircle, UserX, RefreshCw,
  ChevronRight, Bell, MessageSquare, X, BarChart2,
} from 'lucide-react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { fetchAdminStats, fetchAdminAppointments, fetchCalendarRange } from '@/lib/api';
import { STATUS_CONFIG } from '@/lib/booking-constants';

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

function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminOverviewPanel({ onViewAll, onViewMessages, unreadMessages = 0 }) {
  const today = todayStr();

  // ── Stats ──────────────────────────────────────────────────────────────────
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Chart ──────────────────────────────────────────────────────────────────
  const [chartRange, setChartRange] = useState('week');
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  // ── Table ──────────────────────────────────────────────────────────────────
  const [dateFilter, setDateFilter] = useState(today);
  const [dayAppts, setDayAppts] = useState([]);
  const [dayLoading, setDayLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(true);

  // ── Refresh tick — increments every 30s to trigger chart + table reload ───
  const [tick, setTick] = useState(0);

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

  // ── Load table ─────────────────────────────────────────────────────────────
  const loadTable = useCallback(async (date, filtered) => {
    setDayLoading(true);
    try {
      const params = filtered && date
        ? { date, limit: 50, offset: 0 }
        : { limit: 10, offset: 0 };
      const result = await fetchAdminAppointments(params);
      setDayAppts(result.data || []);
    } catch {
      setDayAppts([]);
    } finally {
      setDayLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTable(dateFilter, isFiltered);
  }, [dateFilter, isFiltered, loadTable, tick]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
    setIsFiltered(true);
  };

  const handleClearDate = () => {
    setDateFilter(today);
    setIsFiltered(false);
  };

  // ── Derived values ─────────────────────────────────────────────────────────
  const chartPast = chartData.filter((d) => d.segment === 'past' || d.segment === 'today').reduce((s, d) => s + d.count, 0);
  const chartFuture = chartData.filter((d) => d.segment === 'future').reduce((s, d) => s + d.count, 0);
  const todayEntry = chartData.find((d) => d.segment === 'today');
  const todayBarLabel = todayEntry?.label ?? null;

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
        <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] animate-pulse h-48" />
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

      {/* ── Section 1: Booking Trends Chart ─────────────────────────────────── */}
      {/* Note: no overflow-hidden here — needed so Y-axis labels are not clipped */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm">
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

      {/* ── Section 2: Daily Appointments Table ─────────────────────────────── */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-semibold text-white">Appointments</h2>
              {!dayLoading && dayAppts.length > 0 && (
                <span className="text-xs text-white/50 bg-white/[0.05] border border-white/[0.07] px-2 py-0.5 rounded-full">
                  {dayAppts.length} {dayAppts.length === 1 ? 'result' : 'results'}
                </span>
              )}
            </div>
            <p className="text-xs text-white/40 mt-0.5">
              {isFiltered
                ? `Showing appointments for ${formatDisplayDate(dateFilter)}`
                : 'Showing 10 most recent bookings'}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <input
              type="date"
              value={isFiltered ? dateFilter : ''}
              onChange={handleDateChange}
              className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 py-1.5 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-sunshine-blue/50 focus:border-sunshine-blue/50 [color-scheme:dark]"
            />
            {isFiltered && (
              <button
                onClick={handleClearDate}
                title="Show recent bookings"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.10] text-white/50 hover:text-white transition-colors border border-white/[0.07]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onViewAll}
              className="flex items-center gap-1 text-xs text-sunshine-blue font-medium hover:underline whitespace-nowrap"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {dayLoading ? (
          <div className="py-12 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-sunshine-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : dayAppts.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-center px-6">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-white/25" />
            </div>
            <div>
              <p className="text-white/60 text-sm font-medium">
                {isFiltered ? 'No appointments on this date' : 'No appointments yet'}
              </p>
              {isFiltered && (
                <p className="text-white/30 text-xs mt-1">Try selecting a different date or clear to see recent bookings</p>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Mobile card list */}
            <div className="block md:hidden divide-y divide-white/[0.05]">
              {dayAppts.map((appt) => (
                <div key={appt.id} className="p-4 hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <p className="font-medium text-white text-sm">{appt.patient_name}</p>
                      <p className="text-xs text-white/50">{appt.patient_email}</p>
                    </div>
                    <StatusBadge status={appt.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/50 mt-1">
                    <span className="font-medium text-white/70">{appt.appointment_date}</span>
                    <span className="text-white/20">·</span>
                    <span>{appt.appointment_time?.slice(0, 5)}</span>
                    <span className="text-white/20">·</span>
                    <span>{appt.services?.name || '—'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-white/45 uppercase tracking-wider">Patient</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/45 uppercase tracking-wider">Service</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/45 uppercase tracking-wider">
                      {isFiltered ? 'Time' : 'Date & Time'}
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/45 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {dayAppts.map((appt) => (
                    <tr key={appt.id} className="hover:bg-white/[0.025] transition-colors">
                      <td className="px-6 py-3.5">
                        <p className="font-medium text-white">{appt.patient_name}</p>
                        <p className="text-xs text-white/45 mt-0.5">{appt.patient_email}</p>
                      </td>
                      <td className="px-4 py-3.5 text-white/65">{appt.services?.name || '—'}</td>
                      <td className="px-4 py-3.5">
                        {isFiltered ? (
                          <p className="text-white/65">{appt.appointment_time?.slice(0, 5)}</p>
                        ) : (
                          <>
                            <p className="text-white/65">{appt.appointment_date}</p>
                            <p className="text-xs text-white/40 mt-0.5">{appt.appointment_time?.slice(0, 5)}</p>
                          </>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
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
