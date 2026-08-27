import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Calendar, 
  Search, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Heart,
  ChevronDown
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';
import { CartItem } from '../../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
  onOpenSearch: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenBooking,
  onOpenQuiz,
  onOpenSearch,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#12141C] border-b border-[#C5A880]/20 text-[11px] font-medium text-[#D4AF37] px-4 py-1.5 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3 h-3 text-[#C5A880]" />
              Concierge: <span className="text-white font-semibold">{CLINIC_INFO.phone}</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-[#C5A880]" />
              Beverly Hills • Manhattan • Mayfair
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              Complimentary Cold-Chain Express Shipping on Skincare Orders $150+
            </span>
            <button 
              onClick={onOpenQuiz}
              className="text-[#C5A880] hover:text-[#E4D5BE] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Take AI Skin Diagnostic
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0D0F14]/95 backdrop-blur-xl border-b border-[#C5A880]/20 py-3.5 shadow-2xl shadow-black/60' 
          : 'bg-[#0D0F14]/80 backdrop-blur-md border-b border-white/5 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E4D5BE] via-[#C5A880] to-[#9F8055] p-[1px] shadow-lg shadow-[#C5A880]/20">
                <div className="w-full h-full rounded-full bg-[#0D0F14] flex items-center justify-center">
                  <span className="font-serif-luxury text-lg font-bold text-[#E4D5BE] tracking-widest group-hover:scale-110 transition-transform">
                    É
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-white group-hover:text-[#E4D5BE] transition-colors leading-none">
                  ÉLAN
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] font-medium mt-1">
                  Medical Aesthetics & Skincare
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide">
              <button 
                onClick={() => scrollTo('treatments')}
                className="text-slate-300 hover:text-[#C5A880] transition-colors cursor-pointer py-1"
              >
                Clinical Treatments
              </button>

              <button 
                onClick={() => scrollTo('shop')}
                className="text-slate-300 hover:text-[#C5A880] transition-colors cursor-pointer py-1 flex items-center gap-1.5 relative"
              >
                <span>Skincare Boutique</span>
                <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-[#C5A880]/20 text-[#E4D5BE] rounded border border-[#C5A880]/30">
                  Shop Online
                </span>
              </button>

              <button 
                onClick={() => scrollTo('before-after')}
                className="text-slate-300 hover:text-[#C5A880] transition-colors cursor-pointer py-1"
              >
                Before & After
              </button>

              <button 
                onClick={() => scrollTo('doctors')}
                className="text-slate-300 hover:text-[#C5A880] transition-colors cursor-pointer py-1"
              >
                Physicians & Specialists
              </button>

              <button 
                onClick={onOpenQuiz}
                className="text-slate-300 hover:text-[#C5A880] transition-colors cursor-pointer py-1 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                Skin Quiz
              </button>

              <button 
                onClick={() => scrollTo('locations')}
                className="text-slate-300 hover:text-[#C5A880] transition-colors cursor-pointer py-1"
              >
                Locations
              </button>
            </div>

            {/* Right Action Icons & Book CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search treatments and skincare"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A880]/40 flex items-center justify-center text-slate-300 hover:text-[#C5A880] transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={onOpenCart}
                aria-label="View shopping bag"
                className="relative w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A880]/40 flex items-center justify-center text-slate-300 hover:text-[#C5A880] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#9F8055] text-black text-[10px] font-bold flex items-center justify-center shadow-md animate-scale-in">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Book Appointment CTA */}
              <button
                onClick={onOpenBooking}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-[#C5A880]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0F14] border-b border-[#C5A880]/20 px-6 py-6 mt-3 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-3 text-sm font-medium">
              <button 
                onClick={() => scrollTo('treatments')}
                className="text-left text-slate-200 hover:text-[#C5A880] py-2 border-b border-white/5"
              >
                Clinical Treatments
              </button>
              <button 
                onClick={() => scrollTo('shop')}
                className="text-left text-slate-200 hover:text-[#C5A880] py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Skincare Boutique</span>
                <span className="px-2 py-0.5 text-[10px] bg-[#C5A880]/20 text-[#E4D5BE] rounded">Shop Online</span>
              </button>
              <button 
                onClick={() => scrollTo('before-after')}
                className="text-left text-slate-200 hover:text-[#C5A880] py-2 border-b border-white/5"
              >
                Before & After Gallery
              </button>
              <button 
                onClick={() => scrollTo('doctors')}
                className="text-left text-slate-200 hover:text-[#C5A880] py-2 border-b border-white/5"
              >
                Physicians & Specialists
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenQuiz(); }}
                className="text-left text-[#C5A880] py-2 border-b border-white/5 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Skin Diagnostic Quiz
              </button>
              <button 
                onClick={() => scrollTo('locations')}
                className="text-left text-slate-200 hover:text-[#C5A880] py-2"
              >
                Clinic Locations
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Clinical Consultation
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); onOpenCart(); }}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                View Shopping Bag ({totalCartCount})
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
