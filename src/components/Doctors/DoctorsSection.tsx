import React from 'react';
import { 
  Sparkles, 
  Award, 
  Star, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { DOCTORS } from '../../data/clinicData';
import { Doctor } from '../../types';

interface DoctorsSectionProps {
  onOpenBooking: (treatmentId?: string, doctorId?: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section id="doctors" className="py-24 relative bg-[#0D0F14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1D27] border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3 h-3" />
            <span>Clinical Leadership & Aesthetic Faculty</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
            World-Renowned <span className="gold-gradient-text italic">Physicians & Specialists</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our medical team comprises board-certified dermatologists, facial plastic surgeons, and master aesthetic nurse injectors dedicated to natural, undetectable enhancement.
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOCTORS.map((doctor) => (
            <div 
              key={doctor.id}
              className="rounded-3xl overflow-hidden bg-[#141721] border border-white/10 hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col group hover:shadow-2xl hover:shadow-black/70"
            >
              {/* Doctor Portrait Container */}
              <div className="relative h-72 overflow-hidden bg-[#0B0D12]">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141721] via-transparent to-transparent opacity-90"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#0D0F14]/90 border border-[#C5A880]/40 text-[#E4D5BE] text-[11px] font-semibold flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3 h-3 fill-[#C5A880] text-[#C5A880]" />
                  <span>{doctor.rating}</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 text-xs font-mono text-[#E4D5BE]">
                  {doctor.experienceYears} Years Clinical Experience
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#E4D5BE] transition-colors leading-snug">
                    {doctor.name}
                  </h3>
                  <div className="text-xs text-[#C5A880] font-medium mt-0.5 mb-1">
                    {doctor.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mb-3">
                    {doctor.credentials}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {doctor.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Clinical Focus:</span>
                    <div className="flex flex-wrap gap-1">
                      {doctor.specialties.slice(0, 2).map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location & Book Button */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span className="truncate">{doctor.locations.join(', ')}</span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(undefined, doctor.id)}
                    className="w-full py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book with {doctor.name.split(' ')[0]}</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
