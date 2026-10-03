import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  Bell,
  Sparkles,
  Ruler,
  CheckCircle2,
  AlertCircle,
  FolderHeart,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductVariant } from '../../types';

export const PDP: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    wishlistProductIds,
    reviews,
    addReview,
    checkWardrobeDuplicate,
    getRecommendationRationale,
    wardrobeItems,
    showToast,
    setIsTryOnOpen
  } = useStore();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.colorName || '');
  const [selectedSize, setSelectedSize] = useState<ProductVariant['size']>(product.variants[0]?.size || 'M');

  // Personality Styling State
  const [selectedPersonality, setSelectedPersonality] = useState<'Minimal' | 'Office' | 'Street' | 'Date Night'>('Minimal');

  // Size Calculator State
  const [isSizeRecOpen, setIsSizeRecOpen] = useState(false);
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(72);
  const [recSizeResult, setRecSizeResult] = useState<{ rec: string; note: string } | null>(null);

  // Review Form
  const [newRating, setNewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const availableSizes = Array.from(new Set(product.variants.map(v => v.size))) as ProductVariant['size'][];
  const availableColors = Array.from(new Set(product.variants.map(v => ({ name: v.colorName, hex: v.colorHex }))));

  const activeVariant = product.variants.find(
    v => v.colorName === selectedColor && v.size === selectedSize
  ) || product.variants[0];

  const prodReviews = reviews.filter(r => r.productId === product.id);
  const wardrobeDuplicate = checkWardrobeDuplicate(product);
  const rationale = getRecommendationRationale(product);

  const activePersonalityObj = product.personalityStyling?.find(ps => ps.personality === selectedPersonality) || {
    personality: 'Minimal',
    suggestedCombo: 'Pair with Tailored Pleated Trousers & Clean White Leather Sneakers.'
  };

  const handleCalculateSize = (e: React.FormEvent) => {
    e.preventDefault();
    let size = 'M';
    if (weightKg < 60) size = 'S';
    else if (weightKg > 80 && weightKg <= 92) size = 'L';
    else if (weightKg > 92) size = 'XL';

    setRecSizeResult({
      rec: size,
      note: `Recommended size M based on height ${heightCm}cm and weight ${weightKg}kg.`
    });
    setSelectedSize(size as any);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;
    addReview({
      productId: product.id,
      customerName: 'Vikramaditya R.',
      rating: newRating,
      title: newReviewTitle || 'Exquisite quality',
      comment: newReviewComment,
      verifiedPurchase: true
    });
    setNewReviewComment('');
    setNewReviewTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in">
      {/* Wardrobe Duplicate Alert Notice */}
      {wardrobeDuplicate && (
        <div className="bg-amber-500/10 border border-amber-500/40 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Wardrobe Duplicate Check:</strong> You already own a similar piece ({wardrobeDuplicate.name} in {wardrobeDuplicate.color}).
            </span>
          </div>
          <span className="text-[11px] text-stone-400">Verified Unique Cut</span>
        </div>
      )}

      {/* Main PDP Grid (Images + Buying Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Large Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-amber-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-full uppercase">
                -{product.discountPercentage}% OFF
              </span>
            )}
            <button
              onClick={() => setIsTryOnOpen(true)}
              className="absolute bottom-4 right-4 bg-stone-950/80 border border-amber-500/40 text-amber-300 text-xs px-4 py-2 rounded-full backdrop-blur-md hover:bg-amber-500 hover:text-stone-950 transition-all font-semibold flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Virtual Fitting Room</span>
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-stone-800 opacity-60'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buying Information Section */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold uppercase tracking-widest mb-1">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.fit}</span>
            </div>

            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-100 leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center space-x-3 mt-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-700'}`} />
                ))}
                <span className="text-xs font-bold ml-2 text-stone-200">{product.rating}</span>
              </div>
              <span className="text-stone-600">•</span>
              <a href="#reviews" className="text-xs text-stone-400 hover:text-amber-400 underline">
                {product.reviewCount} Verified Client Reviews
              </a>
            </div>

            {/* Pricing */}
            <div className="mt-4 flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-amber-400">
                ₹{product.basePrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-stone-500 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Section 12: YOUR SIZE (Integrated Size Recommendation) */}
          <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-stone-200 uppercase tracking-wider flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>YOUR SIZE RECOMMENDATION</span>
              </span>
              <button onClick={() => setIsSizeRecOpen(true)} className="text-amber-400 hover:underline font-semibold">
                Edit Preferences
              </button>
            </div>
            <p className="text-stone-300">
              Recommended: <strong>Size {selectedSize}</strong>. Fit: <em>{product.fit}</em>. Based on your saved height ({heightCm}cm) and weight ({weightKg}kg).
            </p>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <span className="font-bold text-stone-300 text-xs uppercase tracking-wider block">Color: {selectedColor}</span>
            <div className="flex space-x-3">
              {availableColors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                    selectedColor === c.name ? 'border-amber-500 scale-110' : 'border-stone-800'
                  }`}
                >
                  <span className="w-full h-full rounded-full block border border-stone-700" style={{ backgroundColor: c.hex }}></span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-stone-300 uppercase tracking-wider">Select Size</span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {availableSizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-3 text-xs font-bold rounded-xl border transition-all ${
                    selectedSize === sz ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-stone-900 text-stone-200 border-stone-800'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-2">
            <button
              onClick={() => activeVariant && addToCart(product, activeVariant.id, 1)}
              className="flex-1 bg-amber-500 text-stone-950 font-bold py-4 rounded-xl hover:bg-amber-400 transition-colors uppercase tracking-wider text-xs flex items-center justify-center space-x-2 shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-4 bg-stone-900 border border-stone-800 text-stone-200 rounded-xl hover:border-amber-500"
            >
              <Heart className={`w-5 h-5 ${wishlistProductIds.includes(product.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>

          {/* Believable Commerce Details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800 text-xs text-stone-400">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Express Shipping (Dispatch in 24h)</span>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>14-Day Doorstep Returns & COD Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* BELOW THE FOLD SECTIONS */}

      {/* WORKS WITH YOUR WARDROBE (Section 18) */}
      {wardrobeItems.length > 0 && (
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">WARDROBE COMPATIBILITY</span>
          <h3 className="font-serif-heading text-2xl font-bold text-stone-100">THIS ITEM WORKS WITH YOUR OWNED CLOTHES</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {wardrobeItems.slice(0, 2).map(w => (
              <div key={w.id} className="bg-stone-950 border border-stone-800 p-3.5 rounded-2xl flex items-center space-x-3 text-xs">
                <img src={w.image} alt={w.name} className="w-12 h-14 object-cover rounded-xl" />
                <div>
                  <p className="font-semibold text-stone-200">{w.name}</p>
                  <p className="text-stone-400 text-[11px]">Creates Look 01 ({product.name} + {w.name})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Garment Highlights & Care */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-stone-900/40 border border-stone-800 p-8 rounded-3xl">
        <div className="space-y-4">
          <h3 className="font-serif-heading text-xl font-bold text-stone-100">Fabric & Silhouette Highlights</h3>
          <ul className="space-y-2 text-xs text-stone-300">
            {product.highlights.map((h, i) => (
              <li key={i} className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif-heading text-xl font-bold text-stone-100">Garment Care Instructions</h3>
          <ul className="space-y-2 text-xs text-stone-400 list-disc list-inside">
            {product.careInstructions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reviews */}
      <div id="reviews" className="space-y-8 pt-8 border-t border-stone-800">
        <h3 className="font-serif-heading text-2xl font-bold text-stone-100">Verified Client Reviews</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-stone-100 uppercase">Leave a Review</h4>
            <form onSubmit={handleAddReview} className="space-y-3">
              <input
                type="text"
                value={newReviewTitle}
                onChange={e => setNewReviewTitle(e.target.value)}
                placeholder="Headline summary"
                className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs px-3 py-2 rounded-lg"
              />
              <textarea
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                rows={3}
                placeholder="Share your detailed feedback on drape and sizing..."
                className="w-full bg-stone-950 border border-stone-800 text-stone-200 text-xs p-3 rounded-lg"
              />
              <button type="submit" className="w-full bg-amber-500 text-stone-950 font-bold py-2.5 rounded-lg text-xs uppercase">
                Submit Review
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {prodReviews.map(rev => (
              <div key={rev.id} className="bg-stone-900/60 border border-stone-800 p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-stone-200">{rev.customerName}</span>
                  <span className="text-[11px] text-stone-500">{rev.date}</span>
                </div>
                <h5 className="text-xs font-semibold text-stone-100">{rev.title}</h5>
                <p className="text-xs text-stone-400">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
