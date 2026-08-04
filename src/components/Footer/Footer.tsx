import React, { useState } from 'react';
import { Cpu, Linkedin, Github, Twitter, Mail, ArrowUpRight, ShieldCheck, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showSeoModal, setShowSeoModal] = useState(false);

  return (
    <footer className="bg-[#03050F] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 p-[1px]">
                <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div>
                <span className="font-heading font-bold text-base text-white tracking-tight flex items-center gap-1">
                  NEXUS<span className="text-blue-500">.AI</span>
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block -mt-1">
                  AI Revenue Systems Architect
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Architecting high-ticket AI revenue systems, lead qualification pipelines, custom CRMs, sales automation, and sub-second voice callers for growing businesses.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0B1120] border border-slate-800 flex items-center justify-center hover:text-white hover:border-blue-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0B1120] border border-slate-800 flex items-center justify-center hover:text-white hover:border-blue-500/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0B1120] border border-slate-800 flex items-center justify-center hover:text-white hover:border-blue-500/40 transition-colors"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="mailto:alex@nexus-ai-systems.com" 
                className="w-8 h-8 rounded-lg bg-[#0B1120] border border-slate-800 flex items-center justify-center hover:text-white hover:border-blue-500/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono">
            <h4 className="text-xs text-white font-bold uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Architect</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">6 Revenue Systems</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Featured Projects</a></li>
              <li><a href="#process" className="hover:text-white transition-colors">7-Step Methodology</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
            </ul>
          </div>

          {/* Core Systems */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <h4 className="text-xs text-white font-bold uppercase tracking-wider">Systems Architecture</h4>
            <ul className="space-y-2 text-slate-400">
              <li>AI Lead Qualification & Scoring</li>
              <li>Airtable & GoHighLevel CRM Sync</li>
              <li>ElevenLabs Sub-Second Voice Agents</li>
              <li>PandaDoc & Stripe Proposal Generator</li>
              <li>Make.com & n8n Workflow Scenarios</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} Nexus AI Systems Architect. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSeoModal(!showSeoModal)}
              className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              JSON-LD & SEO Schema
            </button>
            <span className="text-emerald-400">Deployed on Cloud Run</span>
          </div>
        </div>

      </div>

      {/* SEO Schema Drawer */}
      {showSeoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel max-w-lg w-full rounded-2xl border border-slate-800 p-6 space-y-4">
            <div className="flex justify-between items-center text-white font-mono font-bold">
              <span>Structured Data (JSON-LD)</span>
              <button onClick={() => setShowSeoModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <pre className="p-4 bg-[#050816] rounded-xl text-[10px] text-blue-300 font-mono overflow-x-auto border border-slate-800">
{`{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Nexus AI Systems Architect",
  "description": "High-ticket AI Revenue Systems & Sales Automation Architect",
  "priceRange": "$$$$"
}`}
            </pre>
          </div>
        </div>
      )}

    </footer>
  );
};
