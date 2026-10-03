import React, { useState } from 'react';
import { Palette, X, Sparkles, Check, ArrowRight, RefreshCw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { StyleDnaProfile } from '../../types';

export const StyleDnaModal: React.FC = () => {
  const { isStyleDnaModalOpen, setIsStyleDnaModalOpen, styleDna, updateStyleDna, showToast } = useStore();
  const [step, setStep] = useState<number>(1);

  // User selections in visual quiz
  const [selections, setSelections] = useState<{
    fitPref: 'Oversized' | 'Slim' | 'Regular' | 'Relaxed';
    primaryVibe: 'minimal' | 'street' | 'classic' | 'resort';
  }>({
    fitPref: 'Oversized',
    primaryVibe: 'minimal'
  });

  if (!isStyleDnaModalOpen) return null;

  const quizOptionsStep1 = [
    {
      id: 'opt-a',
      title: 'Monochrome Minimalist',
      subtitle: 'Clean lines, heavy drape cotton, boxy silhouettes, neutral tones.',
      vibe: 'minimal' as const,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'opt-b',
      title: 'Sartorial Classic',
      subtitle: 'High-waisted linen pleats, structured blazers, leather Chelsea boots.',
      vibe: 'classic' as const,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const quizOptionsStep2 = [
    {
      id: 'fit-a',
      title: 'Relaxed & Oversized Silhouette',
      subtitle: 'Comfortable dropped shoulders and wide-leg trousers.',
      fit: 'Oversized' as const,
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'fit-b',
      title: 'Tailored & Contoured Fit',
      subtitle: 'Sharp shoulders, tapered waistline, exact sleeve length.',
      fit: 'Slim' as const,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const handleFinishQuiz = () => {
    const computedDna: StyleDnaProfile = {
      isCompleted: true,
      archetypes: {
        minimal: selections.primaryVibe === 'minimal' ? 72 : 25,
        street: selections.primaryVibe === 'street' ? 65 : 18,
        classic: selections.primaryVibe === 'classic' ? 70 : 15,
        resort: 10
      },
      preferredFit: selections.fitPref,
      primaryColors: ['Obsidian Black', 'Chalk White', 'Desert Sand'],
      priceSensitivity: 'Balanced',
      favoriteOccasions: ['Casual', 'Office', 'Date Night']
    };

    updateStyleDna(computedDna);
    showToast('Style DNA formulated! Storefront recommendations personalized.');
    setIsStyleDnaModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif-heading tracking-wide">
                Formulate Your Style DNA
              </h3>
              <p className="text-xs text-stone-400">Visual aesthetic preference profiling</p>
            </div>
          </div>
          <button onClick={() => setIsStyleDnaModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center max-w-md mx-auto space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Question 1 of 2</span>
                <h4 className="font-serif-heading text-xl font-bold text-stone-100">Which aesthetic feels more like you?</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizOptionsStep1.map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelections(prev => ({ ...prev, primaryVibe: opt.vibe }));
                      setStep(2);
                    }}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500 transition-all duration-300"
                  >
                    <img src={opt.image} alt={opt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 space-y-1 text-left">
                      <h5 className="font-serif-heading text-lg font-bold text-stone-100">{opt.title}</h5>
                      <p className="text-xs text-stone-300 leading-relaxed">{opt.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center max-w-md mx-auto space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Question 2 of 2</span>
                <h4 className="font-serif-heading text-xl font-bold text-stone-100">Which silhouette fit do you prefer?</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizOptionsStep2.map(opt => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelections(prev => ({ ...prev, fitPref: opt.fit }));
                      handleFinishQuiz();
                    }}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500 transition-all duration-300"
                  >
                    <img src={opt.image} alt={opt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 space-y-1 text-left">
                      <h5 className="font-serif-heading text-lg font-bold text-stone-100">{opt.title}</h5>
                      <p className="text-xs text-stone-300 leading-relaxed">{opt.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
