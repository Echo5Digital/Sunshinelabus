'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, X, RefreshCw, AlertCircle, CheckCircle2,
  ChevronLeft, ChevronRight, UserPlus, KeyRound, Trash2,
  ShieldCheck, Shield, User,
} from 'lucide-react';
import {
  fetchUsers, createUser, changeUserPassword, deleteUser, getAdminUser,
} from '@/lib/api';

const PAGE_SIZE = 20;

// ── Role config ───────────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  super_admin: {
    label: 'Super Admin',
    bg: 'bg-sunshine-blue/20',
    text: 'text-sunshine-sky',
    icon: ShieldCheck,
  },
  admin: {
    label: 'Admin',
    bg: 'bg-violet-500/20',
    text: 'text-violet-300',
    icon: Shield,
  },
  staff: {
    label: 'Staff',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-300',
    icon: User,
  },
};

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
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
const avatarColor = (str = '') => AVATAR_COLORS[str.charCodeAt(0) % AVATAR_COLORS.length];

// ── RoleBadge ─────────────────────────────────────────────────────────────────
function RoleBadge({ role }) {
  const cfg = ROLE_CONFIG[role] || ROLE_CONFIG.staff;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

// ── CreateUserModal ───────────────────────────────────────────────────────────
function CreateUserModal({ callerRole, onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'staff' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createUser(form);
      onCreated();
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = callerRole === 'super_admin'
    ? [{ value: 'admin', label: 'Admin' }, { value: 'staff', label: 'Staff' }]
    : [{ value: 'staff', label: 'Staff' }];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1a2535] border border-white/[0.10] rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-sunshine-sky" />
            <h2 className="text-base font-semibold text-white">Create User</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/60 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Jane Smith"
              className="w-full border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/60 uppercase tracking-wide">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="jane@example.com"
              className="w-full border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/60 uppercase tracking-wide">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="Min 8 characters"
              className="w-full border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/60 uppercase tracking-wide">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              className="w-full border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-[#1a2535]"
            >
              {roleOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white bg-white/[0.06] hover:bg-white/[0.10] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-sunshine-blue hover:bg-sunshine-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating…' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── ChangePasswordModal ───────────────────────────────────────────────────────
function ChangePasswordModal({ user, onClose, onUpdated }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await changeUserPassword(user.id, password);
      onUpdated();
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1a2535] border border-white/[0.10] rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-sunshine-sky" />
            <h2 className="text-base font-semibold text-white">Change Password</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pt-4 pb-2">
          <p className="text-sm text-white/60">
            Changing password for <span className="text-white font-medium">{user.name}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-medium text-white/60 uppercase tracking-wide">New Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 characters"
              className="w-full border border-white/[0.10] rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-white/[0.06]"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white bg-white/[0.06] hover:bg-white/[0.10] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-sunshine-blue hover:bg-sunshine-blue/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {loading ? 'Saving…' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── DeleteConfirmModal ────────────────────────────────────────────────────────
function DeleteConfirmModal({ user, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      await deleteUser(user.id);
      onDeleted();
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1a2535] border border-white/[0.10] rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-400" />
            <h2 className="text-base font-semibold text-white">Delete User</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          <p className="text-sm text-white/70">
            Are you sure you want to delete{' '}
            <span className="text-white font-semibold">{user.name}</span>?{' '}
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white bg-white/[0.06] hover:bg-white/[0.10] transition-colors">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main AdminUsersPanel ──────────────────────────────────────────────────────
export default function AdminUsersPanel({ adminRole }) {
  const [users, setUsers]                     = useState([]);
  const [total, setTotal]                     = useState(0);
  const [page, setPage]                       = useState(0);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState(null);
  const [success, setSuccess]                 = useState(null);

  // Filters
  const [search, setSearch]                   = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [roleFilter, setRoleFilter]           = useState('');
  const searchTimer = useRef(null);

  // Modal state
  const [showCreate, setShowCreate]           = useState(false);
  const [changePwUser, setChangePwUser]       = useState(null);
  const [deleteTargetUser, setDeleteTargetUser] = useState(null);

  const currentUser = getAdminUser();
  const isSuperAdmin = adminRole === 'super_admin';
  const canCreate = isSuperAdmin || adminRole === 'admin';

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

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
      if (roleFilter) params.role = roleFilter;

      const data = await fetchUsers(params);
      setUsers(data.data || []);
      setTotal(data.total || 0);
    } catch {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, roleFilter]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(0); }, [debouncedSearch, roleFilter]);

  const clearFilters = () => {
    setSearch('');
    setDebouncedSearch('');
    setRoleFilter('');
    setPage(0);
  };

  const hasFilters = debouncedSearch || roleFilter;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleCreated = () => {
    setShowCreate(false);
    showSuccess('User created successfully');
    load();
  };

  const handlePasswordUpdated = () => {
    setChangePwUser(null);
    showSuccess('Password updated successfully');
  };

  const handleDeleted = () => {
    setDeleteTargetUser(null);
    showSuccess('User deleted successfully');
    load();
  };

  // Role filter options: admins can't filter for super_admin
  const roleFilterOptions = isSuperAdmin
    ? [{ value: '', label: 'All Roles' }, { value: 'super_admin', label: 'Super Admin' }, { value: 'admin', label: 'Admin' }, { value: 'staff', label: 'Staff' }]
    : [{ value: '', label: 'All Roles' }, { value: 'admin', label: 'Admin' }, { value: 'staff', label: 'Staff' }];

  return (
    <div className="space-y-4">
      {/* Filter / Toolbar */}
      <div className="bg-[#1a2535] rounded-2xl border border-white/[0.07] p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(0); }}
            className="border border-white/[0.10] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sunshine-blue bg-[#1a2535]"
          >
            {roleFilterOptions.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search name or email…"
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
            className="p-2 rounded-xl text-white/40 hover:text-sunshine-sky hover:bg-white/[0.08] transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {canCreate && (
            <button
              onClick={() => setShowCreate(true)}
              className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-sunshine-blue hover:bg-sunshine-blue/80 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Add User</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback */}
      {success && (
        <div className="flex items-center gap-2 bg-green-900/30 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}

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
        ) : users.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-white/50 text-sm">No users found.</p>
          </div>
        ) : (
          <>
            {/* ── Mobile card list ─────────────────────────────────────────── */}
            <div className="block md:hidden divide-y divide-white/[0.05]">
              {users.map((u) => (
                <div key={u.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    {/* Avatar + info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${avatarColor(u.name)}`}>
                        {getInitials(u.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white text-sm truncate">{u.name}</p>
                        <p className="text-xs text-white/50 truncate">{u.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                    <div className="flex items-center gap-2">
                      <RoleBadge role={u.role} />
                      <span className="text-xs text-white/40">{formatDate(u.created_at)}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {isSuperAdmin && (
                        <>
                          <button
                            onClick={() => setChangePwUser(u)}
                            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-sunshine-sky bg-white/[0.06] hover:bg-white/[0.10] px-2.5 py-1.5 rounded-lg transition-colors"
                            title="Change password"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Password</span>
                          </button>
                          {currentUser?.id !== u.id && (
                            <button
                              onClick={() => setDeleteTargetUser(u)}
                              className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1.5 rounded-lg transition-colors"
                              title="Delete user"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Desktop table ─────────────────────────────────────────────── */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/[0.07]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">User</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide">Created</th>
                    {isSuperAdmin && (
                      <th className="px-4 py-3 text-xs font-semibold text-white/60 uppercase tracking-wide text-right">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${avatarColor(u.name)}`}>
                            {getInitials(u.name)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{u.name}</p>
                            <p className="text-xs text-white/50">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <RoleBadge role={u.role} />
                      </td>
                      <td className="px-4 py-3 text-white/55 text-sm">{formatDate(u.created_at)}</td>
                      {isSuperAdmin && (
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setChangePwUser(u)}
                              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-sunshine-sky bg-white/[0.06] hover:bg-white/[0.10] px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                              Password
                            </button>
                            {currentUser?.id !== u.id && (
                              <button
                                onClick={() => setDeleteTargetUser(u)}
                                className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.07]">
                <p className="text-xs text-white/40">
                  {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} of {total}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-white/50">{page + 1} / {totalPages}</span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showCreate && (
        <CreateUserModal
          callerRole={adminRole}
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}
      {changePwUser && (
        <ChangePasswordModal
          user={changePwUser}
          onClose={() => setChangePwUser(null)}
          onUpdated={handlePasswordUpdated}
        />
      )}
      {deleteTargetUser && (
        <DeleteConfirmModal
          user={deleteTargetUser}
          onClose={() => setDeleteTargetUser(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}
