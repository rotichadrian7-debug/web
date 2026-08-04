import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Bot, 
  PhoneCall, 
  Database, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Play, 
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { HERO_METRICS } from '../../data/portfolioData';
import architectPortrait from '../../assets/images/architect_portrait_1784813020935.jpg';

interface HeroProps {
  onOpenBookingModal: () => void;
  onSelectDemoTab?: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBookingModal }) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'qualifier' | 'pipeline' | 'voice'>('qualifier');
  
  // Interactive Lead Qualifier Simulator state inside hero dashboard
  const [simLead, setSimLead] = useState({
    name: 'Sarah Jenkins',
    company: 'Apex Logistics Inc',
    budget: '$25,000+',
    monthlyLeads: '350 leads/mo',
  });
  const [simOutput, setSimOutput] = useState<{
    score: number;
    intent: string;
    route: string;
    actionTaken: string;
  } | null>({
    score: 96,
    intent: 'HIGH_BUYING_POWER',
    route: 'Senior AE Calendar (Direct Priority Slot)',
    actionTaken: 'Airtable Sync & Slack VIP Alert Dispatched'
  });
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 10) + 90; // 90-99
      setSimOutput({
        score,
        intent: 'ENTERPRISE_SYSTEM_NEEDS',
        route: 'Executive Sales Architect (Immediate 15m Slot)',
        actionTaken: 'SMS + Calendar Confirmation Sent to ' + simLead.name
      });
      setIsSimulating(false);
    }, 800);
  };

  return (
    <section id="home" className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden grid-background">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Architect Profile Badge Header */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-[#0B1120]/90 border border-blue-500/30 backdrop-blur-md shadow-xl shadow-blue-950/20">
            <div className="relative">
              <img 
                src={architectPortrait} 
                alt="Alex Thorne - Principal AI Systems Architect" 
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-blue-400/60 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#0B1120] rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-heading font-bold text-white">Alex Thorne</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">Q3 Client Slots Open</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Principal AI Revenue Systems Architect</div>
            </div>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>High-Ticket Revenue Engines</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span className="text-slate-400">B2B & Enterprise</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1]">
              AI-Powered <span className="blue-gradient-text">Revenue Systems</span> That Capture, Qualify & Convert More Customers.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              I design intelligent sales systems that automate lead generation, qualification, CRM management, follow-ups, reporting, and customer engagement.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBookingModal}
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xl shadow-blue-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
              >
                Book Discovery Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#projects"
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-slate-200 hover:text-white glass-panel hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Live Systems
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-heading font-bold text-white">100%</div>
                <div className="text-xs text-slate-400 font-mono">Custom Architecture</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-heading font-bold text-blue-400">14 Days</div>
                <div className="text-xs text-slate-400 font-mono">Avg Deployment</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-heading font-bold text-emerald-400">0%</div>
                <div className="text-xs text-slate-400 font-mono">Manual Data Friction</div>
              </div>
            </div>
          </div>

          {/* Right Hero Column - Interactive Animated Dashboard Mockup */}
          <div className="lg:col-span-6 relative">
            
            {/* Floating Card 1: Revenue Metric Badge */}
            <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-3 p-3 bg-[#0B1120]/90 border border-blue-500/30 rounded-xl shadow-2xl backdrop-blur-md animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Client Pipeline Revenue</div>
                <div className="text-sm font-bold text-white font-mono">$128,400 <span className="text-emerald-400 text-xs font-normal">+38.2%</span></div>
              </div>
            </div>

            {/* Floating Card 2: AI Voice Active */}
            <div className="absolute -bottom-6 -right-4 z-20 hidden sm:flex items-center gap-3 p-3 bg-[#0B1120]/90 border border-sky-500/30 rounded-xl shadow-2xl backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <PhoneCall className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">AI Voice Agent</div>
                <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Active Call (Sub-800ms)
                </div>
              </div>
            </div>

            {/* Main Interactive Dashboard Frame */}
            <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl shadow-blue-950/40 relative z-10">
              
              {/* Window Header */}
              <div className="bg-[#080D1A] px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="text-xs font-mono text-slate-400 ml-2">nexus-ai-revenue-engine.v3.2</span>
                </div>

                <div className="flex items-center gap-1 bg-[#0B1120] p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                  <button
                    onClick={() => setActivePreviewTab('qualifier')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activePreviewTab === 'qualifier' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    AI Qualifier
                  </button>
                  <button
                    onClick={() => setActivePreviewTab('pipeline')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activePreviewTab === 'pipeline' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Live CRM
                  </button>
                  <button
                    onClick={() => setActivePreviewTab('voice')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activePreviewTab === 'voice' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Voice Agent
                  </button>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 space-y-5 bg-[#070C1B]">
                
                {/* TAB 1: AI Lead Qualification Live Simulator */}
                {activePreviewTab === 'qualifier' && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-mono text-white font-semibold uppercase">Inbound Lead Scoring Matrix</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Real-time Gemini Model Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Prospect Name</label>
                        <input
                          type="text"
                          value={simLead.name}
                          onChange={(e) => setSimLead({ ...simLead, name: e.target.value })}
                          className="w-full bg-[#0B1120] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Company & Lead Vol</label>
                        <input
                          type="text"
                          value={simLead.company}
                          onChange={(e) => setSimLead({ ...simLead, company: e.target.value })}
                          className="w-full bg-[#0B1120] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={runSimulation}
                      disabled={isSimulating}
                      className="w-full py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      {isSimulating ? (
                        <>
                          <Zap className="w-3.5 h-3.5 animate-spin text-blue-400" />
                          Processing System Webhook...
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-blue-400" />
                          Test AI Lead Scoring Engine
                        </>
                      )}
                    </button>

                    {simOutput && (
                      <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-slate-400">Calculated Lead Score</span>
                          <span className="text-lg font-heading font-bold text-emerald-400 font-mono">{simOutput.score} / 100</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" style={{ width: `${simOutput.score}%` }}></div>
                        </div>
                        <div className="text-[11px] text-slate-300 pt-1 font-mono space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Detected Intent:</span>
                            <span className="text-blue-400">{simOutput.intent}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Calendar Route:</span>
                            <span className="text-slate-200">{simOutput.route}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: Live CRM Pipeline */}
                {activePreviewTab === 'pipeline' && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-mono text-white font-semibold">Active Deal Pipeline (Airtable Sync)</span>
                      <span className="text-[10px] font-mono text-blue-400">4 Deals in Stage 3</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { company: 'Apex Logistics', value: '$25,000', stage: 'AI Proposal Sent', score: '98/100', color: 'border-blue-500/40' },
                        { company: 'OmniHealth Medical', value: '$18,500', stage: 'Voice Agent Booked', score: '94/100', color: 'border-emerald-500/40' },
                        { company: 'Vanguard Capital', value: '$45,000', stage: 'Contract Signed', score: '99/100', color: 'border-purple-500/40' },
                      ].map((deal, idx) => (
                        <div key={idx} className={`p-2.5 bg-[#0B1120] border ${deal.color} rounded-lg flex items-center justify-between text-xs`}>
                          <div>
                            <div className="font-semibold text-white">{deal.company}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{deal.stage}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-white font-bold">{deal.value}</div>
                            <div className="text-[10px] font-mono text-emerald-400">Score: {deal.score}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: AI Voice Agent Call Log */}
                {activePreviewTab === 'voice' && (
                  <div className="space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-mono text-white font-semibold">ElevenLabs Voice Caller Transcript</span>
                      <span className="text-[10px] font-mono text-emerald-400">Latency: 720ms</span>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="bg-[#0B1120] p-2.5 rounded-lg border border-slate-800 text-slate-300">
                        <span className="text-blue-400 font-semibold">[AI Caller]:</span> "Hello David! Thanks for inquiring about Nexus Revenue Systems. Do you have 2 minutes to confirm your sales team size?"
                      </div>
                      <div className="bg-[#0B1120] p-2.5 rounded-lg border border-slate-800 text-slate-300">
                        <span className="text-emerald-400 font-semibold">[Prospect]:</span> "Yes, we have 15 reps and process about 400 leads per month."
                      </div>
                      <div className="bg-[#0B1120] p-2.5 rounded-lg border border-slate-800 text-slate-300">
                        <span className="text-blue-400 font-semibold">[AI Caller]:</span> "Perfect. I’m placing a priority strategy slot on Senior Architect’s calendar for tomorrow at 2 PM EST. Does that work?"
                      </div>
                    </div>
                  </div>
                )}

              </div>
              
              {/* Footer status bar */}
              <div className="bg-[#050816] px-4 py-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Server Status: 100% Operational
                </span>
                <span>Webhooks: Make.com / n8n / Stripe</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Metrics Grid */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {HERO_METRICS.map((item, index) => (
            <div key={index} className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-blue-500/40 transition-all">
              <div className="text-2xl sm:text-3xl font-heading font-bold text-white blue-gradient-text">
                {item.value}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">
                {item.label}
              </div>
              <div className="text-[10px] font-mono text-blue-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-blue-400" />
                {item.change}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
