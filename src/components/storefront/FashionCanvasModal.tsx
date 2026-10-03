import React, { useState } from 'react';
import { Layers, X, ShoppingBag, Plus, Trash2, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const FashionCanvasModal: React.FC = () => {
  const { products, addToCart, showToast } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [canvasItems, setCanvasItems] = useState<Product[]>([products[0], products[1]]);

  const handleAddItemToCanvas = (prod: Product) => {
    if (canvasItems.find(p => p.id === prod.id)) return;
    setCanvasItems(prev => [...prev, prod]);
    showToast(`Added ${prod.name} to Fashion Canvas lookboard`);
  };

  const handleRemoveFromCanvas = (id: string) => {
    setCanvasItems(prev => prev.filter(p => p.id !== id));
  };

  const canvasTotal = canvasItems.reduce((sum, p) => sum + p.basePrice, 0);
  const canvasDiscount = Math.round(canvasTotal * 0.15);
  const finalCanvasTotal = Math.max(0, canvasTotal - canvasDiscount);

  const handleBuyCanvasLook = () => {
    canvasItems.forEach(item => {
      if (item.variants.length > 0) {
        addToCart(item, item.variants[0].id, 1);
      }
    });
    showToast('Entire Fashion Canvas look added to shopping cart!');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Canvas Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-stone-900 border border-amber-500/40 text-amber-300 px-4 py-3 rounded-full shadow-2xl backdrop-blur-lg flex items-center space-x-2 text-xs font-bold hover:bg-stone-800 transition-all hover:scale-105"
      >
        <Layers className="w-4 h-4 text-amber-400" />
        <span>Fashion Canvas ({canvasItems.length})</span>
      </button>

      {/* Canvas Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/50">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-100 font-serif-heading tracking-wide">
                    Atelier Fashion Canvas Lookboard
                  </h3>
                  <p className="text-xs text-stone-400">Drag, snap, and assemble custom sartorial combinations</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Catalog Selection List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">Available Pieces</span>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {products.map(p => (
                    <div key={p.id} className="bg-stone-950 border border-stone-800 p-2.5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded" />
                        <div>
                          <p className="text-xs font-semibold text-stone-200 truncate w-28">{p.name}</p>
                          <p className="text-xs font-bold text-amber-400">₹{p.basePrice.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddItemToCanvas(p)}
                        className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/20"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas Board Display */}
              <div className="lg:col-span-2 bg-stone-950 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-center border-b border-stone-800 pb-3 mb-4">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Canvas Board ({canvasItems.length} items)</span>
                    <button onClick={() => setCanvasItems([])} className="text-xs text-stone-500 hover:text-stone-200">Clear All</button>
                  </div>

                  {canvasItems.length === 0 ? (
                    <div className="py-16 text-center space-y-2">
                      <Layers className="w-8 h-8 text-stone-600 mx-auto" />
                      <p className="text-xs text-stone-400">Canvas is empty. Add pieces from the left panel.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-3">
                      {canvasItems.map(item => (
                        <div key={item.id} className="relative group bg-stone-900 border border-stone-800 p-3 rounded-xl text-center space-y-1">
                          <img src={item.images[0]} alt={item.name} className="w-full h-28 object-cover rounded-lg border border-stone-800/80" />
                          <p className="text-[11px] font-bold text-stone-200 truncate">{item.name}</p>
                          <p className="text-xs text-amber-400 font-semibold">₹{item.basePrice.toLocaleString('en-IN')}</p>
                          <button
                            onClick={() => handleRemoveFromCanvas(item.id)}
                            className="absolute top-2 right-2 p-1 bg-stone-950/80 text-stone-400 hover:text-red-400 rounded-full"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {canvasItems.length > 0 && (
                  <div className="border-t border-stone-800 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 block">Look Canvas Total</span>
                      <span className="text-xl font-bold text-amber-400">₹{finalCanvasTotal.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      onClick={handleBuyCanvasLook}
                      className="bg-amber-500 text-stone-950 font-bold px-6 py-3 rounded-xl uppercase tracking-wider text-xs flex items-center space-x-2 hover:bg-amber-400 shadow-xl"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Buy Canvas Look</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
