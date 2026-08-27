import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingBag, 
  Calendar, 
  RefreshCw,
  Sun,
  Moon,
  RotateCcw
} from 'lucide-react';
import { TREATMENTS, PRODUCTS } from '../../data/clinicData';
import { Product, Treatment } from '../../types';

interface SkinQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenBooking: (treatmentId: string) => void;
}

export const SkinQuizModal: React.FC<SkinQuizModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onOpenBooking,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);

  // User selections
  const [primaryGoal, setPrimaryGoal] = useState('Youthful Collagen & Firming');
  const [skinType, setSkinType] = useState('Combination');
  const [sensitivity, setSensitivity] = useState('Mild / Occasional Erythema');
  const [ageGroup, setAgeGroup] = useState('30 - 45');
  const [routinePreference, setRoutinePreference] = useState('Complete In-Clinic + At-Home Medical Regimen');

  // AI Diagnostic output
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);
  const [addedRoutineSuccess, setAddedRoutineSuccess] = useState(false);

  // Support Escape key to step back or close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (step > 1) {
          setStep((step - 1) as 1 | 2 | 3);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step, onClose]);

  if (!isOpen) return null;

  const handleGenerateDiagnostic = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/quiz-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryGoal,
          skinType,
          sensitivity,
          ageGroup,
          routinePreference
        })
      });

      const data = await response.json();
      setDiagnosticResult(data);
      setLoading(false);
      setStep(4);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setStep(4);
    }
  };

  const handleAddFullRoutineToCart = () => {
    // Add top recommended products (Serum, Cream, SPF, Cleanser)
    const productsToAdd = PRODUCTS.slice(0, 4);
    productsToAdd.forEach(p => onAddToCart(p, 1));
    setAddedRoutineSuccess(true);
    setTimeout(() => setAddedRoutineSuccess(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#0D0F14] border border-[#C5A880]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Header with Back Navigation */}
        <div className="p-5 sm:p-6 bg-[#141721] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#C5A880] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Go Back to Previous Question"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                <Sparkles className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">AI Clinical Skin Diagnostic</h3>
              <p className="text-xs text-slate-400">Harvard & Stanford Physician Formulated Algorithm</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Tabs (Clickable to jump back) */}
        <div className="px-6 py-2.5 bg-[#11131A] border-b border-white/5 flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
              step === 1 ? 'text-[#E4D5BE] font-bold' : 'text-[#C5A880] hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[10px]">1</span>
            <span>Goal</span>
          </button>
          <span className="text-slate-600">→</span>
          <button
            onClick={() => { if (step > 2) setStep(2); }}
            className={`flex items-center gap-1.5 transition-colors ${
              step === 2 
                ? 'text-[#E4D5BE] font-bold' 
                : step > 2 
                  ? 'text-[#C5A880] hover:text-white cursor-pointer' 
                  : 'text-slate-600'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px]">2</span>
            <span>Profile</span>
          </button>
          <span className="text-slate-600">→</span>
          <button
            onClick={() => { if (step > 3) setStep(3); }}
            className={`flex items-center gap-1.5 transition-colors ${
              step === 3 
                ? 'text-[#E4D5BE] font-bold' 
                : step > 3 
                  ? 'text-[#C5A880] hover:text-white cursor-pointer' 
                  : 'text-slate-600'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px]">3</span>
            <span>Regimen</span>
          </button>
          <span className="text-slate-600">→</span>
          <span className={`flex items-center gap-1.5 ${step === 4 ? 'text-[#E4D5BE] font-bold' : 'text-slate-600'}`}>
            <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px]">4</span>
            <span>Prescription</span>
          </span>
        </div>

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Primary Aesthetic Goal */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono text-[#C5A880] uppercase">Step 1 of 3</span>
                <h4 className="font-serif-luxury text-2xl font-bold text-white mt-1">What is your primary skin transformation goal?</h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { title: 'Youthful Collagen & Firming', desc: 'Lift jowls, firm cheek contours, and smooth deep expression lines.' },
                  { title: 'Melasma & Sun Damage Correction', desc: 'Erase stubborn hormonal pigmentation, sun spots, and uneven tone.' },
                  { title: 'Acne Scar Revision & Pore Refinement', desc: 'Smooth rough texture, shrink enlarged pores, and clear breakouts.' },
                  { title: 'Instant Glass-Skin Radiance', desc: 'Restore deep dewy hydration, eliminate dullness, and achieve camera-ready glow.' }
                ].map(opt => (
                  <button
                    key={opt.title}
                    type="button"
                    onClick={() => setPrimaryGoal(opt.title)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      primaryGoal === opt.title
                        ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-lg'
                        : 'bg-[#141721] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{opt.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                    {primaryGoal === opt.title && (
                      <div className="w-6 h-6 rounded-full bg-[#C5A880] text-black flex items-center justify-center shrink-0 ml-3">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Return to Clinic</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Next: Skin Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Skin Type & Sensitivity */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono text-[#C5A880] uppercase">Step 2 of 3</span>
                <h4 className="font-serif-luxury text-2xl font-bold text-white mt-1">Describe your skin type & sensitivity</h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Skin Type:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Dry', 'Combination', 'Oily', 'Sensitive'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSkinType(st)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        skinType === st
                          ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                          : 'bg-[#141721] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Sensitivity Level:</label>
                <div className="space-y-2">
                  {[
                    'Resilient / Rarely Irritated',
                    'Mild / Occasional Erythema or Redness',
                    'High / Rosacea-Prone & Easily Sensitized'
                  ].map(sens => (
                    <button
                      key={sens}
                      type="button"
                      onClick={() => setSensitivity(sens)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        sensitivity === sens
                          ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                          : 'bg-[#141721] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {sens}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Back to Goal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Next: Age & Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Age & Regimen Preference */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono text-[#C5A880] uppercase">Step 3 of 3</span>
                <h4 className="font-serif-luxury text-2xl font-bold text-white mt-1">Age group & regimen focus</h4>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Age Bracket:</label>
                <div className="grid grid-cols-4 gap-2">
                  {['20 - 29', '30 - 45', '46 - 59', '60+'].map(ag => (
                    <button
                      key={ag}
                      type="button"
                      onClick={() => setAgeGroup(ag)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        ageGroup === ag
                          ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                          : 'bg-[#141721] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {ag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Preferred Protocol Format:</label>
                <div className="space-y-2">
                  {[
                    'Complete In-Clinic + At-Home Medical Regimen',
                    'High-Potency Medical Skincare Only (At-Home)',
                    'Minimally Invasive In-Clinic Procedures Focused'
                  ].map(pref => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setRoutinePreference(pref)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        routinePreference === pref
                          ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                          : 'bg-[#141721] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Back to Profile</span>
                </button>
                <button
                  type="button"
                  onClick={handleGenerateDiagnostic}
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Prescription...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Skin & Formulate Routine</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: AI Diagnostic Result & Custom Prescription */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 rounded-2xl bg-[#141721] border border-[#C5A880]/40 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold text-white">Custom Clinical Diagnostic Profile</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {diagnosticResult?.analysis || `Based on your profile (${skinType} skin, ${ageGroup} age group, focusing on ${primaryGoal}), our physicians recommend targeting cellular renewal and dermal barrier reinforcement.`}
                  </p>
                </div>
              </div>

              {/* Recommended In-Clinic Procedure */}
              <div>
                <h5 className="font-serif-luxury text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Recommended In-Clinic Procedure:</span>
                </h5>
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {diagnosticResult?.treatmentRecommendation?.name || TREATMENTS[0].name}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {diagnosticResult?.treatmentRecommendation?.rationale || 'Maximizes deep dermal remodeling with minimal downtime.'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking(diagnosticResult?.treatmentRecommendation?.treatmentId || TREATMENTS[0].id);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                  >
                    Book Procedure
                  </button>
                </div>
              </div>

              {/* Recommended At-Home Regimen */}
              <div>
                <h5 className="font-serif-luxury text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>Curated Medical Skincare Protocol:</span>
                </h5>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 4).map(prod => (
                    <div key={prod.id} className="p-3 rounded-xl bg-[#141721] border border-white/5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-contain rounded bg-[#0B0D12] p-1"
                        />
                        <div>
                          <div className="text-xs font-bold text-white truncate max-w-[130px]">{prod.name}</div>
                          <div className="text-[10px] text-[#C5A880] font-mono">${prod.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onAddToCart(prod, 1)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-[#C5A880] text-slate-300 hover:text-black transition-colors cursor-pointer"
                        title="Add to bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 4 Action Buttons with Clear Back Option */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Modify Diagnostic Answers</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddFullRoutineToCart}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedRoutineSuccess
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                      : 'bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {addedRoutineSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Routine Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Complete 4-Step Regimen</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
