import React, { useState } from 'react';
import { Sparkles, X, ShoppingBag, ArrowRight, Check, RefreshCw, Compass } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, OccasionType } from '../../types';

export const AiStyleAssistantModal: React.FC = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen, products, addToCart, showToast } = useStore();
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('Date Night');
  const [budgetLimit, setBudgetLimit] = useState(8000);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedLook, setSuggestedLook] = useState<{
    title: string;
    description: string;
    items: Product[];
    totalPrice: number;
    discountedTotal: number;
  } | null>(null);

  if (!isAiAssistantOpen) return null;

  const handleGenerateLook = (occ: OccasionType) => {
    setSelectedOccasion(occ);
    setIsAnalyzing(true);
    setSuggestedLook(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      let matchingProds = products.filter(p => p.occasion.includes(occ));
      if (matchingProds.length < 2) matchingProds = [products[0], products[1], products[5]];

      const top = matchingProds[0] || products[0];
      const bottom = matchingProds[1] || products[1];
      const footwear = matchingProds[2] || products[5];
      const total = top.basePrice + bottom.basePrice + (footwear?.basePrice || 0);

      setSuggestedLook({
        title: `${occ} Atelier Style Ensemble`,
        description: `Curated combination of ${top.name} paired with ${bottom.name} and handcrafted footwear tailored for ${occ}.`,
        items: [top, bottom, footwear].filter(Boolean),
        totalPrice: total,
        discountedTotal: Math.min(budgetLimit, Math.round(total * 0.85))
      });
    }, 800);
  };

  const handleAddLookToCart = () => {
    if (!suggestedLook) return;
    suggestedLook.items.forEach(item => {
      if (item.variants.length > 0) {
        addToCart(item, item.variants[0].id, 1);
      }
    });
    showToast(`Added full "${suggestedLook.title}" look to bag!`);
    setIsAiAssistantOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif-heading tracking-wide">
                STYLE WITH AURA
              </h3>
              <p className="text-xs text-stone-400">Personal Atelier Stylist</p>
            </div>
          </div>
          <button onClick={() => setIsAiAssistantOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Situation Buttons */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">What are you dressing for?</label>
            <div className="flex flex-wrap gap-2">
              {(['Date Night', 'Wedding', 'Office', 'Casual', 'Vacation', 'Party'] as OccasionType[]).map(occ => (
                <button
                  key={occ}
                  onClick={() => handleGenerateLook(occ)}
                  className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all ${
                    selectedOccasion === occ ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-amber-500/50'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Limit Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-bold text-stone-300 uppercase">
              <span>Target Budget Constraint</span>
              <span className="text-amber-400">₹{budgetLimit.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="20000"
              step="1000"
              value={budgetLimit}
              onChange={e => setBudgetLimit(parseInt(e.target.value))}
              className="w-full accent-amber-500 bg-stone-950 cursor-pointer"
            />
          </div>

          {/* Loading */}
          {isAnalyzing && (
            <div className="py-12 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-stone-200">Harmonizing silhouettes & fabric drapes for {selectedOccasion}...</p>
            </div>
          )}

          {/* Result Look */}
          {suggestedLook && !isAnalyzing && (
            <div className="bg-stone-950 border border-amber-500/30 rounded-2xl p-5 space-y-4 animate-fade-in shadow-xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Curated Style Ensemble</span>
                  <h4 className="text-lg font-serif-heading text-stone-100">{suggestedLook.title}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 line-through mr-2">₹{suggestedLook.totalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-base font-bold text-amber-400">₹{suggestedLook.discountedTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">{suggestedLook.description}</p>

              <div className="grid grid-cols-3 gap-3">
                {suggestedLook.items.map(item => (
                  <div key={item.id} className="bg-stone-900 border border-stone-800 p-2.5 rounded-xl text-center space-y-1">
                    <img src={item.images[0]} alt={item.name} className="w-full h-24 object-cover rounded-lg" />
                    <p className="text-[11px] font-semibold text-stone-200 truncate">{item.name}</p>
                    <p className="text-xs font-bold text-amber-400">₹{item.basePrice.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddLookToCart}
                className="w-full bg-amber-500 text-stone-950 font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center space-x-2 hover:bg-amber-400 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>BUY THIS LOOK (₹{suggestedLook.discountedTotal.toLocaleString('en-IN')})</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
