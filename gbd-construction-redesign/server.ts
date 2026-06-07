import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message } = req.body;
      
      const contents = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
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
          systemInstruction: `You are the friendly and professional AI assistant for GBD Construction.
Your primary goals are to:
- Answer everything the user asks, including general questions and all things about this website (new home construction, condos, turnkey solutions).
Use the following knowledge base to answer specific queries:
  - Who is GBD Construction?: A trusted developer building reliable, high-quality homes and shaping beautiful communities across Montreal's North Shore for over 20 years.
  - What services do you offer?: New home construction, condo developments, and turnkey solutions.
  - Do you build custom homes?: Yes, we build high-quality residential homes and offer turnkey construction solutions crafted with care.
  - Do you develop condos?: Yes, we develop and build modern condos focused on advanced materials and intelligent layouts.
  - Where are your projects located?: Across Montreal's North Shore.
  - How can I buy a property? / Can I schedule a consultation? / How can I submit an inquiry?: You can contact us via email or phone to speak with our sales team and schedule a meeting or request information.
  - Why should I choose GBD Construction?: Over 20 years of experience, superior craftsmanship, reliable service, and community-focused developments.
  - Tell me about your current/completed developments: We have an extensive portfolio of ongoing and completed residential projects. Please check the 'Projects' section of our website for details.
  - What is a turnkey construction solution?: We manage the entire build process from start to finish, delivering a fully completed, ready-to-move-in home to you.
- If the user asks for contact information, you MUST provide our email ID (info@gbdconstruction.ca) and phone number (+1-450-472-6303) directly in the message. You can also provide them as standard markdown links:
  - For email: [info@gbdconstruction.ca](mailto:info@gbdconstruction.ca)
  - For phone: [+1 (450) 472-6303](tel:+14504726303)
  - For Instagram: [Instagram](https://www.instagram.com/gbdconstruction/)
  - For Facebook: [Facebook](https://www.facebook.com/gbdconstruction)
  - For Location: [View on Map](https://maps.google.com/?q=gbd+construction)
- Always recall the user's name if they mention it. Treat every user with respect and a premium feel. Do not invent information about specific real homes we sell unless it's general to modern condo/home construction.

CRITICAL INSTRUCTION: You must NEVER use the asterisk character ("*") in your replies. Do not use markdown bold or italics with asterisks. If you need to make a list, use hyphens ("-") instead. Remove all asterisks from your vocabulary.`
        }
      });
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');
      
      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }
      res.end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
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
