import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  BrainCircuit, 
  Bot, 
  Mic, 
  Phone, 
  Workflow, 
  Network, 
  Database, 
  Layers, 
  Code, 
  Palette, 
  Server, 
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { TECH_STACK_DATA } from '../../data/portfolioData';

export const TechStack: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI Models', 'Automation & CRM', 'Voice & Communications', 'Frontend & Database'];

  const filteredTech = selectedCategory === 'All' 
    ? TECH_STACK_DATA 
    : TECH_STACK_DATA.filter(t => t.category === selectedCategory);

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-blue-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-indigo-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-sky-400" />;
      case 'Mic': return <Mic className="w-5 h-5 text-emerald-400" />;
      case 'Phone': return <Phone className="w-5 h-5 text-blue-400" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-amber-400" />;
      case 'Network': return <Network className="w-5 h-5 text-purple-400" />;
      case 'Database': return <Database className="w-5 h-5 text-sky-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Code': return <Code className="w-5 h-5 text-blue-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-emerald-400" />;
      case 'Server': return <Server className="w-5 h-5 text-sky-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-blue-400" />;
      default: return <Cpu className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="techstack" className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80">
      
      {/* Background Radial Glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>Enterprise Technology Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            Battle-Tested Platforms <br className="hidden sm:inline" />
            <span className="blue-gradient-text">Engineered for Reliability.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We combine high-performance LLMs, telephony APIs, relational databases, and visual workflow orchestrators.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/25 border border-blue-400' 
                  : 'bg-[#0B1120] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Stack Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTech.map((tech) => (
            <div 
              key={tech.name}
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getTechIcon(tech.icon)}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {tech.proficiency}
                </span>
              </div>

              <div>
                <h3 className="text-base font-heading font-bold text-white group-hover:text-blue-400 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  {tech.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{tech.category}</span>
                {tech.featured && <span className="text-emerald-400">Production Core</span>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
