import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY
      });

      const { history, message } = req.body;

      const contents = history.map((msg: any) => ({
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

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }
      res.end();

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
