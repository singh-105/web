import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  Product,
  CartItem,
  Order,
  Customer,
  Campaign,
  Review,
  LookBookItem,
  AuditLog,
  OrderStatus,
  CmsSectionConfig,
  ProductVariant,
  WardrobeItem,
  StyleDnaProfile,
  ShoppingBrief,
  StorePulseAlert,
  OccasionType
} from '../types';
import {
  initialProducts,
  initialReviews,
  initialCustomers,
  initialOrders,
  initialCampaigns,
  initialLookbooks,
  initialAuditLogs,
  initialWardrobeItems,
  initialStyleDna,
  initialStorePulseAlerts
} from '../services/demoData';

interface StoreContextType {
  // Navigation & View Mode
  activeMode: 'storefront' | 'owner';
  setActiveMode: (mode: 'storefront' | 'owner') => void;
  
  // Navigation Tabs: SHOP, EDIT, STYLE, WARDROBE
  activeNavTab: 'shop' | 'edit' | 'style' | 'wardrobe';
  setActiveNavTab: (tab: 'shop' | 'edit' | 'style' | 'wardrobe') => void;

  activePage: 'home' | 'catalog' | 'pdp' | 'cart' | 'checkout' | 'account' | 'situation_brief' | 'style_dna' | 'look_engine' | 'fashion_canvas';
  setActivePage: (page: 'home' | 'catalog' | 'pdp' | 'cart' | 'checkout' | 'account' | 'situation_brief' | 'style_dna' | 'look_engine' | 'fashion_canvas') => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;

  // Catalog State
  products: Product[];
  categories: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (subCat: string) => void;
  selectedSizes: string[];
  toggleSizeFilter: (size: string) => void;
  selectedColors: string[];
  toggleColorFilter: (color: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedFit: string;
  setSelectedFit: (fit: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occ: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  clearFilters: () => void;
  filteredProducts: Product[];

  // Shopping Brief (Section 8)
  shoppingBrief: ShoppingBrief | null;
  generateShoppingBrief: (occasion: OccasionType, budget: number, styleVibe?: string) => void;

  // Style DNA (Section 9)
  styleDna: StyleDnaProfile;
  updateStyleDna: (newProfile: StyleDnaProfile) => void;
  isStyleDnaModalOpen: boolean;
  setIsStyleDnaModalOpen: (open: boolean) => void;

  // Wardrobe (Section 12 & 13)
  wardrobeItems: WardrobeItem[];
  addWardrobeItem: (item: Omit<WardrobeItem, 'id'>) => void;
  removeWardrobeItem: (id: string) => void;
  checkWardrobeDuplicate: (product: Product) => WardrobeItem | null;

  // Recommendation Rationale (Section 11)
  getRecommendationRationale: (product: Product) => string[];

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, variantId: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  appliedCoupon: { code: string; discountPercent: number; flatAmount: number } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isGiftWrapped: boolean;
  setIsGiftWrapped: (wrapped: boolean) => void;
  giftNote: string;
  setGiftNote: (note: string) => void;
  wishlistProductIds: string[];
  toggleWishlist: (productId: string) => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartTotal: number;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  isTryOnOpen: boolean;
  setIsTryOnOpen: (open: boolean) => void;
  isOutfitBuilderOpen: boolean;
  setIsOutfitBuilderOpen: (open: boolean) => void;
  isVisualSearchOpen: boolean;
  setIsVisualSearchOpen: (open: boolean) => void;
  quickLookProduct: Product | null;
  setQuickLookProduct: (product: Product | null) => void;
  isFindYourAuraOpen: boolean;
  setIsFindYourAuraOpen: (open: boolean) => void;
  isAuraStyleMirrorOpen: boolean;
  setIsAuraStyleMirrorOpen: (open: boolean) => void;
  isStyleDiscoveryOpen: boolean;
  setIsStyleDiscoveryOpen: (open: boolean) => void;

  // Customer & Auth
  currentCustomer: Customer;
  orders: Order[];
  placeOrder: (
    shippingAddress: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod']
  ) => Order;
  requestReturn: (orderId: string, itemVariantId: string, reason: string, isExchange: boolean, replacementSize?: string) => void;

  // Reviews & Alerts
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;

  // Owner Platform State & Actions (Store Pulse)
  storePulseAlerts: StorePulseAlert[];
  resolvePulseAlert: (alertId: string) => void;
  updateProductStock: (productId: string, variantId: string, newStock: number) => void;
  updateProductPrice: (productId: string, newPrice: number, newOriginalPrice?: number) => void;
  addNewProduct: (newProd: Product) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  campaigns: Campaign[];
  launchCampaign: (campaignId: string) => void;
  createNewCampaign: (camp: Omit<Campaign, 'id' | 'sentCount' | 'convertedCount' | 'revenueGenerated'>) => Campaign;
  auditLogs: AuditLog[];
  addAuditLog: (user: string, action: string, details: string) => void;
  cmsSections: CmsSectionConfig[];
  toggleCmsSection: (id: string) => void;
  lookbooks: LookBookItem[];
  customers: Customer[];

  // Toast System
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // View Modes & Navigation Tabs
  const [activeMode, setActiveMode] = useState<'storefront' | 'owner'>('storefront');
  const [activeNavTab, setActiveNavTab] = useState<'shop' | 'edit' | 'style' | 'wardrobe'>('shop');
  const [activePage, setActivePage] = useState<'home' | 'catalog' | 'pdp' | 'cart' | 'checkout' | 'account' | 'situation_brief' | 'style_dna' | 'look_engine' | 'fashion_canvas'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('prod-1');

  // Catalog Data
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [selectedFit, setSelectedFit] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');

  // Personal Wardrobe State (Section 12 & 13)
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>(initialWardrobeItems);

  // Style DNA Profile State (Section 9)
  const [styleDna, setStyleDna] = useState<StyleDnaProfile>(initialStyleDna);
  const [isStyleDnaModalOpen, setIsStyleDnaModalOpen] = useState(false);

  // Shopping Brief State (Section 8)
  const [shoppingBrief, setShoppingBrief] = useState<ShoppingBrief | null>(null);

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-item-1',
      productId: 'prod-1',
      product: initialProducts[0],
      variantId: 'v1-black-m',
      selectedColor: 'Obsidian Black',
      selectedSize: 'M',
      quantity: 1,
      unitPrice: 1499
    }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; flatAmount: number } | null>(null);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>(['prod-3', 'prod-6']);

  // UI Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isOutfitBuilderOpen, setIsOutfitBuilderOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [quickLookProduct, setQuickLookProduct] = useState<Product | null>(null);
  const [isFindYourAuraOpen, setIsFindYourAuraOpen] = useState(false);
  const [isAuraStyleMirrorOpen, setIsAuraStyleMirrorOpen] = useState(false);
  const [isStyleDiscoveryOpen, setIsStyleDiscoveryOpen] = useState(false);

  // Customer & Store Telemetry
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>(initialCustomers[0]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [lookbooks] = useState<LookBookItem[]>(initialLookbooks);
  const [storePulseAlerts, setStorePulseAlerts] = useState<StorePulseAlert[]>(initialStorePulseAlerts);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // CMS Section Config
  const [cmsSections, setCmsSections] = useState<CmsSectionConfig[]>([
    { id: 'hero', title: 'Editorial Hero Banner', enabled: true, type: 'hero' },
    { id: 'situation_cards', title: 'What Are You Dressing For? (Situation Cards)', enabled: true, type: 'situation_cards' },
    { id: 'flash_sale', title: 'Flash Drop Countdown', enabled: true, type: 'flash_sale' },
    { id: 'new_arrivals', title: 'New Arrivals Carousel', enabled: true, type: 'new_arrivals' },
    { id: 'categories', title: 'Shop by Category', enabled: true, type: 'categories' },
    { id: 'shop_the_scene', title: 'Shop The Scene (Contextual Outfits)', enabled: true, type: 'shop_the_scene' },
    { id: 'instagram', title: 'Shoppable Instagram Feed', enabled: true, type: 'instagram' },
    { id: 'testimonials', title: 'Editorial Endorsements', enabled: true, type: 'testimonials' },
  ]);

  const toggleCmsSection = (id: string) => {
    setCmsSections(prev =>
      prev.map(sec => (sec.id === id ? { ...sec, enabled: !sec.enabled } : sec))
    );
    showToast('Homepage layout section visibility updated');
  };

  const categories = useMemo(() => ['All', 'Men', 'Women', 'Kids', 'Accessories'], []);

  const toggleSizeFilter = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColorFilter = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSubCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 15000]);
    setSelectedFit('All');
    setSelectedOccasion('All');
    setSortBy('recommended');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags) return false;
      }

      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedSubCategory !== 'All' && p.subCategory !== selectedSubCategory) return false;

      if (selectedFit !== 'All' && p.fit !== selectedFit) return false;
      if (selectedOccasion !== 'All' && !p.occasion.includes(selectedOccasion as any)) return false;

      if (p.basePrice < priceRange[0] || p.basePrice > priceRange[1]) return false;

      if (selectedSizes.length > 0) {
        const hasSize = p.variants.some(v => selectedSizes.includes(v.size) && v.stock > 0);
        if (!hasSize) return false;
      }

      if (selectedColors.length > 0) {
        const hasColor = p.variants.some(v => selectedColors.includes(v.colorName));
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'price-low') return a.basePrice - b.basePrice;
      if (sortBy === 'price-high') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popularity') return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    selectedSizes,
    selectedColors,
    priceRange,
    selectedFit,
    selectedOccasion,
    sortBy
  ]);

  // Shopping Brief Generator (Section 8)
  const generateShoppingBrief = (occasion: OccasionType, budget: number, styleVibe = 'Subtle Elegance') => {
    const matchingOccasionProds = products.filter(p => p.occasion.includes(occasion));
    const mainProd = matchingOccasionProds[0] || products[0];
    const secondProd = matchingOccasionProds[1] || products[1];

    const totalPrice = mainProd.basePrice + secondProd.basePrice;
    const discountedTotal = Math.min(budget, Math.round(totalPrice * 0.85));

    const brief: ShoppingBrief = {
      occasion,
      budgetLimit: budget,
      styleVibe,
      preference: 'Subtle & Refined',
      generatedLooks: [
        {
          id: `brief-look-${Date.now()}`,
          title: `${occasion} Atelier Ensemble`,
          description: `Curated combination of ${mainProd.name} paired with ${secondProd.name} tailored for ${occasion}.`,
          items: [mainProd, secondProd],
          totalPrice,
          discountedTotal,
          reasoning: [
            `Formulated for ${occasion} aesthetic guidelines`,
            `Maintains total budget within ₹${budget.toLocaleString('en-IN')}`,
            `Matches your preferred ${styleDna.preferredFit} silhouette`
          ]
        }
      ]
    };

    setShoppingBrief(brief);
    setActivePage('situation_brief');
    showToast(`Generated custom Shopping Brief for ${occasion}`);
  };

  // Wardrobe Operations (Section 12 & 13)
  const addWardrobeItem = (item: Omit<WardrobeItem, 'id'>) => {
    const newItem: WardrobeItem = { ...item, id: `ward-${Date.now()}` };
    setWardrobeItems(prev => [newItem, ...prev]);
    showToast(`Added ${item.name} to your personal Wardrobe!`);
  };

  const removeWardrobeItem = (id: string) => {
    setWardrobeItems(prev => prev.filter(i => i.id !== id));
    showToast('Item removed from Wardrobe.');
  };

  const checkWardrobeDuplicate = (product: Product): WardrobeItem | null => {
    const duplicate = wardrobeItems.find(
      w => w.category === product.subCategory || w.color === product.variants[0]?.colorName
    );
    return duplicate || null;
  };

  // Recommendation Rationale (Section 11)
  const getRecommendationRationale = (product: Product): string[] => {
    const rationale: string[] = [];
    if (product.fit === styleDna.preferredFit) {
      rationale.push(`✓ Matches your preferred ${styleDna.preferredFit} fit`);
    }
    const matchingWardrobe = wardrobeItems.find(w => w.category === 'Trousers' || w.category === 'Footwear');
    if (matchingWardrobe) {
      rationale.push(`✓ Coordinates seamlessly with your owned ${matchingWardrobe.name}`);
    }
    rationale.push(`✓ Ideal for ${product.occasion[0] || 'Casual'} & ${product.occasion[1] || 'Office'} occasions`);
    return rationale;
  };

  const updateStyleDna = (newProfile: StyleDnaProfile) => {
    setStyleDna(newProfile);
    setCurrentCustomer(prev => ({ ...prev, styleDna: newProfile }));
    showToast('Your Style DNA profile updated!');
  };

  // Cart Operations
  const addToCart = (product: Product, variantId: string, quantity = 1) => {
    const variant = product.variants.find(v => v.id === variantId);
    if (!variant) return;

    if (variant.stock <= 0) {
      showToast(`Selected variant is currently out of stock.`);
      return;
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.variantId === variantId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, variant.stock)
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            productId: product.id,
            product,
            variantId: variant.id,
            selectedColor: variant.colorName,
            selectedSize: variant.size,
            quantity: Math.min(quantity, variant.stock),
            unitPrice: variant.price
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${variant.size}) to cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const variant = item.product.variants.find(v => v.id === item.variantId);
            const maxStock = variant ? variant.stock : 99;
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: Math.min(newQty, maxStock) };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const c = code.trim().toUpperCase();
    if (c === 'AURA10' || c === 'FIRST10') {
      setAppliedCoupon({ code: c, discountPercent: 10, flatAmount: 0 });
      showToast('Coupon AURA10 applied! 10% discount added.');
      return { success: true, message: '10% discount applied!' };
    } else if (c === 'VIP20' || c === 'VIPAURA20') {
      setAppliedCoupon({ code: c, discountPercent: 20, flatAmount: 0 });
      showToast('VIP Coupon applied! 20% discount added.');
      return { success: true, message: '20% VIP discount applied!' };
    } else if (c === 'RECOVER300') {
      setAppliedCoupon({ code: c, discountPercent: 0, flatAmount: 300 });
      showToast('Special ₹300 discount applied!');
      return { success: true, message: '₹300 flat discount applied!' };
    } else {
      return { success: false, message: 'Invalid or expired promo code.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  const toggleWishlist = (productId: string) => {
    setWishlistProductIds(prev => {
      const isSaved = prev.includes(productId);
      const updated = isSaved ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(isSaved ? 'Removed from Wishlist' : 'Saved to Wishlist');
      return updated;
    });
  };

  // Cart Financials
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.flatAmount > 0) return Math.min(appliedCoupon.flatAmount, cartSubtotal);
    return Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
  }, [cartSubtotal, appliedCoupon]);

  const cartTax = useMemo(() => {
    return Math.round((cartSubtotal - cartDiscount) * 0.05);
  }, [cartSubtotal, cartDiscount]);

  const cartTotal = useMemo(() => {
    const giftFee = isGiftWrapped ? 150 : 0;
    return Math.max(0, cartSubtotal - cartDiscount + cartTax + giftFee);
  }, [cartSubtotal, cartDiscount, cartTax, isGiftWrapped]);

  // Place Order Action
  const placeOrder = (
    shippingAddress: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod']
  ): Order => {
    const orderNum = `AL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerId: currentCustomer.id,
      customerName: currentCustomer.name,
      customerEmail: currentCustomer.email,
      customerPhone: currentCustomer.phone,
      shippingAddress,
      items: cart.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images[0],
        variantId: item.variantId,
        color: item.selectedColor,
        size: item.selectedSize,
        quantity: item.quantity,
        price: item.unitPrice
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      tax: cartTax,
      shippingFee: 0,
      totalAmount: cartTotal,
      paymentMethod,
      paymentStatus: 'Paid',
      orderStatus: 'Processing',
      trackingNumber: `DEL-IND-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDeliveryDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      timeline: [
        {
          status: 'Processing',
          timestamp: new Date().toLocaleString(),
          description: 'Order confirmed and inventory reserved from central warehouse.'
        }
      ],
      createdAt: new Date().toLocaleString(),
      waysToWear: [
        {
          title: 'Monochrome Minimalist',
          desc: 'Pair your new purchase with your owned Tailored Black Pleated Chinos.',
          image: cart[0]?.product.images[0] || ''
        }
      ]
    };

    // Automatically add purchased items to customer's personal Wardrobe!
    cart.forEach(item => {
      addWardrobeItem({
        name: item.product.name,
        category: item.product.subCategory,
        color: item.selectedColor,
        colorHex: '#121212',
        image: item.product.images[0],
        isOwnedByCustomer: true,
        purchaseDate: new Date().toISOString().split('T')[0],
        tags: [item.product.category, item.product.fit]
      });
    });

    // 1. Deduct Stock from Variants
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const cartItemsForProduct = cart.filter(ci => ci.productId === p.id);
        if (cartItemsForProduct.length === 0) return p;

        const updatedVariants = p.variants.map(v => {
          const matchedCartItem = cartItemsForProduct.find(ci => ci.variantId === v.id);
          if (matchedCartItem) {
            const newStock = Math.max(0, v.stock - matchedCartItem.quantity);
            if (newStock <= 3 && newStock > 0) {
              addAuditLog('Inventory Service', 'Low Stock Warning', `${p.name} (${v.colorName} / ${v.size}) is down to ${newStock} units.`);
            }
            return { ...v, stock: newStock };
          }
          return v;
        });

        return { ...p, variants: updatedVariants };
      })
    );

    // 2. Add Order to List
    setOrders(prev => [newOrder, ...prev]);

    // 3. Update Customer Spending & Loyalty Points
    const earnedPoints = Math.round(cartTotal / 20);
    setCustomers(prev =>
      prev.map(c => {
        if (c.id === currentCustomer.id) {
          const newSpent = c.totalSpent + cartTotal;
          const newPoints = c.loyaltyPoints + earnedPoints;
          let tier: Customer['loyaltyTier'] = 'Silver';
          if (newSpent >= 30000) tier = 'Platinum';
          else if (newSpent >= 15000) tier = 'Gold';

          return {
            ...c,
            totalSpent: newSpent,
            ordersCount: c.ordersCount + 1,
            loyaltyPoints: newPoints,
            loyaltyTier: tier
          };
        }
        return c;
      })
    );

    setCurrentCustomer(prev => ({
      ...prev,
      totalSpent: prev.totalSpent + cartTotal,
      ordersCount: prev.ordersCount + 1,
      loyaltyPoints: prev.loyaltyPoints + earnedPoints
    }));

    addAuditLog(
      currentCustomer.name,
      'Order Placed',
      `New order ${orderNum} placed for ₹${cartTotal.toLocaleString('en-IN')} via ${paymentMethod}`
    );

    clearCart();
    return newOrder;
  };

  const requestReturn = (
    orderId: string,
    itemVariantId: string,
    reason: string,
    isExchange: boolean,
    replacementSize?: string
  ) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updatedTimeline = [
            ...ord.timeline,
            {
              status: 'Returned' as OrderStatus,
              timestamp: new Date().toLocaleString(),
              description: `Return/Exchange requested for item (${itemVariantId}). Reason: ${reason}.${
                isExchange ? ` Requested exchange size: ${replacementSize}` : ' Refund to original payment method requested.'
              }`
            }
          ];
          return { ...ord, orderStatus: 'Returned', timeline: updatedTimeline };
        }
        return ord;
      })
    );
    showToast(`Return request submitted for Order.`);
    addAuditLog('Customer Care', 'Return Request', `Return requested for order ${orderId}. Reason: ${reason}`);
  };

  const resolvePulseAlert = (alertId: string) => {
    setStorePulseAlerts(prev => prev.filter(a => a.id !== alertId));
    showToast('Store Pulse alert resolved and logged.');
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0
    };
    setReviews(prev => [newRev, ...prev]);

    setProducts(prev =>
      prev.map(p => {
        if (p.id === reviewData.productId) {
          const prodRevs = [...reviews.filter(r => r.productId === p.id), newRev];
          const avg = prodRevs.reduce((acc, r) => acc + r.rating, 0) / prodRevs.length;
          return {
            ...p,
            rating: parseFloat(avg.toFixed(1)),
            reviewCount: prodRevs.length
          };
        }
        return p;
      })
    );
    showToast('Thank you! Your verified review has been published.');
  };

  // Owner Management Functions
  const updateProductStock = (productId: string, variantId: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updatedVariants = p.variants.map(v =>
            v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v
          );
          return { ...p, variants: updatedVariants };
        }
        return p;
      })
    );
    showToast('Inventory stock updated.');
    addAuditLog('Admin', 'Stock Adjustment', `Product ${productId} variant ${variantId} stock updated to ${newStock}`);
  };

  const updateProductPrice = (productId: string, newPrice: number, newOriginalPrice?: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const disc = newOriginalPrice && newOriginalPrice > newPrice
            ? Math.round(((newOriginalPrice - newPrice) / newOriginalPrice) * 100)
            : p.discountPercentage;

          const updatedVariants = p.variants.map(v => ({
            ...v,
            price: newPrice,
            originalPrice: newOriginalPrice || v.originalPrice
          }));

          return {
            ...p,
            basePrice: newPrice,
            originalPrice: newOriginalPrice || p.originalPrice,
            discountPercentage: disc,
            variants: updatedVariants
          };
        }
        return p;
      })
    );
    showToast('Product pricing updated.');
    addAuditLog('Admin', 'Price Revision', `Product ${productId} base price set to ₹${newPrice}`);
  };

  const addNewProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`New product "${newProd.name}" added to catalog.`);
    addAuditLog('Admin', 'Product Created', `Added new product ${newProd.name} under ${newProd.category}`);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updatedTimeline = [
            ...ord.timeline,
            {
              status,
              timestamp: new Date().toLocaleString(),
              description: `Order status manually updated to ${status} by Store Manager.`
            }
          ];
          return { ...ord, orderStatus: status, timeline: updatedTimeline };
        }
        return ord;
      })
    );
    showToast(`Order status changed to ${status}`);
    addAuditLog('Store Manager', 'Order Status Update', `Order ${orderId} updated to ${status}`);
  };

  const createNewCampaign = (
    campData: Omit<Campaign, 'id' | 'sentCount' | 'convertedCount' | 'revenueGenerated'>
  ): Campaign => {
    const newCamp: Campaign = {
      ...campData,
      id: `camp-${Date.now()}`,
      sentCount: 0,
      convertedCount: 0,
      revenueGenerated: 0
    };
    setCampaigns(prev => [newCamp, ...prev]);
    showToast(`Campaign "${newCamp.name}" saved as ${newCamp.status}`);
    addAuditLog('Marketing Director', 'Campaign Created', `Created campaign "${newCamp.name}" targeting ${newCamp.audienceSegment}`);
    return newCamp;
  };

  const launchCampaign = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id === campaignId) {
          const estimatedAudience = c.audienceSegment === 'VIP' ? 140 : c.audienceSegment === 'Cart Abandoner' ? 85 : 320;
          showToast(`Campaign launched! Messages dispatched to ${estimatedAudience} recipients via ${c.channel}.`);
          return {
            ...c,
            status: 'Active',
            sentCount: estimatedAudience
          };
        }
        return c;
      })
    );
    addAuditLog('Marketing Director', 'Campaign Dispatched', `Campaign ${campaignId} broadcasted to audience.`);
  };

  const addAuditLog = (user: string, action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user,
      action,
      details,
      timestamp: new Date().toLocaleString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const value = {
    activeMode,
    setActiveMode,
    activeNavTab,
    setActiveNavTab,
    activePage,
    setActivePage,
    selectedProductId,
    setSelectedProductId,
    products,
    categories,
    searchQuery,
    setSearchQuery,
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
    selectedOccasion,
    setSelectedOccasion,
    sortBy,
    setSortBy,
    clearFilters,
    filteredProducts,
    shoppingBrief,
    generateShoppingBrief,
    styleDna,
    updateStyleDna,
    isStyleDnaModalOpen,
    setIsStyleDnaModalOpen,
    wardrobeItems,
    addWardrobeItem,
    removeWardrobeItem,
    checkWardrobeDuplicate,
    getRecommendationRationale,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isGiftWrapped,
    setIsGiftWrapped,
    giftNote,
    setGiftNote,
    wishlistProductIds,
    toggleWishlist,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartTotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    isAiAssistantOpen,
    setIsAiAssistantOpen,
    isTryOnOpen,
    setIsTryOnOpen,
    isOutfitBuilderOpen,
    setIsOutfitBuilderOpen,
    isVisualSearchOpen,
    setIsVisualSearchOpen,
    quickLookProduct,
    setQuickLookProduct,
    isFindYourAuraOpen,
    setIsFindYourAuraOpen,
    isAuraStyleMirrorOpen,
    setIsAuraStyleMirrorOpen,
    isStyleDiscoveryOpen,
    setIsStyleDiscoveryOpen,
    currentCustomer,
    orders,
    placeOrder,
    requestReturn,
    reviews,
    addReview,
    storePulseAlerts,
    resolvePulseAlert,
    updateProductStock,
    updateProductPrice,
    addNewProduct,
    updateOrderStatus,
    campaigns,
    launchCampaign,
    createNewCampaign,
    auditLogs,
    addAuditLog,
    cmsSections,
    toggleCmsSection,
    lookbooks,
    customers,
    toastMessage,
    showToast
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
