import React, { useState } from 'react';
import { Palette, RefreshCw, ShoppingBag, ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, OccasionType } from '../../types';

export const LookEngineView: React.FC = () => {
  const { products, addToCart, showToast, setIsOutfitBuilderOpen } = useStore();

  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('Date Night');
  const [budget, setBudget] = useState(8000);
  const [remixIndex, setRemixIndex] = useState(0);

  // Remix combinations
  const lookVariations = [
    {
      title: 'Minimalist Date Night Silhouette',
      top: products[0], // Heavyweight Oversized Tee
      bottom: products[1], // Tailored Linen Trousers
      shoes: products[5], // Chelsea Boots
      vibe: 'Refined & Clean'
    },
    {
      title: 'Resort Chic Evening Look',
      top: products[2], // Silk Dress / Linen Top
      bottom: products[1], // Linen Trousers
      shoes: products[5], // Boots
      vibe: 'Effortless Luxury'
    },
    {
      title: 'Urban Streetwear Contrast',
      top: products[0],
      bottom: products[4], // Selvedge Jeans
      shoes: products[5],
      vibe: 'Contemporary Street'
    }
  ];

  const currentLook = lookVariations[remixIndex % lookVariations.length];
  const totalPrice = (currentLook.top?.basePrice || 0) + (currentLook.bottom?.basePrice || 0) + (currentLook.shoes?.basePrice || 0);
  const comboDiscount = Math.round(totalPrice * 0.15);
  const finalPrice = Math.max(0, totalPrice - comboDiscount);

  const handleRemix = () => {
    setRemixIndex(prev => prev + 1);
    showToast('Remixed look! Applied fresh item variations.');
  };

  const handleAddLookToCart = () => {
    const items = [currentLook.top, currentLook.bottom, currentLook.shoes].filter(Boolean) as Product[];
    items.forEach(item => {
      if (item.variants.length > 0) {
        addToCart(item, item.variants[0].id, 1);
      }
    });
    showToast(`Added full "${currentLook.title}" look to cart!`);
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            EDITORIAL LOOK GENERATOR
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-100 uppercase">
            The Look Engine & Remix Studio
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Algorithmic outfit harmonization tailored to your occasion and budget bounds
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleRemix}
            className="bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-200 px-5 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-md"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>REMIX LOOK (Variation #{ (remixIndex % 3) + 1 })</span>
          </button>
        </div>
      </div>

      {/* Occasion & Controls Bar */}
      <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left w-full md:w-auto">
          <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">Select Occasion</label>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {(['Date Night', 'Wedding', 'Office', 'Casual', 'Vacation'] as OccasionType[]).map(occ => (
              <button
                key={occ}
                onClick={() => setSelectedOccasion(occ)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedOccasion === occ ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-300 border border-stone-800'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-center md:text-right w-full md:w-auto">
          <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">Max Budget: ₹{budget.toLocaleString('en-IN')}</label>
          <input
            type="range"
            min="3000"
            max="20000"
            step="1000"
            value={budget}
            onChange={e => setBudget(parseInt(e.target.value))}
            className="w-48 accent-amber-500 bg-stone-950 cursor-pointer"
          />
        </div>
      </div>

      {/* Current Look Visual Presentation */}
      <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-2xl">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Look Variation #{ (remixIndex % 3) + 1 }</span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-100">{currentLook.title}</h2>
            </div>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full">
              Vibe: {currentLook.vibe}
            </span>
          </div>

          {/* 3 Garments in Look Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[currentLook.top, currentLook.bottom, currentLook.shoes].map((item, idx) => (
              <div key={idx} className="bg-stone-950 border border-stone-800 p-3 rounded-2xl space-y-2 text-center">
                <img src={item.images[0]} alt={item.name} className="w-full h-36 object-cover rounded-xl border border-stone-800/80" />
                <p className="text-xs font-bold text-stone-200 truncate">{item.name}</p>
                <p className="text-xs text-amber-400 font-semibold">₹{item.basePrice.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Look Summary & Actions */}
        <div className="bg-stone-950 border border-stone-800 p-6 rounded-2xl space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Summary</span>
            <div className="space-y-2 text-xs text-stone-400 border-b border-stone-800 pb-3">
              <div className="flex justify-between">
                <span>Combined Garments (3)</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>15% Look Combo Discount</span>
                <span>-₹{comboDiscount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="text-xs text-stone-400 uppercase">Final Total</span>
              <span className="text-2xl font-bold text-amber-400">₹{finalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAddLookToCart}
              className="w-full bg-amber-500 text-stone-950 font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center space-x-2 hover:bg-amber-400 shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BUY THIS LOOK (₹{finalPrice.toLocaleString('en-IN')})</span>
            </button>

            <button
              onClick={handleRemix}
              className="w-full bg-stone-900 border border-stone-800 text-stone-200 py-3 rounded-xl text-xs font-bold uppercase hover:bg-stone-800 flex items-center justify-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>REMIX FOR VARIATION</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
