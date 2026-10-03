import React from 'react';
import { TrendingUp, AlertTriangle, Sparkles, Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const InventoryIntelligence: React.FC = () => {
  const { products, updateProductPrice, showToast } = useStore();

  const fastMovers = products.filter(p => p.salesVelocity === 'high');
  const slowMovers = products.filter(p => p.salesVelocity === 'low' || p.salesVelocity === 'medium');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
          DECISION INTELLIGENCE
        </span>
        <h1 className="font-serif-heading text-3xl font-bold text-stone-100">
          Inventory Velocity & Automated Discount Engine
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Predictive sales turnover and margin-protecting automated pricing recommendations.
        </p>
      </div>

      {/* Grid: Fast vs Slow Movers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Fast Movers */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
            <h3 className="text-base font-bold text-stone-100 font-serif-heading">High-Velocity Champions</h3>
          </div>

          <div className="space-y-3 divide-y divide-stone-800">
            {fastMovers.map(p => (
              <div key={p.id} className="pt-3 first:pt-0 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-stone-200">{p.name}</span>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    High Demand
                  </span>
                </div>
                <p className="text-stone-400 text-[11px]">
                  Estimated stockout window: <strong className="text-amber-400">6 Days</strong>. Recommendation: Maintain full MSRP (No discount).
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Slow Movers */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold text-stone-100 font-serif-heading">Stagnant Stock Alerts</h3>
          </div>

          <div className="space-y-3 divide-y divide-stone-800">
            {slowMovers.map(p => {
              const suggestedPrice = Math.round(p.basePrice * 0.85); // 15% discount recommendation
              return (
                <div key={p.id} className="pt-3 first:pt-0 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-stone-200">{p.name}</span>
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Stagnant (30+ Days)
                    </span>
                  </div>
                  <p className="text-stone-400 text-[11px]">
                    Recommendation: Apply 15% clearance discount (₹{p.basePrice} → <strong className="text-emerald-400">₹{suggestedPrice}</strong>).
                  </p>

                  <button
                    onClick={() => {
                      updateProductPrice(p.id, suggestedPrice, p.basePrice);
                      showToast(`Applied 15% automated discount recommendation to ${p.name}`);
                    }}
                    className="bg-stone-950 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-amber-500 hover:text-stone-950 transition-all flex items-center space-x-1"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>Apply Recommended 15% Discount</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
