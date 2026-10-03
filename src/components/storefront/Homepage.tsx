import React from 'react';
import { Sparkles, ArrowRight, Star, Heart, Eye, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OccasionType } from '../../types';

export const Homepage: React.FC = () => {
  const {
    products,
    setActivePage,
    setSelectedProductId,
    setSelectedCategory,
    toggleWishlist,
    wishlistProductIds,
    setQuickLookProduct,
    generateShoppingBrief,
    setIsFindYourAuraOpen,
    setIsAuraStyleMirrorOpen,
    setIsStyleDiscoveryOpen
  } = useStore();

  const featuredProducts = products.slice(0, 4);

  const moodTiles = [
    { title: 'THE MINIMAL EDIT', occasion: 'Office' as OccasionType, img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800', subtitle: 'Monochrome boxy cuts & trench coats' },
    { title: 'STREET SILHOUETTE', occasion: 'Casual' as OccasionType, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', subtitle: '280 GSM heavyweight tees & selvedge denim' },
    { title: 'RESORT & WEEKEND', occasion: 'Vacation' as OccasionType, img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', subtitle: 'Normandy flax linen & relaxed trousers' },
    { title: 'AFTER DARK', occasion: 'Party' as OccasionType, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', subtitle: 'Silk slips & midnight tailoring' }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO CAMPAIGN (ULTRA-MINIMAL HIGH FASHION) */}
      <section className="relative h-[85vh] sm:h-[90vh] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
            alt="Autumn Winter Campaign"
            className="w-full h-full object-cover object-center brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6 w-full">
          <div className="inline-flex items-center space-x-2 bg-stone-950/70 border border-stone-800 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-300">
              AUTUMN / WINTER '26
            </span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 uppercase max-w-3xl leading-none">
            Contemporary Urban Elegance
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-lg font-light leading-relaxed">
            Crafted for the modern silhouette. Heavyweight organic cottons, Normandy flax linens, and Italian tailoring.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActivePage('catalog');
                setSelectedCategory('All');
              }}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 py-3.5 rounded-full transition-all text-xs uppercase tracking-[0.18em] flex items-center space-x-2 shadow-xl shadow-amber-500/10"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFindYourAuraOpen(true)}
              className="bg-stone-950/80 hover:bg-stone-900 text-amber-400 border border-amber-500/40 px-6 py-3.5 rounded-full backdrop-blur-md transition-all text-xs uppercase tracking-[0.18em] font-bold flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>FIND YOUR AURA</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED NEW ARRIVALS (CLEAN 4-COLUMN GRID) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-stone-800 pb-4">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              CURATED SELECTION
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-100 uppercase tracking-wider">
              NEW ARRIVALS
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('catalog');
              setSelectedCategory('New Arrivals');
            }}
            className="text-xs font-bold text-stone-400 hover:text-amber-400 transition-colors uppercase tracking-wider flex items-center space-x-1"
          >
            <span>VIEW ALL</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map(prod => (
            <div
              key={prod.id}
              onClick={() => {
                setSelectedProductId(prod.id);
                setActivePage('pdp');
              }}
              className="group bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-stone-950 overflow-hidden img-hover-zoom">
                <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
                {prod.images[1] && (
                  <img
                    src={prod.images[1]}
                    alt={prod.name}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleWishlist(prod.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-stone-950/70 text-stone-200 rounded-full backdrop-blur-md hover:text-amber-400"
                >
                  <Heart className={`w-4 h-4 ${wishlistProductIds.includes(prod.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                </button>
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setQuickLookProduct(prod);
                    }}
                    className="w-full py-2 bg-stone-950/90 text-stone-200 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-stone-800 hover:bg-amber-500 hover:text-stone-950 flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>QUICK LOOK</span>
                  </button>
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-stone-400">
                  <span>{prod.category}</span>
                  <span className="flex items-center text-amber-400 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 mr-1" /> {prod.rating}
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-stone-100 group-hover:text-amber-400 transition-colors truncate">
                  {prod.name}
                </h3>
                <p className="text-sm font-bold text-amber-400">₹{prod.basePrice.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SPLIT EDITORIAL STORY (50/50 CLEAN IMAGE & TEXT) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="relative aspect-[4/3] md:aspect-auto h-full min-h-[340px]">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200"
              alt="The Weekend Edit"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 sm:p-12 space-y-5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">CAMPAIGN STORY</span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-100 uppercase leading-none">
              THE WEEKEND EDIT
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              Relaxed silhouettes. Easy layers. Unstructured boxy shoulders crafted for plans that don't need planning. Discover Normandy flax linens paired with 280 GSM jerseys.
            </p>
            <div className="pt-2">
              <button
                onClick={() => generateShoppingBrief('Weekend' as OccasionType, 6000, 'Weekend Relaxed')}
                className="bg-amber-500 text-stone-950 font-bold px-7 py-3 rounded-full uppercase tracking-[0.18em] text-xs hover:bg-amber-400 transition-colors flex items-center space-x-2"
              >
                <span>SHOP THE EDIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOP BY MOOD (2x2 MINIMALIST TILES) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-md mx-auto space-y-1">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">AESTHETIC CATEGORIES</span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-100 uppercase">
            Shop By Mood
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {moodTiles.map(m => (
            <div
              key={m.title}
              onClick={() => generateShoppingBrief(m.occasion, 8000, m.title)}
              className="group relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500/50 transition-all duration-500"
            >
              <img
                src={m.img}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-stone-100 uppercase">{m.title}</h3>
                  <p className="text-[11px] text-stone-400 font-light mt-0.5">{m.subtitle}</p>
                </div>
                <div className="bg-amber-500 text-stone-950 p-2.5 rounded-full font-bold group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MINIMAL STYLE CONCIERGE BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">BESPOKE STYLING</span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-100 uppercase">
              Unsure What To Wear?
            </h3>
            <p className="text-xs text-stone-400 font-light max-w-md">
              Let our interactive styling tools build your personalized outfit edit in seconds.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsFindYourAuraOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-colors flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>FIND YOUR AURA</span>
            </button>

            <button
              onClick={() => setIsAuraStyleMirrorOpen(true)}
              className="bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-800 font-bold px-5 py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-colors"
            >
              Style Mirror
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
