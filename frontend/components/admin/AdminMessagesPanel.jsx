'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, X, RefreshCw, AlertCircle,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Phone, MapPin, Mail, Clock,
} from 'lucide-react';
import { fetchAdminContacts, markContactAsRead } from '@/lib/api';

const PAGE_SIZE = 20;

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
};

const formatTime = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  });
};

const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const AVATAR_COLORS = [
  'bg-blue-500/80', 'bg-violet-500/80', 'bg-emerald-500/80',
  'bg-rose-500/80', 'bg-amber-500/80', 'bg-cyan-500/80',
];

const avatarColor = (id = '') => AVATAR_COLORS[id.charCodeAt(0) % AVATAR_COLORS.length];

export default function AdminMessagesPanel({ onMarkRead }) {
  const [messages, setMessages]               = useState([]);
  const [total, setTotal]                     = useState(0);
  const [page, setPage]                       = useState(0);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState(null);
  const [search, setSearch]                   = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expandedId, setExpandedId]           = useState(null);
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
      if (debouncedSearch) params.search = debouncedSearch;
      const data = await fetchAdminContacts(params);
      setMessages(data.data  || []);
      setTotal(data.total    || 0);
    } catch {
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setExpandedId(null); }, [page]);

  // Auto-refresh every 30s — skip when a message is expanded to avoid collapsing it
  useEffect(() => {
    if (expandedId !== null) return;
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load, expandedId]);

  const clearSearch = () => {
    setSearch('');
    setDebouncedSearch('');
    setPage(0);
  };

  const handleExpand = async (msg) => {
    const isOpening = expandedId !== msg.id;
    setExpandedId(isOpening ? msg.id : null);

    if (isOpening && !msg.is_read) {
      // Optimistically mark as read in local state
      setMessages((prev) =>
        prev.map((m) => m.id === msg.id ? { ...m, is_read: true } : m)
      );
      onMarkRead?.();
      try {
        await markContactAsRead(msg.id);
      } catch {
        // revert on failure
        setMessages((prev) =>
          prev.map((m) => m.id === msg.id ? { ...m, is_read: false } : m)
        );
      }
    }
  };

  const totalPages  = Math.ceil(total / PAGE_SIZE);
  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-4">

      {/* ── Header / filter bar ─────────────────────────────────────────────── */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Title + counts */}
          <div className="flex items-center gap-2.5 mr-auto min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-sunshine-blue/20 flex items-center justify-center">
                <Mail className="w-4 h-4 text-sunshine-sky" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-white">All Messages</span>
                {total > 0 && (
                  <span className="text-xs font-medium bg-white/10 text-white/60 px-2 py-0.5 rounded-full">
                    {total} total
                  </span>
                )}
                {unreadCount > 0 && (
                  <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search name, email or message…"
              className="w-full border border-white/[0.10] rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06]"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={load}
            className="p-2 rounded-xl text-white/40 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors flex-shrink-0"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] shadow-sm overflow-hidden">

        {error && (
          <div className="flex items-center gap-2 m-4 bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] animate-pulse">
                <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                  <div className="h-3 bg-white/[0.06] rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-white/50 text-sm font-medium">No messages found</p>
            {debouncedSearch && (
              <p className="text-white/30 text-xs mt-1">Try adjusting your search terms</p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-white/[0.05]">
            {messages.map((msg) => {
              const isExpanded = expandedId === msg.id;
              const isUnread   = !msg.is_read;

              return (
                <div
                  key={msg.id}
                  className={`transition-colors ${isUnread ? 'bg-sunshine-blue/[0.04]' : ''}`}
                >
                  {/* ── Row ──────────────────────────────────────────────── */}
                  <button
                    className="w-full text-left px-4 py-3.5 flex items-start gap-3 hover:bg-white/[0.03] transition-colors"
                    onClick={() => handleExpand(msg)}
                  >
                    {/* Unread dot */}
                    <div className="flex-shrink-0 flex items-center mt-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full mr-1 transition-opacity ${isUnread ? 'bg-sunshine-sky opacity-100' : 'opacity-0'}`} />
                    </div>

                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${avatarColor(msg.id)}`}>
                      {getInitials(msg.name)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-0.5 flex-wrap">
                        <span className={`text-sm truncate max-w-[180px] sm:max-w-none ${isUnread ? 'font-semibold text-white' : 'font-medium text-white/85'}`}>
                          {msg.name}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-white/35 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(msg.created_at)}</span>
                          <span className="hidden sm:inline">· {formatTime(msg.created_at)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-white/45 truncate mb-1">{msg.email}</p>
                      <p className={`text-xs leading-relaxed line-clamp-1 ${isUnread ? 'text-white/70' : 'text-white/40'}`}>
                        {msg.message}
                      </p>
                    </div>

                    {/* Expand icon */}
                    <div className="flex-shrink-0 mt-1">
                      {isExpanded
                        ? <ChevronUp className="w-4 h-4 text-white/30" />
                        : <ChevronDown className="w-4 h-4 text-white/30" />
                      }
                    </div>
                  </button>

                  {/* ── Expanded detail ──────────────────────────────────── */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 ml-[52px] mr-4 space-y-4">
                      {/* Message body */}
                      <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
                        <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">Message</p>
                        <p className="text-sm text-white/85 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>

                      {/* Contact details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <a
                          href={`mailto:${msg.email}`}
                          className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-xl px-3 py-2.5 transition-colors group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="w-3.5 h-3.5 text-sunshine-sky flex-shrink-0" />
                          <span className="text-xs text-white/65 group-hover:text-white/85 truncate transition-colors">{msg.email}</span>
                        </a>
                        {msg.phone && (
                          <a
                            href={`tel:${msg.phone}`}
                            className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-xl px-3 py-2.5 transition-colors group"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            <span className="text-xs text-white/65 group-hover:text-white/85 transition-colors">{msg.phone}</span>
                          </a>
                        )}
                        {msg.address && (
                          <div className="flex items-start gap-2 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 sm:col-span-2">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-white/65">{msg.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Pagination ──────────────────────────────────────────────────── */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.07]">
            <p className="text-xs text-white/50">
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg text-white/40 hover:text-sunshine-sky disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-white/50">Page {page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-1.5 rounded-lg text-white/40 hover:text-sunshine-sky disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
