import { useRef, useState, useCallback } from 'react';
import { ConversationEntry, CallStatus, CallAnalysis } from '../types';

const WS_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const OUTPUT_SAMPLE_RATE = 24000;
const SILENCE_THRESHOLD = 0.01;

// ── Audio utilities ──────────────────────────────────────────────────────────

function floatTo16BitPCM(input: Float32Array): Int16Array {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const c = Math.max(-1, Math.min(1, input[i]));
    out[i] = c < 0 ? c * 32768 : c * 32767;
  }
  return out;
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let bin = '';
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function fromBase64(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

// ── System prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(scenario: string): string {
  const base = `Kamu adalah AI Sales Coach yang expert dalam komunikasi sales B2B dan B2C Indonesia.

Cara kamu bekerja:
- Kamu berperan sebagai sparring partner untuk latihan sales call
- AWALI percakapan dengan menyapa user secara ramah dan tanyakan apa yang ingin mereka latih hari ini. PENTING: Jangan memperkenalkan diri dengan nama spesifik (seperti Coach Aura).
- Berikan respons yang natural seperti percakapan telepon sungguhan
- Di sela percakapan, sesekali berikan coaching tip singkat yang relevan
- Gunakan Bahasa Indonesia yang natural dan profesional
- Respons singkat dan fokus (maksimal 2-3 kalimat per giliran)
- Jika sales sudah bagus, puji dengan spesifik. Jika ada yang perlu diperbaiki, berikan saran langsung.

PENTING: Ini adalah percakapan voice, jadi respons harus natural diucapkan, tanpa bullet points atau formatting.`;
  return scenario ? `${base}\n\nKonteks sesi ini: ${scenario}` : base;
}

// ── Post-call analysis ───────────────────────────────────────────────────────

async function analyzeCall(transcript: ConversationEntry[]): Promise<CallAnalysis> {
  const text = transcript.map((e) => `${e.role === 'user' ? 'SALES' : 'AI COACH'}: ${e.text}`).join('\n');
  const prompt = `Kamu adalah sales communication expert. Analisa transkrip percakapan sales berikut dan berikan feedback konstruktif dalam Bahasa Indonesia.

TRANSKRIP:
${text}

Berikan evaluasi dalam format JSON (tanpa markdown):
{
  "overallScore": <0-100>,
  "scores": { "clarity": <0-100>, "confidence": <0-100>, "energy": <0-100>, "empathy": <0-100>, "structure": <0-100> },
  "summary": "<1 kalimat ringkasan>",
  "strengths": ["<kelebihan 1>", "<kelebihan 2>"],
  "improvements": ["<saran 1>", "<saran 2>"],
  "feedback": "<2-3 paragraf feedback detail>"
}`;

  const res = await fetch('/.netlify/functions/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error(`Feedback function error: ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message ?? JSON.stringify(data.error));
  let raw: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
  if (!raw) throw new Error('Response kosong dari API analisis');
  return JSON.parse(raw) as CallAnalysis;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export interface CallResult {
  transcript: ConversationEntry[];
  analysis: CallAnalysis;
  durationSecs: number;
}

interface UseGeminiLiveOptions {
  onCallEnded: (result: CallResult) => void;
  onError: (msg: string) => void;
}

export function useGeminiLive({ onCallEnded, onError }: UseGeminiLiveOptions) {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [liveText, setLiveText] = useState('');
  const [elapsedSecs, setElapsedSecs] = useState(0);

  // Refs (mutable, no re-render)
  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const scriptProcRef = useRef<ScriptProcessorNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const playCtxRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const aiTextRef = useRef('');
  const transcriptRef = useRef<ConversationEntry[]>([]);
  const isMutedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  // ── Playback ──────────────────────────────────────────────────────────────

  const getPlayCtx = useCallback((): AudioContext => {
    if (!playCtxRef.current || playCtxRef.current.state === 'closed') {
      playCtxRef.current = new AudioContext({ sampleRate: OUTPUT_SAMPLE_RATE });
    }
    if (playCtxRef.current.state === 'suspended') playCtxRef.current.resume();
    return playCtxRef.current;
  }, []);

  const drainQueue = useCallback(() => {
    if (audioQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      setStatus((s) => (s === 'ai-speaking' ? 'live' : s));
      return;
    }
    isPlayingRef.current = true;
    const b64 = audioQueueRef.current.shift()!;
    const pcm = fromBase64(b64);
    const int16 = new Int16Array(pcm);
    const f32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) f32[i] = int16[i] / 32768.0;

    const ctx = getPlayCtx();
    const buf = ctx.createBuffer(1, f32.length, OUTPUT_SAMPLE_RATE);
    buf.copyToChannel(f32, 0);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.onended = drainQueue;
    src.start();
  }, [getPlayCtx]);

  const queueAudio = useCallback((b64: string) => {
    audioQueueRef.current.push(b64);
    if (!isPlayingRef.current) drainQueue();
  }, [drainQueue]);

  const clearAudio = useCallback(() => {
    audioQueueRef.current = [];
    isPlayingRef.current = false;
    if (playCtxRef.current && playCtxRef.current.state !== 'closed') {
      playCtxRef.current.close().catch(() => {});
      playCtxRef.current = null;
    }
  }, []);

  // ── Message handler ───────────────────────────────────────────────────────

  const handleMessage = useCallback((event: MessageEvent) => {
    let msg: Record<string, unknown>;
    try {
      msg = JSON.parse(typeof event.data === 'string' ? event.data : new TextDecoder().decode(event.data as ArrayBuffer));
    } catch { return; }

    const sc = msg.serverContent as Record<string, unknown> | undefined;
    if (!sc) return;

    // Audio + text parts from model
    const modelTurn = sc.modelTurn as { parts?: Array<{ inlineData?: { mimeType?: string; data?: string }; text?: string }> } | undefined;
    if (modelTurn?.parts) {
      for (const part of modelTurn.parts) {
        if (part.inlineData?.mimeType?.startsWith('audio/') && part.inlineData.data) {
          queueAudio(part.inlineData.data);
          setStatus('ai-speaking');
        }
        if (part.text) {
          aiTextRef.current += part.text;
          setLiveText(aiTextRef.current);
        }
      }
    }

    // User transcription
    const inputTranscription = sc.inputTranscription as { text?: string } | undefined;
    if (inputTranscription?.text) {
      transcriptRef.current.push({ role: 'user', text: inputTranscription.text });
    }
    // Fallback: older transcription field
    const transcription = sc.transcription as { text?: string; role?: string } | undefined;
    if (transcription?.text && transcription.role !== 'model') {
      transcriptRef.current.push({ role: 'user', text: transcription.text });
    }

    // AI transcription via outputAudioTranscription
    const outputTranscription = sc.outputTranscription as { text?: string } | undefined;
    if (outputTranscription?.text) {
      aiTextRef.current += outputTranscription.text;
      setLiveText(aiTextRef.current);
    }

    // Turn complete — finalize AI text
    if (sc.turnComplete) {
      if (aiTextRef.current) {
        transcriptRef.current.push({ role: 'ai', text: aiTextRef.current });
        aiTextRef.current = '';
        setLiveText('');
      }
      setStatus('live');
    }

    // Interrupted by user
    if (sc.interrupted) {
      clearAudio();
      if (aiTextRef.current) {
        transcriptRef.current.push({ role: 'ai', text: aiTextRef.current + '…' });
        aiTextRef.current = '';
        setLiveText('');
      }
      setStatus('user-speaking');
    }
  }, [queueAudio, clearAudio]);

  // ── Microphone ────────────────────────────────────────────────────────────

  const startMic = useCallback(async () => {
    micStreamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true },
      video: false,
    });
    audioCtxRef.current = new AudioContext({ sampleRate: 16000 });
    await audioCtxRef.current.resume();

    const src = audioCtxRef.current.createMediaStreamSource(micStreamRef.current);
    const proc = audioCtxRef.current.createScriptProcessor(4096, 1, 1);

    proc.onaudioprocess = (e) => {
      if (isMutedRef.current) return;
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

      const input = e.inputBuffer.getChannelData(0);
      const rms = Math.sqrt(input.reduce((s, v) => s + v * v, 0) / input.length);
      if (rms > SILENCE_THRESHOLD) setStatus('user-speaking');

      const pcm = floatTo16BitPCM(input);
      wsRef.current.send(JSON.stringify({
        realtimeInput: { audio: { mimeType: 'audio/pcm;rate=16000', data: toBase64(pcm.buffer as ArrayBuffer) } },
      }));
    };

    src.connect(proc);
    proc.connect(audioCtxRef.current.destination);
    scriptProcRef.current = proc;
  }, []);

  // ── Cleanup ───────────────────────────────────────────────────────────────

  const cleanup = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (scriptProcRef.current) { scriptProcRef.current.disconnect(); scriptProcRef.current = null; }
    if (micStreamRef.current) { micStreamRef.current.getTracks().forEach((t) => t.stop()); micStreamRef.current = null; }
    if (audioCtxRef.current) { audioCtxRef.current.close().catch(() => {}); audioCtxRef.current = null; }
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) wsRef.current.close();
    wsRef.current = null;
    clearAudio();
  }, [clearAudio]);

  // ── Start call ────────────────────────────────────────────────────────────

  const startCall = useCallback(async (scenario: string, voice: string) => {
    setStatus('connecting');
    transcriptRef.current = [];
    aiTextRef.current = '';
    setLiveText('');
    setElapsedSecs(0);

    try {
      const ws = new WebSocket(`${WS_URL}?key=${API_KEY}`);
      ws.binaryType = 'arraybuffer';
      wsRef.current = ws;

      // Wait for open
      await new Promise<void>((res, rej) => {
        ws.onopen = () => res();
        ws.onerror = () => rej(new Error('WebSocket gagal terhubung'));
        setTimeout(() => rej(new Error('Connection timeout')), 12000);
      });

      // Send setup
      ws.send(JSON.stringify({
        setup: {
          model: 'models/gemini-3.1-flash-live-preview',
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: { parts: [{ text: buildSystemPrompt(scenario) }] },
        },
      }));

      // Wait for setup complete
      await new Promise<void>((res, rej) => {
        const t = setTimeout(() => rej(new Error('Setup timeout')), 10000);
        const h = (ev: MessageEvent) => {
          try {
            const msg = JSON.parse(typeof ev.data === 'string' ? ev.data : new TextDecoder().decode(ev.data as ArrayBuffer));
            if (msg.setupComplete !== undefined) { clearTimeout(t); ws.removeEventListener('message', h); res(); }
            if (msg.error) { clearTimeout(t); ws.removeEventListener('message', h); rej(new Error(msg.error.message)); }
          } catch { /* ignore */ }
        };
        ws.addEventListener('message', h);
        ws.onerror = () => { clearTimeout(t); rej(new Error('Setup gagal')); };
      });

      // Start mic + timer
      await startMic();
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setElapsedSecs(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);

      setStatus('live');
      ws.onmessage = handleMessage;
      ws.onclose = (e) => {
        if (wsRef.current) {
          onError(`Koneksi terputus (${e.code})`);
          cleanup();
        }
      };
    } catch (err) {
      cleanup();
      setStatus('idle');
      onError((err as Error).message);
    }
  }, [startMic, handleMessage, onError, cleanup]);

  // ── End call ──────────────────────────────────────────────────────────────

  const endCall = useCallback(async () => {
    const durationSecs = Math.floor((Date.now() - startTimeRef.current) / 1000);
    cleanup();
    const finalTranscript = [...transcriptRef.current];
    setStatus('analyzing');
    setLiveText('');

    if (finalTranscript.length === 0) {
      setStatus('idle');
      return;
    }

    let analysis;
    try {
      analysis = await analyzeCall(finalTranscript);
    } catch (err) {
      // Analisis gagal (e.g. rate limit) — tetap simpan call dengan fallback
      analysis = {
        overallScore: 0,
        scores: { clarity: 0, confidence: 0, energy: 0, empathy: 0, structure: 0 },
        summary: 'Analisis tidak tersedia',
        strengths: [],
        improvements: [],
        feedback: 'Analisis otomatis gagal: ' + (err as Error).message,
      };
    } finally {
      setStatus('idle');
    }
    onCallEnded({ transcript: finalTranscript, analysis, durationSecs });
  }, [cleanup, onCallEnded, onError]);

  // ── Mute ──────────────────────────────────────────────────────────────────

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current;
    setIsMuted(isMutedRef.current);
  }, []);

  return { status, isMuted, liveText, elapsedSecs, startCall, endCall, toggleMute };
}
