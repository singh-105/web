import React, { useState } from 'react';
import {
  Filter,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Heart,
  X,
  LayoutGrid,
  Grid3X3,
  Search,
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PLP: React.FC = () => {
  const {
    filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    selectedSizes,
    toggleSizeFilter,
    selectedColors,
    toggleColorFilter,
    priceRange,
    setPriceRange,
    selectedFit,
    setSelectedFit,
    sortBy,
    setSortBy,
    clearFilters,
    searchQuery,
    setSearchQuery,
    setSelectedProductId,
    setActivePage,
    addToCart,
    toggleWishlist,
    wishlistProductIds
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = [
    { name: 'Obsidian Black', hex: '#121212' },
    { name: 'Chalk White', hex: '#f5f5f4' },
    { name: 'Desert Sand', hex: '#d7c4b7' },
    { name: 'Deep Olive', hex: '#3b4336' },
    { name: 'Emerald Green', hex: '#046307' },
    { name: 'Raw Deep Indigo', hex: '#1b2a4a' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Catalog Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            ATELIER COLLECTION
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-100 uppercase">
            {selectedCategory === 'All' ? 'All Garments' : selectedCategory}
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Showing {filteredProducts.length} pieces
          </p>
        </div>

        {/* Top Controls: Search badge, Grid View & Sort */}
        <div className="flex items-center space-x-3 flex-wrap">
          {searchQuery && (
            <div className="flex items-center space-x-1.5 bg-stone-900 border border-amber-500/40 text-amber-300 text-xs px-3 py-1.5 rounded-full">
              <span>Search: "{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Desktop Grid Layout Switcher */}
          <div className="hidden lg:flex items-center bg-stone-900 border border-stone-800 rounded-lg p-1">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded ${gridCols === 3 ? 'bg-stone-800 text-amber-400' : 'text-stone-400'}`}
              title="3 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded ${gridCols === 4 ? 'bg-stone-800 text-amber-400' : 'text-stone-400'}`}
              title="4 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-stone-900 border border-stone-800 text-stone-200 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="newest">Sort: Newest Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden p-2.5 bg-stone-900 border border-stone-800 text-stone-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5"
          >
            <Filter className="w-4 h-4 text-amber-400" />
            <span>Refine</span>
          </button>
        </div>
      </div>

      {/* Catalog Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 bg-stone-900/30 border border-stone-800/80 p-6 rounded-2xl h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-stone-100 uppercase tracking-wider">Refine Selection</span>
            </div>
            <button
              onClick={clearFilters}
              className="text-[11px] text-stone-400 hover:text-amber-400 flex items-center space-x-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">Category</label>
            <div className="flex flex-col space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-xs py-1.5 px-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 pt-4 border-t border-stone-800">
            <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">Size</label>
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map(sz => (
                <button
                  key={sz}
                  onClick={() => toggleSizeFilter(sz)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    selectedSizes.includes(sz)
                      ? 'bg-amber-500 text-stone-950 border-amber-500'
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-2 pt-4 border-t border-stone-800">
            <label className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block">Color Palette</label>
            <div className="space-y-1">
              {availableColors.map(c => (
                <button
                  key={c.name}
                  onClick={() => toggleColorFilter(c.name)}
                  className={`w-full flex items-center space-x-2 text-xs p-1.5 rounded-lg border transition-colors ${
                    selectedColors.includes(c.name)
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'border-transparent text-stone-300 hover:bg-stone-800/50'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-stone-700" style={{ backgroundColor: c.hex }}></span>
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3 pt-4 border-t border-stone-800">
            <div className="flex justify-between text-[11px] font-bold text-stone-400 uppercase tracking-widest">
              <span>Price Range</span>
              <span className="text-amber-400 font-semibold">₹{priceRange[0]} - ₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="15000"
              step="500"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-amber-500 bg-stone-900 cursor-pointer"
            />
          </div>
        </div>

        {/* Product Grid (Mobile: 2 Columns, Desktop: 4 Columns) */}
        <div className="lg:col-span-3">
          <div className={`grid grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4 sm:gap-6`}>
            {filteredProducts.map(prod => {
              const lowStockVariant = prod.variants.find(v => v.stock > 0 && v.stock <= 3);

              return (
                <div
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductId(prod.id);
                    setActivePage('pdp');
                  }}
                  className="group bg-stone-900 border border-stone-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Image with Alternate Image Hover Swap */}
                  <div className="relative aspect-[3/4] bg-stone-950 overflow-hidden img-hover-zoom">
                    <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                    {prod.images[1] && (
                      <img
                        src={prod.images[1]}
                        alt={`${prod.name} alternate`}
                        className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}

                    {lowStockVariant ? (
                      <span className="absolute top-3 left-3 bg-red-500/90 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase">
                        Only {lowStockVariant.stock} left in {lowStockVariant.size}
                      </span>
                    ) : prod.discountPercentage ? (
                      <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        -{prod.discountPercentage}%
                      </span>
                    ) : null}

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleWishlist(prod.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-stone-950/70 hover:bg-stone-950 text-stone-200 rounded-full backdrop-blur-md transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${wishlistProductIds.includes(prod.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span>{prod.category} • {prod.fit}</span>
                      <span className="flex items-center text-amber-400 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 mr-1" /> {prod.rating}
                      </span>
                    </div>

                    <h3 className="text-xs font-semibold text-stone-100 group-hover:text-amber-400 transition-colors truncate">
                      {prod.name}
                    </h3>

                    <div className="flex items-baseline space-x-2 pt-0.5">
                      <span className="text-sm font-bold text-amber-400">₹{prod.basePrice.toLocaleString('en-IN')}</span>
                      {prod.originalPrice && (
                        <span className="text-xs text-stone-500 line-through">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet Filters */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-end lg:hidden">
          <div className="bg-stone-900 border-t border-stone-800 w-full rounded-t-3xl p-6 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 font-serif-heading">Refine Garments</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-stone-400 block mb-2 font-bold uppercase">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg border ${selectedCategory === cat ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-950 text-stone-300 border-stone-800'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-amber-500 text-stone-950 font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
