import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  Check
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenQuiz,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090A0E] border-t border-[#C5A880]/20 text-slate-400 text-xs">
      
      {/* Top Newsletter & $20 Skincare Voucher Section */}
      <div className="border-b border-white/5 py-14 bg-[#0E1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[11px] font-mono text-[#C5A880] uppercase tracking-wider block mb-1">
                The ÉLAN Journal & Private Privileges
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
                Receive a $20 Welcome Voucher for your first skincare order
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Join our private client registry for seasonal dermatological releases, VIP clinical event invitations, and physician masterclasses.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880] text-[#E4D5BE] flex items-center gap-2 text-xs">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Your $20 gift voucher code: <strong>WELCOME20</strong> has been unlocked!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-[#141721] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                  >
                    Claim $20
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links & Locations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E4D5BE] via-[#C5A880] to-[#9F8055] p-[1px]">
                <div className="w-full h-full rounded-full bg-[#0D0F14] flex items-center justify-center">
                  <span className="font-serif-luxury text-lg font-bold text-[#E4D5BE]">É</span>
                </div>
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-white">
                ÉLAN
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pr-6">
              Premier aesthetic dermatology and plastic surgery sanctuary offering bespoke non-surgical facial sculpting, advanced fractional lasers, and medical grade skincare.
            </p>

            <div className="space-y-1 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Concierge: {CLINIC_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Email: {CLINIC_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Treatments Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Clinical Procedures
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollTo('treatments')} className="hover:text-[#C5A880] transition-colors">Botox® & Dysport®</button></li>
              <li><button onClick={() => scrollTo('treatments')} className="hover:text-[#C5A880] transition-colors">Lip & Cheek Architecture</button></li>
              <li><button onClick={() => scrollTo('treatments')} className="hover:text-[#C5A880] transition-colors">Morpheus8™ RF Microneedling</button></li>
              <li><button onClick={() => scrollTo('treatments')} className="hover:text-[#C5A880] transition-colors">Halo™ Fractional Laser</button></li>
              <li><button onClick={() => scrollTo('treatments')} className="hover:text-[#C5A880] transition-colors">Hydrafacial MD® Deluxe</button></li>
              <li><button onClick={() => scrollTo('treatments')} className="hover:text-[#C5A880] transition-colors">Sculptra® Biostimulator</button></li>
            </ul>
          </div>

          {/* Skincare Boutique Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Skincare Boutique
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollTo('shop')} className="hover:text-[#C5A880] transition-colors">C-Radiance 15% Vitamin C</button></li>
              <li><button onClick={() => scrollTo('shop')} className="hover:text-[#C5A880] transition-colors">Phyto-Peptide Lift Cream</button></li>
              <li><button onClick={() => scrollTo('shop')} className="hover:text-[#C5A880] transition-colors">Micro-Retinoid 0.75%</button></li>
              <li><button onClick={() => scrollTo('shop')} className="hover:text-[#C5A880] transition-colors">Mineral Silk SPF 50+</button></li>
              <li><button onClick={() => scrollTo('shop')} className="hover:text-[#C5A880] transition-colors">Glass Skin Protocol Set</button></li>
              <li><button onClick={() => scrollTo('shop')} className="hover:text-[#C5A880] transition-colors">Post-Procedure Laser Balm</button></li>
            </ul>
          </div>

          {/* Patient Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={onOpenBooking} className="hover:text-[#C5A880] transition-colors">Book Consultation</button></li>
              <li><button onClick={onOpenQuiz} className="hover:text-[#C5A880] transition-colors">AI Skin Diagnostic</button></li>
              <li><button onClick={() => scrollTo('before-after')} className="hover:text-[#C5A880] transition-colors">Before & After Gallery</button></li>
              <li><button onClick={() => scrollTo('privé')} className="hover:text-[#C5A880] transition-colors">ÉLAN Privé Membership</button></li>
              <li><button onClick={() => scrollTo('locations')} className="hover:text-[#C5A880] transition-colors">Clinic Locations</button></li>
            </ul>
          </div>

        </div>

        {/* Medical Regulatory Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-5xl">
            <strong>Medical Disclaimer:</strong> Treatments and procedures described on this website are administered by board-certified physicians, plastic surgeons, and registered nurses according to individual patient clinical assessments. Individual results may vary. Topical skincare formulations are manufactured in FDA-registered, cGMP-certified facilities for cosmetic improvement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} ÉLAN Medical Aesthetics & Skincare Boutique. All Rights Reserved.
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Clinical Service</span>
              <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
