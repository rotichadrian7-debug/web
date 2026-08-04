import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Services } from './components/Services/Services';
import { Projects } from './components/Projects/Projects';
import { Process } from './components/Process/Process';
import { TechStack } from './components/TechStack/TechStack';
import { ROICalculator } from './components/Calculator/ROICalculator';
import { WhyUs } from './components/WhyUs/WhyUs';
import { Testimonials } from './components/Testimonials/Testimonials';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { StrategyCallModal } from './components/Modals/StrategyCallModal';
import { AIAssistantWidget } from './components/AIAssistant/AIAssistantWidget';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'process', 'techstack', 'calculator', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (serviceTitle?: string) => {
    setPreselectedService(serviceTitle);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#F8FAFC] font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Navigation Bar */}
      <Navbar 
        onOpenBookingModal={() => handleOpenBooking()} 
        activeSection={activeSection}
      />

      {/* Main Page Sections */}
      <main>
        {/* Landing Hero */}
        <Hero 
          onOpenBookingModal={() => handleOpenBooking()} 
        />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services 
          onSelectServiceForBooking={(service) => handleOpenBooking(service)} 
        />

        {/* Featured Projects Section */}
        <Projects />

        {/* Process Roadmap Section */}
        <Process />

        {/* Tech Stack Grid */}
        <TechStack />

        {/* Interactive ROI Calculator */}
        <ROICalculator />

        {/* Why Work With Me Section */}
        <WhyUs />

        {/* Testimonials & Case Validation */}
        <Testimonials />

        {/* High-Ticket Contact & Intake Form */}
        <Contact 
          onOpenBookingModal={() => handleOpenBooking()} 
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Strategy Call Booking Modal */}
      <StrategyCallModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedService}
      />

      {/* Floating Gemini AI Systems Assistant Widget */}
      <AIAssistantWidget 
        onOpenBookingModal={() => handleOpenBooking()} 
      />

    </div>
  );
}
