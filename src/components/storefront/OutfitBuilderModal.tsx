import React, { useState } from 'react';
import { Layers, X, ShoppingBag, Plus, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const OutfitBuilderModal: React.FC = () => {
  const { isOutfitBuilderOpen, setIsOutfitBuilderOpen, products, addToCart, showToast } = useStore();

  const tops = products.filter(p => p.category === 'Men' || p.category === 'Women');
  const bottoms = products.filter(p => p.subCategory === 'Trousers' || p.subCategory === 'Jeans');
  const footwear = products.filter(p => p.category === 'Accessories' || p.subCategory === 'Footwear');

  const [selectedTop, setSelectedTop] = useState<Product | null>(tops[0] || null);
  const [selectedBottom, setSelectedBottom] = useState<Product | null>(bottoms[0] || null);
  const [selectedFootwear, setSelectedFootwear] = useState<Product | null>(footwear[0] || null);

  if (!isOutfitBuilderOpen) return null;

  const rawTotal =
    (selectedTop?.basePrice || 0) +
    (selectedBottom?.basePrice || 0) +
    (selectedFootwear?.basePrice || 0);

  // 15% bundle discount for full 3-piece outfit creation
  const comboDiscount = Math.round(rawTotal * 0.15);
  const discountedTotal = Math.max(0, rawTotal - comboDiscount);

  const handleBuyOutfit = () => {
    const items = [selectedTop, selectedBottom, selectedFootwear].filter(Boolean) as Product[];
    if (items.length === 0) return;

    items.forEach(item => {
      if (item.variants.length > 0) {
        addToCart(item, item.variants[0].id, 1);
      }
    });

    showToast('Complete styled outfit added to cart with 15% combo discount!');
    setIsOutfitBuilderOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/50">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif-heading tracking-wide">
                Interactive Outfit Studio
              </h3>
              <p className="text-xs text-stone-400">Mix & match garments to craft custom looks with instant bundle savings</p>
            </div>
          </div>
          <button
            onClick={() => setIsOutfitBuilderOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Selectors */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Selector */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
                1. Select Top Garment
              </label>
              <div className="grid grid-cols-3 gap-3">
                {tops.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedTop(p)}
                    className={`p-2 rounded-xl border cursor-pointer transition-all text-center ${
                      selectedTop?.id === p.id
                        ? 'bg-amber-500/10 border-amber-500 text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <img src={p.images[0]} alt={p.name} className="w-full h-20 object-cover rounded-lg mb-1.5" />
                    <p className="text-[11px] font-medium truncate">{p.name}</p>
                    <p className="text-xs font-bold text-amber-400">₹{p.basePrice.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Selector */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
                2. Select Trouser / Bottom
              </label>
              <div className="grid grid-cols-3 gap-3">
                {bottoms.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedBottom(p)}
                    className={`p-2 rounded-xl border cursor-pointer transition-all text-center ${
                      selectedBottom?.id === p.id
                        ? 'bg-amber-500/10 border-amber-500 text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <img src={p.images[0]} alt={p.name} className="w-full h-20 object-cover rounded-lg mb-1.5" />
                    <p className="text-[11px] font-medium truncate">{p.name}</p>
                    <p className="text-xs font-bold text-amber-400">₹{p.basePrice.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footwear Selector */}
            <div>
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
                3. Select Footwear
              </label>
              <div className="grid grid-cols-3 gap-3">
                {footwear.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedFootwear(p)}
                    className={`p-2 rounded-xl border cursor-pointer transition-all text-center ${
                      selectedFootwear?.id === p.id
                        ? 'bg-amber-500/10 border-amber-500 text-stone-100'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <img src={p.images[0]} alt={p.name} className="w-full h-20 object-cover rounded-lg mb-1.5" />
                    <p className="text-[11px] font-medium truncate">{p.name}</p>
                    <p className="text-xs font-bold text-amber-400">₹{p.basePrice.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Live Canvas & Financial Summary */}
          <div className="bg-stone-950 border border-stone-800 p-5 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Outfit Canvas Preview
              </span>
              <h4 className="text-lg font-serif-heading font-bold text-stone-100 mb-4">
                Your Custom Look
              </h4>

              {/* Stacked Preview Images */}
              <div className="flex space-x-2 justify-center mb-4">
                {selectedTop && (
                  <img src={selectedTop.images[0]} alt="Top" className="w-16 h-20 object-cover rounded-lg border border-stone-800" />
                )}
                {selectedBottom && (
                  <img src={selectedBottom.images[0]} alt="Bottom" className="w-16 h-20 object-cover rounded-lg border border-stone-800" />
                )}
                {selectedFootwear && (
                  <img src={selectedFootwear.images[0]} alt="Shoes" className="w-16 h-20 object-cover rounded-lg border border-stone-800" />
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-stone-800 pt-3 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Top ({selectedTop?.name})</span>
                  <span>₹{selectedTop?.basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Bottom ({selectedBottom?.name})</span>
                  <span>₹{selectedBottom?.basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Footwear ({selectedFootwear?.name})</span>
                  <span>₹{selectedFootwear?.basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold pt-1 border-t border-stone-800/50">
                  <span>Combo 15% Discount</span>
                  <span>-₹{comboDiscount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-400 uppercase">Outfit Total</span>
                <div className="text-right">
                  <span className="text-xs text-stone-500 line-through mr-2">₹{rawTotal.toLocaleString('en-IN')}</span>
                  <span className="text-xl font-bold text-amber-400">₹{discountedTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleBuyOutfit}
                className="w-full bg-amber-500 text-stone-950 font-bold py-3.5 rounded-xl hover:bg-amber-400 transition-colors uppercase tracking-wider text-xs flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add 3-Piece Outfit to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
