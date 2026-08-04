import React from 'react';
import { Zap, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>High-Ticket Positioning</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            Why High-Growth Companies <br className="hidden sm:inline" />
            <span className="blue-gradient-text">Choose Nexus AI Architecture.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We don't sell bloated agency hours. We deliver autonomous revenue assets that produce immediate, measurable return on investment.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Col 1 */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-heading font-bold text-white group-hover:text-blue-400 transition-colors">
              Automation First
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Save hundreds of hours per month. We eliminate manual data copy-pasting, lead distribution delays, and repetitive sales rep admin work so your team focuses strictly on high-ticket closing.
            </p>

            <ul className="space-y-2 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Self-healing Make.com & n8n scenarios</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant 30-second lead call triggers</span>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-heading font-bold text-white group-hover:text-blue-400 transition-colors">
              Revenue Focused
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Every system is mathematically engineered to increase pipeline velocity, buyer conversion rates, and average contract values. We measure success strictly by client dollar growth.
            </p>

            <ul className="space-y-2 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>+$14.2M generated for clients</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Predictive deal health analytics</span>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="glass-panel glass-panel-hover p-8 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-heading font-bold text-white group-hover:text-sky-400 transition-colors">
              Built to Scale
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Solutions grow seamlessly with your business. Process 100 or 100,000 inbound leads per month without crashing databases or needing extra sales operations hires.
            </p>

            <ul className="space-y-2 pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>99.4% uptime enterprise resilience</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full code ownership & IP transfer</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
