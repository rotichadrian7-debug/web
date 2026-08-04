import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DEMO_TESTIMONIALS } from '../../data/portfolioData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified System Results</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            Client Validation & <span className="blue-gradient-text">Case Outcomes.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            See how custom AI revenue architecture transforms sales operations and drives compound business growth.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {DEMO_TESTIMONIALS.map((item) => (
            <div 
              key={item.id}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 relative group"
            >
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Demo Testimonial Validation
                </span>
              </div>

              {/* Quote */}
              <div className="relative space-y-2">
                <Quote className="w-6 h-6 text-blue-500/30 absolute -top-2 -left-2 -z-10" />
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Client Footer */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.avatar} 
                    alt={item.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-blue-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white">{item.clientName}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{item.role}, {item.company}</p>
                  </div>
                </div>

                <div className="p-2 bg-[#0B1120] rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                  <span>Impact Metric:</span>
                  <span className="font-bold">{item.metricsAchieved}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
