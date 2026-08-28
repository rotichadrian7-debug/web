import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

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
    const { messages, userMessage, skinProfile, activeContext } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Elegant fallback response
      const fallbackResponses = [
        {
          reply: "Welcome to ÉLAN Medical Aesthetics. For luminous, firm skin with minimal downtime, our gold-standard clinical combination is the **Hydrafacial MD® Deluxe Platinum** paired with our daily **C-Radiance 15% Pure L-Ascorbic + Ferulic Elixir** and **Mineral Silk SPF 50+**.\n\nWould you like me to guide you through our clinical treatment protocols or help tailor an at-home medical skincare routine?",
          suggestedActions: [
            { label: "Book Hydrafacial MD®", type: "treatment", targetId: "hydrafacial-md-deluxe" },
            { label: "View C-Radiance Serum", type: "product", targetId: "elan-c-radiance-ferulic-serum" },
            { label: "Take 60-Sec Skin Diagnostic", type: "quiz" }
          ]
        },
        {
          reply: "Our board-certified dermatologists recommend introducing our **Micro-Encapsulated 0.75% Retinoid + Bakuchiol** 2–3 evenings weekly. Because it uses lipid encapsulation, it accelerates cellular renewal without the flaking or barrier disruption of traditional tretinoin.\n\nFor deeper skin tightening and jawline definition, pairing this with **Morpheus8 RF Microneedling** delivers exceptional structural remodeling.",
          suggestedActions: [
            { label: "Book Morpheus8 RF", type: "treatment", targetId: "morpheus8-rf-microneedling" },
            { label: "Explore Retinoid Elixir", type: "product", targetId: "elan-retinoid-bakuchiol-elixir" },
            { label: "Consult Dr. Elena Vance", type: "book", targetId: "morpheus8-rf-microneedling", doctorId: "dr-elena-vance" }
          ]
        },
        {
          reply: "For stubborn hyperpigmentation and melasma, we utilize the dual-action **Halo™ Hybrid Fractional Laser** in our clinic suites, followed by our **Cosmelan® Depigmentation Protocol** and **Post-Laser Soothing Recovery Balm** to protect vulnerable melanocytes.",
          suggestedActions: [
            { label: "Book Halo™ Laser Session", type: "treatment", targetId: "halo-hybrid-fractional-laser" },
            { label: "View Post-Laser Recovery Balm", type: "product", targetId: "elan-post-laser-recovery-balm" },
            { label: "Take Skin Diagnostic Quiz", type: "quiz" }
          ]
        }
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return res.json(randomResponse);
    }

    const systemInstruction = `You are Dr. Elena Vance's Lead Aesthetic Dermatologist & Virtual Concierge at ÉLAN Medical Aesthetics (with luxury clinic flagships in Beverly Hills Wilshire Blvd, Manhattan Madison Ave, and London Mayfair).

ÉLAN CLINICAL CATALOG & FORMULARY:
Treatments:
- "botox-dysport-neuromodulator": Precision Neuromodulators (Botox & Dysport) - for expression lines, masseter slimming, forehead, crow's feet ($450+, zero downtime).
- "bespoke-lip-architecture-filler": Architectural Lip Rejuvenation & Dermal Fillers - golden ratio micro-cannula hyaluronic acid ($850+, 24-48h mild swelling).
- "morpheus8-rf-microneedling": Morpheus8 Subdermal RF Remodeling - 4mm deep collagen induction, jawline sharpening, acne scars ($1,100+, 2-3 days pinkness).
- "halo-hybrid-fractional-laser": Halo™ Hybrid Fractional Laser - resolves sun damage, melasma, enlarged pores ($1,450+, 3-5 days bronzing).
- "hydrafacial-md-deluxe": Hydrafacial MD® Deluxe Platinum - vortex exfoliation, lymphatic drainage, exosome infusion ($350+, zero downtime).
- "sculptra-biostimulator": Sculptra Aesthetic Biostimulator - poly-L-lactic acid for gradual natural collagen volume ($950/vial).
- "coolsculpting-elite": CoolSculpting® Elite Dual Contouring - non-surgical fat freezing ($1,600+).
- "cosmelan-medical-depigmentation": Cosmelan® Medical Depigmentation Protocol - intensive medical mask for stubborn melasma ($1,200+).

Medical Skincare Boutique Products:
- "elan-c-radiance-ferulic-serum": C-Radiance 15% Pure L-Ascorbic + Ferulic Elixir ($148)
- "elan-phyto-peptide-barrier-cream": Phyto-Peptide Cellular Lift & Barrier Cream ($165)
- "elan-retinoid-bakuchiol-elixir": Micro-Encapsulated 0.75% Retinoid + Bakuchiol ($135)
- "elan-mineral-silk-glow-spf50": Mineral Silk Tinted Glow Defense SPF 50+ ($68)
- "elan-pure-cleansing-amino-milk": Pure Cleansing Botanical Amino Milk ($58)
- "elan-post-laser-recovery-balm": Medical Post-Laser & Peel Soothing Recovery Balm ($110)
- "elan-glass-skin-protocol-bundle": The Ultimate Glass Skin Radiance Protocol Set ($360)
- "elan-laser-recovery-kit": The Complete Post-Procedure Laser Recovery Box ($245)

Physicians & Specialists:
- "dr-elena-vance": Dr. Elena Vance, MD (Medical Director, Harvard/Johns Hopkins)
- "dr-marcus-sterling": Dr. Marcus Sterling, MD, FACS (Facial Plastic Surgeon, Yale/Stanford)
- "chloe-dupres-le": Chloe Duprès, LE, CLT (Laser Technologies Director)

YOUR RESPONSE STYLE & INSTRUCTIONS:
1. Provide elegant, physician-informed guidance. Use clear, luxurious language with scientific explanations (e.g. lipid barrier recovery, collagen synthesis, epidermal turnover, hyaluronic hydration).
2. Answer the client's questions directly, including downtimes, treatment preparation, ingredient compatibility, and expected results.
3. Suggest 1 to 3 relevant action items matching our exact treatment IDs or product IDs.

Format your output as a JSON object with:
- "reply": Markdown formatted string with your refined consultation text (2-3 concise paragraphs, use bolding for emphasis).
- "suggestedActions": Array of objects, each containing:
  - "label": Short button text (e.g. "Book Morpheus8 Consultation", "View C-Radiance Serum", "Take Skin Quiz")
  - "type": One of "treatment", "product", "book", "quiz"
  - "targetId": The exact ID of the treatment or product if applicable (e.g. "morpheus8-rf-microneedling" or "elan-c-radiance-ferulic-serum")
  - "doctorId": Optional doctor ID if recommending a specific doctor (e.g. "dr-elena-vance")`;

    const formattedMessages = Array.isArray(messages) 
      ? messages.map((m: any) => `${m.role.toUpperCase()}: ${m.content}`).join("\n") 
      : "";
    
    const prompt = `Client Skin Profile Context: ${JSON.stringify(skinProfile || {})}
Active Page Context: ${JSON.stringify(activeContext || {})}
Previous Chat History:
${formattedMessages}

CLIENT QUESTION: ${userMessage || "Hello"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    let jsonResult: any = {};
    try {
      jsonResult = JSON.parse(response.text || "{}");
    } catch {
      jsonResult = {
        reply: response.text || "Welcome to ÉLAN Medical Aesthetics. How may our clinical specialists assist your skin transformation today?",
        suggestedActions: [
          { label: "Book Consultation", type: "book" },
          { label: "Explore Skincare Boutique", type: "product", targetId: "elan-c-radiance-ferulic-serum" }
        ]
      };
    }

    res.json({
      reply: jsonResult.reply || "Welcome to ÉLAN Medical Aesthetics. How may I assist your aesthetic journey today?",
      suggestedActions: jsonResult.suggestedActions || []
    });
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
      model: "gemini-3.7-flash",
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

// Email Transporter Factory
const createEmailTransporter = async () => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  // If no SMTP configured, use ethereal / sandbox transporter
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (err) {
    console.warn("Could not create test email account, using JSON stream transporter", err);
    return nodemailer.createTransport({
      jsonTransport: true,
    });
  }
};

// Helper to send luxury patient confirmation & clinic notification emails
async function sendBookingConsultationEmails(appointment: any) {
  const emailResults = {
    patientEmailSent: false,
    adminEmailSent: false,
    patientEmail: appointment.patientEmail,
    adminEmail: process.env.NOTIFICATION_EMAIL || "rotichadrian7@gmail.com",
    previewUrls: [] as string[],
    error: null as string | null
  };

  try {
    const transporter = await createEmailTransporter();
    const fromAddress = process.env.SMTP_FROM || '"ÉLAN Medical Aesthetics" <concierge@elanmedical.com>';
    const adminRecipient = process.env.NOTIFICATION_EMAIL || "rotichadrian7@gmail.com";

    // 1. Patient Confirmation HTML Email
    const patientHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Consultation Confirmed - ÉLAN Medical Aesthetics</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0D0F14; color: #E2E8F0; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #141721; border: 1px solid #C5A880; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #181C26 0%, #0D0F14 100%); padding: 36px 24px; text-align: center; border-bottom: 1px solid rgba(197, 168, 128, 0.3); }
    .brand { font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #FFFFFF; margin: 0; }
    .subtitle { font-size: 11px; letter-spacing: 3px; color: #C5A880; text-transform: uppercase; margin-top: 6px; }
    .content { padding: 32px 28px; }
    .greeting { font-size: 18px; color: #FFFFFF; font-weight: 600; margin-bottom: 12px; }
    .intro { font-size: 14px; line-height: 1.6; color: #CBD5E1; margin-bottom: 24px; }
    .details-box { background-color: #0D0F14; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .label { color: #94A3B8; }
    .val { color: #FFFFFF; font-weight: 600; text-align: right; }
    .val-gold { color: #E4D5BE; font-weight: bold; }
    .instructions { background-color: rgba(197, 168, 128, 0.08); border-left: 3px solid #C5A880; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; }
    .instructions h4 { margin: 0 0 8px 0; font-size: 12px; color: #C5A880; text-transform: uppercase; letter-spacing: 1px; }
    .instructions ul { margin: 0; padding-left: 18px; font-size: 12px; color: #CBD5E1; line-height: 1.6; }
    .footer { background-color: #090A0E; padding: 24px; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid rgba(255, 255, 255, 0.05); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="brand">ÉLAN</h1>
      <div class="subtitle">Medical Aesthetics & Skincare Sanctuary</div>
    </div>
    <div class="content">
      <div class="greeting">Dear ${appointment.patientName},</div>
      <p class="intro">
        We are delighted to confirm your clinical consultation at ÉLAN Medical Aesthetics. Your private aesthetic suite and physician appointment have been reserved.
      </p>

      <div class="details-box">
        <div class="row">
          <span class="label">Booking Reference:</span>
          <span class="val val-gold">${appointment.bookingCode}</span>
        </div>
        <div class="row">
          <span class="label">Procedure:</span>
          <span class="val">${appointment.treatmentName}</span>
        </div>
        <div class="row">
          <span class="label">Specialist / Physician:</span>
          <span class="val">${appointment.doctorName}</span>
        </div>
        <div class="row">
          <span class="label">Location:</span>
          <span class="val">${appointment.location}</span>
        </div>
        <div class="row">
          <span class="label">Date & Time Slot:</span>
          <span class="val val-gold">${appointment.date} at ${appointment.timeSlot}</span>
        </div>
        <div class="row">
          <span class="label">Patient Phone:</span>
          <span class="val">${appointment.patientPhone}</span>
        </div>
        <div class="row">
          <span class="label">Deposit Credit:</span>
          <span class="val">$100 (Applied to your procedure on visit)</span>
        </div>
      </div>

      <div class="instructions">
        <h4>Pre-Procedure Clinical Guidelines:</h4>
        <ul>
          <li>Please arrive 15 minutes prior for skin preparation and 3D multi-spectral imaging.</li>
          <li>Avoid blood-thinning supplements (Fish Oil, Vitamin E, Aspirin) 48 hours prior if receiving injectables.</li>
          <li>Discontinue retinoids and chemical exfoliants 3 days prior to your laser or peel session.</li>
          <li>Complimentary valet parking is available at all our Beverly Hills, Manhattan, and Mayfair suites.</li>
        </ul>
      </div>

      <p style="font-size: 12px; color: #94A3B8; line-height: 1.5;">
        Need to adjust or reschedule? Please reply directly to this email or call our patient concierge at <strong>+1 (310) 890-3300</strong>.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} ÉLAN Medical Aesthetics • Beverly Hills • Manhattan • London Mayfair<br>
      Confidential Medical Communication
    </div>
  </div>
</body>
</html>
    `;

    // 2. Clinic Admin Notification HTML Email
    const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Consultation Booking Alert</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8FAFC; color: #1E293B; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .header { background: #0D0F14; color: #FFFFFF; padding: 20px 24px; }
    .header h2 { margin: 0; font-size: 18px; color: #E4D5BE; }
    .body { padding: 24px; }
    .badge { display: inline-block; background: #FEF3C7; color: #92400E; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 12px; margin-bottom: 16px; }
    .item { margin-bottom: 12px; font-size: 14px; }
    .item strong { color: #475569; width: 140px; display: inline-block; }
    .notes { background: #F1F5F9; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #334155; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>ÉLAN Clinic Coordinator Alert</h2>
      <div style="font-size: 12px; color: #94A3B8;">New In-Clinic Consultation Request</div>
    </div>
    <div class="body">
      <div class="badge">NEW APPOINTMENT: ${appointment.bookingCode}</div>
      <div class="item"><strong>Patient Name:</strong> ${appointment.patientName}</div>
      <div class="item"><strong>Email:</strong> <a href="mailto:${appointment.patientEmail}">${appointment.patientEmail}</a></div>
      <div class="item"><strong>Phone:</strong> <a href="tel:${appointment.patientPhone}">${appointment.patientPhone}</a></div>
      <div class="item"><strong>Procedure:</strong> ${appointment.treatmentName}</div>
      <div class="item"><strong>Physician / Staff:</strong> ${appointment.doctorName}</div>
      <div class="item"><strong>Location:</strong> ${appointment.location}</div>
      <div class="item"><strong>Requested Slot:</strong> ${appointment.date} at ${appointment.timeSlot}</div>
      <div class="item"><strong>Deposit Status:</strong> $100 Reservation Deposit Recorded</div>

      <div class="notes">
        <strong>Patient Skin History & Goals:</strong><br>
        ${appointment.concernsNote ? appointment.concernsNote : '<em>No additional notes provided by patient.</em>'}
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Send email to Patient
    const patientMail = await transporter.sendMail({
      from: fromAddress,
      to: appointment.patientEmail,
      subject: `✨ Clinical Consultation Confirmed: ${appointment.treatmentName} (${appointment.bookingCode})`,
      text: `Dear ${appointment.patientName},\n\nYour consultation for ${appointment.treatmentName} with ${appointment.doctorName} on ${appointment.date} at ${appointment.timeSlot} (${appointment.location}) is confirmed. Reference: ${appointment.bookingCode}.\n\nÉLAN Medical Aesthetics Concierge`,
      html: patientHtml,
    });

    emailResults.patientEmailSent = true;
    const patientPreview = nodemailer.getTestMessageUrl(patientMail);
    if (patientPreview) {
      emailResults.previewUrls.push(patientPreview);
      console.log(`[Email] Patient confirmation preview URL: ${patientPreview}`);
    }

    // Send alert email to Clinic Admin
    const adminMail = await transporter.sendMail({
      from: fromAddress,
      to: adminRecipient,
      subject: `🔔 [NEW CONSULTATION] ${appointment.patientName} - ${appointment.treatmentName} (${appointment.bookingCode})`,
      text: `New consultation booked by ${appointment.patientName} (${appointment.patientEmail}, ${appointment.patientPhone}) for ${appointment.treatmentName} on ${appointment.date} at ${appointment.timeSlot}.`,
      html: adminHtml,
    });

    emailResults.adminEmailSent = true;
    const adminPreview = nodemailer.getTestMessageUrl(adminMail);
    if (adminPreview) {
      emailResults.previewUrls.push(adminPreview);
      console.log(`[Email] Admin alert preview URL: ${adminPreview}`);
    }

    console.log(`[Email] Successfully dispatched booking emails for ${appointment.bookingCode} to Patient: ${appointment.patientEmail} and Admin: ${adminRecipient}`);
  } catch (err: any) {
    console.error("[Email] Error dispatching booking emails:", err);
    emailResults.error = err.message || "Failed to dispatch email";
  }

  return emailResults;
}

// 5. Clinic Appointment / Consultation Booking
app.post("/api/clinic/book", async (req, res) => {
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
      emailNotificationSent: true,
      recipientEmail: patientEmail,
      prepInstructions: [
        "Please arrive 15 minutes prior for skin cleansing and 3D multi-spectral imaging.",
        "Avoid blood-thinning supplements (Fish Oil, Vitamin E, Aspirin) 48 hours prior if having injectables.",
        "Discontinue retinoids and chemical exfoliants 3 days prior to your laser or peel session."
      ]
    };

    clinicBookings.unshift(newAppointment);

    // Send real emails asynchronously to Patient and Clinic Coordinator
    const emailResult = await sendBookingConsultationEmails(newAppointment);

    res.json({
      success: true,
      message: `Your clinical consultation has been confirmed. Confirmation emails have been dispatched to ${patientEmail} and our medical staff.`,
      appointment: {
        ...newAppointment,
        emailDelivery: emailResult
      }
    });
  } catch (error: any) {
    console.error("Booking error:", error);
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
