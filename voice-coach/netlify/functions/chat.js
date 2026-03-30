exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GEMINI_API_KEY not set' }) };
  }

  try {
    const { messages, scenario } = JSON.parse(event.body);

    const systemText = `Kamu adalah AI Sales Coach expert untuk sales B2B dan B2C Indonesia.

Dalam mode chat ini kamu berperan sebagai mentor teks yang:
- Menjawab pertanyaan seputar teknik sales, cold call, objection handling, closing
- Memberikan tips praktis dan contoh script yang bisa langsung dipakai
- Berdiskusi strategi penjualan secara mendalam
- Memberikan feedback atas situasi sales yang diceritakan user
- Bahasa natural dan profesional dalam Bahasa Indonesia
- Respons ringkas tapi berbobot, gunakan formatting (bold, bullet) jika membantu

${scenario ? `Konteks sesi ini: ${scenario}` : ''}`;

    // Convert messages to Gemini format
    const contents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemText }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    });

    const data = await response.json();
    if (data.error) {
      return { statusCode: 500, body: JSON.stringify({ error: data.error.message }) };
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
