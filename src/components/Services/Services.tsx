import React, { useState } from 'react';
import { 
  Bot, 
  Database, 
  Zap, 
  Target, 
  BarChart3, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  X, 
  Sparkles, 
  Cpu,
  ShieldAlert
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/portfolioData';
import { ServiceItem } from '../../types';

interface ServicesProps {
  onSelectServiceForBooking?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForBooking }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-6 h-6 text-blue-400" />;
      case 'Database': return <Database className="w-6 h-6 text-sky-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Target': return <Target className="w-6 h-6 text-indigo-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-emerald-400" />;
      case 'PhoneCall': return <PhoneCall className="w-6 h-6 text-blue-400" />;
      default: return <Cpu className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80 grid-background">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>High-Ticket AI Systems Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            6 Core Systems Built to <span className="blue-gradient-text">Capture & Scale Revenue.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every system is engineered as an enterprise product—custom code, zero fragile workarounds, and guaranteed revenue velocity.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              {/* Top Card Bar */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800/80 text-blue-300 border border-slate-700/80">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.techStack.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B1120] text-slate-400 border border-slate-800">
                      {tech}
                    </span>
                  ))}
                  {service.techStack.length > 4 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                      +{service.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {service.typicalROI}
                </span>

                <button 
                  className="text-xs font-semibold text-blue-400 group-hover:text-white flex items-center gap-1 transition-colors"
                >
                  Inspect Architecture
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive System Architecture Inspection Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-2xl w-full rounded-2xl border border-blue-500/30 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#0B1120] text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                {getServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">{selectedService.category}</span>
                <h3 className="text-2xl font-heading font-bold text-white">{selectedService.title}</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedService.fullDetails}
            </p>

            {/* Architecture Pipeline Breakdown */}
            <div className="bg-[#070C1B] p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-blue-400 font-semibold uppercase flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> System Flowchart & Webhook Sequence
              </div>
              <div className="space-y-2">
                {selectedService.architectureDiagram.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-slate-200 font-mono bg-[#0B1120] p-2.5 rounded-lg border border-slate-800/80">
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables List */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase">Key Deliverables Provided</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {selectedService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="text-xs font-mono text-emerald-400 font-semibold">
                Expected ROI: {selectedService.typicalROI}
              </div>

              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  if (onSelectServiceForBooking) {
                    onSelectServiceForBooking(serviceName);
                  }
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all"
              >
                Book {selectedService.title} Strategy
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
