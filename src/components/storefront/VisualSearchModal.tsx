import React, { useState } from 'react';
import { Camera, X, Upload, Sparkles, Search } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const VisualSearchModal: React.FC = () => {
  const { isVisualSearchOpen, setIsVisualSearchOpen, products, setSelectedProductId, setActivePage, showToast } = useStore();
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [matches, setMatches] = useState<Product[] | null>(null);

  if (!isVisualSearchOpen) return null;

  const handleSimulateUpload = () => {
    setAnalyzing(true);
    setMatches(null);
    setTimeout(() => {
      setAnalyzing(false);
      // Simulate computer vision similarity matching on catalog
      setMatches([products[0], products[1], products[4]]);
      showToast('Visual similarity match complete! Found 3 matching silhouettes.');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/50">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif-heading tracking-wide">
                Visual Search Engine
              </h3>
              <p className="text-xs text-stone-400">Upload any fashion inspiration photo to find matching atelier pieces</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisualSearchOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!matches && !analyzing && (
            <div
              onDragOver={e => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={e => { e.preventDefault(); setDragActive(false); handleSimulateUpload(); }}
              onClick={handleSimulateUpload}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 bg-stone-950 ${
                dragActive ? 'border-amber-500 bg-amber-500/5' : 'border-stone-800 hover:border-amber-500/50'
              }`}
            >
              <div className="p-4 bg-stone-900 rounded-full text-amber-400 border border-stone-800">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-200">Drag & Drop fashion image or click to browse</p>
                <p className="text-xs text-stone-500 mt-1">Supports JPG, PNG, WEBP • Auto-extracts cut, pattern & color palette</p>
              </div>
            </div>
          )}

          {analyzing && (
            <div className="py-16 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-stone-200">Extracting visual embeddings & texture matrices...</p>
              <p className="text-[11px] text-stone-500">Searching against 10,000+ catalog vector indices</p>
            </div>
          )}

          {matches && !analyzing && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Visual Similarity Results ({matches.length} matches)
                </span>
                <button
                  onClick={() => setMatches(null)}
                  className="text-xs text-stone-400 hover:text-stone-200 underline"
                >
                  Upload Another Image
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {matches.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setActivePage('pdp');
                      setIsVisualSearchOpen(false);
                    }}
                    className="bg-stone-950 border border-stone-800 hover:border-amber-500/60 p-3 rounded-xl cursor-pointer transition-all group"
                  >
                    <img src={p.images[0]} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform duration-300" />
                    <p className="text-xs font-semibold text-stone-200 truncate">{p.name}</p>
                    <p className="text-[10px] text-emerald-400 font-medium">96% Visual Match</p>
                    <p className="text-xs font-bold text-amber-400 mt-1">₹{p.basePrice.toLocaleString('en-IN')}</p>
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
