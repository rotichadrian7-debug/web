import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  Info, 
  Check, 
  ArrowRight, 
  Filter, 
  Award,
  Zap
} from 'lucide-react';
import { TREATMENTS } from '../../data/clinicData';
import { Treatment, TreatmentCategory } from '../../types';

interface TreatmentsSectionProps {
  onSelectTreatment: (treatment: Treatment) => void;
  onOpenBooking: (treatmentId: string) => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  onSelectTreatment,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TreatmentCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Clinical Procedures' },
    { id: 'injectables', label: 'Injectables & Fillers' },
    { id: 'laser', label: 'Laser & RF Energy' },
    { id: 'facials', label: 'Medical Facials & Peels' },
    { id: 'anti-aging', label: 'Biostimulators & Sculptra' },
    { id: 'body', label: 'Body Contouring' }
  ];

  const filteredTreatments = TREATMENTS.filter(t => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.targetConcerns.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section id="treatments" className="py-24 relative bg-[#0D0F14] border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1D27] border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Physician-Administered Clinical Protocols</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
            Bespoke Medical <span className="gold-gradient-text italic">Aesthetic Treatments</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every procedure is customized according to high-resolution 3D facial anatomy mapping, combining artistic restraint with world-class medical dermatology.
          </p>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as TreatmentCategory)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#C5A880] to-[#9F8055] text-black shadow-lg shadow-[#C5A880]/20'
                  : 'bg-[#141721] text-slate-300 hover:text-white border border-white/10 hover:border-[#C5A880]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map(treatment => (
            <div 
              key={treatment.id}
              className="rounded-3xl overflow-hidden bg-[#141721] border border-white/10 hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col group hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Image & Badges */}
              <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => onSelectTreatment(treatment)}>
                <img 
                  src={treatment.image} 
                  alt={treatment.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141721] via-transparent to-transparent opacity-80"></div>
                
                {/* Popular Pill */}
                {treatment.isPopular && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D0F14]/90 border border-[#C5A880]/40 text-[#E4D5BE] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                    ★ Most Requested
                  </div>
                )}

                {/* Price Starting At */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-[#0D0F14]/90 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] text-slate-400 block font-mono">Starting From</span>
                  <span className="text-sm font-bold text-[#E4D5BE]">${treatment.priceStartingAt}</span>
                </div>

                {/* Duration & Downtime Pill */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0D0F14]/90 border border-white/10 text-[11px] text-slate-300 backdrop-blur-md">
                  <Clock className="w-3 h-3 text-[#C5A880]" />
                  <span>{treatment.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-[#C5A880] uppercase tracking-wider mb-1">
                    {treatment.category.toUpperCase()} • {treatment.downtime}
                  </div>
                  <h3 
                    onClick={() => onSelectTreatment(treatment)}
                    className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#E4D5BE] transition-colors cursor-pointer mb-2 leading-snug"
                  >
                    {treatment.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {treatment.shortDesc}
                  </p>

                  {/* Target Concerns Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {treatment.targetConcerns.slice(0, 3).map((concern, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-300"
                      >
                        {concern}
                      </span>
                    ))}
                    {treatment.targetConcerns.length > 3 && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-400">
                        +{treatment.targetConcerns.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => onOpenBooking(treatment.id)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-[#C5A880]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Procedure</span>
                  </button>

                  <button
                    onClick={() => onSelectTreatment(treatment)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    title="View Clinical Protocol & Results"
                  >
                    <span>Protocol</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom VIP Consultation Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#141721] via-[#1B202D] to-[#141721] border border-[#C5A880]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Complimentary 3D Multi-Spectral Consultation</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">Not sure which treatment matches your goals?</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Schedule an in-depth 3D facial imaging consultation with Dr. Elena Vance or our medical team to create your bespoke aesthetic plan.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase whitespace-nowrap transition-colors shadow-lg cursor-pointer"
          >
            Schedule Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
