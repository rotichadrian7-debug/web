import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  ShoppingBag, 
  User, 
  Calendar, 
  ArrowRight,
  ArrowLeft 
} from 'lucide-react';
import { TREATMENTS, PRODUCTS, DOCTORS } from '../../data/clinicData';
import { Treatment, Product, Doctor } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTreatment: (treatment: Treatment) => void;
  onSelectProduct: (product: Product) => void;
  onOpenBooking: (treatmentId?: string, doctorId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTreatment,
  onSelectProduct,
  onOpenBooking,
}) => {
  const [query, setQuery] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingTreatments = trimmed
    ? TREATMENTS.filter(t => 
        t.name.toLowerCase().includes(trimmed) || 
        t.subtitle.toLowerCase().includes(trimmed) ||
        t.targetConcerns.some(c => c.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingProducts = trimmed
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(trimmed) ||
        p.subtitle.toLowerCase().includes(trimmed) ||
        p.shortDesc.toLowerCase().includes(trimmed) ||
        p.activeIngredients.some(a => a.name.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingDoctors = trimmed
    ? DOCTORS.filter(d =>
        d.name.toLowerCase().includes(trimmed) ||
        d.title.toLowerCase().includes(trimmed) ||
        d.specialties.some(s => s.toLowerCase().includes(trimmed))
      )
    : [];

  const popularSearches = [
    'Botox', 'Lip Filler', 'Morpheus8', 'Melasma', 'Vitamin C', 'Retinoid', 'Hydrafacial', 'Dr. Vance'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#0D0F14] border border-[#C5A880]/40 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Return Breadcrumb */}
        <div className="px-5 py-2.5 bg-[#11131A] border-b border-white/5 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Back to Clinic Sanctuary</span>
          </button>
          <span className="text-[10px] text-slate-500 font-mono">Press ESC to exit</span>
        </div>

        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-[#141721] border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A880] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search procedures, ingredients, doctors, or skincare..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-white/5 rounded-lg cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close Search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* Quick Filter Tags / Popular */}
          {!trimmed && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono text-[#C5A880] uppercase tracking-wider block mb-2 font-bold">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-xl bg-[#141721] border border-white/10 hover:border-[#C5A880]/50 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Direct Directory Shortcuts
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => { onClose(); onOpenBooking(); }}
                    className="p-3 rounded-xl bg-[#141721] border border-white/5 text-left text-slate-300 hover:text-white hover:border-white/20 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Book Consultation</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                  <button
                    onClick={() => { 
                      onClose(); 
                      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }); 
                    }}
                    className="p-3 rounded-xl bg-[#141721] border border-white/5 text-left text-slate-300 hover:text-white hover:border-white/20 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>Skincare Boutique</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results: Treatments */}
          {matchingTreatments.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider font-bold block">
                Procedures & Treatments ({matchingTreatments.length})
              </span>
              <div className="space-y-1.5">
                {matchingTreatments.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onClose();
                      onSelectTreatment(t);
                    }}
                    className="p-3 rounded-xl bg-[#141721] border border-white/5 hover:border-[#C5A880]/40 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={t.image} 
                        alt={t.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover" 
                      />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#E4D5BE] transition-colors">{t.name}</div>
                        <div className="text-[11px] text-slate-400">{t.subtitle} • {t.duration}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#C5A880] font-bold">
                      ${t.priceStartingAt}+
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results: Products */}
          {matchingProducts.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider font-bold block">
                Skincare Formulations ({matchingProducts.length})
              </span>
              <div className="space-y-1.5">
                {matchingProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="p-3 rounded-xl bg-[#141721] border border-white/5 hover:border-[#C5A880]/40 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-contain rounded bg-[#0B0D12] p-1" 
                      />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#E4D5BE] transition-colors">{p.name}</div>
                        <div className="text-[11px] text-slate-400">{p.volume} • {p.subtitle}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-white font-bold">
                      ${p.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results: Doctors */}
          {matchingDoctors.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider font-bold block">
                Physicians & Faculty ({matchingDoctors.length})
              </span>
              <div className="space-y-1.5">
                {matchingDoctors.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onClose();
                      onOpenBooking(undefined, d.id);
                    }}
                    className="p-3 rounded-xl bg-[#141721] border border-white/5 hover:border-[#C5A880]/40 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={d.image} 
                        alt={d.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#E4D5BE] transition-colors">{d.name}</div>
                        <div className="text-[11px] text-slate-400">{d.title} • {d.locations?.join(' / ') || d.clinicLocations?.join(' / ')}</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-[#C5A880]/20 text-[#E4D5BE] text-[10px] font-bold">
                      Book Specialist
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty search fallback */}
          {trimmed && matchingTreatments.length === 0 && matchingProducts.length === 0 && matchingDoctors.length === 0 && (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-500 mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-white">No results found for "{query}"</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try searching for 'Botox', 'Morpheus8', 'Serum', or take our AI skin quiz for personalized recommendations.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
