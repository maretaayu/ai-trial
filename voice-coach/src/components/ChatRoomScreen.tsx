import { useState, useEffect, useRef } from 'react';
import { User } from 'firebase/auth';
import { Mic, Send, History, Menu, Sparkles } from 'lucide-react';
import { Session, CallRecord } from '../types';
import { useGeminiLive, CallResult } from '../hooks/useGeminiLive';
import { useFirestore } from '../hooks/useFirestore';
import CallOverlay from './CallOverlay';
import CallHistorySheet from './CallHistorySheet';

// ── Types ─────────────────────────────────────────────────────────────────────

type TextMessage = {
  id: string;
  type: 'text';
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
};

type CallMessage = {
  id: string;
  type: 'call';
  call: CallRecord;
};

type ChatItem = TextMessage | CallMessage;
type ChatEntry = { role: 'user' | 'assistant'; text: string };

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDuration(secs: number) {
  if (secs < 60) return `${secs}d`;
  return `${Math.floor(secs / 60)}m ${secs % 60}d`;
}

function makeInitMsg(text: string): TextMessage {
  return { id: 'init-msg', type: 'text', role: 'user', text, timestamp: new Date() };
}

// Typewriter: calls onChar repeatedly until full text is shown
async function typeWriter(text: string, onChar: (partial: string) => void): Promise<void> {
  let i = 0;
  return new Promise((resolve) => {
    const tick = () => {
      const step = Math.floor(Math.random() * 4) + 2; // 2-5 chars per tick
      i = Math.min(i + step, text.length);
      onChar(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, 12 + Math.random() * 16);
      } else {
        resolve();
      }
    };
    setTimeout(tick, 12);
  });
}

// Markdown-lite: headings, **bold**, bullet lines
function renderText(text: string) {
  return text.split('\n').map((line, i) => {
    if (line === '') return <span key={i} className="block mt-1" />;

    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);
    if (h3) return <span key={i} className="block mt-2 mb-0.5 text-xs font-bold uppercase tracking-wide text-slate-500">{h3[1]}</span>;
    if (h2) return <span key={i} className="block mt-2 mb-0.5 text-sm font-bold text-slate-700">{h2[1]}</span>;
    if (h1) return <span key={i} className="block mt-2 mb-1 text-sm font-extrabold text-slate-800">{h1[1]}</span>;

    const isBullet = /^[-*•]\s/.test(line);
    const content = isBullet ? line.replace(/^[-*•]\s/, '') : line;
    const parts = content.split(/\*\*(.*?)\*\*/g).map((p, j) =>
      j % 2 === 1 ? <strong key={j}>{p}</strong> : p
    );
    return (
      <span key={i} className={`block${isBullet ? ' pl-3 before:content-["•"] before:mr-1.5' : ''}`}>
        {parts}
      </span>
    );
  });
}

// ── Call summary bubble ───────────────────────────────────────────────────────

function CallSummaryBubble({ call, onViewDetail }: { call: CallRecord; onViewDetail: (callId: string) => void }) {
  const score = call.analysis?.overallScore ?? 0;
  const hasAnalysis = score > 0;
  const scoreBg = score >= 75 ? 'text-emerald-600 bg-emerald-50'
    : score >= 50 ? 'text-amber-600 bg-amber-50'
    : 'text-slate-500 bg-slate-100';

  return (
    <div className="flex justify-center my-3">
      <button
        onClick={() => onViewDetail(call.id)}
        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm text-left transition hover:border-brand-300 hover:shadow-md max-w-[90%] w-full"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
          <Mic className="h-4 w-4 text-brand-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800">Sesi Call Selesai</p>
          <p className="text-xs text-slate-500 mt-0.5">{formatDuration(call.durationSecs)}</p>
          {call.analysis?.summary && (
            <p className="text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">"{call.analysis.summary}"</p>
          )}
        </div>
        {hasAnalysis && <span className={`shrink-0 rounded-xl px-3 py-1.5 text-base font-bold ${scoreBg}`}>{score}</span>}
        {!hasAnalysis && <span className="shrink-0 text-xs text-slate-400">Analisis gagal</span>}
      </button>
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function AuraAvatar() {
  return (
    <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-purple-600 shadow-sm">
      <Sparkles className="h-4 w-4 text-white" />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

interface Props {
  user: User;
  session: Session;
  initialMessage?: string;
  autoStartCall?: boolean;
  onOpenSidebar: () => void;
}

export default function ChatRoomScreen({ user, session, initialMessage, autoStartCall, onOpenSidebar }: Props) {
  // Init state immediately with initialMessage so it shows before Firestore loads
  const [chatItems, setChatItems] = useState<ChatItem[]>(() =>
    initialMessage ? [makeInitMsg(initialMessage)] : []
  );
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>(() =>
    initialMessage ? [{ role: 'user', text: initialMessage }] : []
  );
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [callsLoading, setCallsLoading] = useState(true);
  const [isCallVisible, setIsCallVisible] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyCallId, setHistoryCallId] = useState<string | undefined>();
  const [inputText, setInputText] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);       // waiting for API
  const [streamingText, setStreamingText] = useState('');  // typewriter in progress
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoStartedRef = useRef(false);

  const { loadCalls, saveCall, loadMessages, appendMessage } = useFirestore(user);

  // Load messages + calls, merge into chat timeline
  useEffect(() => {
    Promise.all([loadMessages(session.id), loadCalls(session.id)]).then(([msgs, calls]) => {
      setCalls(calls);

      if (msgs.length > 0) {
        // Session has saved chat history — restore it
        const msgItems: ChatItem[] = msgs.map(m => ({
          id: m.id, type: 'text', role: m.role, text: m.text, timestamp: m.timestamp,
        }));
        const callItems: ChatItem[] = calls.map(c => ({ id: c.id, type: 'call', call: c }));
        // Interleave by timestamp
        const all = [...msgItems, ...callItems].sort((a, b) => {
          const ta = a.type === 'text' ? a.timestamp.getTime() : a.call.timestamp.getTime();
          const tb = b.type === 'text' ? b.timestamp.getTime() : b.call.timestamp.getTime();
          return ta - tb;
        });
        setChatItems(all);
        setChatHistory(msgs.map(m => ({ role: m.role, text: m.text })));
      } else {
        // New session — keep the in-memory init message if present, and persist it
        const callItems: ChatItem[] = calls.map(c => ({ id: c.id, type: 'call', call: c }));
        setChatItems(prev => {
          const initItems = prev.filter(item => item.id === 'init-msg');
          return [...initItems, ...callItems];
        });
        // Persist initialMessage if this is truly a new session
        if (initialMessage) {
          appendMessage(session.id, 'user', initialMessage);
        }
      }
      setCallsLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id]); // intentionally only runs once per session mount

  // Auto-start call after loads
  useEffect(() => {
    if (autoStartCall && !autoStartedRef.current && !callsLoading) {
      autoStartedRef.current = true;
      handleStartCall();
    }
  }, [autoStartCall, callsLoading]);

  // Scroll to bottom — smooth for new messages, instant while streaming
  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, [chatItems.length, isWaiting]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [streamingText]);

  const { status, isMuted, liveText, elapsedSecs, startCall, endCall, toggleMute } = useGeminiLive({
    onCallEnded: async (result: CallResult) => {
      setIsCallVisible(false);
      const newCall: CallRecord = {
        id: Date.now().toString(),
        timestamp: new Date(),
        durationSecs: result.durationSecs,
        transcript: result.transcript,
        analysis: result.analysis,
      };
      setCalls(prev => [...prev, newCall]);
      setChatItems(prev => [...prev, { id: newCall.id, type: 'call', call: newCall }]);
      await saveCall(session.id, result.transcript, result.analysis, result.durationSecs);
    },
    onError: (msg) => {
      setIsCallVisible(false);
      setChatItems(prev => [...prev, {
        id: Date.now().toString(),
        type: 'text',
        role: 'assistant',
        text: `⚠️ ${msg}`,
        timestamp: new Date(),
      }]);
    },
  });

  const handleStartCall = async () => {
    setIsCallVisible(true);
    await startCall(session.scenario, session.voice);
  };

  const handleEndCall = async () => {
    await endCall();
    setIsCallVisible(false);
  };

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || isWaiting || streamingText) return;

    const userMsg: TextMessage = {
      id: Date.now().toString(),
      type: 'text',
      role: 'user',
      text,
      timestamp: new Date(),
    };
    const newHistory: ChatEntry[] = [...chatHistory, { role: 'user', text }];

    setChatItems(prev => [...prev, userMsg]);
    setChatHistory(newHistory);
    setInputText('');
    setIsWaiting(true);
    inputRef.current?.focus();

    // Persist user message immediately
    appendMessage(session.id, 'user', text);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory, scenario: session.scenario }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setIsWaiting(false);

      // Typewriter animation
      await typeWriter(data.reply, (partial) => setStreamingText(partial));

      const aiMsg: TextMessage = {
        id: (Date.now() + 1).toString(),
        type: 'text',
        role: 'assistant',
        text: data.reply,
        timestamp: new Date(),
      };
      setChatItems(prev => [...prev, aiMsg]);
      setChatHistory(prev => [...prev, { role: 'assistant', text: data.reply }]);
      setStreamingText('');

      // Persist AI reply
      appendMessage(session.id, 'assistant', data.reply);
    } catch (err) {
      setIsWaiting(false);
      setStreamingText('');
      setChatItems(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'text',
        role: 'assistant',
        text: `⚠️ Gagal: ${(err as Error).message}`,
        timestamp: new Date(),
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const isBusy = isWaiting || !!streamingText;
  const isEmpty = chatItems.length === 0 && !callsLoading && !isBusy;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-white px-4 pt-5 pb-3">
        <button
          onClick={onOpenSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-95 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="truncate text-base font-bold text-slate-900">{session.name}</h1>
          {session.scenario && (
            <p className="truncate text-xs text-slate-400">{session.scenario}</p>
          )}
        </div>
        <button
          onClick={() => { setHistoryCallId(undefined); setShowHistory(true); }}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-95"
        >
          <History className="h-5 w-5" />
          {calls.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
              {calls.length}
            </span>
          )}
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4">
        {callsLoading && chatItems.length === 0 ? (
          <div className="flex justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          </div>
        ) : isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center text-center px-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
              <Mic className="h-8 w-8 text-brand-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-700">Mulai sesi latihan</h3>
            <p className="mt-1 text-sm text-slate-400 leading-relaxed">
              Ketik pesan untuk chat dengan AI Coach, atau tekan mic untuk latihan voice call
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {chatItems.map((item) => {
              if (item.type === 'text') {
                const isUser = item.role === 'user';
                return (
                  <div key={item.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} fade-in-up`}>
                    {!isUser && <AuraAvatar />}
                    <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-[15px] leading-relaxed ${
                      isUser
                        ? 'bg-brand-600 text-white rounded-br-sm shadow-sm'
                        : 'bg-slate-100/80 text-slate-800 rounded-bl-sm border border-slate-100'
                    }`}>
                      {isUser ? item.text : renderText(item.text)}
                    </div>
                  </div>
                );
              }
              return <CallSummaryBubble key={item.id} call={item.call} onViewDetail={(callId) => { setHistoryCallId(callId); setShowHistory(true); }} />;
            })}

            {/* "Aura sedang mengetik..." */}
            {isWaiting && (
              <div className="flex justify-start fade-in-up">
                <AuraAvatar />
                <div className="rounded-2xl rounded-bl-sm bg-slate-100/80 border border-slate-100 px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {/* Streaming / typewriter bubble */}
            {streamingText && (
              <div className="flex justify-start fade-in-up">
                <AuraAvatar />
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100/80 border border-slate-100 px-5 py-3 text-[15px] leading-relaxed text-slate-800">
                  {renderText(streamingText)}
                  <span className="inline-block w-0.5 h-3.5 ml-0.5 bg-slate-400 align-middle animate-pulse" />
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-slate-100 bg-white px-3 pb-8 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center rounded-2xl bg-slate-100 px-4 py-2.5">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isBusy ? 'Coach sedang mengetik...' : 'Ketik pesan ke AI Coach...'}
              disabled={isBusy}
              className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none disabled:opacity-60"
            />
            {inputText.trim() && !isBusy && (
              <button
                onClick={handleSend}
                className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white transition active:scale-95"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={handleStartCall}
            disabled={isCallVisible}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-600/30 transition hover:bg-brand-700 active:scale-95 disabled:opacity-50"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isCallVisible && (
        <CallOverlay
          status={status}
          isMuted={isMuted}
          liveText={liveText}
          elapsedSecs={elapsedSecs}
          onMute={toggleMute}
          onEnd={handleEndCall}
        />
      )}

      {showHistory && (
        <CallHistorySheet
          calls={calls}
          onClose={() => { setShowHistory(false); setHistoryCallId(undefined); }}
          initialCallId={historyCallId}
        />
      )}
    </div>
  );
}
