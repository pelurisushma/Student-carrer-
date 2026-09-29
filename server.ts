import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API route for AI Career Advisor Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const systemInstruction = `You are "CareerBot", the dedicated AI Career Advisor and Technical Recruiting Coach for the Student Career Hub.
Your mission is to mentor university students, bootcamp grads, and aspiring software engineers through:
1. Career Pathways: Full-Stack SWE, Machine Learning & AI, Product Management (APM), UI/UX Design, Cloud/DevOps, and Cybersecurity.
2. Interview Mastery: Guiding students through the STAR behavioral framework (Situation, Task, Action, Result) with strong metrics, and breaking down algorithmic/system design approaches.
3. Resume Formulation: Coaching students to write impactful bullets using Google's XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".
4. Networking: Providing concise cold emails for alumni coffee chats and technical recruiters.

Guidelines:
- Keep answers structured, encouraging, actionable, and formatted with clean markdown bullets.
- Mention specific resources when relevant (e.g. LeetCode 75, CS50, Odin Project, Levels.fyi).
- When a student asks for advice on a project, suggest production-grade features (e.g. Docker, CI/CD, Redis, PostgreSQL).`;

    // Map conversation history
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    if (process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        reply: response.text || "I am here to guide your tech career journey! What question or goal can we tackle today?"
      });
    } else {
      // Dynamic fallback if API key is in setup
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let reply = "Hello! I am CareerBot, your AI career coach. ";
      if (lastUserMsg.includes('resume') || lastUserMsg.includes('bullet') || lastUserMsg.includes('xyz')) {
        reply += "For standout resume bullets, use Google's XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. Lead with high-impact verbs like Architected, Optimized, or Automated!";
      } else if (lastUserMsg.includes('interview') || lastUserMsg.includes('star')) {
        reply += "Always structure behavioral answers with STAR: Situation (15s), Task (15s), Action (60s — where you shine), and Result (20s with real numbers). Check out the Interview Prep tab for timed practice!";
      } else if (lastUserMsg.includes('salary') || lastUserMsg.includes('track') || lastUserMsg.includes('role')) {
        reply += "Check out our Career Tracks tab: Entry-level Full-Stack SWE ranges from $95k–$135k, while AI/ML Engineers start around $110k–$155k. Focus on shipping 1 production capstone!";
      } else {
        reply += "I'm ready to help you optimize your resume, prepare for technical or behavioral interviews, or plan your next semester roadmap. What are you currently working on?";
      }
      return res.json({ reply });
    }
  } catch (error: any) {
    console.error('Chatbot error:', error);
    return res.status(500).json({
      error: error.message || 'Internal error in career chatbot.',
      reply: "I ran into a temporary hiccup retrieving career insights. Please try asking again in a moment!"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
