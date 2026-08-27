import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Plus, 
  Minus, 
  FlaskConical, 
  Sparkles,
  Sun,
  Moon,
  ArrowLeft
} from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'how-to-use'>('benefits');

  // Support Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#0D0F14] border border-[#C5A880]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Top Breadcrumb & Navigation Header */}
        <div className="px-5 py-3.5 bg-[#141721] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#C5A880] hover:text-[#E4D5BE] transition-colors font-semibold group cursor-pointer"
              title="Return to Skincare Boutique"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Boutique</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <span className="text-slate-400 capitalize hidden sm:inline">{product.category}</span>
            <span className="text-slate-600 hidden md:inline">/</span>
            <span className="text-white font-semibold truncate max-w-[160px] sm:max-w-[220px] hidden md:inline">
              {product.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Product Image */}
            <div className="md:col-span-5 bg-[#0B0D12] rounded-2xl p-6 border border-white/10 flex items-center justify-center relative">
              <img 
                src={product.image} 
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-72 w-auto object-contain"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0D0F14]/90 border border-[#C5A880]/40 text-[#E4D5BE] text-[10px] font-bold uppercase tracking-wider">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Right: Primary Info */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-mono">{product.volume}</span>
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-slate-500">({product.reviewsCount} Verified Reviews)</span>
                  </div>
                </div>

                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {product.name}
                </h2>
                <div className="text-xs text-[#C5A880] mt-0.5 font-medium">{product.subtitle}</div>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif-luxury text-2xl font-bold text-white">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-mono">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                  In Stock • Dispatch in 24h
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.fullDesc}
              </p>

              {/* Skin Types Tags */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-1.5 font-semibold">Prescribed For Skin Types:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.skinTypes.map((st, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-slate-300">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Study Results Callout */}
              {product.clinicalResults && product.clinicalResults.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#141721] border border-[#C5A880]/30 space-y-2">
                  <span className="text-[11px] font-mono text-[#C5A880] uppercase flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Independent Clinical Trial Findings:</span>
                  </span>
                  <ul className="space-y-1 text-xs text-slate-200">
                    {product.clinicalResults.map((res, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

          {/* Deep Formula Tabs */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex border-b border-white/10 gap-6 text-xs font-semibold mb-4">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'text-[#C5A880] border-b-2 border-[#C5A880]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Key Benefits & Actives
              </button>
              <button
                onClick={() => setActiveTab('how-to-use')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'how-to-use'
                    ? 'text-[#C5A880] border-b-2 border-[#C5A880]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Application Protocol
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'text-[#C5A880] border-b-2 border-[#C5A880]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full INCI Ingredients
              </button>
            </div>

            {/* TAB: Benefits & Active Molecules */}
            {activeTab === 'benefits' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.activeIngredients.map((ing, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#141721] border border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{ing.name}</span>
                        {ing.percentage && (
                          <span className="text-[11px] font-mono font-bold text-[#C5A880]">
                            {ing.percentage}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{ing.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: How to Use */}
            {activeTab === 'how-to-use' && (
              <div className="space-y-3 p-4 rounded-2xl bg-[#141721] border border-white/5 text-xs text-slate-300">
                <div className="font-bold text-white mb-2">Physician Usage Guide:</div>
                <p className="leading-relaxed">{product.howToUse}</p>
                <div className="flex items-center gap-4 text-slate-400 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-[#C5A880]" /> Suitable for AM</span>
                  <span className="flex items-center gap-1"><Moon className="w-3.5 h-3.5 text-blue-400" /> Suitable for PM</span>
                </div>
              </div>
            )}

            {/* TAB: Full INCI list */}
            {activeTab === 'ingredients' && (
              <div className="p-4 rounded-2xl bg-[#141721] border border-white/5 text-[11px] text-slate-400 leading-relaxed font-mono">
                {product.ingredientsList || "Aqua/Water/Eau, Camellia Sinensis Leaf Extract, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Niacinamide, Sodium Hyaluronate, Squalane, Tocopherol, Ferulic Acid, Phenoxyethanol, Ethylhexylglycerin."}
              </div>
            )}

          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="p-6 bg-[#141721] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">Qty:</span>
            <div className="flex items-center gap-2 bg-[#0D0F14] px-3 py-1.5 rounded-xl border border-white/10">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-mono font-bold text-white px-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <span className="text-lg font-bold text-white font-mono ml-2">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Back to Boutique</span>
            </button>
            <button
              onClick={handleAddToCart}
              className={`flex-1 sm:flex-initial px-8 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                added
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black shadow-xl hover:shadow-2xl'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
