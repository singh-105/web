import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, Layers, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const AuraStyleMirrorModal: React.FC = () => {
  const {
    isAuraStyleMirrorOpen,
    setIsAuraStyleMirrorOpen,
    products,
    addToCart,
    setIsCartDrawerOpen,
    showToast
  } = useStore();

  const [selectedOccasion, setSelectedOccasion] = useState('Date Night');
  const [selectedFit, setSelectedFit] = useState('Oversized');
  const [selectedMood, setSelectedMood] = useState('Minimal');
  const [selectedColor, setSelectedColor] = useState('Obsidian Black');

  if (!isAuraStyleMirrorOpen) return null;

  const occasions = ['Date Night', 'Office', 'Weekend', 'Streetwear', 'Party', 'Vacation'];
  const fits = ['Oversized', 'Tailored', 'Relaxed', 'Slim', 'Regular'];
  const moods = ['Minimal', 'Street', 'Elevated', 'Resort', 'Bold'];
  const colors = ['Obsidian Black', 'Chalk White', 'Desert Sand', 'Raw Indigo', 'Emerald Green'];

  // Select 3 matching outfit items
  const outfitItems: Product[] = products.filter(p => {
    if (selectedFit === 'Oversized') return p.fit === 'Oversized' || p.fit === 'Relaxed';
    if (selectedFit === 'Tailored') return p.fit === 'Tailored' || p.fit === 'Slim';
    return true;
  }).slice(0, 3);

  const totalPrice = outfitItems.reduce((sum, item) => sum + item.basePrice, 0);

  const handleShopThisLook = () => {
    outfitItems.forEach(item => {
      const activeVariant = item.variants.find(v => v.stock > 0) || item.variants[0];
      if (activeVariant) {
        addToCart(item, activeVariant.id, 1);
      }
    });
    setIsAuraStyleMirrorOpen(false);
    setIsCartDrawerOpen(true);
    showToast('Complete Style Mirror Outfit added to Bag!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setIsAuraStyleMirrorOpen(false)}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Controls & Selector */}
        <div className="md:w-1/2 p-6 md:p-8 space-y-6 overflow-y-auto border-b md:border-b-0 md:border-r border-stone-800">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>SIGNATURE INTERACTION</span>
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase">AURA Style Mirror</h2>
            <p className="text-xs text-stone-400 mt-1">Configure your styling preferences to mirror a bespoke outfit composition.</p>
          </div>

          {/* Occasion */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Occasion</label>
            <div className="flex flex-wrap gap-2">
              {occasions.map(occ => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedOccasion === occ
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Fit */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Fit Silhouette</label>
            <div className="flex flex-wrap gap-2">
              {fits.map(fit => (
                <button
                  key={fit}
                  onClick={() => setSelectedFit(fit)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedFit === fit
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Aesthetic Mood</label>
            <div className="flex flex-wrap gap-2">
              {moods.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedMood === m
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">Color Focus</label>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedColor === c
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Outfit Visual Canvas & Bundle Action */}
        <div className="md:w-1/2 p-6 md:p-8 bg-stone-950 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>YOUR MIRRORED OUTFIT</span>
              </span>
              <span className="text-xs text-amber-400 font-bold">₹{totalPrice.toLocaleString()} Total</span>
            </div>

            <p className="text-xs text-stone-400 italic">
              "{selectedFit} {selectedMood.toLowerCase()} tailoring paired for {selectedOccasion.toLowerCase()} in {selectedColor}."
            </p>

            {/* Visual Outfit Grid */}
            <div className="grid grid-cols-3 gap-2">
              {outfitItems.map(item => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden bg-stone-900 border border-stone-800 aspect-[3/4]">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent p-2 flex flex-col justify-end">
                    <p className="text-[10px] font-semibold text-stone-200 line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-amber-400 font-bold">₹{item.basePrice.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleShopThisLook}
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-amber-500/10"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SHOP THIS COMPLETE LOOK (₹{totalPrice.toLocaleString()})</span>
            </button>

            <p className="text-[10px] text-center text-stone-500">
              Includes 3 pieces • Free express shipping on outfit bundles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
