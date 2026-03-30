/**
 * VoiceCoach AI — Live Call with Gemini Live API
 * Real-time bidirectional audio via WebSocket
 *
 * Gemini Live uses:
 *  Input:  PCM audio, 16kHz, 16-bit, mono (LINEAR16)
 *  Output: PCM audio, 24kHz, 16-bit, mono (LINEAR16)
 */

// ──────────────────────────────────────────
// STATE
// ──────────────────────────────────────────
const state = {
  apiKey: null,
  ws: null,
  audioCtx: null,
  micStream: null,
  workletNode: null,
  scriptProcessor: null,
  isMuted: false,
  isCallActive: false,
  isAISpeaking: false,
  isUserSpeaking: false,
  timerInterval: null,
  timerSecs: 0,
  pendingTranscript: '',
  aiTranscript: '',
  // Audio playback queue
  audioQueue: [],
  isPlayingQueue: false,
  outputSampleRate: 24000,
  // Conversation full text for post-call analysis
  conversationLog: [],
  voiceToUse: 'Aoede',
  // Firebase State
  user: null,
  db: null,
  auth: null,
  currentSessionId: null
};

// ──────────────────────────────────────────
// FIREBASE CONFIG (USER: Hubungkan dengan config kamu di sini)
// ──────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyA4yClWHZCoJbHHr1qro9XtUY3nx-SwZf4",
  authDomain: "coach-assistant-2c82b.firebaseapp.com",
  projectId: "coach-assistant-2c82b",
  storageBucket: "coach-assistant-2c82b.firebasestorage.app",
  messagingSenderId: "854712331627",
  appId: "1:854712331627:web:f8a01e488b3cae677df02e"
};

// ──────────────────────────────────────────
// DOM
// ──────────────────────────────────────────
const $ = id => document.getElementById(id);
const UI = {
  callUI:          $('callUI'),
  tipsEl:          $('tipsEl'),
  contextInput:    $('contextInput'),
  voiceSelect:     $('voiceSelect'),
  aiAvatar:        $('aiAvatar'),
  callStatusBadge: $('callStatusBadge'),
  statusDot:       $('statusDot'),
  callStatusText:  $('callStatusText'),
  callTimer:       $('callTimer'),
  userWave:        $('userWave'),
  aiWave:          $('aiWave'),
  transcriptArea:  $('transcriptArea'),
  callBtn:         $('callBtn'),
  callBtnIcon:     $('callBtnIcon'),
  muteBtn:         $('muteBtn'),
  volBtn:          $('volBtn'),
  feedbackCard:    $('feedbackCard'),
  scoreBadge:      $('scoreBadge'),
  scoreRow:        $('scoreRow'),
  feedbackBody:    $('feedbackBody'),
  newCallBtn:      $('newCallBtn'),
  contextCard:     document.querySelector('.context-card'),
};

// ──────────────────────────────────────────
// INIT
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Firebase modules
  const { initializeApp, getAuth, getFirestore } = window.firebaseModules;
  const app = initializeApp(firebaseConfig);
  state.auth = getAuth(app);
  state.db = getFirestore(app);

  // Auth Listener
  state.auth.onAuthStateChanged(user => {
    state.user = user;
    if (user) {
      $('authScreen').style.display = 'none';
      showCallUI();
      loadHistory();
    } else {
      $('authScreen').style.display = 'flex';
    }
  });

  // Auth UI Events
  $('loginBtn').onclick = handleGoogleLogin;
  $('logoutBtn').onclick = handleLogout;

  // UI Events
  UI.callBtn.onclick = toggleCall;
  UI.muteBtn.onclick = toggleMute;
  UI.newCallBtn.onclick = resetForNewCall;
  UI.voiceSelect.onchange = () => { state.voiceToUse = UI.voiceSelect.value; };
  
  // History UI Events
  $('historyBtn').onclick = () => { $('historyScreen').style.display = 'flex'; loadHistory(); };
  $('closeHistoryBtn').onclick = () => { $('historyScreen').style.display = 'none'; };
  $('closeDetailBtn').onclick = () => { $('sessionDetail').style.display = 'none'; };
  $('newSessionFromHistoryBtn').onclick = () => {
    $('historyScreen').style.display = 'none';
    startNewSession();
  };
});

function showCallUI() {
  if (UI.setupCard) UI.setupCard.style.display = 'none';
  UI.callUI.style.display = 'block';
}

function startNewSession() {
  resetForNewCall();
  // Focus context input so user can type their scenario
  const ctxInput = $('contextInput');
  if (ctxInput) {
    ctxInput.value = '';
    setTimeout(() => ctxInput.focus(), 100);
  }
  showToast('Sesi baru siap! Isi skenario lalu mulai call.', '');
}

// ──────────────────────────────────────────
// CALL TOGGLE
// ──────────────────────────────────────────
async function toggleCall() {
  if (state.isCallActive) {
    endCall();
  } else {
    await startCall();
  }
}

async function startCall() {
  setStatus('connecting', 'Menghubungkan...');
  try {
    await openGeminiLiveWS();
  } catch (err) {
    setStatus('idle', 'Gagal terhubung');
    showToast('Gagal memulai call: ' + err.message, 'error');
  }
}

async function endCall() {
  closeCall();
  setStatus('ended', 'Sesi Berakhir');
  if (state.conversationLog.length > 0) {
    const feedback = await requestPostCallFeedback();
    if (feedback) {
      await saveSessionToFirestore(feedback);
    }
  }
}

function closeCall(silent = false) {
  state.isCallActive = false;
  state.isAISpeaking = false;
  state.isUserSpeaking = false;
  
  // Clear UI
  if (UI.callStatusText) UI.callStatusText.style.display = 'none';
  if (UI.callTimer) UI.callTimer.style.display = 'none';

  // Stop mic
  if (state.scriptProcessor) { state.scriptProcessor.disconnect(); state.scriptProcessor = null; }
  if (state.workletNode) { state.workletNode.disconnect(); state.workletNode = null; }
  if (state.micStream) { state.micStream.getTracks().forEach(t => t.stop()); state.micStream = null; }

  // Close WebSocket
  if (state.ws && state.ws.readyState === WebSocket.OPEN) { state.ws.close(); }
  state.ws = null;

  // Close audio context
  if (state.audioCtx) { state.audioCtx.close().catch(() => {}); state.audioCtx = null; }

  // Stop timer
  clearInterval(state.timerInterval);

  // Update UI
  UI.callBtn.classList.remove('active');
  UI.callBtnIcon.innerHTML = PHONE_SVG;
  const lblEl = $('callBtnText');
  if (lblEl) lblEl.textContent = 'Mulai Call';
  UI.muteBtn.style.display = 'none';
  setWaveActive('user', false);
  setWaveActive('ai', false);
  UI.aiAvatar.classList.remove('active', 'ai-speaking', 'user-speaking');
}

// ──────────────────────────────────────────
// GEMINI LIVE WEBSOCKET
// ──────────────────────────────────────────
const GEMINI_LIVE_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';

const PHONE_SVG = `<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
const STOP_SVG  = `<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`;

async function openGeminiLiveWS() {
  // 1. Set key from user
  if (!state.apiKey) {
    state.apiKey = "AIzaSyDz9076a8VK8AaQj4k-_RqqCodm_wzYKoI";
    
    // Optional fallback to fetch from server if key above isn't set
    try {
      if (!state.apiKey) {
        const res = await fetch('/.netlify/functions/get-config');
        const data = await res.json();
        state.apiKey = data.apiKey;
      }
    } catch (e) {
      console.error("Gagal ambil API key dari server", e);
    }
  }

  if (!state.apiKey) throw new Error("API Key tidak tersedia.");

  // 2. Direct secure connection
  const url = `${GEMINI_LIVE_URL}?key=${state.apiKey}`;

  state.ws = new WebSocket(url);
  state.ws.binaryType = 'arraybuffer';

  await new Promise((resolve, reject) => {
    state.ws.onopen = resolve;
    state.ws.onerror = (e) => reject(new Error('WebSocket gagal terhubung'));
    state.ws.onclose = (e) => {
      const reason = e.reason ? ` (${e.reason})` : ` (code: ${e.code})`;
      reject(new Error('Koneksi ditolak' + reason));
    };
    setTimeout(() => reject(new Error('Connection timeout — cek koneksi internet')), 12000);
  });

  // Send setup
  const context = UI.contextInput.value.trim();
  const systemPrompt = buildSystemPrompt(context);

  state.ws.send(JSON.stringify({
    setup: {
      model: 'models/gemini-3.1-flash-live-preview',
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: state.voiceToUse }
          }
        }
      },
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    }
  }));

  // Wait for setup complete
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Setup timeout — model mungkin tidak tersedia di free tier')), 10000);
    const handler = (event) => {
      try {
        const msg = JSON.parse(typeof event.data === 'string' ? event.data : new TextDecoder().decode(event.data));
        if (msg.setupComplete !== undefined) {
          state.ws.removeEventListener('message', handler);
          clearTimeout(timeout);
          resolve();
          return;
        }
        if (msg.error) {
          state.ws.removeEventListener('message', handler);
          clearTimeout(timeout);
          reject(new Error('API Error: ' + (msg.error.message || JSON.stringify(msg.error))));
        }
      } catch (_) {}
    };
    state.ws.addEventListener('message', handler);
    state.ws.onerror = () => { clearTimeout(timeout); reject(new Error('Setup gagal — periksa API key')); };
    state.ws.onclose = (e) => {
      clearTimeout(timeout);
      reject(new Error('Koneksi ditutup saat setup: ' + (e.reason || `code ${e.code}`)));
    };
  });

  // Call is now live!
  state.isCallActive = true;
  onCallStarted();

  // Listen for AI responses
  state.ws.onmessage = handleServerMessage;
  state.ws.onclose = (e) => {
    if (state.isCallActive) {
      const reason = e.reason || e.code || 'Tanpa alasan';
      showToast('Koneksi terputus: ' + reason, 'error');
      closeCall();
      setStatus('ended', 'Terputus (' + reason + ')');
    }
  };
  state.ws.onerror = (e) => {
    showToast('WebSocket error: cek koneksi', 'error');
    closeCall();
  };

  // Start mic
  await startMicrophone();
}

function buildSystemPrompt(context) {
  const base = `Kamu adalah AI Sales Coach bernama Coach Aura yang expert dalam komunikasi sales B2B dan B2C Indonesia.

Cara kamu bekerja:
- Kamu berperan sebagai sparring partner untuk latihan sales call
- AWALI percakapan dengan menyapa user secara ramah dan tanyakan apa yang ingin mereka latih hari ini.
- Berikan respons yang natural seperti percakapan telepon sungguhan
- Di sela percakapan, sesekali berikan coaching tip singkat yang relevan
- Gunakan Bahasa Indonesia yang natural dan profesional
- Respons singkat dan fokus (maksimal 2-3 kalimat per giliran)
- Jika sales sudah bagus, puji dengan spesifik. Jika ada yang perlu diperbaiki, berikan saran langsung.

PENTING: Ini adalah percakapan voice, jadi respons harus natural diucapkan, tanpa bullet points atau formatting.`;

  if (context) {
    return `${base}\n\nKonteks sesi ini: ${context}`;
  }
  return base;
}

// ──────────────────────────────────────────
// CALL STARTED
// ──────────────────────────────────────────
function onCallStarted() {
  UI.callBtn.classList.add('active');
  UI.aiAvatar.classList.add('active');
  UI.callBtnIcon.innerHTML = STOP_SVG;
  const lbl = $('callBtnText');
  if (lbl) lbl.textContent = 'Akhiri Call';
  UI.muteBtn.style.display = 'flex';
  setStatus('live', '● Live Call');

  // Hide session setup card during active call
  const setupCard = $('sessionSetupCard');
  if (setupCard) setupCard.style.display = 'none';

  // Clear transcript
  UI.transcriptArea.innerHTML = '';
  state.conversationLog = [];
  appendMsg('system', 'Call dimulai — bicara dengan AI Coach!');

  startTimer();
}

// ──────────────────────────────────────────
// MICROPHONE → WebSocket
// ──────────────────────────────────────────
async function startMicrophone() {
  state.micStream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true }, video: false });

  state.audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
  await state.audioCtx.resume();

  const micSource = state.audioCtx.createMediaStreamSource(state.micStream);

  // Use ScriptProcessorNode for broad compatibility
  const bufferSize = 4096;
  const processor = state.audioCtx.createScriptProcessor(bufferSize, 1, 1);

  let silenceCount = 0;
  const SILENCE_THRESHOLD = 0.01;

  processor.onaudioprocess = (e) => {
    if (!state.isCallActive || state.isMuted) return;
    if (!state.ws || state.ws.readyState !== WebSocket.OPEN) return;

    const input = e.inputBuffer.getChannelData(0);

    // Detect if speaking
    const rms = Math.sqrt(input.reduce((sum, v) => sum + v * v, 0) / input.length);
    const speaking = rms > SILENCE_THRESHOLD;

    if (speaking !== state.isUserSpeaking) {
      state.isUserSpeaking = speaking;
      setWaveActive('user', speaking);
      if (speaking) UI.aiAvatar.classList.add('user-speaking');
      else UI.aiAvatar.classList.remove('user-speaking');
    }

    // Convert Float32 → Int16 PCM
    const pcm16 = floatTo16BitPCM(input);
    const b64 = arrayBufferToBase64(pcm16.buffer);

    state.ws.send(JSON.stringify({
      realtimeInput: {
        audio: {
          mimeType: 'audio/pcm;rate=16000',
          data: b64
        }
      }
    }));
  };

  micSource.connect(processor);
  processor.connect(state.audioCtx.destination);  // needed to keep alive (0 vol)
  state.scriptProcessor = processor;
}

// ──────────────────────────────────────────
// HANDLE SERVER MESSAGES
// ──────────────────────────────────────────
function handleServerMessage(event) {
  let msg;
  try {
    msg = JSON.parse(typeof event.data === 'string' ? event.data : new TextDecoder().decode(event.data));
  } catch (e) { return; }

  // Server content (AI response)
  if (msg.serverContent) {
    const sc = msg.serverContent;
    
    // Model turn with audio/text
    if (sc.modelTurn?.parts) {
      for (const part of sc.modelTurn.parts) {
        // Audio data
        if (part.inlineData?.mimeType?.startsWith('audio/')) {
          const pcmB64 = part.inlineData.data;
          queueAudioChunk(pcmB64);
          setAISpeaking(true);
        }
        // Text (transcript of AI)
        if (part.text) {
          state.aiTranscript += part.text;
          updateLiveTranscript('ai', state.aiTranscript);
        }
      }
    }

    // Transcription of user or model
    if (sc.transcription) {
      const txt = sc.transcription.text;
      const role = sc.transcription.role === 'model' ? 'ai' : 'user';
      if (role === 'user') {
        appendMsg('user', txt);
        state.conversationLog.push({ role: 'user', text: txt });
      }
    }

    // Turn complete
    if (sc.turnComplete) {
      if (state.aiTranscript) {
        finalizeLiveTranscript('ai', state.aiTranscript);
        state.conversationLog.push({ role: 'ai', text: state.aiTranscript });
        state.aiTranscript = '';
      }
    }

    // Interrupted (user started talking)
    if (sc.interrupted) {
      clearAudioQueue();
      setAISpeaking(false);
      if (state.aiTranscript) {
        finalizeLiveTranscript('ai', state.aiTranscript + '...');
        state.conversationLog.push({ role: 'ai', text: state.aiTranscript + '...' });
        state.aiTranscript = '';
      }
    }
  }

  // Handle clientContent reflected by server
  if (msg.clientContent?.turns) {
    for (const turn of msg.clientContent.turns) {
      if (turn.role === 'user' && turn.parts?.[0]?.text) {
        const txt = turn.parts[0].text;
        // avoid double push if already caught via transcription
        if (!state.conversationLog.some(e => e.role === 'user' && e.text === txt)) {
          appendMsg('user', txt);
          state.conversationLog.push({ role: 'user', text: txt });
        }
      }
    }
  }
}

function updateLiveTranscript(role, text) {
  const ph = UI.transcriptArea.querySelector('.transcript-placeholder');
  if (ph) ph.remove();

  let liveDiv = document.getElementById('liveMsg');
  if (!liveDiv) {
    liveDiv = document.createElement('div');
    liveDiv.id = 'liveMsg';
    liveDiv.className = `msg ${role}`;
    liveDiv.innerHTML = `<div class="msg-bubble"></div>`;
    UI.transcriptArea.appendChild(liveDiv);
  }
  liveDiv.className = `msg ${role}`;
  liveDiv.querySelector('.msg-bubble').innerHTML = escapeHtml(text);
  UI.transcriptArea.scrollTop = UI.transcriptArea.scrollHeight;
}

function finalizeLiveTranscript(role, text) {
  const liveDiv = document.getElementById('liveMsg');
  if (liveDiv) {
    liveDiv.removeAttribute('id');
    liveDiv.querySelector('.msg-bubble').innerHTML = escapeHtml(text);
  } else {
    appendMsg(role, text);
  }
}

// ──────────────────────────────────────────
// AUDIO PLAYBACK QUEUE (PCM → AudioContext)
// ──────────────────────────────────────────
function queueAudioChunk(b64) {
  state.audioQueue.push(b64);
  if (!state.isPlayingQueue) drainAudioQueue();
}

function drainAudioQueue() {
  if (state.audioQueue.length === 0) {
    state.isPlayingQueue = false;
    setAISpeaking(false);
    return;
  }
  if (!state.audioCtx) return;

  state.isPlayingQueue = true;
  const b64 = state.audioQueue.shift();
  const pcmBuffer = base64ToArrayBuffer(b64);
  const int16Array = new Int16Array(pcmBuffer);
  const float32 = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32[i] = int16Array[i] / 32768.0;
  }

  // Create playback AudioContext if needed at 24kHz output rate
  const playCtx = getPlaybackContext();

  const audioBuffer = playCtx.createBuffer(1, float32.length, state.outputSampleRate);
  audioBuffer.copyToChannel(float32, 0);

  const source = playCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(playCtx.destination);
  source.onended = () => drainAudioQueue();
  source.start();
}

let _playCtx = null;
function getPlaybackContext() {
  if (!_playCtx || _playCtx.state === 'closed') {
    _playCtx = new AudioContext({ sampleRate: state.outputSampleRate });
  }
  if (_playCtx.state === 'suspended') _playCtx.resume();
  return _playCtx;
}

function clearAudioQueue() {
  state.audioQueue = [];
  state.isPlayingQueue = false;
  if (_playCtx && _playCtx.state !== 'closed') {
    _playCtx.close().catch(() => {});
    _playCtx = null;
  }
}

// ──────────────────────────────────────────
// POST-CALL ANALYSIS with regular Gemini
// ──────────────────────────────────────────
async function requestPostCallFeedback() {
  UI.feedbackCard.style.display = 'flex';
  UI.feedbackCard.innerHTML = `
    <div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;color:var(--text-light)">
      <div class="loading-spinner"></div>
      <p style="font-size:15px;font-weight:500">Menganalisa sesi call kamu...</p>
    </div>`;

  const transcript = state.conversationLog
    .map(e => `${e.role === 'user' ? 'SALES' : 'AI COACH'}: ${e.text}`)
    .join('\n');

  const prompt = `Kamu adalah sales communication expert. Analisa transkrip percakapan sales berikut dan berikan feedback konstruktif dalam Bahasa Indonesia.

TRANSKRIP:
${transcript}

Berikan evaluasi dalam format JSON (pastikan valid JSON, tanpa markdown code block):
{
  "overallScore": <angka 0-100>,
  "scores": {
    "clarity": <angka 0-100>,
    "confidence": <angka 0-100>,
    "energy": <angka 0-100>,
    "empathy": <angka 0-100>,
    "structure": <angka 0-100>
  },
  "summary": "<1 kalimat ringkasan performa sales>",
  "strengths": ["<kelebihan 1>", "<kelebihan 2>"],
  "improvements": ["<saran perbaikan 1>", "<saran perbaikan 2>"],
  "feedback": "<2-3 paragraf feedback detail. Mulai dengan pujian, lalu berikan saran spesifik dan actionable>"
}`;

  try {
    // Call Gemini REST API directly using the same key used for the live call
    const key = state.apiKey;
    if (!key) throw new Error('API key tidak tersedia');

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
    const res = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.6, responseMimeType: 'application/json' }
      })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));

    let raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) throw new Error('Tidak ada respons dari AI');
    raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();

    const result = JSON.parse(raw);
    renderFeedback(result);
    return result;
  } catch (e) {
    console.error("Feedback error:", e);
    UI.feedbackCard.innerHTML = `
      <div class="feedback-header"><h2>Sesi Selesai</h2></div>
      <p style="color:var(--text-light);margin-top:12px;font-size:14px">Analisis gagal: ${escapeHtml(e.message)}</p>
      <button class="auth-btn" id="newCallBtn2" style="margin-top:24px;width:100%">Mulai Call Baru</button>
    `;
    document.getElementById('newCallBtn2')?.addEventListener('click', resetForNewCall);
    return null;
  }
}

const SCORE_CONFIGS = [
  { key: 'clarity',    label: 'Clarity',    icon: '' },
  { key: 'confidence', label: 'Confidence', icon: '' },
  { key: 'energy',     label: 'Energy',     icon: '' },
  { key: 'empathy',    label: 'Empathy',    icon: '' },
  { key: 'structure',  label: 'Structure',  icon: '' },
];

function renderFeedback(result) {
  const overall = Math.round(result.overallScore || 0);
  const cls = overall >= 75 ? 'high' : overall >= 50 ? 'mid' : 'low';
  const overallColor = overall >= 75 ? '#10b981' : overall >= 50 ? '#f59e0b' : '#ef4444';

  const chips = SCORE_CONFIGS.map(c => {
    const v = Math.round(result.scores?.[c.key] || 0);
    const cl = v >= 75 ? 'high' : v >= 50 ? 'mid' : 'low';
    return `<div class="score-chip ${cl}">
      <div class="chip-label">${c.label}</div>
      <div class="chip-val">${v}</div>
      <div class="chip-bar"><div class="chip-bar-fill" style="width:0%" data-w="${v}%"></div></div>
    </div>`;
  }).join('');

  const strengthsHtml = (result.strengths || []).map(s =>
    `<li style="margin-bottom:6px">✓ ${escapeHtml(s)}</li>`
  ).join('');

  const improvementsHtml = (result.improvements || []).map(s =>
    `<li style="margin-bottom:6px">→ ${escapeHtml(s)}</li>`
  ).join('');

  const listsHtml = (strengthsHtml || improvementsHtml) ? `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      ${strengthsHtml ? `<div class="score-chip" style="background:#f0fdf4;border:1px solid #bbf7d0">
        <div class="chip-label" style="color:#16a34a">Kelebihan</div>
        <ul style="padding-left:4px;list-style:none;margin-top:8px;font-size:13px;color:#15803d">${strengthsHtml}</ul>
      </div>` : ''}
      ${improvementsHtml ? `<div class="score-chip" style="background:#fefce8;border:1px solid #fde68a">
        <div class="chip-label" style="color:#d97706">Perlu Ditingkatkan</div>
        <ul style="padding-left:4px;list-style:none;margin-top:8px;font-size:13px;color:#b45309">${improvementsHtml}</ul>
      </div>` : ''}
    </div>` : '';

  UI.feedbackCard.innerHTML = `
    <div style="text-align:center;margin-bottom:24px">
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-light);margin-bottom:8px">Skor Keseluruhan</p>
      <div style="font-size:72px;font-weight:700;color:${overallColor};line-height:1;letter-spacing:-3px">${overall}</div>
      ${result.summary ? `<p style="margin-top:12px;font-size:14px;color:var(--text-light);font-style:italic">"${escapeHtml(result.summary)}"</p>` : ''}
    </div>
    <div class="score-row" style="margin-bottom:16px">${chips}</div>
    ${listsHtml}
    <div class="feedback-body">${result.feedback ? escapeHtml(result.feedback).replace(/\n/g, '<br>') : ''}</div>
    <button class="auth-btn" id="newCallBtn" style="margin-top:24px;width:100%">Mulai Latihan Lagi</button>
  `;

  document.getElementById('newCallBtn').addEventListener('click', resetForNewCall);

  setTimeout(() => {
    UI.feedbackCard.querySelectorAll('.chip-bar-fill').forEach(el => {
      el.style.width = el.dataset.w;
    });
  }, 100);
}

// ──────────────────────────────────────────
// UI HELPERS
// ──────────────────────────────────────────
function setStatus(type, msg) {
  if (UI.callStatusText) {
    UI.callStatusText.textContent = msg || type;
  }
}

// TIMER LOGIC
function startTimer() {
  state.timerSecs = 0;
  UI.callTimer.style.display = 'block';
  UI.callTimer.style.fontWeight = '600';
  UI.callTimer.style.color = '#2563eb';
  UI.callTimer.style.marginTop = '8px';
  UI.callTimer.textContent = '00:00';
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timerSecs++;
    const m = Math.floor(state.timerSecs / 60).toString().padStart(2, '0');
    const s = (state.timerSecs % 60).toString().padStart(2, '0');
    UI.callTimer.textContent = `${m}:${s}`;
  }, 1000);
}

function setAISpeaking(active) {
  state.isAISpeaking = active;
  setWaveActive('ai', active);
  if (active) {
    UI.aiAvatar.classList.add('ai-speaking');
    UI.aiAvatar.classList.remove('user-speaking');
    setStatus('ai-talking', 'AI sedang bicara...');
  } else if (state.isCallActive) {
    UI.aiAvatar.classList.remove('ai-speaking');
    setStatus('live', '● Live Call');
  }
}

function setWaveActive(who, active) {
  const el = who === 'user' ? UI.userWave : UI.aiWave;
  if(el) el.classList.toggle('active', active);
}

function updateTimer() {
  const m = Math.floor(state.timerSecs / 60).toString().padStart(2, '0');
  const s = (state.timerSecs % 60).toString().padStart(2, '0');
  if(UI.callTimer) UI.callTimer.textContent = `${m}:${s}`;
}

function appendMsg(role, text) {
  // Remove placeholder
  const ph = UI.transcriptArea.querySelector('.transcript-placeholder');
  if (ph) ph.remove();

  const div = document.createElement('div');
  div.className = `msg ${role}`;

  if (role === 'system') {
    div.innerHTML = `<div class="msg-bubble">${text}</div>`;
  } else {
    div.innerHTML = `
      <div class="msg-bubble">${escapeHtml(text)}</div>
    `;
  }
  UI.transcriptArea.appendChild(div);
  UI.transcriptArea.scrollTop = UI.transcriptArea.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function toggleMute() {
  state.isMuted = !state.isMuted;
  UI.muteBtn.classList.toggle('muted', state.isMuted);
  UI.muteBtn.title = state.isMuted ? 'Unmute' : 'Mute';
  const icon = state.isMuted
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><path d="M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
  UI.muteBtn.innerHTML = icon;
  if (state.isMuted) {
    setWaveActive('user', false);
    showToast('Mikrofon dimatikan', '');
  } else {
    showToast('Mikrofon aktif', 'success');
  }
}

function resetForNewCall() {
  state.conversationLog = [];
  UI.feedbackCard.style.display = 'none';
  UI.transcriptArea.innerHTML = '<div class="transcript-placeholder" style="color: #6b7280; font-weight: 500;">"Halo, Aku siap membantu latihan sales kamu. Klik tombol di bawah untuk mulai!"</div>';
  UI.callTimer.textContent = '00:00';
  setStatus('idle', 'Siap memulai call');

  // Show session setup card again
  const setupCard = $('sessionSetupCard');
  if (setupCard) setupCard.style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ──────────────────────────────────────────
// AUDIO UTILS
// ──────────────────────────────────────────
function floatTo16BitPCM(float32Array) {
  const int16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const clamped = Math.max(-1, Math.min(1, float32Array[i]));
    int16[i] = clamped < 0 ? clamped * 32768 : clamped * 32767;
  }
  return int16;
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToArrayBuffer(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// ──────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────
let _toastTimeout;
function showToast(message, type = '') {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  clearTimeout(_toastTimeout);
  t.textContent = message;
  t.className = `toast${type ? ` toast-${type}` : ''}`;
  requestAnimationFrame(() => t.classList.add('show'));
  _toastTimeout = setTimeout(() => t.classList.remove('show'), 4000);
}

// ──────────────────────────────────────────
// ADD LOADING SPINNER CSS dynamically
// ──────────────────────────────────────────
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
.loading-spinner {
  width: 48px; height: 48px; border-radius: 50%;
  border: 3px solid rgba(15,23,42,0.1);
  border-top-color: var(--primary);
  animation: _spin 0.8s linear infinite;
  margin: 0 auto;
}
@keyframes _spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(spinnerStyle);

// ──────────────────────────────────────────
// AUTHENTICATION HANDLERS (Google)
// ──────────────────────────────────────────
async function handleGoogleLogin() {
  try {
    const { GoogleAuthProvider, signInWithPopup } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(state.auth, provider);
    showToast('Berhasil masuk dengan Google!', 'success');
  } catch (e) {
    console.error("Login bias:", e);
    showToast('Gagal masuk: ' + e.message, 'error');
  }
}

async function handleLogout() {
  try {
    await state.auth.signOut();
    showToast('Berhasil logout', '');
    location.reload();
  } catch (e) {
    showToast('Gagal logout', 'error');
  }
}

// ──────────────────────────────────────────
// FIRESTORE HANDLERS
// ──────────────────────────────────────────
async function saveSessionToFirestore(feedback) {
  if (!state.user) return;
  const { collection, addDoc, serverTimestamp } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
  
  const ctx = $('contextInput')?.value.trim() || "General Practice";
  
  try {
    await addDoc(collection(state.db, `users/${state.user.uid}/sessions`), {
      timestamp: serverTimestamp(),
      context: ctx,
      transcript: state.conversationLog,
      analysis: feedback
    });
    showToast('Sesi berhasil disimpan!', 'success');
  } catch (e) {
    console.error("Firestore save error:", e);
    showToast('Gagal simpan sesi', 'error');
  }
}

async function loadHistory() {
  if (!state.user) return;
  const { collection, query, orderBy, getDocs } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
  
  const listEl = $('historyList');
  listEl.innerHTML = '<div style="text-align:center; padding:40px;"><div class="loading-spinner"></div></div>';

  try {
    const q = query(collection(state.db, `users/${state.user.uid}/sessions`), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      listEl.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-light);">Belum ada sesi tersimpan</div>';
      return;
    }

    listEl.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = 'history-item';
      const date = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleDateString() : 'Baru saja';
      div.innerHTML = `
        <div class="history-info">
          <div class="history-date">${date}</div>
          <div class="history-context">${data.context}</div>
        </div>
        <div class="history-score">${data.analysis?.overallScore || 0}</div>
      `;
      div.onclick = () => showSessionDetail(data);
      listEl.appendChild(div);
    });
  } catch (e) {
    console.error("Load history error:", e);
    listEl.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-light);">Gagal memuat riwayat</div>';
  }
}

function showSessionDetail(data) {
  const detailEl = $('sessionDetail');
  const contentEl = $('detailContent');
  detailEl.style.display = 'flex';
  
  // Analysis summary
  let html = `
    <div style="padding: 24px; background: #fff; border-radius: 24px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
      <h3 style="margin-bottom:12px;">Analisis AI</h3>
      <div style="font-size: 32px; font-weight: 700; color: var(--primary); margin-bottom: 20px;">${data.analysis?.overallScore}</div>
      <p style="font-size: 14px; line-height: 1.6; color: #475569;">${data.analysis?.feedback}</p>
    </div>
    <h3 style="margin: 24px 0 16px; padding-left: 8px;">Transkrip Chat</h3>
    <div id="detailChat" style="display: flex; flex-direction: column; gap: 8px;"></div>
  `;
  
  contentEl.innerHTML = html;
  const chatArea = contentEl.querySelector('#detailChat');
  
  data.transcript.forEach(msg => {
    const div = document.createElement('div');
    div.className = `msg ${msg.role}`;
    div.style.display = 'block'; // Ensure they show
    div.innerHTML = `<div class="msg-bubble">${msg.text}</div>`;
    chatArea.appendChild(div);
  });
}
