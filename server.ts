import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent header as required
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Gemini API features will run in fallback mock mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// --- API ENDPOINTS ---

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Nexus AI Revenue Systems API" });
});

// 2. Gemini Assistant Chat endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, leadInfo } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Friendly fallback if key is missing
      return res.json({
        reply: "Hello! I am the Nexus AI Revenue Systems Assistant. Based on your inputs, an AI-driven Lead Qualification and CRM automation pipeline could increase your sales velocity by up to 300%. Would you like to schedule a 15-minute Strategy Call with our lead Systems Architect?",
        suggestedActions: ["Book Discovery Call", "Calculate ROI", "View Case Studies"]
      });
    }

    const systemInstruction = `You are Nexus AI's Lead Systems Architect Assistant.
Nexus AI designs high-ticket AI Revenue Systems ($10,000 - $50,000+) for growing businesses, including:
1. AI Lead Qualification & Instant Scoring
2. Custom CRM Engineering (Airtable, Hubspot, GoHighLevel)
3. Multi-Channel Sales Automation (Make.com, n8n)
4. AI Voice Agents (ElevenLabs + Twilio)
5. Executive Real-Time Reporting Dashboards
6. Automated Proposal & Contract Generators

Your job:
- Be extremely professional, concise, futuristic, and authoritative (like an executive AI Systems Architect).
- Qualify prospects based on their business model, lead volume, and goals.
- Highlight how custom AI revenue systems eliminate manual sales friction and guarantee higher conversion rates.
- Always offer to help them book a Strategy Call or generate a custom System Architecture Proposal.
- Maintain a dark-tech executive tone. Keep responses within 2-3 concise paragraphs.`;

    const formattedMessages = Array.isArray(messages) ? messages.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join("\n") : "";
    const prompt = `Lead Context: ${JSON.stringify(leadInfo || {})}\n\nConversation History:\n${formattedMessages}\n\nUSER: ${req.body.userMessage || "Hello"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm ready to analyze your revenue pipeline. What is your current monthly lead volume and sales team size?";
    res.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/gemini/chat:", error);
    res.status(500).json({ error: "Failed to process AI architect chat query.", details: error.message });
  }
});

// 3. AI Instant Revenue System Audit & Proposal Generator
app.post("/api/gemini/audit", async (req, res) => {
  try {
    const { companyName, industry, leadVolume, dealValue, conversionRate, currentCRM, painPoints } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback calculation demo
      const monthlyLeads = Number(leadVolume) || 100;
      const dealVal = Number(dealValue) || 2500;
      const currentRate = Number(conversionRate) || 5;
      const targetRate = currentRate * 1.8;
      
      const currentRev = monthlyLeads * (currentRate / 100) * dealVal;
      const projectedRev = monthlyLeads * (targetRate / 100) * dealVal;
      const upside = projectedRev - currentRev;

      return res.json({
        companyName: companyName || "Target Enterprise",
        recommendedSystem: "Autonomous AI Lead Qualification & CRM Sync Pipeline",
        estimatedRevenueUpside: `$${Math.round(upside).toLocaleString()}/month`,
        leadScoreSpeed: "Instant (< 15 seconds)",
        automationModules: ["AI Lead Scoring Engine", "Airtable CRM Auto-Routing", "Slack Instant Sales Dispatch", "AI Follow-up Sequence"],
        implementationTime: "14 Days",
        roiMultiplier: "8.4x Year 1",
        executiveSummary: `By implementing an automated AI qualification and lead-routing system for ${companyName || 'your business'}, your sales team will instantly focus on top-tier prospects while AI handles 100% of initial follow-ups.`
      });
    }

    const systemInstruction = `You are a Senior AI Revenue Systems Architect. Analyze the prospect's business metrics and generate a structured JSON audit & proposal.
Return JSON with the following exact keys:
- companyName (string)
- recommendedSystem (string)
- estimatedRevenueUpside (string format like "$24,500/mo")
- leadScoreSpeed (string)
- automationModules (array of 4 distinct module strings)
- implementationTime (string, e.g. "14 Days")
- roiMultiplier (string, e.g. "9.2x Year 1")
- executiveSummary (string, concise 2-3 sentences outlining the architecture and expected conversion boost)`;

    const prompt = `Generate a high-ticket AI System Proposal for:
Company: ${companyName || "Client"}
Industry: ${industry || "B2B Services"}
Monthly Leads: ${leadVolume || 150}
Average Deal Value: $${dealValue || 3000}
Current Conversion Rate: ${conversionRate || 4}%
Current CRM: ${currentCRM || "Manual Spreadsheets / Basic CRM"}
Key Bottlenecks: ${painPoints || "Slow lead follow-up, unqualified sales calls"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const proposalJson = JSON.parse(response.text || "{}");
    res.json(proposalJson);
  } catch (error: any) {
    console.error("Error in /api/gemini/audit:", error);
    res.status(500).json({ error: "Failed to generate AI system proposal", details: error.message });
  }
});

// 4. Contact / Discovery Call Booking endpoint
const leadSubmissions: any[] = [];
app.post("/api/contact", (req, res) => {
  const { name, email, company, industry, budget, message, preferredTime } = req.body;
  const newLead = {
    id: `LEAD-${Date.now()}`,
    name,
    email,
    company,
    industry,
    budget,
    message,
    preferredTime,
    timestamp: new Date().toISOString(),
    status: "QUALIFIED_HOT",
    aiScore: Math.floor(Math.random() * 15) + 85, // 85 - 99 score
  };
  leadSubmissions.unshift(newLead);
  
  res.json({
    success: true,
    message: "Strategy Call booked and registered in AI Automation Pipeline.",
    lead: newLead,
    pipelineFlow: [
      { step: "Tally / Intake Form", status: "RECEIVED" },
      { step: "Make.com Webhook", status: "TRIGGERED" },
      { step: "AI Lead Scoring (Gemini)", status: `SCORED (${newLead.aiScore}/100)` },
      { step: "Airtable CRM Entry", status: "SYNCHRONIZED" },
      { step: "Slack Sales Alert", status: "DISPATCHED" },
      { step: "Calendar Reservation", status: "CONFIRMED" },
    ]
  });
});

app.get("/api/leads", (_req, res) => {
  res.json({ leads: leadSubmissions });
});

// --- VITE / STATIC FILE HANDLING ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nexus AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
