import React, { useState } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Sparkles,
  Camera,
  Check,
  Search,
  Copy,
  Scissors,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

export const ProductManager: React.FC = () => {
  const { products, updateProductStock, updateProductPrice, addNewProduct, showToast } = useStore();

  const [searchFilter, setSearchFilter] = useState('');
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);

  // AI Content Generator State
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const [inputProductName, setInputProductName] = useState('Velvet Tuxedo Blazer');
  const [inputCategory, setInputCategory] = useState('Men');
  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    description: string;
    seoTitle: string;
    seoDescription: string;
    instagramCaption: string;
    whatsappCopy: string;
  } | null>(null);

  // Image Tool State
  const [isImageToolOpen, setIsImageToolOpen] = useState(false);
  const [imageToolStep, setImageToolStep] = useState<'original' | 'bg_removed' | 'studio_bg'>('original');

  const filteredProds = products.filter(p =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleGenerateAiContent = () => {
    setGeneratedContent(null);
    showToast('AI generating product description, SEO meta tags & social copy...');
    setTimeout(() => {
      setGeneratedContent({
        title: `Bespoke ${inputProductName} in Italian Velvet`,
        description: `Handcrafted from 100% Italian silk velvet. Designed with satin peak lapels, silk lining, and natural shoulder drape for red-carpet distinction.`,
        seoTitle: `${inputProductName} | Luxury ${inputCategory} Apparel | AURA LUXE`,
        seoDescription: `Shop the handcrafted ${inputProductName}. Organic sustainable fabrics with complimentary express shipping.`,
        instagramCaption: `Redefining evening elegance. The all-new ${inputProductName} has arrived at AURA LUXE Atelier. ✨ #AuraLuxe #HauteCouture`,
        whatsappCopy: `Hi there! Elevate your wardrobe with the new ${inputProductName}. Tap to explore exclusive early drops: auraluxe.com/pdp`
      });
    }, 800);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-serif-heading text-3xl font-bold text-stone-100">Products & Inventory Control</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsImageToolOpen(true)}
            className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Image Studio (BG Eraser)</span>
          </button>

          <button
            onClick={() => setIsAiGeneratorOpen(true)}
            className="bg-amber-500 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 hover:bg-amber-400 shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Copy Generator</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-500" />
        <input
          type="text"
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
          placeholder="Filter products by name or category..."
          className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-xs pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Product List Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-stone-400 text-[11px] font-bold uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Base Price</th>
                <th className="p-4">Total Stock</th>
                <th className="p-4">Variant Inventory Breakdown</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {filteredProds.map(prod => {
                const totalStock = prod.variants.reduce((sum, v) => sum + v.stock, 0);

                return (
                  <tr key={prod.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-10 h-12 object-cover rounded" />
                      <div>
                        <p className="font-semibold text-stone-100">{prod.name}</p>
                        <p className="text-[10px] text-stone-500">{prod.brand} • {prod.fit}</p>
                      </div>
                    </td>

                    <td className="p-4">{prod.category} ({prod.subCategory})</td>

                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-amber-400">₹{prod.basePrice.toLocaleString('en-IN')}</span>
                        <button
                          onClick={() => {
                            const newP = prompt(`Update base price for ${prod.name}:`, String(prod.basePrice));
                            if (newP && !isNaN(Number(newP))) {
                              updateProductPrice(prod.id, Number(newP));
                            }
                          }}
                          className="text-stone-500 hover:text-amber-400 p-1"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                        totalStock <= 5 ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {totalStock} units
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.variants.map(v => (
                          <button
                            key={v.id}
                            onClick={() => {
                              const ns = prompt(`Update stock for ${prod.name} (${v.colorName} / ${v.size}):`, String(v.stock));
                              if (ns !== null && !isNaN(Number(ns))) {
                                updateProductStock(prod.id, v.id, Number(ns));
                              }
                            }}
                            className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                              v.stock <= 3 ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-amber-500'
                            }`}
                          >
                            {v.size}: <strong>{v.stock}</strong>
                          </button>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedProductForEdit(prod)}
                        className="text-amber-400 font-semibold hover:underline"
                      >
                        Edit Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Product Content Generator Modal */}
      {isAiGeneratorOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 max-w-2xl w-full rounded-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-base font-serif-heading">AI Product Copy & SEO Generator</h3>
              </div>
              <button onClick={() => setIsAiGeneratorOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">Product Title</label>
                <input
                  type="text"
                  value={inputProductName}
                  onChange={e => setInputProductName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                />
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Target Category</label>
                <select
                  value={inputCategory}
                  onChange={e => setInputCategory(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateAiContent}
              className="w-full bg-amber-500 text-stone-950 font-bold py-3 rounded-xl uppercase tracking-wider text-xs"
            >
              Generate Optimized Product Listing & Social Copy
            </button>

            {generatedContent && (
              <div className="space-y-4 pt-2 border-t border-stone-800 text-xs animate-fade-in">
                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1">
                  <p className="font-bold text-amber-400">SEO Optimized Title</p>
                  <p className="text-stone-200">{generatedContent.seoTitle}</p>
                </div>

                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1">
                  <p className="font-bold text-amber-400">Luxury Product Description</p>
                  <p className="text-stone-300 leading-relaxed">{generatedContent.description}</p>
                </div>

                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1">
                  <p className="font-bold text-amber-400">Instagram Caption</p>
                  <p className="text-stone-300 font-mono text-[11px]">{generatedContent.instagramCaption}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Enhancement Studio Modal */}
      {isImageToolOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 max-w-lg w-full rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 font-serif-heading">Product Image Background Eraser</h3>
              <button onClick={() => setIsImageToolOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="aspect-square bg-stone-950 rounded-xl overflow-hidden border border-stone-800 relative flex items-center justify-center">
              <img
                src={products[0].images[0]}
                alt="Studio"
                className={`w-full h-full object-cover transition-all ${
                  imageToolStep === 'bg_removed' ? 'brightness-110 drop-shadow-2xl' : ''
                }`}
              />
              {imageToolStep === 'bg_removed' && (
                <span className="absolute top-3 left-3 bg-emerald-500 text-stone-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Background Erased
                </span>
              )}
            </div>

            <div className="flex space-x-2 text-xs">
              <button
                onClick={() => setImageToolStep('original')}
                className={`flex-1 py-2 rounded-lg font-semibold ${imageToolStep === 'original' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}
              >
                Original
              </button>
              <button
                onClick={() => { setImageToolStep('bg_removed'); showToast('Background removed via AI segmentation!'); }}
                className={`flex-1 py-2 rounded-lg font-semibold ${imageToolStep === 'bg_removed' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}
              >
                Erase BG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
