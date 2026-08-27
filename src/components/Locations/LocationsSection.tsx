import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Car,
  ShieldCheck
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

interface LocationsSectionProps {
  onOpenBooking: (treatmentId?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const activeLocation = CLINIC_INFO.locations[activeLocationIndex];

  return (
    <section id="locations" className="py-24 relative bg-[#0D0F14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1D27] border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-3 h-3" />
            <span>Private Sanctuary Suites</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
            Global Flagship <span className="gold-gradient-text italic">Clinic Locations</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Designed as serene havens of quiet luxury, each ÉLAN sanctuary offers private VIP entrance suites, valet parking, and state-of-the-art clinical technology.
          </p>
        </div>

        {/* Location Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {CLINIC_INFO.locations.map((loc, idx) => (
            <button
              key={loc.name}
              onClick={() => setActiveLocationIndex(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeLocationIndex === idx
                  ? 'bg-[#C5A880] text-black shadow-lg shadow-[#C5A880]/20'
                  : 'bg-[#141721] text-slate-300 hover:text-white border border-white/10 hover:border-[#C5A880]/30'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Location Details Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#141721] border border-[#C5A880]/30 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Details */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider block mb-1">
                  Premier Medical Destination
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                  {activeLocation.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Private Suite Check-In & Valet Concierge</p>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Address:</strong>
                    <span>{activeLocation.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Direct Concierge:</strong>
                    <span>{activeLocation.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Operating Hours:</strong>
                    <span>{activeLocation.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Valet & Parking:</strong>
                    <span>Complimentary subterranean private valet on arrival.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book at {activeLocation.name.split(' ')[0]}</span>
                </button>

                <a
                  href={`tel:${activeLocation.phone}`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors text-center"
                >
                  Call Clinic Concierge
                </a>
              </div>
            </div>

            {/* Right Clinic Highlights */}
            <div className="md:col-span-5 bg-[#0D0F14] p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 space-y-4">
              <div>
                <h4 className="font-serif-luxury text-base font-bold text-white mb-3">Suite Amenities</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>3D Multi-Spectral Vectra Imaging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Private Post-Laser Cryo Recovery Lounges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Temperature-Controlled Dispensary Pickup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Discreet VIP Rear Entrance & Exit</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] mb-1" />
                <span>Virtual Tele-Dermatology consultations also available worldwide for international clients.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
