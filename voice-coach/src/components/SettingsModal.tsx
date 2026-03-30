import { X, Check, Mic } from 'lucide-react';

// ── Voice roster ──────────────────────────────────────────────────────────────

export interface VoiceOption {
  id: string;
  name: string;
  gender: 'Perempuan' | 'Laki-laki';
  tone: string;
  description: string;
  emoji: string;
  gradient: string;
}

export const VOICES: VoiceOption[] = [
  {
    id: 'Aoede',
    name: 'Aoede',
    gender: 'Perempuan',
    tone: 'Hangat & Encouraging',
    description: 'Suara perempuan yang hangat dan mendukung. Cocok untuk latihan dengan feedback yang memotivasi.',
    emoji: '🌸',
    gradient: 'from-pink-500 to-rose-400',
  },
  {
    id: 'Kore',
    name: 'Kore',
    gender: 'Perempuan',
    tone: 'Tenang & Profesional',
    description: 'Suara perempuan yang tenang dan profesional. Ideal untuk simulasi klien korporat.',
    emoji: '💎',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'Charon',
    name: 'Charon',
    gender: 'Laki-laki',
    tone: 'Tegas & Berwibawa',
    description: 'Suara laki-laki yang tegas dan berwibawa. Cocok untuk simulasi klien decision maker.',
    emoji: '🦅',
    gradient: 'from-slate-600 to-slate-400',
  },
  {
    id: 'Fenrir',
    name: 'Fenrir',
    gender: 'Laki-laki',
    tone: 'Energik & Dinamis',
    description: 'Suara laki-laki yang energik dan bersemangat. Baik untuk latihan pitch yang high-energy.',
    emoji: '⚡',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    id: 'Puck',
    name: 'Puck',
    gender: 'Laki-laki',
    tone: 'Santai & Friendly',
    description: 'Suara laki-laki yang santai dan ramah. Cocok untuk latihan cold call informal.',
    emoji: '😊',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 'Zephyr',
    name: 'Zephyr',
    gender: 'Perempuan',
    tone: 'Cerdas & Kritis',
    description: 'Suara perempuan yang sharp dan kritis. Bagus untuk simulasi klien yang skeptis.',
    emoji: '🔍',
    gradient: 'from-purple-500 to-violet-400',
  },
];

export const STORAGE_KEY = 'ai-sales-coach-voice';

export function getSavedVoice(): string {
  return localStorage.getItem(STORAGE_KEY) ?? 'Aoede';
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  currentVoice: string;
  onSelect: (voiceId: string) => void;
  onClose: () => void;
}

export default function SettingsModal({ currentVoice, onSelect, onClose }: Props) {
  const handleSelect = (id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    onSelect(id);
  };

  const women = VOICES.filter(v => v.gender === 'Perempuan');
  const men = VOICES.filter(v => v.gender === 'Laki-laki');

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 flex flex-col bg-slate-50 rounded-t-3xl max-h-[85vh] slide-up">
        {/* Handle + header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 shrink-0">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-slate-300" />
          <div className="mt-2">
            <h2 className="text-base font-bold text-slate-900">Pilih AI Coach</h2>
            <p className="text-xs text-slate-400 mt-0.5">Karakter voice yang akan melatihmu</p>
          </div>
          <button
            onClick={onClose}
            className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Voice grid */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3 space-y-4">
          {/* Female voices */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-1 mb-2">Coach Perempuan</p>
            <div className="space-y-2">
              {women.map(v => (
                <VoiceCard key={v.id} voice={v} selected={currentVoice === v.id} onSelect={handleSelect} />
              ))}
            </div>
          </div>

          {/* Male voices */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-1 mb-2">Coach Laki-laki</p>
            <div className="space-y-2">
              {men.map(v => (
                <VoiceCard key={v.id} voice={v} selected={currentVoice === v.id} onSelect={handleSelect} />
              ))}
            </div>
          </div>

          <div className="pb-2">
            <p className="text-center text-xs text-slate-400">
              Voice bisa diganti kapan saja. Tiap sesi call ke depan akan pakai voice yang dipilih.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceCard({ voice, selected, onSelect }: { voice: VoiceOption; selected: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      onClick={() => onSelect(voice.id)}
      className={`w-full flex items-center gap-3 rounded-2xl border p-3.5 text-left transition active:scale-[0.99] ${
        selected
          ? 'border-brand-300 bg-brand-50 ring-1 ring-brand-400'
          : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
      }`}
    >
      {/* Avatar */}
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${voice.gradient} text-xl shadow-sm`}>
        {voice.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-slate-800">{voice.name}</p>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
            {voice.gender}
          </span>
        </div>
        <p className="text-xs font-medium text-brand-600 mt-0.5">{voice.tone}</p>
        <p className="text-xs text-slate-400 leading-snug mt-0.5 line-clamp-2">{voice.description}</p>
      </div>

      {/* Selected check */}
      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${
        selected ? 'bg-brand-600' : 'bg-slate-100'
      }`}>
        {selected
          ? <Check className="h-3.5 w-3.5 text-white" />
          : <Mic className="h-3 w-3 text-slate-400" />
        }
      </div>
    </button>
  );
}
