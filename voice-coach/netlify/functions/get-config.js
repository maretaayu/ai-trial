exports.handler = async (event, context) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "GEMINI_API_KEY not set" }) };
  }

  // Basic security: Check if request is from our domain (optional but recommended)
  // const referer = event.headers.referer || "";
  // if (!referer.includes("voice-coach.netlify.app") && !referer.includes("localhost")) {
  //   return { statusCode: 403, body: "Forbidden" };
  // }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey })
  };
};
