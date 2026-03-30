import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { User } from 'firebase/auth';
import { Mic, Plus, Clock, TrendingUp, LogOut, ChevronRight } from 'lucide-react';
import { auth } from '../firebase';
import { useFirestore } from '../hooks/useFirestore';
import { Session } from '../types';
import NewSessionModal from './NewSessionModal';

function scoreColor(score: number | undefined) {
  if (!score) return 'text-slate-400';
  if (score >= 75) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-500';
  return 'text-red-500';
}

function scoreBg(score: number | undefined) {
  if (!score) return 'bg-slate-100 text-slate-400';
  if (score >= 75) return 'bg-emerald-50 text-emerald-700';
  if (score >= 50) return 'bg-amber-50 text-amber-700';
  return 'bg-red-50 text-red-600';
}

function formatDate(d?: Date): string {
  if (!d) return '';
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / 1000;
  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)}m lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}j lalu`;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

interface Props {
  user: User;
  onOpenSession: (session: Session) => void;
}

export default function SessionsScreen({ user, onOpenSession }: Props) {
  const { sessions, sessionsLoading, createSession } = useFirestore(user);
  const [showModal, setShowModal] = useState(false);

  const handleCreate = async (name: string, scenario: string, voice: string) => {
    const session = await createSession(name, scenario, voice);
    if (session) onOpenSession(session);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 shadow-sm shadow-brand-600/20">
              <Mic className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">AI Sales Coach</h1>
              <p className="text-xs text-slate-500 leading-tight">{user.displayName || user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats bar */}
      {sessions.length > 0 && (
        <div className="bg-white border-b border-slate-100 px-5 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              <span><strong className="text-slate-800">{sessions.length}</strong> sesi</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>
                <strong className="text-slate-800">
                  {sessions.reduce((a, s) => a + s.callCount, 0)}
                </strong> total call
              </span>
            </div>
            {sessions.some(s => s.lastScore) && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Skor rata-rata:</span>
                <strong className={scoreColor(
                  Math.round(sessions.filter(s => s.lastScore).reduce((a, s) => a + (s.lastScore ?? 0), 0) /
                  sessions.filter(s => s.lastScore).length)
                )}>
                  {Math.round(sessions.filter(s => s.lastScore).reduce((a, s) => a + (s.lastScore ?? 0), 0) /
                  sessions.filter(s => s.lastScore).length)}
                </strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Session list */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4">
        {sessionsLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
              <Mic className="h-8 w-8 text-brand-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-700">Belum ada sesi latihan</h3>
            <p className="mt-1 text-sm text-slate-400">Buat sesi pertama kamu untuk mulai latihan sales</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              Buat Sesi Pertama
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onOpenSession(session)}
                className="group flex w-full items-center gap-4 rounded-2xl bg-white px-4 py-4 text-left shadow-sm border border-slate-100 transition hover:border-brand-200 hover:shadow-md active:scale-[0.99]"
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 group-hover:bg-brand-100 transition">
                  <Mic className="h-5 w-5 text-brand-600" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-slate-900">{session.name}</h3>
                    {session.lastScore !== undefined && (
                      <span className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-bold ${scoreBg(session.lastScore)}`}>
                        {session.lastScore}
                      </span>
                    )}
                  </div>
                  {session.scenario && (
                    <p className="mt-0.5 truncate text-xs text-slate-400">{session.scenario}</p>
                  )}
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-400">
                    {session.callCount > 0 && (
                      <span>{session.callCount} call</span>
                    )}
                    {session.lastCallAt && (
                      <span>{formatDate(session.lastCallAt)}</span>
                    )}
                    {session.callCount === 0 && (
                      <span className="text-brand-500 font-medium">Belum ada call</span>
                    )}
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-brand-400 transition" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <div className="px-5 pb-8 pt-3 bg-slate-50">
        <button
          onClick={() => setShowModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" />
          Sesi Latihan Baru
        </button>
      </div>

      {showModal && (
        <NewSessionModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
