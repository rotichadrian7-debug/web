import React from 'react';
import { Star, CheckCircle, Quote, Sparkles } from 'lucide-react';
import { REVIEWS } from '../../data/clinicData';

export const ReviewsSection: React.FC = () => {
  const pressLogos = [
    { name: 'VOGUE', quote: 'The gold standard in undetectable facial aesthetics.' },
    { name: "HARPER'S BAZAAR", quote: 'Where Hollywood & Wall Street go for glass skin.' },
    { name: 'ELLE', quote: 'Physician-formulated skincare that actually delivers.' },
    { name: 'ALLURE', quote: 'Best Laser Clinic & Dermatology Specialists.' }
  ];

  return (
    <section id="reviews" className="py-24 relative bg-[#0D0F14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Press Accolades Grid */}
        <div className="mb-20 pb-16 border-b border-white/10">
          <div className="text-center mb-8">
            <span className="text-[11px] font-mono text-[#C5A880] uppercase tracking-widest">
              As Acclaimed In Global Editorial Publications
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {pressLogos.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#141721] border border-white/5">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.2em] text-white block mb-1">
                  {p.name}
                </span>
                <p className="text-[11px] text-slate-400 italic font-light">"{p.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1D27] border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
            <span>4.98 Stars Across 1,200+ Verified Patient Reviews</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
            Patient Stories & <span className="gold-gradient-text italic">Clinical Testimonials</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real experiences from patients who entrusted their facial architecture and daily skincare routines to ÉLAN Medical Aesthetics.
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className="p-6 rounded-3xl bg-[#141721] border border-white/10 hover:border-[#C5A880]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>
                  {review.isVerified && (
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Patient</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="font-serif-luxury text-sm font-bold text-white">{review.name}</div>
                <div className="text-[11px] text-[#C5A880]">{review.location}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Procedure: {review.treatment}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
