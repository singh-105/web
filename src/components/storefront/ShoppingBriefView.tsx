import React from 'react';
import { Compass, ShoppingBag, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const ShoppingBriefView: React.FC = () => {
  const { shoppingBrief, addToCart, showToast, setActivePage } = useStore();

  if (!shoppingBrief) return null;

  const handleBuyLook = (look: typeof shoppingBrief.generatedLooks[0]) => {
    look.items.forEach(item => {
      if (item.variants.length > 0) {
        addToCart(item, item.variants[0].id, 1);
      }
    });
    showToast(`Added full "${look.title}" look to cart!`);
    setActivePage('cart');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl space-y-4 shadow-2xl">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
          <Compass className="w-5 h-5" />
          <span>YOUR SHOPPING BRIEF</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <h1 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase">
              {shoppingBrief.occasion} Ensemble Brief
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Budget Constraint: ≤ ₹{shoppingBrief.budgetLimit.toLocaleString('en-IN')} • Vibe: {shoppingBrief.styleVibe}
            </p>
          </div>

          <button
            onClick={() => setActivePage('home')}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            ← Modify Shopping Need
          </button>
        </div>
      </div>

      {/* Generated Looks */}
      <div className="space-y-6">
        {shoppingBrief.generatedLooks.map(look => (
          <div key={look.id} className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">CURATED ENSEMBLE</span>
                <h2 className="font-serif-heading text-2xl font-bold text-stone-100">{look.title}</h2>
                <p className="text-xs text-stone-400 mt-1">{look.description}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-500 line-through mr-2">₹{look.totalPrice.toLocaleString('en-IN')}</span>
                <span className="text-2xl font-bold text-amber-400">₹{look.discountedTotal.toLocaleString('en-IN')}</span>
                <p className="text-[10px] text-emerald-400 font-semibold">15% Outfit Bundle Saving</p>
              </div>
            </div>

            {/* Garments in Look */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {look.items.map(item => (
                <div key={item.id} className="bg-stone-950 border border-stone-800 p-3 rounded-2xl flex items-center space-x-3">
                  <img src={item.images[0]} alt={item.name} className="w-14 h-16 object-cover rounded-xl" />
                  <div>
                    <p className="text-xs font-semibold text-stone-200">{item.name}</p>
                    <p className="text-[10px] text-stone-500">{item.category} • {item.fit}</p>
                    <p className="text-xs font-bold text-amber-400 mt-0.5">₹{item.basePrice.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reasoning Rationale */}
            <div className="bg-stone-950 border border-stone-800 p-4 rounded-2xl space-y-1 text-xs">
              <span className="font-bold text-amber-400 uppercase tracking-widest block mb-1">Why This Look Works</span>
              {look.reasoning.map((r, i) => (
                <p key={i} className="text-stone-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{r}</span>
                </p>
              ))}
            </div>

            {/* Primary Action: BUY THE LOOK */}
            <button
              onClick={() => handleBuyLook(look)}
              className="w-full bg-amber-500 text-stone-950 font-bold py-4 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center space-x-2 hover:bg-amber-400 shadow-xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BUY THE LOOK (₹{look.discountedTotal.toLocaleString('en-IN')})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
