import { MicOff, PhoneOff, Mic } from 'lucide-react';
import { CallStatus } from '../types';

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function statusLabel(status: CallStatus): string {
  switch (status) {
    case 'connecting': return 'Menghubungkan...';
    case 'live':       return 'Live';
    case 'ai-speaking': return 'Aura sedang bicara...';
    case 'user-speaking': return 'Mendengarkan...';
    case 'analyzing': return 'Menganalisa sesi...';
    default:           return '';
  }
}

interface Props {
  status: CallStatus;
  isMuted: boolean;
  liveText: string;
  elapsedSecs: number;
  onMute: () => void;
  onEnd: () => void;
}

export default function CallOverlay({ status, isMuted, liveText, elapsedSecs, onMute, onEnd }: Props) {
  const isAI = status === 'ai-speaking';
  const isUser = status === 'user-speaking';
  const isAnalyzing = status === 'analyzing';

  // Ring color based on who's speaking
  const ringColor = isAI ? '#10b981' : isUser ? '#3b82f6' : '#64748b';

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-slate-900 slide-up">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-14 pb-6">
        <div className="flex items-center gap-2">
          {status !== 'connecting' && status !== 'analyzing' && (
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
          {(status === 'connecting' || status === 'analyzing') && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-slate-300" />
          )}
          <span className="text-sm font-semibold text-slate-300">{statusLabel(status)}</span>
        </div>
        {status !== 'connecting' && status !== 'analyzing' && (
          <span className="font-mono text-sm font-semibold text-slate-400">
            {formatTime(elapsedSecs)}
          </span>
        )}
      </div>

      {/* Orb */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative flex h-48 w-48 items-center justify-center">
          {/* Animated rings */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="orb-ring"
              style={{
                color: ringColor,
                '--delay': `${i * 0.8}s`,
                animationDuration: isAI ? '1.4s' : isUser ? '1.8s' : '3s',
              } as React.CSSProperties}
            />
          ))}
          {/* Core */}
          <div
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500"
            style={{
              background: isAI
                ? 'radial-gradient(circle, #10b981, #059669)'
                : isUser
                  ? 'radial-gradient(circle, #3b82f6, #2563eb)'
                  : 'radial-gradient(circle, #475569, #334155)',
              boxShadow: isAI
                ? '0 0 40px rgba(16,185,129,0.4)'
                : isUser
                  ? '0 0 40px rgba(59,130,246,0.4)'
                  : '0 0 20px rgba(71,85,105,0.3)',
            }}
          >
            <Mic className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Live transcript */}
        <div className="mt-10 min-h-16 px-8 text-center">
          {isAnalyzing ? (
            <p className="text-sm text-slate-400">Sedang menganalisa performa kamu...</p>
          ) : liveText ? (
            <p className="text-base font-medium leading-relaxed text-slate-200 fade-in-up">
              "{liveText}"
            </p>
          ) : (
            <p className="text-sm text-slate-600">
              {status === 'connecting' ? 'Menyambungkan ke AI Coach...' : 'Mulai bicara...'}
            </p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 px-6 pb-14">
        {/* Mute */}
        <button
          onClick={onMute}
          disabled={isAnalyzing}
          className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl transition active:scale-95 disabled:opacity-40 ${
            isMuted
              ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30'
              : 'bg-white/10 text-slate-300 hover:bg-white/15'
          }`}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          <span className="mt-1 text-[10px] font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>

        {/* End call */}
        <button
          onClick={onEnd}
          disabled={isAnalyzing || status === 'connecting'}
          className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-red-500 text-white shadow-xl shadow-red-500/30 transition hover:bg-red-600 active:scale-95 disabled:opacity-40"
        >
          <PhoneOff className="h-7 w-7" />
        </button>

        {/* Spacer to balance layout */}
        <div className="h-14 w-14" />
      </div>
    </div>
  );
}
