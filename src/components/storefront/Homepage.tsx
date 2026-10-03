import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  Flame,
  ShoppingBag,
  Eye,
  Heart,
  Camera,
  Quote,
  Compass,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';
import { OccasionType } from '../../types';

export const Homepage: React.FC = () => {
  const {
    products,
    setActivePage,
    setSelectedProductId,
    setSelectedCategory,
    addToCart,
    toggleWishlist,
    wishlistProductIds,
    generateShoppingBrief,
    setIsStyleDnaModalOpen,
    getRecommendationRationale,
    lookbooks
  } = useStore();

  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });
  const [activeMoodHover, setActiveMoodHover] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const newInProducts = products.filter(p => p.isNewArrival || p.isTrending).slice(0, 6);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const moodTiles = [
    { title: 'AFTER DARK', occasion: 'Party' as OccasionType, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', subtitle: 'Silk slips & midnight tailoring' },
    { title: 'THE MINIMAL EDIT', occasion: 'Office' as OccasionType, img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800', subtitle: 'Monochrome boxy cuts & trench coats' },
    { title: 'STREET SILHOUETTE', occasion: 'Casual' as OccasionType, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', subtitle: '280 GSM heavyweight tees & selvedge denim' },
    { title: 'RESORT & WEEKEND', occasion: 'Vacation' as OccasionType, img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800', subtitle: 'Normandy flax linen & relaxed trousers' }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO CAMPAIGN BANNER (FULL-BLEED EDITORIAL PHOTOGRAPHY) */}
      <section className="relative min-h-[90vh] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
            alt="Autumn Winter Campaign"
            className="w-full h-full object-cover object-center brightness-60 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6 animate-fade-in w-full">
          <div className="inline-flex items-center space-x-2 bg-stone-900/80 border border-amber-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-300">
              NEW DROP — AUTUMN / WINTER 2026
            </span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-stone-100 leading-none uppercase max-w-4xl">
            CONTEMPORARY URBAN ELEGANCE
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-xl font-light leading-relaxed">
            Crafted for the modern individual. Heavyweight organic jerseys, Normandy flax linens, and bespoke Italian tailoring.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setActivePage('catalog');
                setSelectedCategory('Men');
              }}
              className="bg-amber-500 text-stone-950 font-bold px-8 py-4 rounded-full hover:bg-amber-400 transition-all shadow-xl text-xs uppercase tracking-[0.18em] flex items-center space-x-2"
            >
              <span>SHOP MEN</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActivePage('catalog');
                setSelectedCategory('Women');
              }}
              className="bg-stone-900/90 hover:bg-stone-800 text-stone-100 border border-stone-700 px-8 py-4 rounded-full backdrop-blur-md transition-all text-xs uppercase tracking-[0.18em] font-semibold"
            >
              SHOP WOMEN
            </button>
          </div>
        </div>
      </section>

      {/* 2. NEW IN (HORIZONTAL IMAGE-FIRST PRODUCT RAIL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-stone-800/80 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              FRESH OFF THE LOOM
            </span>
            <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase tracking-wider">
              NEW IN
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('catalog');
              setSelectedCategory('New Arrivals');
            }}
            className="text-xs font-bold text-stone-400 hover:text-amber-400 transition-colors uppercase tracking-wider flex items-center space-x-1"
          >
            <span>VIEW ALL NEW DROP ({newInProducts.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Horizontal Rail */}
        <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-4">
          {newInProducts.map(prod => (
            <div
              key={prod.id}
              className="group w-64 sm:w-72 shrink-0 space-y-3 cursor-pointer"
              onClick={() => {
                setSelectedProductId(prod.id);
                setActivePage('pdp');
              }}
            >
              {/* Product Image Focus */}
              <div className="relative aspect-[3/4] bg-stone-900 rounded-2xl overflow-hidden img-hover-zoom border border-stone-800/80">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                />
                {prod.images[1] && (
                  <img
                    src={prod.images[1]}
                    alt={`${prod.name} alternate`}
                    className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                )}

                {prod.discountPercentage && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    -{prod.discountPercentage}%
                  </span>
                )}

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

              {/* Product Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span>{prod.category} • {prod.fit}</span>
                  <span className="flex items-center text-amber-400 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 mr-1" /> {prod.rating}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-stone-100 group-hover:text-amber-400 transition-colors truncate">
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
          ))}
        </div>
      </section>

      {/* 3. SHOP BY MOOD / COLLECTION TILES (EDGE-TO-EDGE MERCHANDISING) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">CURATED EDITORIAL MOODS</span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-100 uppercase">
            Shop By Mood & Collection
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moodTiles.map(m => (
            <div
              key={m.title}
              onClick={() => generateShoppingBrief(m.occasion, 8000, m.title)}
              className="group relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500/60 transition-all duration-500 shadow-2xl"
            >
              <img
                src={m.img}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-60 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-100 uppercase tracking-wider">{m.title}</h3>
                  <p className="text-xs text-stone-300 font-light mt-0.5">{m.subtitle}</p>
                </div>
                <button className="bg-amber-500 text-stone-950 p-3 rounded-full font-bold group-hover:scale-110 transition-transform shadow-lg">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CAMPAIGN STORY (SPLIT EDITORIAL LAYOUT — IMAGE | TEXT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center shadow-2xl">
          <div className="relative aspect-[4/5] lg:aspect-auto h-full">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200"
              alt="Weekend Campaign Story"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 sm:p-14 space-y-6">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">CAMPAIGN STORY</span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-stone-100 uppercase leading-none">
              THE WEEKEND EDIT
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Relaxed silhouettes. Easy layers. Unstructured boxy shoulders crafted for plans that don't need planning. Discover breathable Normandy linens paired with 280 GSM combed jerseys.
            </p>

            <div className="pt-2">
              <button
                onClick={() => generateShoppingBrief('Weekend' as OccasionType, 6000, 'Weekend Relaxed')}
                className="bg-amber-500 text-stone-950 font-bold px-8 py-3.5 rounded-full uppercase tracking-[0.18em] text-xs hover:bg-amber-400 transition-colors shadow-lg flex items-center space-x-2"
              >
                <span>SHOP THE WEEKEND EDIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOP THE LOOK (OUTFIT MERCHANDISING WITH HOTSPOTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-800/80 pb-4 gap-2">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">STYLED ENSEMBLES</span>
            <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase">SHOP THE LOOK</h2>
          </div>
          <p className="text-xs text-stone-400">Complete styled looks with individual items and 1-click bundle add.</p>
        </div>

        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-2xl">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-stone-800">
            <img src={lookbooks[0].image} alt={lookbooks[0].title} className="w-full h-full object-cover" />
            {lookbooks[0].hotspots.map((hs) => (
              <button
                key={hs.id}
                onClick={() => {
                  setSelectedProductId(hs.productId);
                  setActivePage('pdp');
                }}
                style={{ top: `${hs.yPercent}%`, left: `${hs.xPercent}%` }}
                className="absolute w-7 h-7 bg-amber-500 text-stone-950 font-bold rounded-full border-2 border-stone-950 flex items-center justify-center animate-pulse hover:scale-125 transition-transform shadow-lg"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">LOOK #01</span>
              <h3 className="font-serif-heading text-3xl font-bold text-stone-100">{lookbooks[0].title}</h3>
              <p className="text-xs text-stone-400 mt-2">Combined styled total: <strong className="text-amber-400 text-base">₹12,797</strong></p>
            </div>

            <div className="space-y-3">
              {lookbooks[0].hotspots.map(hs => {
                const prod = products.find(p => p.id === hs.productId);
                if (!prod) return null;
                return (
                  <div key={hs.id} className="bg-stone-950 border border-stone-800 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-10 h-12 object-cover rounded" />
                      <div>
                        <p className="font-semibold text-stone-200">{prod.name}</p>
                        <p className="font-bold text-amber-400">₹{prod.basePrice.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => prod.variants.length > 0 && addToCart(prod, prod.variants[0].id, 1)}
                      className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg font-semibold hover:bg-amber-500/20"
                    >
                      Add To Bag
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS (HORIZONTAL PRODUCT RAIL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-stone-800/80 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">ATELIER FAVORITES</span>
            <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase">BEST SELLERS</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <div
              key={prod.id}
              onClick={() => {
                setSelectedProductId(prod.id);
                setActivePage('pdp');
              }}
              className="group bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-stone-950 overflow-hidden img-hover-zoom">
                <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs font-semibold text-stone-100 group-hover:text-amber-400 truncate">{prod.name}</p>
                <p className="text-xs font-bold text-amber-400">₹{prod.basePrice.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FASHION EDITORIAL STORIES (3 WAYS TO STYLE, OFFICE TO DINNER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">STYLE EDITORIALS</span>
          <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase">FASHION JOURNAL</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: '3 WAYS TO STYLE A HEAVYWEIGHT TEE', desc: 'From weekend casual to unbuttoned tweed blazer layering.', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800' },
            { title: 'OFFICE TO AFTER-HOURS DINNER', desc: 'Transition seamlessly with Normandy flax trousers.', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800' },
            { title: 'THE GOA RESORT CAPSULE', desc: 'Lightweight linen fits & leather woven sandals.', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800' }
          ].map((story, i) => (
            <div key={i} className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3">
              <img src={story.img} alt={story.title} className="w-full h-44 object-cover rounded-xl" />
              <div>
                <h3 className="font-serif-heading text-lg font-bold text-stone-100">{story.title}</h3>
                <p className="text-xs text-stone-400 mt-1">{story.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. COMMUNITY UGC FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">@AURALUXE_OFFICIAL COMMUNITY</span>
          <h2 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase">AS SEEN ON YOU</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800'
          ].map((img, idx) => (
            <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden border border-stone-800">
              <img src={img} alt="Community post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
