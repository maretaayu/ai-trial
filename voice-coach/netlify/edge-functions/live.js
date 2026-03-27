export default async (request, context) => {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) {
    return new Response("GEMINI_API_KEY environment variable not set in Netlify", { status: 500 });
  }

  // Target Gemini Live WebSocket URL
  const targetUrl = new URL("wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent");
  targetUrl.searchParams.set("key", apiKey);

  // Simply forward the request to Google. 
  // Netlify Edge Functions handles the WebSocket upgrade automatically if fetch is called on a wss URL.
  try {
    return await fetch(targetUrl.toString(), {
      headers: request.headers,
      method: request.method,
      body: request.body,
    });
  } catch (err) {
    return new Response(`Proxy Error: ${err.message}`, { status: 502 });
  }
};

export const config = { path: "/api/live" };
