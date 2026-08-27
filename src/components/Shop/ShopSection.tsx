import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Star, 
  Eye, 
  Check, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Filter, 
  Plus,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, CLINIC_INFO } from '../../data/clinicData';
import { Product, ProductCategory } from '../../types';

interface ShopSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenQuiz: () => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Formulations' },
    { id: 'bundles', label: 'Curated Sets (Save $)' },
    { id: 'serums', label: 'Antioxidant & Elixirs' },
    { id: 'creams', label: 'Barrier & Lift Creams' },
    { id: 'retinoids', label: 'Clinical Retinoids' },
    { id: 'spf', label: 'Mineral Sun Defense' },
    { id: 'cleansers', label: 'Botanical Cleansers' },
    { id: 'post-procedure', label: 'Post-Laser Recovery' }
  ];

  const skinTypes = ['All', 'Dry', 'Sensitive', 'Combination', 'Oily', 'Mature', 'Post-Procedure'];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSkin = selectedSkinType === 'All' || p.skinTypes.includes(selectedSkinType as any) || p.skinTypes.includes('All Skin Types');
    return matchesCat && matchesSkin;
  });

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1600);
  };

  return (
    <section id="shop" className="py-24 relative bg-[#0D0F14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#C5A880]/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1D27] border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-4">
            <ShoppingBag className="w-3 h-3" />
            <span>Physician-Formulated Medical Skincare</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white mb-4">
            The ÉLAN <span className="gold-gradient-text italic">Clinical Boutique</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Formulated with chiral, pharmaceutical-grade actives developed in FDA-registered laboratories to accelerate in-clinic procedure results and deliver daily glass-skin radiance.
          </p>
        </div>

        {/* Guarantees Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#C5A880] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Cold-Chain Express Shipping</span>
              <span className="text-slate-400">Complimentary on orders $150+</span>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Medical Grade Actives</span>
              <span className="text-slate-400">Dermatologist formulated & tested</span>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#141721] border border-white/5 flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#C5A880] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">30-Day Radiant Guarantee</span>
              <span className="text-slate-400">Easy exchanges or full refund</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as ProductCategory)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#C5A880] to-[#9F8055] text-black shadow-lg shadow-[#C5A880]/20'
                  : 'bg-[#141721] text-slate-300 hover:text-white border border-white/10 hover:border-[#C5A880]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skin Type Sub-filters */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px] mr-1">Skin Type:</span>
          {skinTypes.map(st => (
            <button
              key={st}
              onClick={() => setSelectedSkinType(st)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedSkinType === st
                  ? 'bg-[#C5A880]/20 text-[#E4D5BE] border border-[#C5A880]/40 font-semibold'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="rounded-3xl overflow-hidden bg-[#141721] border border-white/10 hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col group hover:shadow-2xl hover:shadow-black/70 cursor-pointer"
            >
              {/* Product Thumbnail Container */}
              <div className="relative h-64 bg-[#0B0D12] overflow-hidden p-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge (Bestseller, Save $, etc) */}
                {product.badge && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#0D0F14]/90 border border-[#C5A880]/40 text-[#E4D5BE] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                    {product.badge}
                  </div>
                )}

                {/* Quick View Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#0D0F14]/90 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#C5A880] hover:text-black shadow-lg"
                  title="Quick View Formula"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-mono">{product.volume}</span>
                    <div className="flex items-center gap-1 text-[#C5A880]">
                      <Star className="w-3 h-3 fill-[#C5A880]" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-slate-500">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#E4D5BE] transition-colors leading-snug line-clamp-2 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {product.shortDesc}
                  </p>

                  {/* Active Ingredients Highlight */}
                  <div className="text-[11px] text-slate-400 mb-4 bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[#C5A880] font-semibold">Key Actives: </span>
                    <span>{product.activeIngredients.slice(0, 2).map(a => `${a.name}${a.percentage ? ` (${a.percentage})` : ''}`).join(', ')}</span>
                  </div>
                </div>

                {/* Price & Add to Bag */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-white">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through font-mono">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAdd(product, e)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      addedAnimationId === product.id
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                        : 'bg-[#C5A880] hover:bg-[#E4D5BE] text-black shadow-md hover:shadow-lg hover:shadow-[#C5A880]/20'
                    }`}
                  >
                    {addedAnimationId === product.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Routine Recommendation Promo */}
        <div className="mt-16 rounded-3xl p-8 bg-gradient-to-r from-[#171A24] via-[#1F2433] to-[#171A24] border border-[#C5A880]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-[#C5A880] tracking-wider block mb-1">
              Physician Consultation Algorithm
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
              Unsure which formulations match your skin type?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Take our 60-second AI diagnostic to receive a tailored AM/PM routine formulated by Dr. Elena Vance and get 15% off your first custom regimen.
            </p>
          </div>

          <button
            onClick={onOpenQuiz}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#9F8055] text-black font-semibold text-xs tracking-wider uppercase whitespace-nowrap shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            Start Skin Diagnostic
          </button>
        </div>

      </div>
    </section>
  );
};
