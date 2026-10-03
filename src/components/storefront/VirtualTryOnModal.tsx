import React, { useState } from 'react';
import { Shirt, X, Upload, Sparkles, CheckCircle2, RefreshCw, Share2, Download } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const VirtualTryOnModal: React.FC = () => {
  const { isTryOnOpen, setIsTryOnOpen, products, showToast } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [userPhoto, setUserPhoto] = useState<string | null>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600');
  const [step, setStep] = useState<'upload' | 'processing' | 'result'>('upload');

  if (!isTryOnOpen) return null;

  const sampleModels = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600'
  ];

  const handleRunTryOn = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('result');
      showToast('Virtual Try-On preview generated!');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/50">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-serif-heading tracking-wide">
                Virtual AI Fitting Room
              </h3>
              <p className="text-xs text-stone-400">See garments mapped to your silhouette with neural texture precision</p>
            </div>
          </div>
          <button
            onClick={() => setIsTryOnOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {step === 'upload' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo Upload / Preset Selection */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  1. Select or Upload Your Photo
                </label>

                {userPhoto ? (
                  <div className="relative rounded-xl overflow-hidden border border-stone-800 aspect-[3/4] bg-stone-950">
                    <img src={userPhoto} alt="Model" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setUserPhoto(null)}
                      className="absolute top-3 right-3 bg-stone-900/80 text-stone-200 p-1.5 rounded-full hover:bg-stone-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-stone-800 hover:border-amber-500/50 rounded-xl p-6 text-center bg-stone-950 cursor-pointer aspect-[3/4] flex flex-col items-center justify-center space-y-3">
                    <Upload className="w-8 h-8 text-stone-500" />
                    <p className="text-xs text-stone-300 font-medium">Click to upload full-body photo</p>
                    <p className="text-[10px] text-stone-500">PNG or JPG up to 10MB • Encrypted for privacy</p>
                  </div>
                )}

                {/* Preset model switcher */}
                <div>
                  <p className="text-[11px] text-stone-400 mb-2">Or choose sample model silhouette:</p>
                  <div className="flex space-x-3">
                    {sampleModels.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => setUserPhoto(url)}
                        className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          userPhoto === url ? 'border-amber-500 scale-105' : 'border-stone-800 opacity-60'
                        }`}
                      >
                        <img src={url} alt="preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Garment Selection */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                  2. Select Garment to Try On
                </label>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  {products.map(p => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 ${
                        selectedProduct.id === p.id
                          ? 'bg-amber-500/10 border-amber-500/50 text-stone-100'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[10px] text-stone-400">{p.category} • {p.fit}</p>
                        <p className="text-xs font-bold text-amber-400 mt-0.5">₹{p.basePrice.toLocaleString('en-IN')}</p>
                      </div>
                      {selectedProduct.id === p.id && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleRunTryOn}
                    className="w-full bg-amber-500 text-stone-950 font-bold py-3.5 rounded-xl hover:bg-amber-400 transition-colors uppercase tracking-wider text-xs flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Neural Fitting Preview</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
              <RefreshCw className="w-10 h-10 text-amber-400 animate-spin" />
              <h4 className="text-base font-bold text-stone-100">Rendering Neural Fabric Warp & Lighting...</h4>
              <p className="text-xs text-stone-400 max-w-md">
                Mapping 3D cloth physics onto silhouette contours while preserving natural skin tones and garment texture depth.
              </p>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-6">
              <div className="bg-stone-950 border border-amber-500/30 p-4 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2 aspect-[3/4] relative rounded-xl overflow-hidden border border-stone-800 shadow-xl">
                  {/* Result image overlay simulation */}
                  <img src={selectedProduct.images[0]} alt="Result" className="w-full h-full object-cover" />
                  <span className="absolute bottom-3 left-3 bg-stone-950/80 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    AI Virtual Fit Result
                  </span>
                </div>

                <div className="w-full md:w-1/2 space-y-4 text-left">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Fit Accuracy: 98%</span>
                    <h4 className="text-xl font-serif-heading font-bold text-stone-100">{selectedProduct.name}</h4>
                    <p className="text-xs text-stone-400 mt-1">Rendered on your photo silhouette in size M.</p>
                  </div>

                  <div className="p-3 bg-stone-900 rounded-lg text-xs text-stone-300 space-y-1">
                    <p className="font-semibold text-amber-400">Stylist Fit Analysis:</p>
                    <p className="text-stone-400 text-[11px]">
                      The shoulder line falls naturally at 44cm width. Sleeves drape cleanly with minimal tension lines.
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => showToast('Outfit snapshot saved to device!')}
                      className="flex-1 bg-stone-900 border border-stone-800 text-stone-200 py-2.5 rounded-xl text-xs font-semibold hover:bg-stone-800 flex items-center justify-center space-x-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>Save Photo</span>
                    </button>
                    <button
                      onClick={() => showToast('Share link copied to clipboard!')}
                      className="p-2.5 bg-stone-900 border border-stone-800 text-stone-200 rounded-xl hover:bg-stone-800"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setStep('upload')}
                    className="w-full text-xs text-stone-400 hover:text-amber-400 underline pt-2"
                  >
                    Try on another garment or change photo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
