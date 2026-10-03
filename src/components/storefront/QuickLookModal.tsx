import React, { useState } from 'react';
import { X, Star, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const QuickLookModal: React.FC = () => {
  const {
    quickLookProduct,
    setQuickLookProduct,
    addToCart,
    wishlistProductIds,
    toggleWishlist,
    setSelectedProductId,
    setActivePage,
    setIsCartDrawerOpen,
    showToast
  } = useStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  if (!quickLookProduct) return null;

  const isWishlisted = wishlistProductIds.includes(quickLookProduct.id);

  // Default to first in-stock variant if none selected
  const activeVariant = quickLookProduct.variants.find(v => v.id === selectedVariantId) || 
                        quickLookProduct.variants.find(v => v.stock > 0) || 
                        quickLookProduct.variants[0];

  const handleAddToCart = () => {
    if (!activeVariant) return;
    addToCart(quickLookProduct, activeVariant.id, 1);
    setQuickLookProduct(null);
    setIsCartDrawerOpen(true);
  };

  const handleViewFullProduct = () => {
    setSelectedProductId(quickLookProduct.id);
    setActivePage('pdp');
    setQuickLookProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setQuickLookProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-950/80 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 relative bg-stone-950 flex items-center justify-center min-h-[300px] md:min-h-[480px]">
          <img
            src={quickLookProduct.images[0]}
            alt={quickLookProduct.name}
            className="w-full h-full object-cover"
          />
          {quickLookProduct.isNewArrival && (
            <span className="absolute top-4 left-4 bg-amber-500 text-stone-950 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider">
              JUST DROPPED
            </span>
          )}
        </div>

        {/* Right: Product Quick Info */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                <span className="uppercase tracking-widest text-amber-400 font-semibold">{quickLookProduct.brand}</span>
                <span className="flex items-center space-x-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{quickLookProduct.rating} ({quickLookProduct.reviewCount})</span>
                </span>
              </div>
              <h2 className="font-serif-heading text-2xl font-bold text-stone-100">{quickLookProduct.name}</h2>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-bold text-stone-100">₹{quickLookProduct.basePrice.toLocaleString()}</span>
              {quickLookProduct.originalPrice && (
                <span className="text-sm text-stone-500 line-through">₹{quickLookProduct.originalPrice.toLocaleString()}</span>
              )}
              {quickLookProduct.discountPercentage && (
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  {quickLookProduct.discountPercentage}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
              {quickLookProduct.description}
            </p>

            {/* Fit Recommendation */}
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-stone-200">Fit Confidence: {quickLookProduct.fit} Fit</p>
                <p className="text-stone-400 text-[11px]">Recommended Size: <strong className="text-amber-400">M</strong> (91% verified fit accuracy)</p>
              </div>
            </div>

            {/* Variant / Size Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                Select Size & Color
              </label>
              <div className="flex flex-wrap gap-2">
                {quickLookProduct.variants.map(variant => {
                  const isSelected = activeVariant?.id === variant.id;
                  const isOutOfStock = variant.stock === 0;

                  return (
                    <button
                      key={variant.id}
                      onClick={() => !isOutOfStock && setSelectedVariantId(variant.id)}
                      disabled={isOutOfStock}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                          : isOutOfStock
                          ? 'bg-stone-950 text-stone-600 border-stone-900 cursor-not-allowed line-through'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {variant.colorName.split(' ')[0]} - {variant.size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-amber-500/10"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Quick Add To Bag</span>
              </button>
              <button
                onClick={() => {
                  toggleWishlist(quickLookProduct.id);
                  showToast(isWishlisted ? 'Removed from Wishlist' : 'Saved to Wishlist');
                }}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-400' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleViewFullProduct}
              className="w-full py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <span>View Full Editorial & Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
