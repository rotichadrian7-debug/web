import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent header
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Gemini API features will run in intelligent fallback mode.");
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

// In-memory data store for live sessions
const clinicBookings: any[] = [];
const boutiqueOrders: any[] = [];

// --- API ENDPOINTS ---

// 1. Health check
app.get("/api/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    service: "ÉLAN Medical Aesthetics & Skincare Boutique API",
    locations: ["Beverly Hills", "Manhattan", "Mayfair"]
  });
});

// 2. Gemini AI Virtual Aesthetic Concierge / Skincare Specialist Chat
app.post("/api/gemini/skin-consultant", async (req, res) => {
  try {
    const { messages, userMessage, skinProfile } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Elegant fallback response
      const fallbackResponses = [
        "Welcome to ÉLAN Medical Aesthetics. For radiant skin with minimal downtime, our signature combination is the Hydrafacial MD® Deluxe paired with our C-Radiance 15% Ferulic Serum in the morning and Mineral Silk SPF 50+. How may I tailor your aesthetic journey today?",
        "Our board-certified dermatologists recommend introducing our Micro-Encapsulated 0.75% Retinoid 2-3 nights per week to gently remodel collagen without peeling. Would you like assistance booking an in-clinic consultation or selecting the ideal medical-grade regimen for your skin type?",
        "For treating stubborn hyperpigmentation and melasma, we typically prescribe our Halo™ Hybrid Fractional Laser in-clinic, followed by the daily Post-Procedure Recovery Balm and C-Radiance 15% serum. Would you like to check doctor availability in Beverly Hills, Manhattan, or London?"
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return res.json({
        reply: randomResponse,
        suggestedActions: ["Book In-Clinic Consultation", "Explore Glass Skin Set", "View Before & After Cases"]
      });
    }

    const systemInstruction = `You are Dr. Elena Vance's Senior Aesthetic & Skincare Concierge at ÉLAN Medical Aesthetics (luxury clinic locations in Beverly Hills, Manhattan Upper East Side, and London Mayfair).
ÉLAN provides high-end cosmetic dermatology treatments and an online medical-grade skincare boutique:
- In-Clinic Treatments: Botox® & Dysport® Neuromodulators, Architectural Lip & Cheek Fillers, Morpheus8 RF Microneedling, Halo™ Hybrid Fractional Laser, Hydrafacial MD® Deluxe Platinum, Sculptra® Collagen Biostimulator, CoolSculpting® Elite, Cosmelan® Depigmentation Peel.
- Medical Skincare Boutique Products:
  1. C-Radiance 15% Pure L-Ascorbic + Ferulic Elixir ($148)
  2. Phyto-Peptide Cellular Lift & Barrier Cream ($165)
  3. Micro-Encapsulated 0.75% Retinoid + Bakuchiol ($135)
  4. Mineral Silk Tinted Glow Defense SPF 50+ ($68)
  5. Pure Cleansing Botanical Amino Milk ($58)
  6. Medical Post-Laser & Peel Soothing Recovery Balm ($110)
  7. The Ultimate Glass Skin Radiance Protocol Set ($360 - Save $79)
  8. The Complete Post-Procedure Laser Recovery Box ($245)

Your Tone & Persona:
- Ultra-refined, warm, empathetic, physician-informed, and luxurious (like a premier aesthetic dermatology director).
- Provide expert guidance on skin concerns (wrinkles, hyperpigmentation, melasma, acne scars, jowl laxity, lip volume, barrier repair).
- Mention ingredient science (L-ascorbic acid, copper peptides, non-nano zinc oxide, micro-cannula technique).
- Offer to help them book an appointment or add physician-curated products to their boutique cart.
- Keep responses concise, elegant, and well-spaced (2-3 paragraphs max).`;

    const formattedMessages = Array.isArray(messages) 
      ? messages.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join("\n") 
      : "";
    
    const prompt = `Client Skin Profile Context: ${JSON.stringify(skinProfile || {})}\n\nChat History:\n${formattedMessages}\n\nCLIENT INQUIRY: ${userMessage || "Hello"}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Welcome to ÉLAN Medical Aesthetics. How may our clinical specialists assist your skin transformation today?";
    res.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/gemini/skin-consultant:", error);
    res.status(500).json({ error: "Failed to generate aesthetic consultation", details: error.message });
  }
});

// 3. Gemini AI Comprehensive Skin Diagnostic & Routine Generator
app.post("/api/gemini/quiz-recommendations", async (req, res) => {
  try {
    const { primaryGoal, skinType, sensitivity, ageGroup, mainConcerns, routinePreference } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Fallback structured assessment
      return res.json({
        skinProfileName: `${skinType || 'Balanced'} Cellular Renewal & Radiance Profile`,
        overview: `Based on your goal of ${primaryGoal || 'Youthful Glow & Firming'} and ${skinType || 'Combination'} skin, our dermatologists recommend a dual approach: stimulating dermal collagen in-clinic with minimal downtime while fortifying your lipid barrier daily.`,
        recommendedTreatmentId: "hydrafacial-md-deluxe",
        recommendedTreatmentName: "Hydrafacial MD® Deluxe Platinum with Exosomes",
        amSteps: [
          "1. Pure Cleansing Botanical Amino Milk",
          "2. C-Radiance 15% Pure L-Ascorbic + Ferulic Elixir",
          "3. Phyto-Peptide Cellular Lift & Barrier Cream",
          "4. Mineral Silk Tinted Glow Defense SPF 50+"
        ],
        pmSteps: [
          "1. Pure Cleansing Botanical Amino Milk",
          "2. Micro-Encapsulated 0.75% Retinoid + Bakuchiol (3 nights/week)",
          "3. Phyto-Peptide Cellular Lift & Barrier Cream"
        ],
        lifestyleTip: "Maintain consistent UV broad-spectrum defense with 100% mineral zinc oxide and avoid washing with hot water to preserve delicate stratum corneum lipids."
      });
    }

    const systemInstruction = `You are a Board-Certified Cosmetic Dermatologist and Formulator.
Analyze the patient's diagnostic skin quiz answers and output a structured JSON recommendation.
Return JSON with the following keys:
- skinProfileName: string (e.g. "Luminous Barrier Recovery Profile")
- overview: string (2-3 sentences explaining their unique skin needs)
- recommendedTreatmentId: string (one of: 'botox-dysport-neuromodulator', 'bespoke-lip-architecture-filler', 'morpheus8-rf-microneedling', 'halo-hybrid-fractional-laser', 'hydrafacial-md-deluxe', 'sculptra-biostimulator', 'cosmelan-medical-depigmentation')
- recommendedTreatmentName: string
- amSteps: array of 4 string steps with product names
- pmSteps: array of 3-4 string steps with product names
- lifestyleTip: string (1-2 sentences on diet, sun care, or sleep for this specific skin type)`;

    const prompt = `Patient Diagnostic Profile:
- Primary Goal: ${primaryGoal}
- Skin Type: ${skinType}
- Sensitivity Level: ${sensitivity}
- Age Range: ${ageGroup}
- Primary Concerns: ${Array.isArray(mainConcerns) ? mainConcerns.join(", ") : mainConcerns}
- Regimen Preference: ${routinePreference}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/gemini/quiz-recommendations:", error);
    res.status(500).json({ error: "Failed to generate diagnostic results", details: error.message });
  }
});

// 4. E-Commerce Skincare Order Processing
app.post("/api/shop/checkout", (req, res) => {
  try {
    const { items, customer, shippingAddress, shippingMethod, paymentMethod, promoCode, total, subtotal, discount, shipping, tax, selectedSamples } = req.body;
    
    const trackingCode = `ELAN-TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    
    const newOrder = {
      orderId,
      trackingNumber: trackingCode,
      items: items || [],
      customerName: customer?.name || "Valued Client",
      email: customer?.email || "client@example.com",
      shippingAddress: shippingAddress || {},
      shippingMethod: shippingMethod || "Complimentary Cold-Chain Express (2-3 Days)",
      paymentMethod: paymentMethod || "Credit Card (Simulated)",
      promoCode: promoCode || null,
      subtotal: subtotal || 0,
      discount: discount || 0,
      shipping: shipping || 0,
      tax: tax || 0,
      total: total || 0,
      selectedSamples: selectedSamples || [],
      date: new Date().toISOString(),
      status: "CONFIRMED_PREPARING_DISPATCH"
    };

    boutiqueOrders.unshift(newOrder);

    res.json({
      success: true,
      message: "Your ÉLAN medical skincare order has been placed and routed to our temperature-controlled clinic dispensary.",
      order: newOrder
    });
  } catch (error: any) {
    res.status(500).json({ error: "Checkout error", details: error.message });
  }
});

// 5. Clinic Appointment / Consultation Booking
app.post("/api/clinic/book", (req, res) => {
  try {
    const { treatmentId, treatmentName, doctorId, doctorName, location, date, timeSlot, patientName, patientEmail, patientPhone, concernsNote } = req.body;
    
    const bookingCode = `ELAN-APT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newAppointment = {
      id: `APT-${Date.now()}`,
      bookingCode,
      treatmentId,
      treatmentName,
      doctorId,
      doctorName,
      location: location || "Beverly Hills Flagship",
      date,
      timeSlot,
      patientName,
      patientEmail,
      patientPhone,
      concernsNote,
      depositPaid: 100, // $100 reservation deposit applied to treatment
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
      prepInstructions: [
        "Please arrive 15 minutes prior for skin cleansing and 3D multi-spectral imaging.",
        "Avoid blood-thinning supplements (Fish Oil, Vitamin E, Aspirin) 48 hours prior if having injectables.",
        "Discontinue retinoids and chemical exfoliants 3 days prior to your laser or peel session."
      ]
    };

    clinicBookings.unshift(newAppointment);

    res.json({
      success: true,
      message: "Your clinical consultation has been confirmed in our physician scheduling system.",
      appointment: newAppointment
    });
  } catch (error: any) {
    res.status(500).json({ error: "Booking error", details: error.message });
  }
});

// 6. Get Client Orders & Appointments
app.get("/api/clinic/bookings", (_req, res) => {
  res.json({ bookings: clinicBookings });
});

app.get("/api/shop/orders", (_req, res) => {
  res.json({ orders: boutiqueOrders });
});

// --- VITE / STATIC MIDDLEWARE ---
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
    console.log(`ÉLAN Aesthetics Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
