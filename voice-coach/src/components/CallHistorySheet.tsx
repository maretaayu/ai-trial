import { useState } from 'react';
import { X, Star, Clock, MessageSquare, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { CallRecord, CallAnalysis } from '../types';

function formatDuration(secs: number) {
  if (secs < 60) return `${secs}d`;
  return `${Math.floor(secs / 60)}m ${secs % 60}d`;
}

function scoreBg(score: number) {
  if (score >= 75) return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
  if (score >= 50) return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
  return 'bg-slate-100 text-slate-500';
}

function scoreBarColor(score: number) {
  if (score >= 75) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-red-400';
}

const SCORE_KEYS: { key: keyof CallAnalysis['scores']; label: string }[] = [
  { key: 'clarity', label: 'Clarity' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'energy', label: 'Energy' },
  { key: 'empathy', label: 'Empathy' },
  { key: 'structure', label: 'Structure' },
];

// ── Full analysis view for a single call ─────────────────────────────────────

function CallAnalysisView({ call, index }: { call: CallRecord; index: number }) {
  const [showTranscript, setShowTranscript] = useState(false);
  const score = call.analysis?.overallScore ?? 0;

  return (
    <div className="space-y-4">
      {/* Header score card */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-lg font-black text-brand-600">
          {score}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-bold ${scoreBg(score)}`}>
            <Star className="h-3 w-3" /> Sesi Call #{index}
          </span>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {formatDuration(call.durationSecs)} ·{' '}
            {call.timestamp.toLocaleString('id-ID', {
              day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
            })}
          </div>
          {call.analysis?.summary && (
            <p className="mt-1 text-xs text-slate-500 leading-snug">"{call.analysis.summary}"</p>
          )}
        </div>
      </div>

      {/* Score bars */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 space-y-2.5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Skor Detail</p>
        {SCORE_KEYS.map(({ key, label }) => {
          const v = call.analysis?.scores?.[key] ?? 0;
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="w-20 text-xs text-slate-400">{label}</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(v)}`}
                  style={{ width: `${v}%` }}
                />
              </div>
              <span className="w-7 text-right text-xs font-bold text-slate-600">{v}</span>
            </div>
          );
        })}
      </div>

      {/* Strengths + Improvements */}
      {(call.analysis?.strengths?.length || call.analysis?.improvements?.length) && (
        <div className="grid grid-cols-2 gap-3">
          {call.analysis.strengths?.length ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-2">✅ Kelebihan</p>
              {call.analysis.strengths.map((s, i) => (
                <p key={i} className="text-xs text-emerald-600 leading-snug mb-1">• {s}</p>
              ))}
            </div>
          ) : null}
          {call.analysis?.improvements?.length ? (
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-3">
              <p className="text-xs font-semibold text-amber-700 mb-2">💡 Perlu Ditingkatkan</p>
              {call.analysis.improvements.map((s, i) => (
                <p key={i} className="text-xs text-amber-600 leading-snug mb-1">• {s}</p>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {/* Feedback */}
      {call.analysis?.feedback && (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Feedback Coach</p>
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{call.analysis.feedback}</p>
        </div>
      )}

      {/* Transcript toggle */}
      {call.transcript?.length > 0 && (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
          <button
            onClick={() => setShowTranscript(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-xs text-slate-500 hover:text-slate-700"
          >
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5" />
              Transkrip percakapan ({call.transcript.length} pesan)
            </span>
            {showTranscript ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showTranscript && (
            <div className="border-t border-slate-50 px-3 pb-3 pt-2 space-y-1.5 max-h-60 overflow-y-auto scrollbar-none bg-slate-50">
              {call.transcript.map((e, i) => (
                <div key={i} className={`flex ${e.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-xs leading-relaxed ${
                    e.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white text-slate-700 border border-slate-100'
                  }`}>{e.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Collapsed call card for list view ────────────────────────────────────────

function CallCard({ call, index, onClick }: { call: CallRecord; index: number; onClick: () => void }) {
  const score = call.analysis?.overallScore ?? 0;
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border border-slate-100 bg-white shadow-sm p-4 text-left transition hover:border-brand-200 hover:shadow-md active:scale-[0.99]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xs font-bold text-brand-600">
          #{index}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-bold ${scoreBg(score)}`}>
              <Star className="h-3 w-3" />{score}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="h-3 w-3" />{formatDuration(call.durationSecs)}
              <span>{call.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          {call.analysis?.summary && (
            <p className="mt-1.5 text-xs text-slate-500 leading-snug line-clamp-2">"{call.analysis.summary}"</p>
          )}
        </div>
      </div>
    </button>
  );
}

// ── Sheet component ───────────────────────────────────────────────────────────

interface Props {
  calls: CallRecord[];
  onClose: () => void;
  /** If provided, opens directly to this call's analysis instead of the list */
  initialCallId?: string;
}

export default function CallHistorySheet({ calls, onClose, initialCallId }: Props) {
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(
    initialCallId ? (calls.find(c => c.id === initialCallId) ?? null) : null
  );

  const selectedIndex = selectedCall
    ? calls.findIndex(c => c.id === selectedCall.id) + 1
    : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 flex flex-col bg-slate-50 rounded-t-3xl max-h-[85vh] slide-up">
        {/* Handle + header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-1 w-10 rounded-full bg-slate-300 absolute top-3 left-1/2 -translate-x-1/2" />
            {selectedCall ? (
              <button
                onClick={() => setSelectedCall(null)}
                className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                <ChevronLeft className="h-4 w-4" />
                Riwayat Call
              </button>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <h2 className="text-base font-bold text-slate-900">Riwayat Call</h2>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-600">
                  {calls.length}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3 space-y-2.5">
          {selectedCall ? (
            <CallAnalysisView call={selectedCall} index={selectedIndex!} />
          ) : calls.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-400">Belum ada call di sesi ini</div>
          ) : (
            [...calls].reverse().map((call, i) => (
              <CallCard
                key={call.id}
                call={call}
                index={calls.length - i}
                onClick={() => setSelectedCall(call)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
