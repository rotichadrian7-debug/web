import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeftRight, 
  Calendar, 
  CheckCircle2, 
  User, 
  Clock, 
  Award 
} from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../../data/clinicData';
import { BeforeAfterCase } from '../../types';

interface BeforeAfterSectionProps {
  onOpenBooking: (treatmentId?: string) => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeCase, setActiveCase] = useState<BeforeAfterCase>(BEFORE_AFTER_CASES[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - container.left) / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <section id="before-after" className="py-24 relative bg-[#0D0F14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1D27] border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Documented Clinical Results</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
            Real Patient <span className="gold-gradient-text italic">Transformations</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag the interactive slider below to inspect actual untreated vs. post-clinical treatment outcomes. All cases represent unretouched medical clinical photography.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {BEFORE_AFTER_CASES.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCase(item);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCase.id === item.id
                  ? 'bg-[#C5A880] text-black shadow-lg shadow-[#C5A880]/20'
                  : 'bg-[#141721] text-slate-300 hover:text-white border border-white/10 hover:border-[#C5A880]/30'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Main Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Draggable Visual Stage */}
          <div className="lg:col-span-7">
            <div 
              className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-2xl select-none cursor-ew-resize group bg-[#0B0D12]"
              onMouseMove={(e) => { if (isDragging || e.buttons === 1) handleSliderMove(e); }}
              onTouchMove={handleSliderMove}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
            >
              {/* After Image (Background Layer) */}
              <img 
                src={activeCase.afterImage} 
                alt="Post-Treatment Clinical Result"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover filter contrast-[1.03]"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0D0F14]/90 border border-[#C5A880]/40 text-[#E4D5BE] text-[10px] font-mono uppercase tracking-wider backdrop-blur-md z-10">
                After: {activeCase.timeline}
              </div>

              {/* Before Image (Clipped Overlay Layer) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={activeCase.beforeImage} 
                  alt="Pre-Treatment Baseline"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.03]"
                  style={{ width: '100%', maxWidth: 'none' }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D0F14]/90 border border-white/20 text-slate-300 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md z-10">
                  Before Treatment
                </div>
              </div>

              {/* Draggable Divider Line & Knob */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-[#C5A880] shadow-[0_0_15px_rgba(197,168,128,0.8)] z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0D0F14] border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center shadow-2xl">
                  <ArrowLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Drag Prompt Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-slate-300 pointer-events-none flex items-center gap-1.5 border border-white/10">
                <ArrowLeftRight className="w-3 h-3 text-[#C5A880]" />
                <span>Drag slider left/right to compare</span>
              </div>
            </div>
          </div>

          {/* Right: Clinical Case Details & Prescribed Protocol */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141721] border border-white/10 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider mb-1">
                  <span>{activeCase.category} • {activeCase.patientAge}</span>
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white leading-snug">
                  {activeCase.title}
                </h3>
                <div className="text-xs text-[#E4D5BE] mt-1 font-medium">
                  Primary Procedure: {activeCase.treatmentName}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeCase.description}
              </p>

              {/* Primary Concerns Treated */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5 font-semibold">Concerns Addressed:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCase.concerns.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Treatments & Skincare Combinations */}
              <div className="p-4 rounded-2xl bg-[#0D0F14] border border-white/5">
                <span className="text-[11px] font-mono text-[#C5A880] uppercase block mb-1">Prescribed Clinical Protocol:</span>
                <ul className="space-y-1 text-xs text-slate-200">
                  {activeCase.treatmentsUsed.map((t, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Treatment Consultation</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
