import React, { useState } from 'react';
import { FolderHeart, Plus, Trash2, Sparkles, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { WardrobeItem } from '../../types';

export const WardrobeView: React.FC = () => {
  const { wardrobeItems, removeWardrobeItem, addWardrobeItem, products, addToCart, setSelectedProductId, setActivePage, showToast } = useStore();

  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('Trousers');
  const [newItemColor, setNewItemColor] = useState('Obsidian Black');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addWardrobeItem({
      name: newItemName,
      category: newItemCat,
      color: newItemColor,
      colorHex: '#121212',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
      isOwnedByCustomer: true,
      purchaseDate: new Date().toISOString().split('T')[0],
      tags: ['Custom', newItemCat]
    });

    setNewItemName('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            PERSONAL WARDROBE CAPSULE
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-100 uppercase">
            Your Clothing Vault & Outfits
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            {wardrobeItems.length} active pieces in your digital wardrobe vault
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-amber-500 text-stone-950 font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 shadow-xl flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Piece To Wardrobe</span>
        </button>
      </div>

      {/* Grid: Personal Wardrobe Vault */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wardrobeItems.map(item => (
          <div key={item.id} className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden space-y-3 p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <img src={item.image} alt={item.name} className="w-full h-44 object-cover rounded-xl border border-stone-800" />
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">{item.category}</span>
                <h3 className="text-sm font-semibold text-stone-100">{item.name}</h3>
                <p className="text-xs text-stone-400 mt-0.5">Color: {item.color}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Owned</span>
              </span>
              <button
                onClick={() => removeWardrobeItem(item.id)}
                className="p-1.5 text-stone-500 hover:text-red-400 transition-colors"
                title="Remove from Wardrobe"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* WORKS WITH YOUR WARDROBE Recommendations Section */}
      <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>WARDROBE PAIRING ENGINE</span>
          </div>
          <h2 className="font-serif-heading text-2xl font-bold text-stone-100">
            Recommended Atelier Pieces That Work With Your Owned Clothes
          </h2>
          <p className="text-xs text-stone-400">
            These catalog items pair seamlessly with pieces already in your wardrobe vault.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map(prod => {
            const pairedWardrobe = wardrobeItems[0];
            return (
              <div key={prod.id} className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-3">
                <img src={prod.images[0]} alt={prod.name} className="w-full h-44 object-cover rounded-xl" />
                <div>
                  <p className="text-xs font-bold text-stone-100">{prod.name}</p>
                  <p className="text-xs font-semibold text-amber-400 mt-0.5">₹{prod.basePrice.toLocaleString('en-IN')}</p>
                  <div className="mt-2 bg-stone-900 border border-stone-800 p-2.5 rounded-lg text-[11px] text-stone-300">
                    <span className="font-bold text-amber-400">Combo Look:</span> {prod.name} + Your owned {pairedWardrobe?.name}
                  </div>
                </div>

                <button
                  onClick={() => prod.variants.length > 0 && addToCart(prod, prod.variants[0].id, 1)}
                  className="w-full bg-amber-500 text-stone-950 font-bold py-2.5 rounded-xl text-xs uppercase"
                >
                  Buy Compatible Piece
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Add Wardrobe Piece */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 max-w-md w-full rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-100 font-serif-heading">Add Clothing Piece to Digital Vault</h3>

            <form onSubmit={handleCreateCustom} className="space-y-4 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">Item Description / Name</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  placeholder="e.g. Vintage Tweed Blazer"
                  className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Category</label>
                <select
                  value={newItemCat}
                  onChange={e => setNewItemCat(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                >
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Trousers">Trousers</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Outerwear">Outerwear</option>
                  <option value="Footwear">Footwear</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setIsAddOpen(false)} className="flex-1 bg-stone-800 text-stone-300 py-2.5 rounded-xl font-bold uppercase">Cancel</button>
                <button type="submit" className="flex-1 bg-amber-500 text-stone-950 py-2.5 rounded-xl font-bold uppercase">Save to Vault</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
