import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Play, 
  TrendingUp, 
  CheckCircle2, 
  X, 
  Sparkles, 
  PhoneCall, 
  FileText, 
  BarChart3, 
  Bot,
  Zap
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectItem } from '../../types';

export const Projects: React.FC = () => {
  const [activeDemoProject, setActiveDemoProject] = useState<ProjectItem | null>(null);

  // Demo 1 State (Lead Scoring)
  const [demo1Score, setDemo1Score] = useState<number | null>(null);
  const [demo1Budget, setDemo1Budget] = useState('$20,000');
  const [demo1Volume, setDemo1Volume] = useState('250 leads/mo');

  // Demo 2 State (Voice Agent Audio Simulator)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Demo 4 State (Proposal Generator)
  const [generatedProposal, setGeneratedProposal] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRunProposalGen = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedProposal(`EXECUTIVE PROPOSAL — NEXUS REVENUE SYSTEM
Client: Enterprise B2B Solutions
Scope: 
1. Autonomous Gemini AI Lead Qualification Pipeline
2. Bi-Directional Airtable CRM Sync
3. ElevenLabs Sub-Second Voice Calling Trigger
4. Executive Recharts Analytics Dashboard

Investment: $24,500 One-Time Setup | Expected ROI: 6.8x Year 1
PandaDoc E-Signature Link: https://pandadoc.com/s/nexus-proposal-84920`);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Case Studies & Systems</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            Proven AI Revenue Systems <br className="hidden sm:inline" />
            <span className="blue-gradient-text">Delivering Measurable ARR.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real production architectures that cut response times from hours to seconds and generate millions in extra pipeline.
          </p>
        </div>

        {/* Projects Cards Stack */}
        <div className="space-y-12">
          {PROJECTS_DATA.map((project, index) => (
            <div 
              key={project.id}
              className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 hover:border-blue-500/40 transition-all duration-300 grid lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* Left Screenshot / Image */}
              <div className={`lg:col-span-6 relative rounded-xl overflow-hidden border border-slate-800 group ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img 
                  src={project.screenshot} 
                  alt={project.title}
                  className="w-full h-72 sm:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-blue-600/90 text-white font-semibold backdrop-blur-md">
                    {project.category}
                  </span>

                  <button
                    onClick={() => setActiveDemoProject(project)}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Live System Demo
                  </button>
                </div>
              </div>

              {/* Right Project Details */}
              <div className={`lg:col-span-6 space-y-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xs font-mono text-blue-400">{project.tagline}</p>
                </div>

                {/* Problem vs Solution */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-slate-300">
                    <span className="font-mono text-rose-400 font-bold uppercase block mb-0.5">The Bottleneck:</span>
                    {project.problem}
                  </div>

                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-slate-300">
                    <span className="font-mono text-blue-400 font-bold uppercase block mb-0.5">AI Architecture Solution:</span>
                    {project.solution}
                  </div>
                </div>

                {/* Business Metrics Cards */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {project.businessResults.map((res, idx) => (
                    <div key={idx} className="bg-[#0B1120] p-3 rounded-xl border border-slate-800 text-center">
                      <div className="text-base sm:text-lg font-heading font-bold text-emerald-400 font-mono">{res.metric}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{res.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#070C1B] text-slate-300 border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveDemoProject(project)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/25 flex items-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Test Live Demo
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 glass-panel hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub Repo
                    </a>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Project Live Demo Modal */}
      {activeDemoProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-2xl w-full rounded-2xl border border-blue-500/40 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveDemoProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#0B1120] text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase">Interactive System Sandbox</span>
                <h3 className="text-xl font-heading font-bold text-white">{activeDemoProject.title}</h3>
              </div>
            </div>

            {/* Live Demo Body based on type */}
            {activeDemoProject.liveDemoType === 'lead_qualifier' && (
              <div className="bg-[#070C1B] p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="text-xs font-mono text-white font-semibold flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-400" />
                  Gemini Lead Qualification Simulator
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1 font-mono">Monthly Budget</label>
                    <select 
                      value={demo1Budget}
                      onChange={(e) => setDemo1Budget(e.target.value)}
                      className="w-full bg-[#0B1120] border border-slate-800 text-white p-2 rounded-lg font-mono"
                    >
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $25,000</option>
                      <option>$25,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 font-mono">Lead Volume</label>
                    <select 
                      value={demo1Volume}
                      onChange={(e) => setDemo1Volume(e.target.value)}
                      className="w-full bg-[#0B1120] border border-slate-800 text-white p-2 rounded-lg font-mono"
                    >
                      <option>50 - 150 leads/mo</option>
                      <option>150 - 500 leads/mo</option>
                      <option>500+ leads/mo</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setDemo1Score(Math.floor(Math.random() * 8) + 92)}
                  className="w-full py-2.5 bg-blue-600 text-white font-mono text-xs rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Zap className="w-3.5 h-3.5 text-blue-300" />
                  Run AI Qualification Calculation
                </button>

                {demo1Score && (
                  <div className="p-4 bg-[#0B1120] rounded-xl border border-emerald-500/30 text-xs space-y-2">
                    <div className="flex justify-between items-center font-mono">
                      <span className="text-slate-300">AI Qualification Score:</span>
                      <span className="text-emerald-400 font-bold text-base">{demo1Score} / 100</span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-mono">
                      Routing Decision: Immediate Priority Calendar Booking + Slack Executive Channel Alert Triggered.
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeDemoProject.liveDemoType === 'voice_agent' && (
              <div className="bg-[#070C1B] p-5 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-400" />
                    ElevenLabs Voice Audio Simulator
                  </span>
                  <span className="text-emerald-400">Sub-800ms Speech Stream</span>
                </div>

                <div className="bg-[#0B1120] p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-slate-400">[Simulated Caller Audio Waveform]</div>
                  <div className="flex items-center gap-1 h-8">
                    {[30, 60, 90, 40, 70, 100, 50, 80, 20, 90, 60, 40, 80, 30].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 rounded-full transition-all duration-300 ${isPlayingAudio ? 'bg-blue-400 animate-pulse' : 'bg-slate-700'}`}
                        style={{ height: `${isPlayingAudio ? h : 20}%` }}
                      ></div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    {isPlayingAudio ? 'Pause Speech Stream' : 'Play ElevenLabs Call Sample'}
                  </button>
                </div>

                <div className="bg-[#0B1120] p-3 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-blue-400 font-bold">[AI Voice Agent]:</span> "Welcome to Sterling Legal. I can check Attorney Sterling's schedule right now. Does Thursday at 3 PM work for your consultation?"
                </div>
              </div>
            )}

            {activeDemoProject.liveDemoType === 'proposal_gen' && (
              <div className="bg-[#070C1B] p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
                <div className="text-white font-semibold font-mono flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Instant Proposal & E-Signature Generator
                </div>

                <button
                  onClick={handleRunProposalGen}
                  disabled={isGenerating}
                  className="w-full py-2.5 bg-blue-600 text-white font-mono rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  {isGenerating ? 'Generating Proposal via Gemini 3.6...' : 'Generate Sample Executive Proposal'}
                </button>

                {generatedProposal && (
                  <div className="bg-[#0B1120] p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-line leading-relaxed">
                    {generatedProposal}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveDemoProject(null)}
                className="px-5 py-2 bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-mono"
              >
                Close Sandbox
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
