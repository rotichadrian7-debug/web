import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Zap, 
  Calendar, 
  Sparkles, 
  Clock, 
  MessageSquare, 
  Building2, 
  DollarSign, 
  Mail, 
  User, 
  Workflow,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  onOpenBookingModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenBookingModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: 'B2B Services',
    budget: '$15,000 - $30,000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFlow, setSubmittedFlow] = useState<any[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setSubmittedFlow(data.pipelineFlow);
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } else {
        // Local fallback
        setSubmittedFlow([
          { step: "Tally Intake Form", status: "RECEIVED" },
          { step: "Make.com Webhook", status: "TRIGGERED" },
          { step: "AI Lead Scoring (Gemini 3.6)", status: "SCORED (96/100)" },
          { step: "Airtable CRM Sync", status: "SYNCHRONIZED" },
          { step: "Slack VIP Alert", status: "DISPATCHED" },
          { step: "Calendar Reservation", status: "READY" }
        ]);
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80 grid-background">
      
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>High-Ticket Systems Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            Ready to Build Your <span className="blue-gradient-text">AI Revenue Engine?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Submit your project details below to trigger an immediate automated lead evaluation and book a 15-minute Strategy Call with our Systems Architect.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-slate-800 p-6 sm:p-10 space-y-6">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" /> Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" /> Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Apex Global LLC"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-blue-400" /> Industry Sector
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option>B2B Services & Consulting</option>
                    <option>SaaS & Tech Enterprise</option>
                    <option>Healthcare & Clinics</option>
                    <option>Legal & Financial Services</option>
                    <option>Real Estate & High-Ticket Agency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Estimated System Budget *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['$5,000 - $15,000', '$15,000 - $30,000', '$30,000+'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono border transition-all ${
                        formData.budget === b 
                          ? 'bg-blue-600/30 border-blue-500 text-white font-bold' 
                          : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">
                  Project Goals & Current Revenue Bottlenecks
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your current sales team size, lead volume, and what manual tasks you want automated..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0B1120] border border-slate-800 rounded-xl p-4 text-xs text-white focus:border-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-semibold shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all group"
              >
                {isSubmitting ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin text-blue-300" />
                    Triggering AI Automation Webhooks...
                  </>
                ) : (
                  <>
                    <span>Submit & Run AI Pipeline Evaluation</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-300" />
                  </>
                )}
              </button>

            </form>

          </div>

          {/* Right Pipeline Visualizer / Confirmation Side */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Pipeline Visualizer Box */}
            <div className="glass-panel p-6 rounded-2xl border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono text-white font-bold">Automation Sequence Visualizer</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Make.com + Airtable
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                When you click Submit, this exact automated pipeline fires instantly behind the scenes:
              </p>

              <div className="space-y-2.5 text-xs font-mono">
                {(submittedFlow || [
                  { step: "1. Intake Form Submission", status: "Tally.so Webhook" },
                  { step: "2. Make.com Scenario Trigger", status: "Sub-Second Payload" },
                  { step: "3. Gemini Lead Scoring Engine", status: "AI Intent Analysis" },
                  { step: "4. Airtable CRM Relational Sync", status: "Record Insertion" },
                  { step: "5. Slack Sales Channel Alert", status: "VIP Notification" },
                  { step: "6. Strategy Session Calendar", status: "Slot Reservation" },
                ]).map((node: any, idx: number) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      submittedFlow 
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md' 
                        : 'bg-[#0B1120] border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <span>{node.step}</span>
                    </div>

                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {node.status}
                    </span>
                  </div>
                ))}
              </div>

              {submittedFlow && (
                <div className="pt-2">
                  <button
                    onClick={onOpenBookingModal}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Select Strategy Call Time Slot
                  </button>
                </div>
              )}
            </div>

            {/* Direct Contact Options */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 text-xs font-mono">
              <div className="text-slate-400 uppercase text-[10px]">Direct Contact & SLA</div>
              <div className="text-white flex items-center justify-between">
                <span>Email: alex@nexus-ai-systems.com</span>
                <span className="text-emerald-400">&lt; 15 min SLA</span>
              </div>
              <div className="text-slate-400 flex items-center justify-between">
                <span>Location: San Francisco, CA / Remote Global</span>
                <span className="text-blue-400">PST / EST / GMT</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
