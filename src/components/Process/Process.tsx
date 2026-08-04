import React, { useState } from 'react';
import { 
  Workflow, 
  Search, 
  Cpu, 
  Layout, 
  Code2, 
  Rocket, 
  LineChart, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { PROCESS_STEPS } from '../../data/portfolioData';

export const Process: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-indigo-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-amber-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-emerald-400" />;
      case 'LineChart': return <LineChart className="w-5 h-5 text-purple-400" />;
      default: return <Workflow className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80 grid-background">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <Workflow className="w-3.5 h-3.5" />
            <span>7-Step Engineering Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            From Audit to Launch in <span className="blue-gradient-text">26 Days.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A rigorous 7-stage architectural workflow designed to guarantee enterprise security, zero downtime, and instant pipeline velocity.
          </p>
        </div>

        {/* Step Numbers Bar */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[700px] relative px-4">
            
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>

            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const isPassed = activeStepIndex > idx;

              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`relative z-10 flex flex-col items-center group focus:outline-none`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-bold text-sm transition-all duration-300 border ${
                    isSelected 
                      ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-600/40 scale-110' 
                      : isPassed
                      ? 'bg-[#0B1120] text-blue-400 border-blue-500/40'
                      : 'bg-[#0B1120] text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}>
                    {step.stepNumber}
                  </div>
                  <span className={`text-[11px] font-mono mt-2 transition-colors ${
                    isSelected ? 'text-white font-bold' : 'text-slate-400'
                  }`}>
                    {step.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Detailed Card */}
        <div className="glass-panel rounded-2xl border border-blue-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Overview */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                  {getStepIcon(activeStep.icon)}
                </div>
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Step {activeStep.stepNumber} • {activeStep.duration}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                    {activeStep.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeStep.summary}
              </p>

              {/* Step Key Actions */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase">Stage Execution Tasks</h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {activeStep.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 bg-[#0B1120] border border-slate-800/80 rounded-lg text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                  className="px-4 py-2 text-xs font-mono rounded-lg bg-[#0B1120] text-slate-300 hover:text-white border border-slate-800 disabled:opacity-40 disabled:pointer-events-none"
                >
                  ← Previous Step
                </button>

                <span className="text-xs font-mono text-slate-500">
                  {activeStepIndex + 1} of {PROCESS_STEPS.length}
                </span>

                <button
                  disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                  onClick={() => setActiveStepIndex(Math.min(PROCESS_STEPS.length - 1, activeStepIndex + 1))}
                  className="px-4 py-2 text-xs font-mono rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-md disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next Step →
                </button>
              </div>

            </div>

            {/* Deliverables Box */}
            <div className="lg:col-span-5 bg-[#070C1B] p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Guaranteed Deliverables
              </div>

              <div className="space-y-2">
                {activeStep.deliverables.map((deliv, i) => (
                  <div key={i} className="p-3 bg-[#0B1120] border border-slate-800 rounded-lg flex items-center justify-between text-xs text-white font-mono">
                    <span>{deliv}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Sign-off Ready</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300 leading-relaxed font-mono">
                💡 All architecture plans include full documentation, code ownership transfer, and 30-day post-launch optimization support.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
