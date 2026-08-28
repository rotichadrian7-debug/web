import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { TreatmentsSection } from './components/Treatments/TreatmentsSection';
import { ShopSection } from './components/Shop/ShopSection';
import { BeforeAfterSection } from './components/BeforeAfter/BeforeAfterSection';
import { DoctorsSection } from './components/Doctors/DoctorsSection';
import { VIPClubSection } from './components/VIPClub/VIPClubSection';
import { LocationsSection } from './components/Locations/LocationsSection';
import { ReviewsSection } from './components/Reviews/ReviewsSection';
import { Footer } from './components/Footer/Footer';
import { QuickNavReturn } from './components/Navigation/QuickNavReturn';

// Modals & Drawers
import { CartDrawer } from './components/Cart/CartDrawer';
import { CheckoutModal } from './components/Checkout/CheckoutModal';
import { SkinQuizModal } from './components/SkinQuiz/SkinQuizModal';
import { BookingModal } from './components/Modals/BookingModal';
import { TreatmentDetailModal } from './components/Modals/TreatmentDetailModal';
import { ProductDetailModal } from './components/Modals/ProductDetailModal';
import { SearchModal } from './components/Modals/SearchModal';

// Types & Data
import { CartItem, Product, Treatment, OrderDetails, BookingAppointment } from './types';
import { PRODUCTS, TREATMENTS } from './data/clinicData';

export default function App() {
  // E-Commerce Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal triggers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Selected details
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bookingTreatmentId, setBookingTreatmentId] = useState<string | undefined>(undefined);
  const [bookingDoctorId, setBookingDoctorId] = useState<string | undefined>(undefined);

  // Section Tracking
  const [activeSection, setActiveSection] = useState('hero');
  const [previousSection, setPreviousSection] = useState<string | null>(null);

  // Checkout meta
  const [appliedPromo, setAppliedPromo] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const [cartToast, setCartToast] = useState<string | null>(null);

  // Helper to safely synchronize browser history state
  const syncHistory = (hash: string, modalState: any = null) => {
    try {
      if (window.location.hash !== hash) {
        window.history.pushState(modalState, '', hash || window.location.pathname);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Safe closer that syncs browser history so Back button remains natural
  const closeModalCleanly = useCallback((currentHashPattern: string) => {
    if (window.location.hash && window.location.hash.startsWith(currentHashPattern)) {
      if (window.history.state) {
        window.history.back();
      } else {
        const target = activeSection ? `#${activeSection}` : window.location.pathname;
        window.history.replaceState(null, '', target);
      }
    }
  }, [activeSection]);

  // Modal open handlers with history state pushing
  const handleOpenTreatment = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    syncHistory(`#treatment-${treatment.id}`, { modal: 'treatment', id: treatment.id });
  };

  const handleCloseTreatment = () => {
    setSelectedTreatment(null);
    closeModalCleanly('#treatment');
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    syncHistory(`#product-${product.id}`, { modal: 'product', id: product.id });
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    closeModalCleanly('#product');
  };

  const handleOpenBooking = (treatmentId?: string, doctorId?: string) => {
    setBookingTreatmentId(treatmentId);
    setBookingDoctorId(doctorId);
    setIsBookingOpen(true);
    syncHistory('#booking', { modal: 'booking', treatmentId, doctorId });
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    closeModalCleanly('#booking');
  };

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
    syncHistory('#quiz', { modal: 'quiz' });
  };

  const handleCloseQuiz = () => {
    setIsQuizOpen(false);
    closeModalCleanly('#quiz');
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
    syncHistory('#cart', { modal: 'cart' });
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
    closeModalCleanly('#cart');
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    syncHistory('#search', { modal: 'search' });
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    closeModalCleanly('#search');
  };

  const handleProceedToCheckout = (promo: string, discount: number, samples: string[]) => {
    setAppliedPromo(promo);
    setDiscountAmount(discount);
    setSelectedSamples(samples);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    syncHistory('#checkout', { modal: 'checkout' });
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    closeModalCleanly('#checkout');
  };

  // Section navigation helper with history memory
  const handleNavigateSection = (sectionId: string) => {
    setPreviousSection(activeSection);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Browser Back / Forward buttons (`popstate` & `hashchange`)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;

      // Handle treatment modal
      if (hash.startsWith('#treatment-')) {
        const id = hash.replace('#treatment-', '');
        const found = TREATMENTS.find(t => t.id === id);
        if (found) {
          setSelectedTreatment(found);
          return;
        }
      } else {
        setSelectedTreatment(null);
      }

      // Handle product modal
      if (hash.startsWith('#product-')) {
        const id = hash.replace('#product-', '');
        const found = PRODUCTS.find(p => p.id === id);
        if (found) {
          setSelectedProduct(found);
          return;
        }
      } else {
        setSelectedProduct(null);
      }

      // Handle other modals
      setIsBookingOpen(hash === '#booking');
      setIsQuizOpen(hash === '#quiz');
      setIsCartOpen(hash === '#cart');
      setIsCheckoutOpen(hash === '#checkout');
      setIsSearchOpen(hash === '#search');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Initial load check
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Track active section via IntersectionObserver for effortless back navigation
  useEffect(() => {
    const sectionIds = ['hero', 'treatments', 'shop', 'before-after', 'doctors', 'vip-club', 'locations', 'reviews'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(prev => {
                if (prev !== id) {
                  setPreviousSection(prev);
                }
                return id;
              });
            }
          });
        },
        { threshold: 0.25 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('elan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setCartToast(`Added ${product.name} to bag`);
    setTimeout(() => setCartToast(null), 3000);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleOrderSuccess = (_order: OrderDetails) => {
    setCart([]);
  };

  const handleBookingSuccess = (_appointment: BookingAppointment) => {
    // Booking registered
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-slate-100 font-sans antialiased selection:bg-[#C5A880] selection:text-black relative">
      
      {/* Toast Notification */}
      {cartToast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-2xl bg-[#141721] border border-[#C5A880] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]"></span>
          <span>{cartToast}</span>
        </div>
      )}

      {/* Main Luxury Header */}
      <Navbar
        cart={cart}
        onOpenCart={handleOpenCart}
        onOpenBooking={() => handleOpenBooking()}
        onOpenQuiz={handleOpenQuiz}
        onOpenSearch={handleOpenSearch}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Sanctuary */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenQuiz={handleOpenQuiz}
          onSelectTreatment={handleOpenTreatment}
          onSelectProduct={handleOpenProduct}
        />

        {/* 2. Clinical Procedures Section */}
        <TreatmentsSection
          onSelectTreatment={handleOpenTreatment}
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. Skincare Boutique (E-Commerce Store) */}
        <ShopSection
          onSelectProduct={handleOpenProduct}
          onAddToCart={handleAddToCart}
          onOpenQuiz={handleOpenQuiz}
        />

        {/* 4. Interactive Before & After Slider Gallery */}
        <BeforeAfterSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. Physicians & Specialists Leadership */}
        <DoctorsSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. ÉLAN Privé Membership Tiers */}
        <VIPClubSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 7. Global Flagship Sanctuary Locations */}
        <LocationsSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 8. Patient Testimonials & Press Accolades */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenQuiz={handleOpenQuiz}
      />

      {/* Floating Quick Navigation & Back Return Bar */}
      <QuickNavReturn
        activeSection={activeSection}
        previousSection={previousSection}
        onNavigateSection={handleNavigateSection}
      />

      {/* --- MODALS & DRAWERS (With Full Browser Back & Step-Back Support) --- */}

      {/* Sliding Skincare Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Secure Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        cart={cart}
        appliedPromo={appliedPromo}
        discountAmount={discountAmount}
        selectedSamples={selectedSamples}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* AI Skin Diagnostic Quiz Modal */}
      <SkinQuizModal
        isOpen={isQuizOpen}
        onClose={handleCloseQuiz}
        onAddToCart={handleAddToCart}
        onOpenBooking={handleOpenBooking}
      />

      {/* Clinical Consultation & Procedure Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialTreatmentId={bookingTreatmentId}
        initialDoctorId={bookingDoctorId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Treatment Protocol Details Modal */}
      <TreatmentDetailModal
        treatment={selectedTreatment}
        onClose={handleCloseTreatment}
        onOpenBooking={handleOpenBooking}
      />

      {/* Skincare Product Formulation & Clinical Results Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        onSelectTreatment={handleOpenTreatment}
        onSelectProduct={handleOpenProduct}
        onOpenBooking={handleOpenBooking}
      />

    </div>
  );
}
