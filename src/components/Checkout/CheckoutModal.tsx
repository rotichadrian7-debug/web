import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  Building2, 
  Sparkles, 
  Printer, 
  ArrowLeft,
  PackageCheck,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderDetails } from '../../types';
import { CLINIC_INFO } from '../../data/clinicData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedPromo: string;
  discountAmount: number;
  selectedSamples: string[];
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedPromo,
  discountAmount,
  selectedSamples,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('United States');
  const [shippingMethod, setShippingMethod] = useState('Cold-Chain Express (2-3 Days)');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Support Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (step > 1 && step < 4) {
          setStep((step - 1) as 1 | 2 | 3);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, step, onClose]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= CLINIC_INFO.freeShippingThreshold || shippingMethod.includes('Pickup') ? 0 : 15;
  const tax = (subtotal - discountAmount) * 0.0825;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          customer: { name: customerName, email, phone },
          shippingAddress: { address, city, state, zip, country },
          shippingMethod,
          paymentMethod: paymentMethod === 'card' ? 'Credit Card (Visa ending in 4242)' : 'Apple Pay',
          promoCode: appliedPromo,
          subtotal,
          discount: discountAmount,
          shipping: shippingCost,
          tax,
          total,
          selectedSamples
        })
      });

      const data = await response.json();
      const order = data.order;
      setCompletedOrder(order);
      setIsProcessing(false);
      setStep(4);
      onOrderSuccess(order);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#E4D5BE', '#D4AF37', '#FFFFFF']
      });
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== 4) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#0D0F14] border border-[#C5A880]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#141721] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && step < 4 ? (
              <button
                onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#C5A880] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Go Back to Previous Step"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880]">
                <Lock className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {step === 4 ? 'Order Confirmed' : 'Secure Clinical Checkout'}
              </h3>
              <p className="text-xs text-slate-400">ÉLAN Medical Dermatology Dispensary</p>
            </div>
          </div>

          {step !== 4 && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Multi-Step Progress Indicator (Clickable to jump back) */}
        {step !== 4 && (
          <div className="px-6 py-2.5 bg-[#11131A] border-b border-white/5 flex items-center justify-between text-xs font-mono">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                step === 1 ? 'text-[#E4D5BE] font-bold' : 'text-[#C5A880] hover:text-white'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[10px]">1</span>
              <span>Shipping</span>
            </button>
            <span className="text-slate-600">→</span>
            <button
              onClick={() => { if (step > 2) setStep(2); }}
              className={`flex items-center gap-1.5 transition-colors ${
                step === 2 
                  ? 'text-[#E4D5BE] font-bold' 
                  : step > 2 
                    ? 'text-[#C5A880] hover:text-white cursor-pointer' 
                    : 'text-slate-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px]">2</span>
              <span>Delivery</span>
            </button>
            <span className="text-slate-600">→</span>
            <button
              onClick={() => { if (step > 3) setStep(3); }}
              className={`flex items-center gap-1.5 transition-colors ${
                step === 3 
                  ? 'text-[#E4D5BE] font-bold' 
                  : step > 3 
                    ? 'text-[#C5A880] hover:text-white cursor-pointer' 
                    : 'text-slate-600'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </button>
          </div>
        )}

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Customer Contact & Shipping Address */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <h4 className="font-serif-luxury text-lg font-bold text-white mb-2">Recipient & Shipping Details</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Victoria Sterling"
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Email (For Tracking Updates) *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="victoria@example.com"
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Mobile Phone (Delivery Alerts) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (310) 555-0199"
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="9454 Wilshire Blvd, Suite 400"
                  className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Beverly Hills"
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">State / Province *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="CA"
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">ZIP / Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="90212"
                    className="w-full bg-[#141721] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Back to Bag</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Continue to Delivery</span>
                  <Truck className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Delivery Speed & Clinic Pickup */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-luxury text-lg font-bold text-white">Select Delivery Method</h4>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Address</span>
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'Cold-Chain Express (2-3 Days)',
                    title: 'Complimentary Cold-Chain Express (2-3 Business Days)',
                    desc: 'Temperature-controlled packaging protecting bioactive peptides and L-ascorbic acid.',
                    price: shippingCost === 0 ? 'FREE' : '$15.00'
                  },
                  {
                    id: 'Beverly Hills Flagship Clinic VIP Pickup',
                    title: 'Beverly Hills Flagship Clinic Concierge Pickup',
                    desc: 'Ready in 2 hours at 9454 Wilshire Blvd with complimentary valet.',
                    price: 'FREE'
                  },
                  {
                    id: 'Manhattan Madison Ave Clinic Pickup',
                    title: 'Manhattan Madison Avenue Suite Pickup',
                    desc: 'Ready same-day at 780 Madison Ave.',
                    price: 'FREE'
                  }
                ].map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => setShippingMethod(opt.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      shippingMethod === opt.id
                        ? 'bg-[#C5A880]/15 border-[#C5A880] shadow-md'
                        : 'bg-[#141721] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{opt.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#E4D5BE] shrink-0 ml-3">
                      {opt.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Back to Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Continue to Payment</span>
                  <CreditCard className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Details */}
          {step === 3 && (
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-luxury text-lg font-bold text-white">Payment Details</h4>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Delivery</span>
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                      : 'bg-[#141721] border-white/10 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#C5A880]" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-[#C5A880]/20 border-[#C5A880] text-white shadow-md'
                      : 'bg-[#141721] border-white/10 text-slate-400'
                  }`}
                >
                  <Lock className="w-4 h-4 text-[#C5A880]" />
                  <span>Apple Pay</span>
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3 p-4 rounded-2xl bg-[#141721] border border-white/5">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#0D0F14] border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Expiration</label>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="w-full bg-[#0D0F14] border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#0D0F14] border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 text-center text-xs text-slate-300">
                  You will be prompted to authenticate with Face ID / Touch ID on submission.
                </div>
              )}

              {/* Order Summary Pill */}
              <div className="p-4 rounded-2xl bg-[#11131A] border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items):</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedPromo}):</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Delivery:</span>
                  <span className="font-mono text-white">{shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax:</span>
                  <span className="font-mono text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount:</span>
                  <span className="font-serif-luxury text-[#E4D5BE]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Back to Delivery</span>
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Authorizing Payment...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Place Order • ${total.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmed Receipt */}
          {step === 4 && completedOrder && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C5A880] to-[#9F8055] text-black mx-auto flex items-center justify-center shadow-xl shadow-[#C5A880]/30">
                <PackageCheck className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="font-serif-luxury text-2xl font-bold text-white">Order Confirmed & Processing</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Thank you for placing your order with ÉLAN Clinical Dispensary.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141721] border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Order Reference:</span>
                  <span className="font-mono font-bold text-[#E4D5BE]">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Recipient:</span>
                  <span className="text-white">{completedOrder.customer.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Delivery Method:</span>
                  <span className="text-white">{completedOrder.shippingMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Charged:</span>
                  <span className="font-serif-luxury text-[#E4D5BE] font-bold text-sm">
                    ${completedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-xl cursor-pointer"
                >
                  Return to Skincare Boutique
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
