# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**VoiceCoach AI** is a real-time voice-based sales training app for Indonesian sales professionals. Users speak with "Coach Aura", an AI persona powered by Google's Gemini Live API, which conducts realistic B2B/B2C sales call simulations and provides post-call analysis.

## Development

No build step is required — this is a vanilla JavaScript SPA deployed on Netlify.

To develop locally, serve the static files with any local HTTP server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

For Netlify Functions to work locally, use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify dev
```

There are no tests, no linting configuration, and no package.json.

## Deployment

Hosted on Netlify. The only required environment variable is `GEMINI_API_KEY` (set in Netlify dashboard).

There is no `netlify.toml` — default Netlify settings apply. Functions are auto-discovered from `/netlify/functions/`.

## Architecture

### API Key Security Pattern
The frontend never holds the API key directly. At call start, `app.js` fetches it from `/.netlify/functions/get-config`, then uses it to open a WebSocket to Gemini Live. The key exists in memory only for the duration of the call.

### Real-time Audio Pipeline
```
Microphone (getUserMedia)
  → ScriptProcessorNode (16kHz, mono)
  → floatTo16BitPCM() → base64
  → WebSocket (wss://generativelanguage.googleapis.com)
  → Gemini Live (models/gemini-3.1-flash-live-preview)
  → Audio chunks + transcription text
  → PCM decode → Web Audio API playback queue
```

- **Input to Gemini:** 16kHz, 16-bit, mono LINEAR16 PCM
- **Output from Gemini:** 24kHz, 16-bit, mono LINEAR16 PCM
- Audio is queued via `queueAudioChunk()` / `drainAudioQueue()` to handle chunked streaming

### Post-call Feedback
After the call ends, `app.js` POSTs the full conversation transcript to `/.netlify/functions/feedback`, which calls Gemini 2.0 Flash to produce a structured JSON response with scores (clarity, confidence, energy, empathy, structure) and detailed feedback text in Bahasa Indonesia.

### State Management
All runtime state lives in the `state` object in `app.js`: WebSocket reference, AudioContext, microphone stream, audio playback queue, call status, and conversation log. There is no external state library.

## Key Files

| File | Purpose |
|------|---------|
| `app.js` | All frontend logic: WebSocket, audio pipeline, UI updates, state |
| `index.html` | UI markup + embedded CSS (primary stylesheet, overrides style.css) |
| `style.css` | Legacy/fallback CSS |
| `netlify/functions/get-config.js` | Returns `GEMINI_API_KEY` to frontend |
| `netlify/functions/feedback.js` | Calls Gemini 2.0 Flash for post-call analysis |

## UI Notes

- The settings panel (context input + voice selector) has `opacity: 0.15` by default and becomes visible on hover — intentional minimalist design
- Only the last transcript message is shown (CSS rule: `.msg:last-child { display: block }`)
- The feedback card is a fullscreen overlay (`#feedbackCard`) shown after call ends
- Mobile-first design, max-width 420px
- Language: Bahasa Indonesia throughout UI and AI responses
