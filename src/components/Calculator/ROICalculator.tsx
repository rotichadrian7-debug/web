import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Bot,
  PieChart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProposalAuditResult } from '../../types';

export const ROICalculator: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [monthlyLeads, setMonthlyLeads] = useState(200);
  const [avgDealValue, setAvgDealValue] = useState(3500);
  const [currentConvRate, setCurrentConvRate] = useState(4); // 4%
  const [industry, setIndustry] = useState('B2B Professional Services');

  const [aiProposal, setAiProposal] = useState<ProposalAuditResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Calculations
  const currentMonthlyDeals = (monthlyLeads * (currentConvRate / 100));
  const currentMonthlyRevenue = currentMonthlyDeals * avgDealValue;

  // Estimated AI System Boost (typically 1.8x - 2.5x conversion rate)
  const targetConvRate = Math.min(25, Math.round(currentConvRate * 2.1 * 10) / 10);
  const targetMonthlyDeals = (monthlyLeads * (targetConvRate / 100));
  const targetMonthlyRevenue = targetMonthlyDeals * avgDealValue;
  const monthlyRevenueUpside = targetMonthlyRevenue - currentMonthlyRevenue;
  const annualRevenueUpside = monthlyRevenueUpside * 12;

  const handleGenerateAudit = async () => {
    setIsGenerating(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });

    try {
      const res = await fetch('/api/gemini/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyName || 'Target Enterprise',
          industry,
          leadVolume: monthlyLeads,
          dealValue: avgDealValue,
          conversionRate: currentConvRate,
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiProposal(data);
      }
    } catch (err) {
      console.error('Audit generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-[#050816] border-t border-slate-800/80 grid-background">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI & Financial Impact Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
            Calculate Your <span className="blue-gradient-text">Revenue Leakage & AI Upside.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Slow lead response and manual rep follow-ups cause massive revenue leaks. See how much ARR an automated AI Revenue System will capture.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs Column */}
          <div className="lg:col-span-6 glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-400" />
              1. Input Your Current Business Metrics
            </h3>

            <div className="space-y-5 text-xs">
              
              <div>
                <label className="text-slate-300 font-mono block mb-1.5">Company Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Global Solutions"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Monthly Leads Slider */}
              <div>
                <div className="flex justify-between text-slate-300 font-mono mb-2">
                  <span>Monthly Inbound Lead Volume</span>
                  <span className="text-blue-400 font-bold text-sm">{monthlyLeads} leads/mo</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Average Deal Value Slider */}
              <div>
                <div className="flex justify-between text-slate-300 font-mono mb-2">
                  <span>Average Deal Value (Contract / LTV)</span>
                  <span className="text-emerald-400 font-bold text-sm">${avgDealValue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={avgDealValue}
                  onChange={(e) => setAvgDealValue(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Current Conversion Rate Slider */}
              <div>
                <div className="flex justify-between text-slate-300 font-mono mb-2">
                  <span>Current Lead-to-Sale Conversion Rate</span>
                  <span className="text-sky-400 font-bold text-sm">{currentConvRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={currentConvRate}
                  onChange={(e) => setCurrentConvRate(Number(e.target.value))}
                  className="w-full accent-sky-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

            </div>

            <button
              onClick={handleGenerateAudit}
              disabled={isGenerating}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-semibold shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
            >
              {isGenerating ? (
                <>
                  <Zap className="w-4 h-4 animate-spin text-blue-300" />
                  Generating Gemini System Audit...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-300" />
                  Generate AI Architecture Audit & Proposal
                </>
              )}
            </button>
          </div>

          {/* Right Calculations & AI Audit Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Real-time Metric Comparison Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Current Estimated Revenue</span>
                <div className="text-2xl font-heading font-bold text-slate-300 font-mono mt-1">
                  ${Math.round(currentMonthlyRevenue).toLocaleString()}<span className="text-xs text-slate-500">/mo</span>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-2">At {currentConvRate}% Conversion Rate</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-emerald-500/40 bg-emerald-500/5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">AI System Projected Revenue</span>
                <div className="text-2xl font-heading font-bold text-emerald-400 font-mono mt-1">
                  ${Math.round(targetMonthlyRevenue).toLocaleString()}<span className="text-xs text-emerald-500">/mo</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 mt-2">At {targetConvRate}% Projected Rate</div>
              </div>
            </div>

            {/* Main Net Upside Card */}
            <div className="glass-panel p-6 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 via-[#0B1120] to-[#0B1120] space-y-3">
              <div className="text-xs font-mono text-blue-400 uppercase font-bold tracking-wider">
                Captured Revenue Upside (Net Advantage)
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-heading font-bold text-white font-mono blue-gradient-text">
                  +${Math.round(monthlyRevenueUpside).toLocaleString()}
                </span>
                <span className="text-xs font-mono text-blue-400">/ month</span>
              </div>

              <div className="text-xs text-slate-300 font-mono">
                Equivalent to <span className="text-emerald-400 font-bold">+${Math.round(annualRevenueUpside).toLocaleString()}</span> in additional annual ARR!
              </div>
            </div>

            {/* Generated AI Proposal Result */}
            {aiProposal && (
              <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-[#070C1B] space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-white font-semibold">Gemini Proposal: {aiProposal.companyName}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ROI Multiplier: {aiProposal.roiMultiplier}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {aiProposal.executiveSummary}
                </p>

                <div className="space-y-1.5 text-xs font-mono">
                  <span className="text-slate-400 text-[10px] uppercase block">Recommended Automation Modules:</span>
                  {aiProposal.automationModules.map((mod, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
