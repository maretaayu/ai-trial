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
  apiKey: localStorage.getItem('GEMINI_API_KEY') || '',
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
};

// ──────────────────────────────────────────
// DOM
// ──────────────────────────────────────────
const $ = id => document.getElementById(id);
const UI = {
  callUI:          $('callUI'),
  tipsEl:          $('tipsEl'),
  apiKeyInput:     $('apiKeyInput'),
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
document.addEventListener('DOMContentLoaded', () => {
  UI.callBtn.addEventListener('click', toggleCall);
  UI.muteBtn.addEventListener('click', toggleMute);
  UI.newCallBtn.addEventListener('click', resetForNewCall);
  UI.voiceSelect.addEventListener('change', () => { state.voiceToUse = UI.voiceSelect.value; });
  
  // Load saved API Key
  if (state.apiKey) UI.apiKeyInput.value = state.apiKey;
  UI.apiKeyInput.addEventListener('input', () => {
    state.apiKey = UI.apiKeyInput.value.trim();
    localStorage.setItem('GEMINI_API_KEY', state.apiKey);
  });
  
  // Auto-show call UI instead of waiting for setup
  showCallUI();
});

function showCallUI() {
  if (UI.setupCard) UI.setupCard.style.display = 'none';
  UI.callUI.style.display = 'block';
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
  // If local, we can require key, but on Netlify we try proxy first
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal && !state.apiKey) {
    showToast('Harap masukkan API Key Gemini dulu di atas!', 'error');
    UI.apiKeyInput.focus();
    return;
  }
  setStatus('connecting', 'Menghubungkan...');
  try {
    await openGeminiLiveWS();
  } catch (err) {
    setStatus('idle', 'Gagal terhubung');
    showToast('Gagal memulai call: ' + err.message, 'error');
  }
}

function endCall() {
  closeCall();
  setStatus('ended', 'Call selesai');
  if (state.conversationLog.length > 0) {
    requestPostCallFeedback();
  }
}

function closeCall(silent = false) {
  state.isCallActive = false;
  state.isAISpeaking = false;
  state.isUserSpeaking = false;

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
  UI.aiAvatar.classList.remove('ai-speaking', 'user-speaking');
}

// ──────────────────────────────────────────
// GEMINI LIVE WEBSOCKET
// ──────────────────────────────────────────
const GEMINI_LIVE_URL = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';

const PHONE_SVG = `<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;
const STOP_SVG  = `<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`;

async function openGeminiLiveWS() {
  // Use proxy on Netlify, or local key if provided
  let url;
  if (!state.apiKey) {
    // Attempt use proxy
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    url = `${protocol}//${window.location.host}/api/live`;
  } else {
    url = `${GEMINI_LIVE_URL}?key=${state.apiKey}`;
  }

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
  UI.callBtnIcon.innerHTML = STOP_SVG;
  const lbl = $('callBtnText');
  if (lbl) lbl.textContent = 'Akhiri Call';
  UI.muteBtn.style.display = 'flex';
  setStatus('live', '● Live Call');

  // Clear transcript
  UI.transcriptArea.innerHTML = '';
  state.conversationLog = [];
  appendMsg('system', 'Call dimulai — bicara dengan AI Coach!');

  // Timer
  state.timerSecs = 0;
  updateTimer();
  state.timerInterval = setInterval(() => { state.timerSecs++; updateTimer(); }, 1000);
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
  UI.feedbackCard.style.display = 'block';
  UI.feedbackCard.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-secondary)"><div class="loading-spinner"></div><p style="margin-top:16px">Menganalisa sesi call kamu...</p></div>`;
  UI.feedbackCard.scrollIntoView({ behavior: 'smooth' });

  const transcript = state.conversationLog
    .map(e => `${e.role === 'user' ? 'SALES' : 'AI COACH'}: ${e.text}`)
    .join('\n');

  const prompt = `Kamu adalah sales communication expert. Analisa transkrip percakapan sales berikut dan berikan feedback konstruktif.

TRANSKRIP:
${transcript}

Berikan evaluasi dalam format JSON:
{
  "overallScore": <0-100>,
  "scores": {
    "clarity": <0-100>,
    "confidence": <0-100>,
    "energy": <0-100>,
    "empathy": <0-100>,
    "structure": <0-100>
  },
  "feedback": "<3-4 paragraf feedback detail dalam Bahasa Indonesia. Berikan pujian untuk kelebihan dan saran spesifik untuk perbaikan>"
}`;

  try {
    let res;
    if (!state.apiKey) {
      // Use Proxy
      res = await fetch('/.netlify/functions/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
    } else {
      // Direct
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${state.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.6, responseMimeType: 'application/json' }
          })
        }
      );
    }
    const data = await res.json();
    if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
    
    // For proxy, it returns the whole gemini data structure
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) throw new Error('No response from AI');
    const result = JSON.parse(raw);
    renderFeedback(result);
  } catch (e) {
    UI.feedbackCard.innerHTML = `
      <h2>Sesi Selesai</h2>
      <p style="color:var(--text-secondary);margin-top:12px">Tidak bisa mengambil feedback otomatis. Pastikan koneksi internet stabil.</p>
      <button class="btn-primary" id="newCallBtn2" style="margin-top:20px;width:100%">Mulai Call Baru</button>
    `;
    document.getElementById('newCallBtn2')?.addEventListener('click', resetForNewCall);
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

  // Score chips HTML
  const chips = SCORE_CONFIGS.map(c => {
    const v = Math.round(result.scores?.[c.key] || 0);
    const cl = v >= 75 ? 'high' : v >= 50 ? 'mid' : 'low';
    return `<div class="score-chip ${cl}">
      <div class="chip-icon">${c.icon}</div>
      <div class="chip-label">${c.label}</div>
      <div class="chip-val">${v}</div>
      <div class="chip-bar"><div class="chip-bar-fill" style="width:0%" data-w="${v}%"></div></div>
    </div>`;
  }).join('');

  UI.feedbackCard.innerHTML = `
    <div class="feedback-header">
      <h2>Hasil Sesi Call</h2>
      <div class="score-badge ${cls}">${overall}</div>
    </div>
    <div class="score-row">${chips}</div>
    <div class="feedback-body">${result.feedback || ''}</div>
    <button class="btn-primary" id="newCallBtn" style="width:100%;margin-top:20px">Mulai Call Baru</button>
  `;

  document.getElementById('newCallBtn').addEventListener('click', resetForNewCall);

  // Animate bars
  setTimeout(() => {
    UI.feedbackCard.querySelectorAll('.chip-bar-fill').forEach(el => {
      el.style.width = el.dataset.w;
    });
  }, 100);
}

// ──────────────────────────────────────────
// UI HELPERS
// ──────────────────────────────────────────
function setStatus(type, text) {
  UI.statusDot.className = `status-dot ${type}`;
  UI.callStatusText.textContent = text;
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
