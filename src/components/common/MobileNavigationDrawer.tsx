import React, { useEffect } from 'react';
import { X, ChevronRight, Sparkles, ShieldAlert, ShoppingBag, Heart, Search } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';

export const MobileNavigationDrawer: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setSelectedCategory,
    setActivePage,
    setActiveNavTab,
    activeMode,
    setActiveMode,
    setIsFindYourAuraOpen,
    setIsAuraStyleMirrorOpen,
    setIsStyleDiscoveryOpen
  } = useStore();

  // Prevent background scrolling when mobile navigation drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-stone-950/98 backdrop-blur-2xl flex flex-col animate-fade-in lg:hidden h-screen w-screen overflow-hidden">
      {/* Top Header inside Mobile Drawer */}
      <div className="p-4 flex items-center justify-between border-b border-stone-800 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="font-serif-heading text-xl text-stone-100 uppercase tracking-widest font-bold">
            {brandConfig.brandName}
          </span>
          <span className="text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
            ATELIER
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          aria-label="Close Navigation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body Items */}
      <div className="p-6 space-y-6 overflow-y-auto flex-1 pb-12">
        {/* Signature Interactive Styling Features */}
        <div className="space-y-2.5">
          <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Signature Experiences</p>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsFindYourAuraOpen(true);
            }}
            className="w-full p-4 rounded-2xl bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-between shadow-xl shadow-amber-500/10 active:scale-[0.98] transition-transform"
          >
            <span className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 fill-stone-950" />
              <span>FIND YOUR AURA</span>
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuraStyleMirrorOpen(true);
              }}
              className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-200 font-bold text-xs text-left active:bg-stone-800 transition-colors"
            >
              Style Mirror
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsStyleDiscoveryOpen(true);
              }}
              className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-stone-200 font-bold text-xs text-left active:bg-stone-800 transition-colors"
            >
              Style Discovery
            </button>
          </div>
        </div>

        {/* Fashion Categories */}
        <div className="space-y-2 pt-2 border-t border-stone-900">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Fashion Categories</p>
          {[
            { label: 'Men Apparel', cat: 'Men' },
            { label: 'Women Dresses & Blazers', cat: 'Women' },
            { label: 'New In Drop 04', cat: 'New Arrivals' },
            { label: 'All Collections', cat: 'All' },
            { label: 'Accessories & Footwear', cat: 'Accessories' }
          ].map(item => (
            <button
              key={item.label}
              onClick={() => {
                setSelectedCategory(item.cat);
                setActivePage('catalog');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-base font-semibold text-stone-200 hover:text-amber-400 flex items-center justify-between py-3 border-b border-stone-900 active:translate-x-1 transition-transform"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-stone-600" />
            </button>
          ))}
        </div>

        {/* Digital Wardrobe & Look Engine */}
        <div className="space-y-2 pt-2 border-t border-stone-900">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Customer Account & Studio</p>

          <button
            onClick={() => {
              setActiveNavTab('style');
              setActivePage('look_engine');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left text-sm font-semibold text-stone-300 flex items-center justify-between py-2.5"
          >
            <span>Style Studio & Look Remix</span>
            <ChevronRight className="w-4 h-4 text-stone-600" />
          </button>

          <button
            onClick={() => {
              setActiveNavTab('wardrobe');
              setActivePage('account');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left text-sm font-semibold text-stone-300 flex items-center justify-between py-2.5"
          >
            <span>Personal Wardrobe Vault</span>
            <ChevronRight className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="pt-4 border-t border-stone-800 space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Store Platform Mode</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveMode('storefront');
                setActivePage('home');
                setIsMobileMenuOpen(false);
              }}
              className={`p-3.5 rounded-xl border text-xs font-bold ${
                activeMode === 'storefront' ? 'bg-stone-100 text-stone-950 border-stone-100' : 'bg-stone-900 text-stone-400 border-stone-800'
              }`}
            >
              Storefront
            </button>
            <button
              onClick={() => {
                setActiveMode('owner');
                setIsMobileMenuOpen(false);
              }}
              className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 ${
                activeMode === 'owner' ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-stone-900 text-amber-400 border-stone-800'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Store Pulse</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
