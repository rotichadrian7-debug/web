import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Truck, 
  Tag,
  Check
} from 'lucide-react';
import { CartItem } from '../../types';
import { CLINIC_INFO, FREE_SAMPLES_LIST } from '../../data/clinicData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (promoCode: string, discountAmount: number, selectedSamples: string[]) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);

  // Escape key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = CLINIC_INFO.freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Discount calculation
  let discountMultiplier = 0;
  if (appliedPromo && (CLINIC_INFO.promoCodes as any)[appliedPromo]) {
    discountMultiplier = (CLINIC_INFO.promoCodes as any)[appliedPromo];
  }
  const discountAmount = subtotal * discountMultiplier;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const tax = (subtotal - discountAmount) * 0.0825; // 8.25% standard tax
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoInput.trim().toUpperCase();
    if ((CLINIC_INFO.promoCodes as any)[code]) {
      setAppliedPromo(code);
    } else {
      setPromoError('Invalid promo code. Try WELCOME15 or GLOW20');
    }
  };

  const toggleSample = (sampleId: string) => {
    if (selectedSamples.includes(sampleId)) {
      setSelectedSamples(selectedSamples.filter(s => s !== sampleId));
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, sampleId]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Dark Blur Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity cursor-pointer"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0F14] border-l border-[#C5A880]/30 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#141721]">
            <div className="flex items-center gap-2.5">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#C5A880] hover:text-white flex items-center justify-center transition-colors cursor-pointer mr-1"
                title="Back to Shopping"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
                <h2 className="font-serif-luxury text-xl font-bold text-white">Your Skincare Bag</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#C5A880]/20 text-[#E4D5BE] text-xs font-semibold">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close Bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-[#171B26] border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                {amountToFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-semibold">You've unlocked Free Cold-Chain Shipping!</span>
                ) : (
                  <span>Add <strong className="text-[#E4D5BE]">${amountToFreeShipping.toFixed(2)}</strong> for Free Express Shipping</span>
                )}
              </span>
              <span className="font-mono text-[#C5A880] text-[11px]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#9F8055] via-[#C5A880] to-[#E4D5BE] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500 mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white">Your Skincare Bag is Empty</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Explore our physician-formulated medical skincare products and add them to your routine.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#C5A880] hover:bg-[#E4D5BE] text-black font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Skincare Boutique</span>
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="p-4 rounded-2xl bg-[#141721] border border-white/5 flex gap-4 items-center"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-contain rounded-xl bg-[#0B0D12] p-1.5 border border-white/5"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                        <span className="text-[10px] text-[#C5A880] font-mono">{item.product.volume}</span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-[#0D0F14] px-2.5 py-1 rounded-lg border border-white/5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Complimentary Luxury Samples Selector */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Select 2 Complimentary Clinical Samples</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#C5A880]">
                    {selectedSamples.length}/2 Selected
                  </span>
                </div>

                <div className="space-y-1.5">
                  {FREE_SAMPLES_LIST.map(sample => {
                    const isSelected = selectedSamples.includes(sample.id);
                    return (
                      <div
                        key={sample.id}
                        onClick={() => toggleSample(sample.id)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
                            : 'bg-[#141721] border-white/5 text-slate-400 hover:border-white/10'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="font-semibold block truncate text-slate-200">{sample.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{sample.desc}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#C5A880] border-[#C5A880] text-black' : 'border-white/20'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Promo Code Input */}
            {cart.length > 0 && (
              <form onSubmit={handleApplyPromo} className="pt-3 border-t border-white/10 space-y-1.5">
                <label className="text-xs text-slate-400 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#C5A880]" />
                  <span>Promo Code / Physician Concierge Pass:</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. WELCOME15 or GLOW20"
                    className="flex-1 bg-[#141721] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#C5A880] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#C5A880] text-white hover:text-black font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <Check className="w-3 h-3" /> Code {appliedPromo} applied successfully!
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-400 font-mono">
                    {promoError}
                  </p>
                )}
              </form>
            )}

          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#141721] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedPromo})</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Cold-Chain Express Shipping</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? <strong className="text-emerald-400">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Due</span>
                  <span className="font-mono text-base text-[#E4D5BE]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(appliedPromo || '', discountAmount, selectedSamples);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </button>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Discreet & Secure Delivery</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
