import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Star, 
  CheckCircle2,
  ChevronRight,
  Search
} from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_INFO, TREATMENTS, PRODUCTS } from '../../data/clinicData';
import { Treatment, Product } from '../../types';

interface HeroProps {
  onOpenBooking: (treatmentId?: string) => void;
  onOpenQuiz: () => void;
  onSelectTreatment: (treatment: Treatment) => void;
  onSelectProduct: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenQuiz,
  onSelectTreatment,
  onSelectProduct,
}) => {
  const [selectedConcern, setSelectedConcern] = useState<string>('wrinkles');

  const concernRecommendations: Record<string, {
    treatmentId: string;
    treatmentName: string;
    productId: string;
    productName: string;
    highlight: string;
  }> = {
    wrinkles: {
      treatmentId: 'botox-dysport-neuromodulator',
      treatmentName: 'Precision Neuromodulators (Botox® & Dysport®)',
      productId: 'elan-peptide-cellular-sculpt-cream',
      productName: 'Phyto-Peptide Cellular Lift & Barrier Cream ($165)',
      highlight: 'Smooth dynamic lines while rebuilding deep collagen'
    },
    lips: {
      treatmentId: 'bespoke-lip-architecture-filler',
      treatmentName: 'Architectural Lip Rejuvenation & Dermal Fillers',
      productId: 'elan-post-procedure-recovery-balm',
      productName: 'Post-Procedure Arnica & EGF Recovery Salve ($110)',
      highlight: 'Golden ratio volume restoration & crisp vermilion definition'
    },
    scars: {
      treatmentId: 'morpheus8-rf-microneedling',
      treatmentName: 'Morpheus8™ Fractional RF Subdermal Sculpting',
      productId: 'elan-post-laser-recovery-box',
      productName: 'The Complete Post-Procedure Laser Recovery Box ($245)',
      highlight: 'Deep 4mm RF collagen remodeling to erase acne scars & laxity'
    },
    melasma: {
      treatmentId: 'halo-hybrid-fractional-laser',
      treatmentName: 'Halo™ Hybrid Fractional Laser Resurfacing',
      productId: 'elan-c-radiance-ferulic-serum',
      productName: 'C-Radiance 15% Pure L-Ascorbic + Ferulic Elixir ($148)',
      highlight: 'Dual-wavelength laser to reverse sun damage & stubborn melasma'
    },
    glow: {
      treatmentId: 'hydrafacial-md-deluxe',
      treatmentName: 'Hydrafacial MD® Deluxe Platinum with Exosomes',
      productId: 'elan-glass-skin-protocol-bundle',
      productName: 'The Ultimate Glass Skin Radiance Protocol 4-Piece Set ($360)',
      highlight: 'Vortex-fusion deep pore extraction with instant glass-skin radiance'
    }
  };

  const currentRec = concernRecommendations[selectedConcern];

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient Luxury Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C5A880]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-5 w-[400px] h-[400px] bg-[#E0A899]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Verified Clinic Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1D27] border border-[#C5A880]/30 backdrop-blur-md shadow-lg shadow-black/40">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-xs font-semibold text-[#E4D5BE] tracking-wide">
              Beverly Hills • Manhattan • Mayfair Private Suites
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
            <span className="text-xs text-slate-400">Board-Certified Dermatology & Surgery</span>
          </div>
        </div>

        {/* Main Headline & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Artistry in <span className="gold-gradient-text italic">Aesthetic Medicine</span> & Medical Skincare
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            Discover bespoke non-surgical facial rejuvenation, advanced fractional laser resurfacing, and physician-formulated medical grade skincare delivered directly to your doorstep.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-sm tracking-wider uppercase shadow-xl shadow-[#C5A880]/20 hover:shadow-2xl hover:shadow-[#C5A880]/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Clinical Appointment</span>
            </button>

            <a
              href="#shop"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#161922] border border-[#C5A880]/40 hover:border-[#C5A880] text-[#E4D5BE] hover:text-white font-medium text-sm tracking-wider transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
              <span>Shop Medical Skincare</span>
            </a>

            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A880]/40 text-slate-200 hover:text-[#C5A880] text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#C5A880]" />
              <span>AI Skin Quiz</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Display Grid: Luxury Interior + Doctor + Skincare Product */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-16">
          
          {/* Main Visual: Luxury Clinic Lounge & Treatment */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-[#C5A880]/25 shadow-2xl shadow-black/80 group">
            <img 
              src={CLINIC_IMAGES.interior} 
              alt="Élan Medical Aesthetics Luxury Clinic Interior" 
              referrerPolicy="no-referrer"
              className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F14] via-[#0D0F14]/30 to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-luxury border border-[#C5A880]/30 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880] uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Flagship Aesthetic Suites</span>
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white">Beverly Hills & Manhattan</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Private recovery suites, state-of-the-art energy lasers & 3D facial simulation.</p>
                </div>
                <button
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C5A880]/20 hover:bg-[#C5A880]/30 border border-[#C5A880]/40 text-[#E4D5BE] text-xs font-semibold whitespace-nowrap transition-colors"
                >
                  <span>Tour & Book</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Dual Stacked Cards: Physician Leadership & Skincare Bottle */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            
            {/* Doctor Card */}
            <div className="p-5 rounded-2xl glass-luxury border border-white/10 hover:border-[#C5A880]/40 transition-all flex items-center gap-4">
              <img 
                src={CLINIC_IMAGES.directorDoctor} 
                alt="Dr. Elena Vance, MD"
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover border border-[#C5A880]/40 shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[11px] text-[#C5A880] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
                  <span>4.98 Rating (400+ Reviews)</span>
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-white truncate">Dr. Elena Vance, MD</h4>
                <p className="text-xs text-slate-300 truncate">Medical Director & Harvard Fellow</p>
                <div className="mt-2">
                  <button 
                    onClick={() => onOpenBooking('botox-dysport-neuromodulator')}
                    className="text-xs text-[#C5A880] hover:text-[#E4D5BE] font-medium inline-flex items-center gap-1"
                  >
                    <span>Book with Dr. Vance</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Skincare Product Showcase Card */}
            <div className="p-5 rounded-2xl glass-luxury border border-white/10 hover:border-[#C5A880]/40 transition-all flex items-center gap-4">
              <img 
                src={CLINIC_IMAGES.serum} 
                alt="C-Radiance 15% Ferulic Serum"
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover border border-[#C5A880]/40 shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <span className="px-2 py-0.5 text-[9px] font-bold bg-[#C5A880]/20 text-[#E4D5BE] rounded border border-[#C5A880]/30 uppercase">
                  Best Seller
                </span>
                <h4 className="font-serif-luxury text-base font-bold text-white truncate mt-1">C-Radiance 15% Ferulic Serum</h4>
                <div className="text-xs text-[#C5A880] font-semibold">$148 • 30ml / 1.0 fl oz</div>
                <div className="mt-2">
                  <button 
                    onClick={() => {
                      const prod = PRODUCTS.find(p => p.id === 'elan-c-radiance-ferulic-serum');
                      if (prod) onSelectProduct(prod);
                    }}
                    className="text-xs text-slate-300 hover:text-white font-medium inline-flex items-center gap-1"
                  >
                    <span>View Formula Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Treatment & Skincare Matcher Bar */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#141721] border border-[#C5A880]/30 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase text-[#C5A880] tracking-wider">Aesthetic Match Engine</span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">What is your primary aesthetic focus?</h3>
            </div>
            <span className="text-xs text-slate-400">Select an area to view physician protocol & prescribed home care:</span>
          </div>

          {/* Concern Selector Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {[
              { id: 'wrinkles', label: 'Fine Lines & Wrinkles' },
              { id: 'lips', label: 'Lip Volume & Contouring' },
              { id: 'scars', label: 'Acne Scars & Texture' },
              { id: 'melasma', label: 'Melasma & Dark Spots' },
              { id: 'glow', label: 'Instant Glass Skin Glow' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedConcern(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedConcern === tab.id
                    ? 'bg-[#C5A880] text-black shadow-lg shadow-[#C5A880]/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Matched Pair Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#0D0F14]/90 border border-white/10">
            {/* Matched Clinic Treatment */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-[#C5A880]/20">
              <div>
                <span className="text-[10px] font-mono text-[#C5A880] uppercase">Recommended In-Clinic Treatment</span>
                <h4 className="text-sm font-bold text-white">{currentRec.treatmentName}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{currentRec.highlight}</p>
              </div>
              <button
                onClick={() => onOpenBooking(currentRec.treatmentId)}
                className="px-3 py-1.5 rounded-lg bg-[#C5A880] hover:bg-[#E4D5BE] text-black text-xs font-bold whitespace-nowrap ml-3 transition-colors"
              >
                Book
              </button>
            </div>

            {/* Matched Skincare Product */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-[#C5A880]/20">
              <div>
                <span className="text-[10px] font-mono text-[#C5A880] uppercase">Prescribed Medical Skincare</span>
                <h4 className="text-sm font-bold text-white">{currentRec.productName}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Physician-formulated active topical regimen</p>
              </div>
              <button
                onClick={() => {
                  const prod = PRODUCTS.find(p => p.id === currentRec.productId);
                  if (prod) onSelectProduct(prod);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold whitespace-nowrap ml-3 border border-white/20 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Credential Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10 text-center">
          <div>
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">16+</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Years of Aesthetic Mastery</div>
          </div>
          <div>
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#E4D5BE]">100%</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Board-Certified MDs & RNs</div>
          </div>
          <div>
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">18,500+</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Successful Procedures</div>
          </div>
          <div>
            <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#E4D5BE]">99.8%</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Patient Satisfaction Rate</div>
          </div>
        </div>

      </div>
    </section>
  );
};
