import React, { useState } from 'react';
import { X, Heart, Sparkles, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const StyleDiscoveryModal: React.FC = () => {
  const {
    isStyleDiscoveryOpen,
    setIsStyleDiscoveryOpen,
    products,
    addToCart,
    toggleWishlist,
    wishlistProductIds,
    setIsCartDrawerOpen,
    showToast
  } = useStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);

  if (!isStyleDiscoveryOpen) return null;

  const currentProduct = products[currentIndex % products.length];
  const isWishlisted = wishlistProductIds.includes(currentProduct.id);

  const handleLike = () => {
    if (!likedProducts.some(p => p.id === currentProduct.id)) {
      setLikedProducts(prev => [...prev, currentProduct]);
    }
    showToast(`Liked ${currentProduct.name}!`);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePass = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleShopLikedItems = () => {
    likedProducts.forEach(prod => {
      const activeVariant = prod.variants.find(v => v.stock > 0) || prod.variants[0];
      if (activeVariant) {
        addToCart(prod, activeVariant.id, 1);
      }
    });
    setIsStyleDiscoveryOpen(false);
    setIsCartDrawerOpen(true);
    showToast(`Added ${likedProducts.length} items from Your Aura Edit to Bag!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={() => setIsStyleDiscoveryOpen(false)}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="flex items-center justify-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>STYLE DISCOVERY MODE</span>
          </div>
          <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase">Don't Know What You Want?</h2>
          <p className="text-xs text-stone-400">Like or Pass products to formulate your personalized AURA Edit.</p>
        </div>

        {/* Main Swipe Card */}
        <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden border border-stone-800 bg-stone-950 shadow-xl group">
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent p-6 flex flex-col justify-end space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>{currentProduct.brand}</span>
              <span>{currentProduct.fit} Fit</span>
            </div>
            <h3 className="font-serif-heading text-2xl font-bold text-stone-100">{currentProduct.name}</h3>
            <p className="text-lg font-bold text-stone-100">₹{currentProduct.basePrice.toLocaleString()}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-6 mt-6">
          <button
            onClick={handlePass}
            className="w-14 h-14 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-red-400 hover:border-red-500/40 transition-colors shadow-lg"
            title="Pass"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() => toggleWishlist(currentProduct.id)}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
              isWishlisted ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-stone-950 border-stone-800 text-stone-400'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={handleLike}
            className="w-14 h-14 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            title="Like & Add to Aura Edit"
          >
            <Heart className="w-6 h-6 fill-stone-950" />
          </button>
        </div>

        {/* Liked Items Summary Bar */}
        {likedProducts.length > 0 && (
          <div className="w-full mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-stone-200">YOUR AURA EDIT ({likedProducts.length} Items)</span>
              <p className="text-[11px] text-stone-400">Total: ₹{likedProducts.reduce((sum, p) => sum + p.basePrice, 0).toLocaleString()}</p>
            </div>
            <button
              onClick={handleShopLikedItems}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SHOP EDIT</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
