import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { Mic, Send, Menu } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import ChatRoomScreen from './components/ChatRoomScreen';
import DashboardScreen from './components/DashboardScreen';
import SettingsModal, { getSavedVoice } from './components/SettingsModal';
import { Session } from './types';
import { useFirestore } from './hooks/useFirestore';

// ── Suggestion chips ──────────────────────────────────────────────────────────

const SUGGESTIONS = [
  'Cold call ke HRD startup tech',
  'Closing deal B2B akhir kuartal',
  'Menangani keberatan harga',
  'Follow-up proposal yang pending',
];

// ── Home / New chat screen ────────────────────────────────────────────────────

interface HomeProps {
  onSend: (text: string) => void;
  onCall: () => void;
  onMenuOpen: () => void;
}

function HomeScreen({ onSend, onCall, onMenuOpen }: HomeProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSuggestion = (s: string) => {
    setInput(s);
    inputRef.current?.focus();
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Mobile top bar */}
      <div className="flex items-center px-4 pt-5 pb-2 lg:hidden">
        <button
          onClick={onMenuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Center hero */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 shadow-lg shadow-brand-600/20">
          <Mic className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">AI Coach</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-xs leading-relaxed">
          Latihan sales call real-time dengan AI coach. Ketik konteks sesi atau langsung mulai call.
        </p>

        {/* Suggestion chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-sm">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="px-4 pb-10 pt-3">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white shadow-sm px-4 py-3 focus-within:border-brand-400 focus-within:shadow-md transition-shadow">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik konteks sesi latihan..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
          />
          {input.trim() && (
            <button
              onClick={handleSend}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white transition active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onCall}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 active:scale-95"
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Hash routing helpers ──────────────────────────────────────────────────────

function getHashSessionId(): string | null {
  const m = window.location.hash.match(/^#s\/(.+)$/);
  return m ? m[1] : null;
}

function setHashSessionId(id: string | null) {
  const next = id ? `#s/${id}` : '#';
  if (window.location.hash !== next) {
    window.history.pushState(null, '', next);
  }
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const [autoStartCall, setAutoStartCall] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voicePref, setVoicePref] = useState<string>(getSavedVoice);

  const { sessions, sessionsLoading, createSession, deleteSession } = useFirestore(user);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  // Restore session from URL hash after sessions load
  useEffect(() => {
    if (sessionsLoading) return;
    const id = getHashSessionId();
    if (id && !activeSession) {
      const found = sessions.find(s => s.id === id);
      if (found) {
        setActiveSession(found);
        setInitialMessage(undefined);
        setAutoStartCall(false);
      }
    }
  }, [sessionsLoading, sessions]);

  // Handle browser back/forward
  useEffect(() => {
    const onPopState = () => {
      const id = getHashSessionId();
      if (!id) {
        setActiveSession(null);
        setInitialMessage(undefined);
        setAutoStartCall(false);
      } else {
        const found = sessions.find(s => s.id === id);
        if (found) setActiveSession(found);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [sessions]);

  const handleNewSession = async (text?: string, startCall = false) => {
    const name = text
      ? (text.length > 50 ? text.slice(0, 50) + '…' : text)
      : `Call · ${new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`;

    const session = await createSession(name, text ?? '', voicePref);
    if (session) {
      setInitialMessage(text);
      setAutoStartCall(startCall);
      setActiveSession(session);
      setSidebarOpen(false);
      setHashSessionId(session.id);
    }
  };

  const handleSelectSession = (s: Session) => {
    setInitialMessage(undefined);
    setAutoStartCall(false);
    setActiveSession(s);
    setShowDashboard(false);
    setSidebarOpen(false);
    setHashSessionId(s.id);
  };

  const handleNewChat = () => {
    setActiveSession(null);
    setInitialMessage(undefined);
    setAutoStartCall(false);
    setShowDashboard(false);
    setSidebarOpen(false);
    setHashSessionId(null);
  };

  const handleOpenDashboard = () => {
    setActiveSession(null);
    setInitialMessage(undefined);
    setAutoStartCall(false);
    setShowDashboard(true);
    setSidebarOpen(false);
    setHashSessionId(null);
  };

  const handleDeleteSession = async (sessionId: string) => {
    await deleteSession(sessionId);
    // If deleted session was active, go back to home
    if (activeSession?.id === sessionId) {
      handleNewChat();
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) return <AuthScreen onLogin={() => {}} />;

  return (
    <>
      <div className="flex h-full overflow-hidden">
        <Sidebar
        user={user}
        sessions={sessions}
        sessionsLoading={sessionsLoading}
        activeSessionId={activeSession?.id}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onOpenDashboard={handleOpenDashboard}
        isDashboard={showDashboard}
        onOpenSettings={() => setShowSettings(true)}
        onDeleteSession={handleDeleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        {activeSession ? (
          <ChatRoomScreen
            key={activeSession.id}
            user={user}
            session={activeSession}
            initialMessage={initialMessage}
            autoStartCall={autoStartCall}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
        ) : showDashboard ? (
          <DashboardScreen
            user={user}
            sessions={sessions}
            onOpenSidebar={() => setSidebarOpen(true)}
            onSelectSession={handleSelectSession}
          />
        ) : (
          <HomeScreen
            onSend={(text) => handleNewSession(text, false)}
            onCall={() => handleNewSession(undefined, true)}
            onMenuOpen={() => setSidebarOpen(true)}
          />
        )}
      </main>
      </div>

      {showSettings && (
        <SettingsModal
          currentVoice={voicePref}
          onSelect={(v) => setVoicePref(v)}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
}
