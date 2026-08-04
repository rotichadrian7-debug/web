import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  User, 
  Mail, 
  Building2, 
  ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const StrategyCallModal: React.FC<StrategyCallModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('2:00 PM EST');
  const [step, setStep] = useState<'details' | 'confirmed'>('details');

  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '$50k - $200k / mo',
    systemNeeds: preselectedService || 'AI Lead Qualification & CRM Engine'
  });

  if (!isOpen) return null;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel max-w-xl w-full rounded-2xl border border-blue-500/40 p-6 sm:p-8 space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#0B1120] text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <>
            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase">15-Minute Technical Consultation</span>
                <h3 className="text-xl font-heading font-bold text-white">Book Strategy Call</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Reserve a 1-on-1 architecture review with Principal Architect Alex Thorne. We will review your pipeline and map out your custom AI system blueprint.
            </p>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              
              {/* Date & Time Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400 block">Select Date & Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today (3:30 PM)', 'Tomorrow (2:00 PM)', 'Friday (10:00 AM)'].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedDate(slot)}
                      className={`py-2 px-2.5 rounded-xl text-[11px] font-mono border transition-all ${
                        selectedDate === slot 
                          ? 'bg-blue-600/30 border-blue-400 text-white font-semibold' 
                          : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@company.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="Apex Logistics"
                    value={bookingForm.company}
                    onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                    className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Target AI System</label>
                  <input
                    type="text"
                    value={bookingForm.systemNeeds}
                    onChange={(e) => setBookingForm({ ...bookingForm, systemNeeds: e.target.value })}
                    className="w-full bg-[#0B1120] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-300" />
                Confirm Reservation for {selectedDate}
              </button>

            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-heading font-bold text-white">Strategy Session Confirmed!</h3>
            
            <p className="text-xs font-mono text-slate-300 max-w-sm mx-auto leading-relaxed">
              Calendar invitation dispatched to <span className="text-blue-400">{bookingForm.email || 'your email'}</span>. Google Meet link & preliminary system checklist attached.
            </p>

            <div className="p-4 bg-[#070C1B] rounded-xl border border-slate-800 text-xs font-mono text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Architect:</span>
                <span className="text-white font-bold">Alex Thorne</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scheduled Time:</span>
                <span className="text-emerald-400">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">System Focus:</span>
                <span className="text-blue-300">{bookingForm.systemNeeds}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-mono hover:bg-slate-700 transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
