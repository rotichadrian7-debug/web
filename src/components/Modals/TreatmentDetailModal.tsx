import React, { useEffect } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Award,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Treatment } from '../../types';

interface TreatmentDetailModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onOpenBooking: (treatmentId: string) => void;
}

export const TreatmentDetailModal: React.FC<TreatmentDetailModalProps> = ({
  treatment,
  onClose,
  onOpenBooking,
}) => {
  // Support Escape key to go back / close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!treatment) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#0D0F14] border border-[#C5A880]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="px-5 py-3.5 bg-[#141721] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C5A880] hover:text-[#E4D5BE] transition-colors font-semibold group cursor-pointer"
              title="Return to Treatments Section"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Treatments</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <span className="text-slate-400 capitalize hidden sm:inline">{treatment.category}</span>
            <span className="text-slate-600 hidden md:inline">/</span>
            <span className="text-white font-semibold truncate max-w-[160px] sm:max-w-[220px] hidden md:inline">
              {treatment.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Image Banner */}
        <div className="relative h-56 sm:h-72 overflow-hidden bg-[#0B0D12]">
          <img 
            src={treatment.image} 
            alt={treatment.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-[#0D0F14]/40 to-transparent"></div>

          {/* Title and category overlay */}
          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase mb-1">
              <span>{treatment.category}</span>
              <span>•</span>
              <span>{treatment.downtime}</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white leading-tight">
              {treatment.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">{treatment.subtitle}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#141721] border border-white/5 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">Investment</span>
              <span className="text-sm font-bold text-[#E4D5BE]">${treatment.priceStartingAt}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">Session Length</span>
              <span className="text-sm font-bold text-white">{treatment.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">Downtime</span>
              <span className="text-sm font-bold text-white">{treatment.downtime}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">Results Longevity</span>
              <span className="text-sm font-bold text-white">{treatment.longevity}</span>
            </div>
          </div>

          {/* Clinical Overview */}
          <div>
            <h3 className="font-serif-luxury text-lg font-bold text-white mb-2">Procedure Science & Protocol</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {treatment.fullDesc}
            </p>
          </div>

          {/* Key Clinical Benefits */}
          <div>
            <h3 className="font-serif-luxury text-lg font-bold text-white mb-2">Documented Clinical Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {treatment.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Concerns */}
          <div>
            <h3 className="font-serif-luxury text-base font-bold text-white mb-2">Recommended For Concerns:</h3>
            <div className="flex flex-wrap gap-2">
              {treatment.targetConcerns.map((concern, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-xs bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#E4D5BE]">
                  {concern}
                </span>
              ))}
            </div>
          </div>

          {/* Pre & Post Care Protocol */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Pre-Procedure Prep</span>
              </span>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• Discontinue retinoids and AHAs 3 days prior.</li>
                <li>• Avoid alcohol and blood-thinners 48h prior.</li>
                <li>• Arrive with clean, makeup-free skin.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Recommended Aftercare</span>
              </span>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• Apply ÉLAN Post-Procedure Recovery Balm.</li>
                <li>• Strictly use Mineral Silk SPF 50+ broad-spectrum.</li>
                <li>• Avoid intense workouts or saunas for 24h.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="p-6 bg-[#141721] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 block font-mono">Treatment Starting At</span>
            <span className="text-xl font-bold text-[#E4D5BE]">${treatment.priceStartingAt}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Back to Treatments</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking(treatment.id);
              }}
              className="flex-1 sm:flex-initial px-8 py-3 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Procedure</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
