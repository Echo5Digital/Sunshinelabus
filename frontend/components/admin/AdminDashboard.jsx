'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard, CalendarDays, Calendar, Ban,
  LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { clearAdminToken } from '@/lib/api';
import AdminOverviewPanel from './AdminOverviewPanel';
import AdminAppointmentsPanel from './AdminAppointmentsPanel';
import AdminCalendarPanel from './AdminCalendarPanel';
import AdminTimeBlocksPanel from './AdminTimeBlocksPanel';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'time-blocks', label: 'Time Blocking', icon: Ban },
];

const PANEL_TITLES = {
  overview: 'Overview',
  appointments: 'Appointments',
  calendar: 'Calendar',
  'time-blocks': 'Time Blocking',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearAdminToken();
    router.push('/admin/login');
  };

  const handleNav = (id) => {
    setActivePanel(id);
    setSidebarOpen(false);
  };

  const panels = {
    overview: <AdminOverviewPanel onViewAll={() => setActivePanel('appointments')} />,
    appointments: <AdminAppointmentsPanel />,
    calendar: <AdminCalendarPanel />,
    'time-blocks': <AdminTimeBlocksPanel />,
  };

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
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-sunshine-blue/30 text-sunshine-sky px-3 py-1 rounded-full uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-sunshine-sky animate-pulse" />
            Super Admin
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activePanel === id;
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
                <Icon className={`w-4 h-4 ${isActive ? 'text-sunshine-sky' : ''}`} />
                {label}
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-sunshine-sky" />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 border-t border-white/10 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-red-500/20 transition-all duration-150"
          >
            <LogOut className="w-4 h-4" />
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
          <div>
            <h1 className="text-lg font-bold text-white">{PANEL_TITLES[activePanel]}</h1>
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
        <footer className="flex-shrink-0 border-t border-white/[0.07] bg-[#1a2535] px-6 py-3 text-center">
          <p className="text-white/30 text-xs">© 2026 Sunshine Clinical Laboratory LLC. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
