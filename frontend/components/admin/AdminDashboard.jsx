'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard, CalendarDays, Calendar, Ban, MessageSquare,
  LogOut, Menu, ChevronRight, Users,
} from 'lucide-react';
import { clearAdminToken, fetchAdminStats, getAdminRole } from '@/lib/api';
import AdminOverviewPanel from './AdminOverviewPanel';
import AdminAppointmentsPanel from './AdminAppointmentsPanel';
import AdminCalendarPanel from './AdminCalendarPanel';
import AdminTimeBlocksPanel from './AdminTimeBlocksPanel';
import AdminMessagesPanel from './AdminMessagesPanel';
import AdminUsersPanel from './AdminUsersPanel';

const ALL_NAV_ITEMS = [
  { id: 'overview',    label: 'Overview',      icon: LayoutDashboard },
  { id: 'appointments',label: 'Appointments',  icon: CalendarDays },
  { id: 'calendar',    label: 'Calendar',       icon: Calendar },
  { id: 'time-blocks', label: 'Time Blocking',  icon: Ban },
  { id: 'messages',    label: 'Messages',       icon: MessageSquare },
  // Visible only to super_admin and admin
  { id: 'users',       label: 'Users',          icon: Users, roles: ['super_admin', 'admin'] },
];

const PANEL_TITLES = {
  overview:      'Overview',
  appointments:  'Appointments',
  calendar:      'Calendar',
  'time-blocks': 'Time Blocking',
  messages:      'Messages',
  users:         'User Management',
};

const ROLE_LABELS = {
  super_admin: 'Super Admin',
  admin:       'Admin',
  staff:       'Staff',
};

// Role badge colors for the sidebar
const ROLE_BADGE_COLORS = {
  super_admin: 'bg-sunshine-blue/30 text-sunshine-sky',
  admin:       'bg-violet-500/30 text-violet-300',
  staff:       'bg-emerald-500/30 text-emerald-300',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Derive role once — stable across renders since token doesn't change mid-session
  const adminRole = getAdminRole();

  // Filter nav items based on role
  const navItems = ALL_NAV_ITEMS.filter(
    (item) => !item.roles || (adminRole && item.roles.includes(adminRole))
  );

  const refreshUnread = useCallback(async () => {
    try {
      const stats = await fetchAdminStats();
      setUnreadCount(stats.unread_messages ?? 0);
    } catch {
      // silent — sidebar badge is non-critical
    }
  }, []);

  useEffect(() => {
    refreshUnread();
    const interval = setInterval(refreshUnread, 60000);
    return () => clearInterval(interval);
  }, [refreshUnread]);

  const handleMarkRead = useCallback(() => {
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const handleLogout = () => {
    clearAdminToken();
    router.push('/admin/login');
  };

  const handleNav = (id) => {
    setActivePanel(id);
    setSidebarOpen(false);
  };

  const panels = {
    overview: (
      <AdminOverviewPanel
        onViewAll={() => setActivePanel('appointments')}
        onViewMessages={() => setActivePanel('messages')}
        onCardClick={() => setActivePanel('appointments')}
        unreadMessages={unreadCount}
      />
    ),
    appointments: <AdminAppointmentsPanel />,
    calendar: <AdminCalendarPanel />,
    'time-blocks': <AdminTimeBlocksPanel />,
    messages: (
      <AdminMessagesPanel
        onMarkRead={handleMarkRead}
      />
    ),
    users: <AdminUsersPanel adminRole={adminRole} />,
  };

  const roleBadgeColor = ROLE_BADGE_COLORS[adminRole] || ROLE_BADGE_COLORS.staff;
  const roleLabel = ROLE_LABELS[adminRole] || 'Admin';

  return (
    <div className="flex h-screen bg-[#0f1624] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col w-60 bg-sunshine-dark text-white shadow-xl transition-transform duration-300
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <Image src="/main-logo.webp" alt="Sunshine Clinical Laboratory" width={110} height={34} className="object-contain" />
        </div>

        {/* Role badge */}
        <div className="px-5 py-3 border-b border-white/10">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${roleBadgeColor}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {roleLabel}
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activePanel === id;
            const showBadge = id === 'messages' && unreadCount > 0;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-sunshine-blue/30 text-white shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-sunshine-sky' : ''}`} />
                <span className="flex-1 text-left">{label}</span>
                {showBadge && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
                {isActive && !showBadge && <ChevronRight className="w-3.5 h-3.5 text-sunshine-sky" />}
              </button>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="px-3 pb-3 border-t border-white/10 pt-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-150"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="bg-[#1a2535] border-b border-white/[0.07] px-4 sm:px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-white/50 hover:bg-white/[0.06] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-white truncate">{PANEL_TITLES[activePanel]}</h1>
            <p className="text-xs text-white/40">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </header>

        {/* Panel content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {panels[activePanel]}
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 border-t border-white/[0.07] bg-[#1a2535] px-4 py-3 text-center">
          <p className="text-white/30 text-xs">© 2026 Sunshine Clinical Laboratory LLC. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
