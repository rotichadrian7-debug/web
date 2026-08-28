import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  AlertCircle,
  RotateCcw,
  Mail,
  Send
} from 'lucide-react';
import { TREATMENTS, DOCTORS, CLINIC_INFO } from '../../data/clinicData';
import { BookingAppointment } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatmentId?: string;
  initialDoctorId?: string;
  onBookingSuccess: (appointment: BookingAppointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTreatmentId,
  initialDoctorId,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<any>(null);

  // Form states
  const [selectedLocation, setSelectedLocation] = useState(CLINIC_INFO.locations[0].name);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(initialTreatmentId || TREATMENTS[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId || 'first_available');
  const [selectedDate, setSelectedDate] = useState('2026-09-02');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM');
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [concernsNote, setConcernsNote] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (step > 1 && step < 3) {
          setStep((step - 1) as 1 | 2);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step, onClose]);

  // Keep treatment/doctor synced if props change
  useEffect(() => {
    if (initialTreatmentId) setSelectedTreatmentId(initialTreatmentId);
    if (initialDoctorId) setSelectedDoctorId(initialDoctorId);
  }, [initialTreatmentId, initialDoctorId]);

  if (!isOpen) return null;

  const currentTreatment = TREATMENTS.find(t => t.id === selectedTreatmentId) || TREATMENTS[0];
  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId);

  const timeSlots = [
    '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'
  ];

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/clinic/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          treatmentId: currentTreatment.id,
          treatmentName: currentTreatment.name,
          doctorId: selectedDoctorId,
          doctorName: currentDoctor ? currentDoctor.name : 'Senior Aesthetic Physician',
          location: selectedLocation,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          patientName,
          patientEmail,
          patientPhone,
          concernsNote
        })
      });

      const data = await response.json();
      setCompletedBooking(data.appointment);
      setIsSubmitting(false);
      setStep(3);
      onBookingSuccess(data.appointment);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#0D0F14] border border-[#C5A880]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Header with Back Navigation */}
        <div className="p-5 sm:p-6 bg-[#141721] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && step < 3 ? (
              <button
                onClick={() => setStep((step - 1) as 1 | 2)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#C5A880] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Go Back to Previous Step"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                <Calendar className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {step === 3 ? 'Consultation Confirmed' : 'Book Clinical Consultation'}
              </h3>
              <p className="text-xs text-slate-400">ÉLAN Private Aesthetic Suites</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stepper Header (Clickable to go back) */}
        {step < 3 && (
          <div className="px-6 py-2.5 bg-[#11131A] border-b border-white/5 flex items-center justify-between text-xs">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 font-mono cursor-pointer transition-colors ${
                step === 1 ? 'text-[#E4D5BE] font-bold' : 'text-[#C5A880] hover:text-white'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[10px]">1</span>
              <span>Procedure & Slot</span>
            </button>
            <span className="text-slate-600">→</span>
            <button
              onClick={() => { if (step > 2) setStep(2); }}
              className={`flex items-center gap-1.5 font-mono transition-colors ${
                step === 2 
                  ? 'text-[#E4D5BE] font-bold' 
                  : step > 2 
                    ? 'text-[#C5A880] hover:text-white cursor-pointer' 
                    : 'text-slate-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px]">2</span>
              <span>Patient Details</span>
            </button>
            <span className="text-slate-600">→</span>
            <span className="text-slate-600 flex items-center gap-1.5 font-mono">
              <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px]">3</span>
              <span>Confirmed</span>
            </span>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Treatment, Doctor & Location Selection */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Location Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Select Clinic Location:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CLINIC_INFO.locations.map(loc => (
                    <button
                      key={loc.name}
                      type="button"
                      onClick={() => setSelectedLocation(loc.name)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedLocation === loc.name
                          ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                          : 'bg-[#141721] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span className="font-bold text-xs block text-slate-200">{loc.name}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{loc.address.split(',')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Treatment Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Select Clinical Procedure:</span>
                </label>
                <select
                  value={selectedTreatmentId}
                  onChange={(e) => setSelectedTreatmentId(e.target.value)}
                  className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
                >
                  {TREATMENTS.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} (Starts at ${t.priceStartingAt} • {t.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor / Specialist Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Select Specialist / Physician:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDoctorId('first_available')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedDoctorId === 'first_available'
                        ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                        : 'bg-[#141721] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="font-bold text-xs block text-slate-200">First Available Specialist</span>
                    <span className="text-[10px] text-slate-500">Fastest appointment confirmation</span>
                  </button>

                  {DOCTORS.map(doc => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedDoctorId === doc.id
                          ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                          : 'bg-[#141721] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span className="font-bold text-xs block text-slate-200">{doc.name}</span>
                      <span className="text-[10px] text-slate-500">{doc.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Preferred Date:</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Time Slot:</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-[#C5A880] text-black font-bold shadow-md'
                            : 'bg-[#141721] border border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Return to Clinic</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: Patient Contact & Health Intake Note */}
          {step === 2 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-luxury text-lg font-bold text-white">Patient Contact & Skin History</h4>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Procedure/Date</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Katherine Sterling"
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="katherine@example.com"
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Mobile Phone (SMS Confirmation & Reminders) *</label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+1 (310) 555-0188"
                  className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Aesthetic Goals, Skin Concerns, or Prior Treatments (Optional)</label>
                <textarea
                  rows={3}
                  value={concernsNote}
                  onChange={(e) => setConcernsNote(e.target.value)}
                  placeholder="e.g. Interested in natural lip volume and smoothing forehead lines without stiffness. Had Botox 6 months ago."
                  className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Consultation Policy Note */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 flex gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  A complimentary 3D facial imaging assessment is included. Your $100 reservation fee is 100% credited toward your procedure or medical skincare purchase on the day of your visit.
                </span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Back to Step 1</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Appointment...</span>
                  ) : (
                    <span>Confirm Consultation</span>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: Booking Confirmation Receipt */}
          {step === 3 && completedBooking && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C5A880] to-[#9F8055] text-black mx-auto flex items-center justify-center shadow-xl shadow-[#C5A880]/30">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="font-serif-luxury text-2xl font-bold text-white">Consultation Reserved</h4>
                <p className="text-xs text-slate-300 mt-1">
                  We look forward to welcoming you at ÉLAN Private Suites.
                </p>
              </div>

              {/* Email Delivery Confirmation Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1A1F2C] to-[#141721] border border-[#C5A880]/40 text-left space-y-2 text-xs">
                <div className="flex items-center gap-2.5 text-[#E4D5BE] font-bold">
                  <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span>Confirmation Email Sent Successfully</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  A full consultation summary, pre-procedure protocol, and calendar invite have been delivered to <strong className="text-white">{completedBooking.patientEmail}</strong>. Our clinical coordinator has also received your appointment file.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141721] border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Appointment Reference:</span>
                  <span className="font-mono font-bold text-[#E4D5BE]">{completedBooking.bookingCode || completedBooking.id}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Procedure:</span>
                  <span className="font-bold text-white">{completedBooking.treatmentName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Physician:</span>
                  <span className="text-white">{completedBooking.doctorName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white">{completedBooking.location}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Patient:</span>
                  <span className="text-white">{completedBooking.patientName} ({completedBooking.patientEmail})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-mono text-[#C5A880] font-semibold">
                    {completedBooking.date} at {completedBooking.timeSlot}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setStep(1);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Book Another Procedure</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-xl cursor-pointer"
                >
                  Return to Sanctuary
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
