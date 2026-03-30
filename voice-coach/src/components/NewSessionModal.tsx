import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
  onCreate: (name: string, scenario: string, voice: string) => void;
}

const VOICE_OPTIONS = [
  { value: 'Aoede', label: 'Aoede', desc: 'Suara wanita, natural' },
  { value: 'Puck',  label: 'Puck',  desc: 'Suara pria, profesional' },
];

const SCENARIO_PRESETS = [
  'Cold call ke HRD startup tech',
  'Presentasi produk SaaS ke C-level',
  'Follow-up proposal yang tertunda',
  'Menangani keberatan harga',
  'Closing deal akhir kuartal',
];

export default function NewSessionModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  const [scenario, setScenario] = useState('');
  const [voice, setVoice] = useState('Aoede');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), scenario.trim(), voice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-slate-200" />

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Sesi Latihan Baru</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Nama Sesi *
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
            placeholder="Contoh: Cold Call SaaS Q2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        {/* Scenario */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Skenario Roleplay
          </label>
          <textarea
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 resize-none"
            placeholder="Deskripsikan konteks dan target latihan kamu..."
            rows={3}
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          />
          {/* Presets */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SCENARIO_PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setScenario(p)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Voice */}
        <div className="mb-6">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Suara Coach
          </label>
          <div className="flex gap-3">
            {VOICE_OPTIONS.map((v) => (
              <button
                key={v.value}
                onClick={() => setVoice(v.value)}
                className={`flex-1 rounded-xl border-2 px-4 py-3 text-left transition ${
                  voice === v.value
                    ? 'border-brand-600 bg-brand-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`text-sm font-semibold ${voice === v.value ? 'text-brand-700' : 'text-slate-800'}`}>
                  {v.label}
                </div>
                <div className="text-xs text-slate-500">{v.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Buat Sesi
        </button>
      </div>
    </div>
  );
}
