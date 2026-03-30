import { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { Mic, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      onLogin();
    } catch (e) {
      setError('Gagal masuk. Coba lagi.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      {/* Header band */}
      <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
          <Mic className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-700 text-slate-900 font-bold">AI Sales Coach</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-600 shadow-lg shadow-brand-600/20">
            <Mic className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Coach Aura
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Platform latihan sales berbasis AI untuk profesional Indonesia
          </p>
        </div>

        {/* Feature pills */}
        <div className="mb-10 flex flex-col gap-3 w-full max-w-xs">
          {[
            { icon: Mic, label: 'Roleplay call B2B & B2C real-time' },
            { icon: TrendingUp, label: 'Skor & analisis performa otomatis' },
            { icon: ShieldCheck, label: 'Riwayat sesi tersimpan aman' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border border-slate-100">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                <Icon className="h-4 w-4 text-brand-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full max-w-xs">
          {error && (
            <p className="mb-3 text-center text-sm text-red-500">{error}</p>
          )}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Masuk dengan Google
          </button>
          <p className="mt-4 text-center text-xs text-slate-400">
            Data kamu disimpan secara private dan aman.
          </p>
        </div>
      </div>
    </div>
  );
}
