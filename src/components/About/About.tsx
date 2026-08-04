import React from 'react';
import { 
  UserCheck, 
  Target, 
  Award, 
  Code2, 
  Workflow, 
  Sparkles, 
  Compass, 
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Zap,
  Bot
} from 'lucide-react';
import architectPortrait from '../../assets/images/architect_portrait_1784813020935.jpg';

export const About: React.FC = () => {
  const milestones = [
    { year: '2021', title: 'Full-Stack Software Engineering', description: 'Built enterprise web apps and distributed microservices with React & Node.' },
    { year: '2023', title: 'Deep Workflow Automation', description: 'Architected multi-app integrations across Make.com, n8n, and custom webhooks.' },
    { year: '2024', title: 'LLM & AI Agent Architecture', description: 'Pioneered custom RAG systems, lead scoring engines, and vector search pipelines.' },
    { year: '2026', title: 'AI Revenue Systems Architect', description: 'Designing $10k–$50k+ automated sales engines generating $14.2M+ in client revenue.' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <UserCheck className="w-3.5 h-3.5" />
            <span>AI Systems Architect Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
            I don't build generic websites. <br className="hidden sm:inline" />
            I build <span className="blue-gradient-text">AI-Powered Revenue Engines.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Bridging the gap between cutting-edge LLM models, custom CRM engineering, and automated sales workflows to turn manual sales chaos into predictable revenue.
          </p>
        </div>

        {/* Profile Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Professional Photo / Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 glass-panel group shadow-2xl shadow-blue-950/40">
              <img 
                src={architectPortrait} 
                alt="Alex Thorne - Principal AI Systems Architect"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] object-cover object-center filter contrast-[1.05] transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-85"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl border border-blue-500/30 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white">Alex Thorne</h3>
                    <p className="text-xs font-mono text-blue-400">Principal AI Revenue Systems Architect</p>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Metric Badge */}
            <div className="absolute -top-4 -right-4 bg-[#0B1120] border border-slate-800 p-3.5 rounded-xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                5+
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">Years Building</div>
                <div className="text-slate-400 font-mono text-[10px]">AI & Software Architecture</div>
              </div>
            </div>
          </div>

          {/* Right: Mission, Vision, and Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Mission & Vision Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-all">
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-base font-heading font-bold text-white mb-2">My Mission</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Eliminate 90% of manual sales admin overhead by implementing self-healing AI qualification pipelines that convert leads in seconds, not days.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-all">
                <div className="w-9 h-9 rounded-lg bg-sky-600/20 text-sky-400 flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-base font-heading font-bold text-white mb-2">My Vision</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Empower growing businesses with enterprise-grade autonomous revenue infrastructure that scales seamlessly without adding massive headcounts.
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">Architectural Rules</h4>
              <div className="space-y-2">
                {[
                  { title: 'Zero Manual Copy-Pasting', desc: 'Every form lead is enriched and inserted into relational CRMs automatically.' },
                  { title: 'Sub-30-Second Lead Contact', desc: 'Instant AI voice calling or SMS qualification before competitors respond.' },
                  { title: 'Deterministic Fallback Safeguards', desc: 'Enterprise retry queues and human handoff triggers for complete peace of mind.' }
                ].map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-[#0B1120] border border-slate-800/80 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold text-white block">{pillar.title}</span>
                      <span className="text-[11px] text-slate-400 leading-tight">{pillar.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div className="pt-4 border-t border-slate-800/80">
              <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4">Evolution Timeline</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {milestones.map((m, idx) => (
                  <div key={idx} className="p-3 bg-[#0B1120]/60 border border-slate-800/80 rounded-lg">
                    <div className="text-xs font-mono font-bold text-blue-400 mb-1">{m.year}</div>
                    <div className="text-xs font-semibold text-white mb-1">{m.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">{m.description}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
