import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Camera,
  Shirt
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';

export const Header: React.FC = () => {
  const {
    activeMode,
    setActiveMode,
    activeNavTab,
    setActiveNavTab,
    activePage,
    setActivePage,
    cart,
    wishlistProductIds,
    searchQuery,
    setSearchQuery,
    setIsCartDrawerOpen,
    setIsAiAssistantOpen,
    setIsTryOnOpen,
    setIsVisualSearchOpen,
    setIsFindYourAuraOpen,
    setIsAuraStyleMirrorOpen,
    setIsStyleDiscoveryOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setSelectedCategory,
    products
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [debouncedInput, setDebouncedInput] = useState(searchQuery);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce search typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedInput);
    }, 200);
    return () => clearTimeout(handler);
  }, [debouncedInput, setSearchQuery]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const autocompleteResults = debouncedInput.trim() === ''
    ? []
    : products.filter(p =>
        p.name.toLowerCase().includes(debouncedInput.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedInput.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(debouncedInput.toLowerCase()))
      ).slice(0, 4);

  return (
    <header className="sticky top-0 z-40 glass-header transition-all duration-300">
      {/* Top Promotional Bar */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-4 flex items-center justify-between border-b border-stone-800/80 font-sans tracking-wide">
        <div className="flex items-center space-x-3 overflow-hidden whitespace-nowrap">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span className="font-semibold uppercase tracking-wider text-stone-200">
            FREE EXPRESS SHIPPING ON ORDERS OVER ₹2,000
          </span>
          <span className="text-stone-700 hidden sm:inline">•</span>
          <span className="text-stone-400 hidden sm:inline">EASY 14-DAY DOORSTEP RETURNS</span>
          <span className="text-stone-700 hidden md:inline">•</span>
          <span className="text-amber-400 font-semibold hidden md:inline">USE CODE: AURA10 FOR 10% OFF</span>
        </div>

        {/* View Switcher for Reviewers */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center bg-stone-950 border border-stone-800 rounded-full p-0.5 text-[10px]">
            <button
              onClick={() => {
                setActiveMode('storefront');
                setActivePage('home');
              }}
              className={`px-3 py-0.5 rounded-full font-semibold transition-all ${
                activeMode === 'storefront'
                  ? 'bg-stone-100 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Storefront
            </button>
            <button
              onClick={() => setActiveMode('owner')}
              className={`px-3 py-0.5 rounded-full font-semibold transition-all flex items-center space-x-1 ${
                activeMode === 'owner'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Store Pulse Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Fashion Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 text-stone-300 hover:text-white transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Brand Logo */}
        <div className="flex items-center">
          <button
            onClick={() => {
              setActiveMode('storefront');
              setActivePage('home');
              setActiveNavTab('shop');
            }}
            className="group flex flex-col items-start text-left focus:outline-none"
          >
            <span className="font-serif-heading text-2xl sm:text-3xl tracking-[0.2em] text-stone-100 group-hover:text-amber-400 transition-colors uppercase font-medium">
              {brandConfig.brandName}
            </span>
            <span className="text-[8px] tracking-[0.35em] text-stone-400 uppercase -mt-1 font-sans">
              ATELIER & COMMERCE
            </span>
          </button>
        </div>

        {/* Primary Fashion Navigation Categories */}
        {activeMode === 'storefront' && (
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold tracking-[0.18em] uppercase">
            <button
              onClick={() => {
                setActivePage('catalog');
                setSelectedCategory('Men');
              }}
              onMouseEnter={() => setActiveMegaMenu('Men')}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="text-stone-300 hover:text-amber-400 transition-colors py-2 border-b-2 border-transparent hover:border-amber-400"
            >
              Men
            </button>

            <button
              onClick={() => {
                setActivePage('catalog');
                setSelectedCategory('Women');
              }}
              onMouseEnter={() => setActiveMegaMenu('Women')}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="text-stone-300 hover:text-amber-400 transition-colors py-2 border-b-2 border-transparent hover:border-amber-400"
            >
              Women
            </button>

            <button
              onClick={() => {
                setActivePage('catalog');
                setSelectedCategory('New Arrivals');
              }}
              className="text-stone-300 hover:text-amber-400 transition-colors py-2 border-b-2 border-transparent hover:border-amber-400"
            >
              New In
            </button>

            <button
              onClick={() => {
                setActivePage('catalog');
                setSelectedCategory('All');
              }}
              className="text-stone-300 hover:text-amber-400 transition-colors py-2 border-b-2 border-transparent hover:border-amber-400"
            >
              Collections
            </button>

            <button
              onClick={() => {
                setActivePage('catalog');
                setSelectedCategory('All');
              }}
              className="text-amber-400 hover:text-amber-300 transition-colors py-2 font-bold"
            >
              Sale
            </button>

            <div className="h-4 w-[1px] bg-stone-800"></div>

            <button
              onClick={() => setIsFindYourAuraOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors py-2 flex items-center space-x-1 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>FIND YOUR AURA</span>
            </button>

            <button
              onClick={() => setIsAuraStyleMirrorOpen(true)}
              className="text-stone-300 hover:text-amber-400 transition-colors py-2"
            >
              Style Mirror
            </button>

            <button
              onClick={() => {
                setActiveNavTab('wardrobe');
                setActivePage('account');
              }}
              className="text-stone-400 hover:text-stone-100 transition-colors py-2"
            >
              Wardrobe
            </button>
          </nav>
        )}

        {/* Right Header Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Natural Language Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-stone-300 hover:text-white transition-colors"
            aria-label="Search Catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Visual Camera Search */}
          <button
            onClick={() => setIsVisualSearchOpen(true)}
            className="hidden sm:flex p-2 text-stone-300 hover:text-amber-400 transition-colors"
            title="Visual Similarity Search"
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              setActiveMode('storefront');
              setActivePage('account');
            }}
            className="p-2 text-stone-300 hover:text-white transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistProductIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-stone-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistProductIds.length}
              </span>
            )}
          </button>

          {/* Customer Profile / Account */}
          <button
            onClick={() => {
              setActiveMode('storefront');
              setActivePage('account');
            }}
            className="p-2 text-stone-300 hover:text-white transition-colors"
            aria-label="Customer Account"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative bg-amber-500 text-stone-950 px-3.5 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-amber-400 transition-all shadow-md active:scale-95"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold">{totalCartCount}</span>
          </button>
        </div>
      </div>

      {/* Natural Language Search Overlay */}
      {isSearchOpen && (
        <div className="bg-stone-900/95 border-b border-stone-800 p-4 sm:p-6 animate-fade-in shadow-2xl relative z-50">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={debouncedInput}
                onChange={e => setDebouncedInput(e.target.value)}
                placeholder="Search catalog or describe your style: e.g. 'black oversized shirt under 2000'..."
                className="w-full bg-stone-950 text-stone-100 pl-12 pr-10 py-3.5 rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500 text-sm tracking-wide placeholder-stone-500"
              />
              {debouncedInput && (
                <button
                  onClick={() => {
                    setDebouncedInput('');
                    setSearchQuery('');
                  }}
                  className="absolute right-4 text-stone-400 hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Popular Search Tags */}
            <div className="mt-3 flex items-center space-x-2 flex-wrap">
              <span className="text-xs text-stone-500 font-medium">Trending Searches:</span>
              {[
                'Black shirt under 2000',
                'Wedding guest outfit',
                'Linen resort pants',
                'Oversized streetwear',
                'Minimal office clothes'
              ].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDebouncedInput(tag);
                    setActivePage('catalog');
                  }}
                  className="text-xs bg-stone-950 text-stone-400 hover:text-amber-400 border border-stone-800 px-3 py-1 rounded-full transition-colors my-1"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Autocomplete Results */}
            {autocompleteResults.length > 0 && (
              <div className="mt-4 bg-stone-950 border border-stone-800 rounded-xl overflow-hidden divide-y divide-stone-800 shadow-xl">
                {autocompleteResults.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setActivePage('pdp');
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="p-3 flex items-center justify-between hover:bg-stone-900 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-10 h-12 object-cover rounded" />
                      <div>
                        <div className="text-sm font-medium text-stone-200">{prod.name}</div>
                        <div className="text-xs text-stone-400">{prod.category} • {prod.subCategory}</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-amber-400">
                      ₹{prod.basePrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
