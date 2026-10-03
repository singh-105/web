import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShoppingBag, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const FindYourAuraModal: React.FC = () => {
  const {
    isFindYourAuraOpen,
    setIsFindYourAuraOpen,
    products,
    addToCart,
    setIsCartDrawerOpen,
    showToast
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [occasion, setOccasion] = useState<string>('Date Night');
  const [vibe, setVibe] = useState<string>('Minimal');
  const [palette, setPalette] = useState<string>('Monochrome Obsidian');

  if (!isFindYourAuraOpen) return null;

  const occasions = ['College', 'Date Night', 'Office', 'Party', 'Travel', 'Everyday'];
  const vibes = ['Minimal', 'Street', 'Classic', 'Oversized', 'Bold', 'Elevated'];
  const palettes = ['Monochrome Obsidian', 'Earth Tone Camel & Olive', 'Ethereal Cream & Gold', 'Raw Denim & Slate'];

  // Match 2 products from catalog based on selections
  const matchingProducts: Product[] = products.filter(p => {
    if (vibe === 'Minimal') return p.fit === 'Tailored' || p.fit === 'Slim' || p.tags.includes('Minimalist');
    if (vibe === 'Street' || vibe === 'Oversized') return p.fit === 'Oversized' || p.tags.includes('Streetwear');
    return true;
  }).slice(0, 3);

  const handleShopYourAura = () => {
    matchingProducts.forEach(prod => {
      const activeVariant = prod.variants.find(v => v.stock > 0) || prod.variants[0];
      if (activeVariant) {
        addToCart(prod, activeVariant.id, 1);
      }
    });
    setIsFindYourAuraOpen(false);
    setIsCartDrawerOpen(true);
    showToast('Your Aura outfit bundle added to Bag!');
  };

  const resetQuiz = () => {
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={() => setIsFindYourAuraOpen(false)}
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center space-x-2 text-xs text-amber-400 font-semibold mb-6 uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>AURA CONSULTATION • STEP {step} OF 4</span>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase tracking-wide">
                What are you dressing for?
              </h2>
              <p className="text-xs text-stone-400 mt-1">Select your primary occasion to tailor the aesthetic.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {occasions.map(occ => (
                <button
                  key={occ}
                  onClick={() => setOccasion(occ)}
                  className={`p-4 rounded-2xl border text-left font-semibold text-xs transition-all ${
                    occasion === occ
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
                      : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{occ}</span>
                    {occasion === occ && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Next: Select Your Vibe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase tracking-wide">
                What's your vibe?
              </h2>
              <p className="text-xs text-stone-400 mt-1">Choose the silhouette and mood that represents your style.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {vibes.map(v => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`p-4 rounded-2xl border text-left font-semibold text-xs transition-all ${
                    vibe === v
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
                      : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{v}</span>
                    {vibe === v && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-400 font-semibold text-xs uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Next: Pick Palette</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase tracking-wide">
                Pick your mood palette
              </h2>
              <p className="text-xs text-stone-400 mt-1">Select your preferred color harmony.</p>
            </div>

            <div className="space-y-3">
              {palettes.map(pal => (
                <button
                  key={pal}
                  onClick={() => setPalette(pal)}
                  className={`w-full p-4 rounded-2xl border text-left font-semibold text-xs transition-all flex items-center justify-between ${
                    palette === pal
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <span>{pal}</span>
                  {palette === pal && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-400 font-semibold text-xs uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="w-2/3 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Generate Your Aura Edit</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center border-b border-stone-800 pb-4">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">PERSONAL STYLING PROFILE</span>
              <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase tracking-wide">
                YOUR AURA EDIT: {vibe.toUpperCase()} {occasion.toUpperCase()}
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                "Curated relaxed sophistication in {palette} palette. Styled for effortless confidence."
              </p>
            </div>

            {/* Recommended Products */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider">Curated Look Pieces ({matchingProducts.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchingProducts.map(prod => (
                  <div key={prod.id} className="flex items-center space-x-3 p-3 rounded-2xl bg-stone-950 border border-stone-800">
                    <img src={prod.images[0]} alt={prod.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-stone-200 line-clamp-1">{prod.name}</p>
                      <p className="text-amber-400 font-bold">₹{prod.basePrice.toLocaleString()}</p>
                      <p className="text-[10px] text-stone-500">Fit: {prod.fit} • Size M Rec</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={resetQuiz}
                className="w-1/3 py-3.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              <button
                onClick={handleShopYourAura}
                className="w-2/3 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-amber-500/10"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SHOP YOUR AURA BUNDLE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
