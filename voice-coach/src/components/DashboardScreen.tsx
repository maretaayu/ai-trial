import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  TrendingUp, Phone, Target, Award, Zap, Heart, BookOpen, Mic,
  ChevronRight, BarChart2, Sparkles, Menu,
} from 'lucide-react';
import { Session, CallRecord, CallAnalysis } from '../types';
import { useFirestore } from '../hooks/useFirestore';

// ── Helpers ────────────────────────────────────────────────────────────────────

function scoreColor(score: number) {
  if (score >= 75) return { text: 'text-emerald-600', bg: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700' };
  if (score >= 50) return { text: 'text-amber-600', bg: 'bg-amber-500', light: 'bg-amber-50 text-amber-700' };
  return { text: 'text-red-500', bg: 'bg-red-400', light: 'bg-red-50 text-red-600' };
}

function formatDate(d: Date) {
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

// ── SVG sparkline ──────────────────────────────────────────────────────────────

function Sparkline({ values, color = '#6366f1' }: { values: number[]; color?: string }) {
  if (values.length < 2) return null;
  const W = 120, H = 36, PAD = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = PAD + (i / (values.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((v - min) / range) * (H - PAD * 2);
    return `${x},${y}`;
  }).join(' ');
  const areaPts = `${PAD},${H} ${pts} ${W - PAD},${H}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPts} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last dot */}
      <circle
        cx={PAD + (W - PAD * 2)}
        cy={H - PAD - ((values[values.length - 1] - min) / range) * (H - PAD * 2)}
        r="3" fill={color}
      />
    </svg>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon, label, value, sub, trend, sparkValues, iconBg,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  trend?: number;
  sparkValues?: number[];
  iconBg: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        {sparkValues && sparkValues.length >= 2 && (
          <Sparkline values={sparkValues} color={iconBg.includes('brand') ? '#6366f1' : iconBg.includes('emerald') ? '#10b981' : '#f59e0b'} />
        )}
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
        <p className="text-xs text-slate-400 mt-1">{label}</p>
      </div>
      {(sub || trend !== undefined) && (
        <div className="flex items-center gap-2">
          {trend !== undefined && (
            <span className={`text-xs font-semibold ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)} pts
            </span>
          )}
          {sub && <span className="text-xs text-slate-400">{sub}</span>}
        </div>
      )}
    </div>
  );
}

// ── Skill bar ─────────────────────────────────────────────────────────────────

const SKILL_META: { key: keyof CallAnalysis['scores']; label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { key: 'clarity',    label: 'Clarity',    icon: BookOpen, color: 'bg-blue-500' },
  { key: 'confidence', label: 'Confidence', icon: Zap,      color: 'bg-purple-500' },
  { key: 'energy',     label: 'Energy',     icon: Sparkles, color: 'bg-amber-500' },
  { key: 'empathy',    label: 'Empathy',    icon: Heart,    color: 'bg-rose-500' },
  { key: 'structure',  label: 'Structure',  icon: Target,   color: 'bg-emerald-500' },
];

function SkillBreakdown({ avgScores }: { avgScores: Record<string, number> }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="h-4 w-4 text-brand-600" />
        <h3 className="text-sm font-bold text-slate-800">Skill Breakdown</h3>
        <span className="ml-auto text-xs text-slate-400">rata-rata semua call</span>
      </div>
      <div className="space-y-3.5">
        {SKILL_META.map(({ key, label, icon: Icon, color }) => {
          const v = Math.round(avgScores[key] ?? 0);
          return (
            <div key={key} className="flex items-center gap-3">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${color} bg-opacity-15`}>
                <Icon className={`h-3.5 w-3.5 ${color.replace('bg-', 'text-')}`} />
              </div>
              <span className="w-20 text-xs font-medium text-slate-600">{label}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${color}`}
                  style={{ width: `${v}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs font-bold text-slate-700">{v}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Score trend chart with labels ─────────────────────────────────────────────

function ScoreTrendChart({ calls }: { calls: { date: Date; score: number; label: string }[] }) {
  if (calls.length < 2) return (
    <div className="flex h-32 items-center justify-center text-sm text-slate-400">
      Butuh minimal 2 call untuk menampilkan tren
    </div>
  );

  const W = 800, H = 160, PAD = 16;
  const min = 0, max = 100;
  const range = max - min;

  const pts = calls.map((c, i) => {
    const x = PAD + (i / (calls.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((c.score - min) / range) * (H - PAD * 2);
    return { x, y, ...c };
  });

  const polyPts = pts.map(p => `${p.x},${p.y}`).join(' ');
  const areaPts = `${pts[0].x},${H - PAD} ${polyPts} ${pts[pts.length - 1].x},${H - PAD}`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto drop-shadow-sm">
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines at 25, 50, 75 */}
        {[25, 50, 75].map(v => {
          const y = H - PAD - ((v - min) / range) * (H - PAD * 2);
          return <line key={v} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
        })}
        <polygon points={areaPts} fill="url(#trendGrad)" />
        <polyline points={polyPts} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={p.score >= 75 ? '#10b981' : p.score >= 50 ? '#f59e0b' : '#f87171'} stroke="white" strokeWidth="1.5" />
        ))}
      </svg>
      {/* X-axis labels */}
      <div className="flex justify-between mt-2 px-1">
        {calls.length <= 7
          ? calls.map((c, i) => (
              <span key={i} className="text-[9px] text-slate-400">{formatDate(c.date)}</span>
            ))
          : [calls[0], calls[Math.floor(calls.length / 2)], calls[calls.length - 1]].map((c, i) => (
              <span key={i} className="text-[9px] text-slate-400">{formatDate(c.date)}</span>
            ))
        }
      </div>
    </div>
  );
}

// ── Session leaderboard row ───────────────────────────────────────────────────

function SessionRow({ session, rank, onSelect }: { session: Session; rank: number; onSelect: () => void }) {
  const score = session.lastScore ?? 0;
  const col = scoreColor(score);
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50 active:scale-[0.99]"
    >
      <span className="w-5 text-xs font-bold text-slate-400 text-center">#{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-slate-800">{session.name}</p>
        <p className="text-xs text-slate-400">{session.callCount} call · {formatDate(session.lastCallAt ?? session.createdAt)}</p>
      </div>
      <span className={`shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${col.light}`}>{score}</span>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

interface Props {
  user: User;
  sessions: Session[];
  onOpenSidebar: () => void;
  onSelectSession: (s: Session) => void;
}

interface AllCallData {
  date: Date;
  score: number;
  label: string;
  scores: CallAnalysis['scores'];
}

export default function DashboardScreen({ user, sessions, onOpenSidebar, onSelectSession }: Props) {
  const { loadCalls } = useFirestore(user);
  const [allCalls, setAllCalls] = useState<AllCallData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all calls from all sessions for deep analytics
  useEffect(() => {
    if (sessions.length === 0) { setLoading(false); return; }
    const sessionsWithCalls = sessions.filter(s => s.callCount > 0);
    if (sessionsWithCalls.length === 0) { setLoading(false); return; }

    Promise.all(
      sessionsWithCalls.map(s => loadCalls(s.id).then(calls => calls.map(c => ({
        date: c.timestamp,
        score: c.analysis?.overallScore ?? 0,
        label: s.name,
        scores: c.analysis?.scores ?? { clarity: 0, confidence: 0, energy: 0, empathy: 0, structure: 0 },
      }))))
    ).then(nested => {
      const flat = nested.flat().sort((a, b) => a.date.getTime() - b.date.getTime());
      setAllCalls(flat);
      setLoading(false);
    });
  }, [sessions]);

  // ── Derived stats ──────────────────────────────────────────────────────────

  const totalSessions = sessions.length;
  const totalCalls = allCalls.length;
  const avgScore = totalCalls > 0
    ? Math.round(allCalls.reduce((s, c) => s + c.score, 0) / totalCalls)
    : 0;
  const bestScore = totalCalls > 0 ? Math.max(...allCalls.map(c => c.score)) : 0;

  // Trend: compare last 3 vs previous 3 calls
  const scoreTrend = (() => {
    if (allCalls.length < 4) return undefined;
    const last3 = allCalls.slice(-3).reduce((s, c) => s + c.score, 0) / 3;
    const prev3 = allCalls.slice(-6, -3).reduce((s, c) => s + c.score, 0) / 3;
    return Math.round(last3 - prev3);
  })();

  // Avg per skill
  const avgSkills: Record<string, number> = {};
  if (allCalls.length > 0) {
    const keys = Object.keys(allCalls[0].scores) as (keyof CallAnalysis['scores'])[];
    keys.forEach(k => {
      avgSkills[k] = allCalls.reduce((s, c) => s + (c.scores[k] ?? 0), 0) / allCalls.length;
    });
  }

  // Weakest skill
  const weakestSkill = Object.entries(avgSkills).sort((a, b) => a[1] - b[1])[0];
  const strongestSkill = Object.entries(avgSkills).sort((a, b) => b[1] - a[1])[0];

  // Top sessions by score
  const topSessions = [...sessions]
    .filter(s => s.lastScore !== undefined && s.callCount > 0)
    .sort((a, b) => (b.lastScore ?? 0) - (a.lastScore ?? 0))
    .slice(0, 5);

  // Scores for sparklines (last 8)
  const recentScores = allCalls.slice(-8).map(c => c.score);

  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-3 bg-white border-b border-slate-100 px-4 pt-5 pb-4">
        <button
          onClick={onOpenSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-black text-slate-900">Performance Dashboard</h1>
          <p className="text-xs text-slate-400">
            {user.displayName || user.email} · {totalCalls > 0 ? `${totalCalls} call total` : 'Belum ada call'}
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-4">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          </div>
        ) : totalCalls === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
              <Mic className="h-8 w-8 text-brand-400" />
            </div>
            <h3 className="text-base font-bold text-slate-700">Mulai latihan dulu!</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-xs leading-relaxed">
              Dashboard akan menampilkan insight performa setelah kamu menyelesaikan minimal 1 sesi call.
            </p>
          </div>
        ) : (
          <>
            {/* Insight callout */}
            {weakestSkill && (
              <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 p-4 text-white">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 shrink-0 mt-0.5 opacity-80" />
                  <div>
                    <p className="text-xs font-semibold opacity-80 uppercase tracking-wide">Coach Insight</p>
                    <p className="mt-1 text-sm font-medium leading-snug">
                      Fokuskan latihan pada <strong>{weakestSkill[0]}</strong> (avg {Math.round(weakestSkill[1])}). {' '}
                      {strongestSkill && (
                        <>Kamu sudah bagus di <strong>{strongestSkill[0]}</strong> (avg {Math.round(strongestSkill[1])})!</>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stat cards grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={Award}
                label="Avg Score"
                value={avgScore}
                trend={scoreTrend}
                sub={scoreTrend === undefined ? 'dari semua call' : 'vs 3 call sebelumnya'}
                sparkValues={recentScores}
                iconBg="bg-brand-600"
              />
              <StatCard
                icon={TrendingUp}
                label="Best Score"
                value={bestScore}
                sub="score tertinggi"
                iconBg="bg-emerald-500"
              />
              <StatCard
                icon={Phone}
                label="Total Call"
                value={totalCalls}
                sub={`${totalSessions} sesi aktif`}
                iconBg="bg-amber-500"
              />
              <StatCard
                icon={Target}
                label="Sesi"
                value={totalSessions}
                sub={`${sessions.filter(s => s.callCount > 0).length} udah ada call`}
                iconBg="bg-purple-500"
              />
            </div>

            {/* Score trend */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-800">Tren Score</h3>
                <span className="ml-auto text-xs text-slate-400">{allCalls.length} call</span>
              </div>
              <ScoreTrendChart calls={allCalls} />

              {/* Score distribution */}
              {allCalls.length > 0 && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
                  {[
                    { label: '≥75 Bagus', count: allCalls.filter(c => c.score >= 75).length, color: 'bg-emerald-500' },
                    { label: '50–74 Cukup', count: allCalls.filter(c => c.score >= 50 && c.score < 75).length, color: 'bg-amber-500' },
                    { label: '<50 Perlu Kerja Keras', count: allCalls.filter(c => c.score < 50).length, color: 'bg-red-400' },
                  ].map(({ label, count, color }) => (
                    <div key={label} className="flex-1 text-center">
                      <p className="text-lg font-black text-slate-800">{count}</p>
                      <div className={`mx-auto mt-1 h-1 w-8 rounded-full ${color}`} />
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight">{label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Skill breakdown */}
            {Object.keys(avgSkills).length > 0 && (
              <SkillBreakdown avgScores={avgSkills} />
            )}

            {/* Top sessions */}
            {topSessions.length > 0 && (
              <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-brand-600" />
                  <h3 className="text-sm font-bold text-slate-800">Top Sesi</h3>
                  <span className="ml-auto text-xs text-slate-400">berdasarkan score tertinggi</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {topSessions.map((s, i) => (
                    <SessionRow
                      key={s.id}
                      session={s}
                      rank={i + 1}
                      onSelect={() => onSelectSession(s)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pad for bottom safe area */}
            <div className="h-6" />
          </>
        )}
      </div>
    </div>
  );
}
