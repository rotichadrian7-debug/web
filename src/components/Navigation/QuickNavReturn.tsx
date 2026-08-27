import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowLeft, Compass } from 'lucide-react';

interface QuickNavReturnProps {
  activeSection: string;
  previousSection: string | null;
  onNavigateSection: (sectionId: string) => void;
}

const SECTION_LABELS: Record<string, string> = {
  hero: 'Sanctuary Overview',
  treatments: 'Clinical Procedures',
  shop: 'Skincare Boutique',
  'before-after': 'Before & After Gallery',
  doctors: 'Physicians & Specialists',
  prive: 'ÉLAN Privé Membership',
  locations: 'Global Flagship Clinics',
  reviews: 'Patient Testimonials'
};

export const QuickNavReturn: React.FC<QuickNavReturnProps> = ({
  activeSection,
  previousSection,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isScrolled && !previousSection) return null;

  return (
    <aside aria-label="Page navigation controls" className="fixed bottom-6 left-6 z-40 flex items-center gap-2 animate-fade-in">
      {/* Back to Previous Section Button (if user jumped sections) */}
      {previousSection && previousSection !== activeSection && (
        <button
          onClick={() => onNavigateSection(previousSection)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#141721]/95 hover:bg-[#1E2330] border border-[#C5A880]/40 text-[#E4D5BE] hover:text-white text-xs font-semibold shadow-2xl backdrop-blur-md transition-all group cursor-pointer"
          title={`Return to previous section: ${SECTION_LABELS[previousSection] || previousSection}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880] group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to</span>
          <span className="font-bold text-white max-w-[140px] truncate">
            {SECTION_LABELS[previousSection] || previousSection}
          </span>
        </button>
      )}

      {/* Back to Top Button */}
      {isScrolled && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.location.hash) {
              window.history.pushState(null, '', window.location.pathname);
            }
          }}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0D0F14]/90 hover:bg-[#141721] border border-white/10 hover:border-[#C5A880]/40 text-slate-300 hover:text-white text-xs font-medium shadow-xl backdrop-blur-md transition-all cursor-pointer group"
          title="Back to Top of Page"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#C5A880] group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to Top</span>
        </button>
      )}
    </aside>
  );
};
