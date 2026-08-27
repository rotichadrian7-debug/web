import React from 'react';
import { 
  Crown, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Gift, 
  ShieldCheck 
} from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../../data/clinicData';

interface VIPClubSectionProps {
  onOpenBooking: () => void;
}

export const VIPClubSection: React.FC<VIPClubSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section id="privé" className="py-24 relative bg-[#0D0F14]">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1D27] border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-4">
            <Crown className="w-3 h-3" />
            <span>Exclusive Membership Tiers</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
            The ÉLAN Privé <span className="gold-gradient-text italic">Aesthetic Club</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Elevate your personal aesthetic maintenance with monthly treatment credits, dedicated VIP booking priority, and complimentary medical skincare deliveries.
          </p>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.isHighlighted
                  ? 'bg-gradient-to-b from-[#1C202E] via-[#141721] to-[#10121A] border-2 border-[#C5A880] shadow-2xl shadow-[#C5A880]/15 -translate-y-2'
                  : 'bg-[#141721] border border-white/10 hover:border-[#C5A880]/40'
              }`}
            >
              {tier.isHighlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#C5A880] to-[#9F8055] text-black text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  Most Preferred
                </div>
              )}

              <div>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate-400 mb-6">{tier.subtitle}</p>

                <div className="mb-6 pb-6 border-b border-white/10">
                  <span className="font-serif-luxury text-4xl font-bold text-white">${tier.pricePerMonth}</span>
                  <span className="text-xs text-slate-400 font-mono"> / month</span>
                  <p className="text-[11px] text-[#C5A880] mt-1 font-mono">100% credited toward treatments</p>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">Tier Privileges:</span>
                  {tier.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tier.isHighlighted
                      ? 'bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black shadow-xl hover:shadow-2xl'
                      : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                  }`}
                >
                  <span>Apply for {tier.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
