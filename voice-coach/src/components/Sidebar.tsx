import { useState, useMemo } from 'react';
import { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
  BrainCircuit, Mic, Plus, MessageSquare, BarChart2,
  Settings, Search, Home, LogOut, Trash2, ChevronRight,
} from 'lucide-react';
import { Session } from '../types';

// ── Date grouping ─────────────────────────────────────────────────────────────

function groupLabel(d: Date): string {
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (daysDiff === 0) return 'Hari ini';
  if (daysDiff === 1) return 'Kemarin';
  if (daysDiff <= 7) return '7 Hari Lalu';
  if (daysDiff <= 30) return '30 Hari Lalu';
  return 'Lebih Lama';
}

function groupSessions(sessions: Session[]) {
  const order = ['Hari ini', 'Kemarin', '7 Hari Lalu', '30 Hari Lalu', 'Lebih Lama'];
  const map: Record<string, Session[]> = {};
  for (const s of sessions) {
    const ref = s.lastCallAt ?? s.createdAt;
    const label = groupLabel(ref);
    if (!map[label]) map[label] = [];
    map[label].push(s);
  }
  return order.filter(k => map[k]).map(k => ({ label: k, items: map[k] }));
}

// ── Avatar initials ───────────────────────────────────────────────────────────

function initials(user: User) {
  if (user.displayName) {
    return user.displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  }
  return (user.email ?? 'U')[0].toUpperCase();
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  user: User;
  sessions: Session[];
  sessionsLoading: boolean;
  activeSessionId?: string;
  onSelectSession: (session: Session) => void;
  onNewChat: () => void;
  onOpenDashboard: () => void;
  isDashboard: boolean;
  onOpenSettings: () => void;
  onDeleteSession: (sessionId: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  user, sessions, sessionsLoading, activeSessionId,
  onSelectSession, onNewChat, onOpenDashboard, isDashboard,
  onOpenSettings, onDeleteSession, isOpen, onClose,
}: Props) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [imgError, setImgError] = useState(false);

  const filtered = useMemo(() =>
    sessions.filter(s => s.name.toLowerCase().includes(query.toLowerCase())),
    [sessions, query]
  );

  const groups = useMemo(() => groupSessions(filtered), [filtered]);

  const handleDeleteConfirm = () => {
    if (!confirmDeleteId) return;
    onDeleteSession(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 flex w-[300px] flex-col bg-white border-r border-slate-100
        transition-transform duration-300
        lg:relative lg:translate-x-0 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* ── Brand ── */}
        <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <BrainCircuit className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold text-slate-900">AI Sales Coach</span>
        </div>

        {/* ── Search ── */}
        <div className="px-4 mb-2">
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-100 px-3 py-3">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Cari sesi..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
            />
          </div>
        </div>

        {/* ── Primary nav ── */}
        <nav className="px-3 py-2 space-y-1">
          <button
            onClick={() => { onNewChat(); onClose(); }}
            className={`flex w-full items-center gap-3 rounded-xl border border-dashed px-4 py-3 text-sm transition ${
              !activeSessionId && !isDashboard
                ? 'border-brand-300 bg-brand-50 text-brand-700 font-semibold'
                : 'border-slate-200 text-slate-500 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600'
            }`}
          >
            <Plus className="h-4 w-4" />
            Sesi baru
          </button>
          <button
            onClick={() => { onOpenDashboard(); onClose(); }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
              isDashboard
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            Performance
          </button>
        </nav>

        {/* ── Session list ── */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-3 pb-2 mt-2">
          {sessionsLoading ? (
            <div className="flex justify-center py-8">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" />
            </div>
          ) : groups.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">
              {query ? 'Sesi tidak ditemukan' : 'Belum ada sesi latihan'}
            </p>
          ) : (
            <div className="space-y-4 pt-1">
              {groups.map(group => (
                <div key={group.label}>
                  <p className="px-2 pb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.items.map(session => {
                      const isActive = session.id === activeSessionId;
                      return (
                        <div key={session.id} className="group relative">
                          <button
                            onClick={() => { onSelectSession(session); onClose(); }}
                            className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 pr-8 text-left transition ${
                              isActive
                                ? 'bg-brand-50 text-brand-700'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                            }`}
                          >
                            {/* Name + subtitle */}
                            <div className="flex-1 min-w-0">
                              <p className={`truncate text-sm font-semibold ${isActive ? 'text-brand-700' : 'text-slate-800'}`}>
                                {session.name}
                              </p>
                              {session.callCount > 0 ? (
                                <p className="truncate text-xs text-slate-400 mt-0.5">
                                  {session.callCount} call
                                  {session.lastScore !== undefined && ` · ${session.lastScore} pts`}
                                </p>
                              ) : session.lastMessageText ? (
                                <p className="truncate text-xs text-slate-400 mt-0.5">{session.lastMessageText}</p>
                              ) : null}
                            </div>

                            {/* Score badge */}
                            {session.lastScore !== undefined && (
                              <span className={`shrink-0 text-xs font-bold ${
                                session.lastScore >= 75 ? 'text-emerald-500'
                                : session.lastScore >= 50 ? 'text-amber-500'
                                : 'text-red-400'
                              }`}>
                                {session.lastScore}
                              </span>
                            )}
                          </button>

                          {/* Delete on hover */}
                          <button
                            onClick={e => { e.stopPropagation(); setConfirmDeleteId(session.id); }}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Bottom user profile ── */}
        <div className="border-t border-slate-100 px-3 py-3">
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white overflow-hidden">
              {user.photoURL && !imgError ? (
                <img 
                  src={user.photoURL} 
                  alt="Avatar" 
                  className="h-full w-full object-cover" 
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                initials(user)
              )}
            </div>
            {/* Name + email */}
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-semibold text-slate-800">
                {user.displayName || 'User'}
              </p>
              <p className="truncate text-[10px] text-slate-400">{user.email}</p>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => { onOpenSettings(); onClose(); }}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                title="Pengaturan"
              >
                <Settings className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => signOut(auth)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-400"
                title="Logout"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Delete confirmation */}
      {confirmDeleteId && (() => {
        const s = sessions.find(x => x.id === confirmDeleteId);
        return (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            onClick={() => setConfirmDeleteId(null)}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div
              className="relative z-10 w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-sm font-bold text-slate-900">Hapus sesi?</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                "{s?.name.slice(0, 60)}{(s?.name.length ?? 0) > 60 ? '…' : ''}" akan dihapus permanen.
              </p>
              <div className="mt-4 flex gap-2">
                <button onClick={handleDeleteConfirm} className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white hover:bg-red-500">Hapus</button>
                <button onClick={() => setConfirmDeleteId(null)} className="flex-1 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">Batal</button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
