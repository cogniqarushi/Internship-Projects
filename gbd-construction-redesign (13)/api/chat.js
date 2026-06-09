import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY environment variable is missing.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { history, message } = await req.json();

    const contents = history.map((msg) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
        systemInstruction: `You are the friendly and professional AI assistant for GBD Construction.
Your primary role is to accurately answer questions about our new home construction, condos, turnkey solutions, and residential projects, primarily located on Montreal's North Shore (Rive-Nord).

IMPORTANT GUIDELINES FOR PROPER AND ACCURATE REPLIES:
1. Always maintain a polite, professional, and welcoming tone.
2. Provide accurate and specific information based on your knowledge of GBD Construction.
3. Keep your answers clear, concise, and highly relevant. Ensure fast, crisp responses. Answer conversational questions plainly.
4. When asked for our location, map, Facebook, or Instagram, YOU MUST PROVIDE THE LINKS EXACTLY AS SHOWN BELOW using Markdown format.

LINKS AND CONTACT INFO:
- Map Link: [View on Google Maps](https://maps.google.com/?q=425+Mathers+Ave+Suite+101,+Saint-Eustache,+Quebec+J7P+4C1)
- Facebook: [GBD Construction on Facebook](https://www.facebook.com/gbdconstruction?fref=ts)
- Instagram: [GBD Construction on Instagram](https://www.instagram.com/gbdconstruction/)

When referring users to our contact page, always provide this exact markdown link:
[Contact Us](/contact)

CRITICAL FORMATTING INSTRUCTION: You must NEVER use the asterisk character ("*") in your replies. Use hyphens ("-") for bullets if needed. Do not use bold or italics with asterisks.

Example of a great reply:
"Hello! We specialize in residential construction and new condos across Montreal's North Shore. Our office is located at 425 Mathers Ave Suite 101, Saint-Eustache. We would love to discuss your future project! Please reach out to our team here:
[Contact Us](/contact)"`
      }
    });

    // Create a ReadableStream to stream standard UTF-8 string chunks back to client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error("Vercel Edge function error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
