import { Product, Customer, Order, Campaign, Review, LookBookItem, AuditLog, WardrobeItem, StyleDnaProfile, StorePulseAlert } from '../types';

export const initialWardrobeItems: WardrobeItem[] = [
  {
    id: 'ward-1',
    name: 'Tailored Black Pleated Chinos',
    category: 'Trousers',
    color: 'Obsidian Black',
    colorHex: '#121212',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
    isOwnedByCustomer: true,
    purchaseDate: '2026-08-10',
    tags: ['Tailored', 'Formal', 'Versatile']
  },
  {
    id: 'ward-2',
    name: 'Clean Leather Minimalist Sneakers',
    category: 'Footwear',
    color: 'Chalk White',
    colorHex: '#f5f5f4',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    isOwnedByCustomer: true,
    purchaseDate: '2026-07-22',
    tags: ['Footwear', 'Casual', 'Essential']
  },
  {
    id: 'ward-3',
    name: 'Heavyweight Denim Overshirt',
    category: 'Outerwear',
    color: 'Raw Deep Indigo',
    colorHex: '#1b2a4a',
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=600',
    isOwnedByCustomer: true,
    purchaseDate: '2026-09-01',
    tags: ['Denim', 'Layering']
  }
];

export const initialStyleDna: StyleDnaProfile = {
  isCompleted: true,
  archetypes: {
    minimal: 68,
    street: 20,
    classic: 12,
    resort: 0
  },
  preferredFit: 'Oversized',
  primaryColors: ['Obsidian Black', 'Chalk White', 'Desert Sand'],
  priceSensitivity: 'Balanced',
  favoriteOccasions: ['Casual', 'Office', 'Date Night']
};

export const initialStorePulseAlerts: StorePulseAlert[] = [
  {
    id: 'pulse-1',
    level: 'critical',
    title: '12 Variant SKUs May Stockout',
    metric: '3.2 Days Supply',
    description: 'Monochrome Oversized Tee (Obsidian Black / M) velocity surged by +42% after Instagram feature.',
    suggestedAction: 'Issue Restock PO to Bandra Factory',
    actionType: 'restock',
    targetId: 'prod-1'
  },
  {
    id: 'pulse-2',
    level: 'warning',
    title: '₹38,400 Inventory Stagnant (>30 Days)',
    metric: 'Slow Turnover',
    description: 'XL Linen Pleated Trousers showing low view-to-cart conversion rate.',
    suggestedAction: 'Apply Recommended 15% Clearance Discount',
    actionType: 'discount',
    targetId: 'prod-2'
  },
  {
    id: 'pulse-3',
    level: 'positive',
    title: 'Silk Blend Slip Dress Trending',
    metric: '+88% Conversion',
    description: 'High engagement across Wedding & Gala shopping briefs.',
    suggestedAction: 'Promote in Weekend WhatsApp Broadcast',
    actionType: 'promote',
    targetId: 'prod-3'
  },
  {
    id: 'pulse-4',
    level: 'info',
    title: '43 Customers Inactive (60+ Days)',
    metric: 'Win-Back Target',
    description: 'High-value silver customers haven’t ordered since July.',
    suggestedAction: 'Launch Automated ₹300 Win-Back Campaign',
    actionType: 'campaign'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Monochrome Heavyweight Oversized Tee',
    slug: 'monochrome-heavyweight-oversized-tee',
    brand: 'AURA LUXE',
    category: 'Men',
    subCategory: 'T-Shirts',
    description: 'Crafted from 280 GSM combed organic cotton. Designed with dropped shoulders, structured boxy silhouette, and vintage garment-dyed finish for ultimate streetwear sophistication.',
    highlights: [
      '280 GSM Heavyweight Organic Cotton',
      'Pre-shrunk double jersey knit',
      'Relaxed boxy silhouette with rib collar',
      'Sustainable eco-dye treatment'
    ],
    careInstructions: [
      'Machine wash cold gentle cycle',
      'Do not bleach',
      'Flat dry in shade',
      'Iron inside out at low temp'
    ],
    basePrice: 1499,
    originalPrice: 2199,
    discountPercentage: 32,
    rating: 4.8,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000'
    ],
    fit: 'Oversized',
    material: 'Organic Cotton',
    occasion: ['Casual', 'Streetwear', 'Summer', 'Office', 'Date Night'],
    tags: ['Streetwear', 'Best Seller', 'Summer Essential'],
    isBestSeller: true,
    isTrending: true,
    salesVelocity: 'high',
    createdAt: '2026-09-01',
    personalityStyling: [
      { personality: 'Minimal', suggestedCombo: 'Pair with Tailored Pleated Trousers & White Sneakers.' },
      { personality: 'Office', suggestedCombo: 'Layer under a Structured Tweed Blazer with Leather Loafers.' },
      { personality: 'Street', suggestedCombo: 'Combine with Japanese Selvedge Jeans & Chelsea Boots.' },
      { personality: 'Date Night', suggestedCombo: 'Tuck into Dark Chinos with a Silver Chain Accessory.' }
    ],
    variants: [
      { id: 'v1-black-s', colorName: 'Obsidian Black', colorHex: '#121212', size: 'S', sku: 'AL-MOT-BLK-S', stock: 12, price: 1499, originalPrice: 2199 },
      { id: 'v1-black-m', colorName: 'Obsidian Black', colorHex: '#121212', size: 'M', sku: 'AL-MOT-BLK-M', stock: 3, price: 1499, originalPrice: 2199 },
      { id: 'v1-black-l', colorName: 'Obsidian Black', colorHex: '#121212', size: 'L', sku: 'AL-MOT-BLK-L', stock: 15, price: 1499, originalPrice: 2199 },
      { id: 'v1-black-xl', colorName: 'Obsidian Black', colorHex: '#121212', size: 'XL', sku: 'AL-MOT-BLK-XL', stock: 0, price: 1499, originalPrice: 2199 },
      { id: 'v1-chalk-s', colorName: 'Chalk White', colorHex: '#f5f5f4', size: 'S', sku: 'AL-MOT-WHT-S', stock: 8, price: 1499, originalPrice: 2199 },
      { id: 'v1-chalk-m', colorName: 'Chalk White', colorHex: '#f5f5f4', size: 'M', sku: 'AL-MOT-WHT-M', stock: 10, price: 1499, originalPrice: 2199 },
      { id: 'v1-chalk-l', colorName: 'Chalk White', colorHex: '#f5f5f4', size: 'L', sku: 'AL-MOT-WHT-L', stock: 5, price: 1499, originalPrice: 2199 }
    ]
  },
  {
    id: 'prod-2',
    name: 'Tailored Linen Pleated Trousers',
    slug: 'tailored-linen-pleated-trousers',
    brand: 'AURA LUXE',
    category: 'Men',
    subCategory: 'Trousers',
    description: 'Bespoke high-waisted pleated trousers cut from breathable 100% Normandy flax linen. Features side adjusters, double front pleats, and a relaxed wide-leg taper.',
    highlights: [
      '100% Pure Normandy Flax Linen',
      'Double forward pleats for drape',
      'Side waist adjusters (no belt loops required)',
      'Unhemmed length for custom tailoring'
    ],
    careInstructions: [
      'Dry clean recommended',
      'Or hand wash cold gently',
      'Hang dry away from direct heat'
    ],
    basePrice: 3299,
    originalPrice: 4499,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=1000'
    ],
    fit: 'Relaxed',
    material: 'Linen',
    occasion: ['Summer', 'Party', 'Wedding', 'Workwear', 'Vacation', 'Office'],
    tags: ['Luxury', 'Resortwear', 'Trending'],
    isNewArrival: true,
    isTrending: true,
    salesVelocity: 'high',
    createdAt: '2026-09-10',
    personalityStyling: [
      { personality: 'Minimal', suggestedCombo: 'Match with Chalk White Organic Tee & Suede Mules.' },
      { personality: 'Office', suggestedCombo: 'Pair with Button-down Oxford Shirt & Beltless Loafers.' },
      { personality: 'Street', suggestedCombo: 'Style with Heavyweight Oversized Hoodie & High Tops.' },
      { personality: 'Date Night', suggestedCombo: 'Unbuttoned Linen Shirt with Woven Leather Sandals.' }
    ],
    variants: [
      { id: 'v2-sand-s', colorName: 'Desert Sand', colorHex: '#d7c4b7', size: 'S', sku: 'AL-TLT-SND-S', stock: 6, price: 3299, originalPrice: 4499 },
      { id: 'v2-sand-m', colorName: 'Desert Sand', colorHex: '#d7c4b7', size: 'M', sku: 'AL-TLT-SND-M', stock: 2, price: 3299, originalPrice: 4499 },
      { id: 'v2-sand-l', colorName: 'Desert Sand', colorHex: '#d7c4b7', size: 'L', sku: 'AL-TLT-SND-L', stock: 9, price: 3299, originalPrice: 4499 },
      { id: 'v2-navy-m', colorName: 'Deep Olive', colorHex: '#3b4336', size: 'M', sku: 'AL-TLT-OLV-M', stock: 7, price: 3299, originalPrice: 4499 },
      { id: 'v2-navy-l', colorName: 'Deep Olive', colorHex: '#3b4336', size: 'L', sku: 'AL-TLT-OLV-L', stock: 4, price: 3299, originalPrice: 4499 }
    ]
  },
  {
    id: 'prod-3',
    name: 'Silk Blend Asymmetric Midi Slip Dress',
    slug: 'silk-blend-asymmetric-midi-slip-dress',
    brand: 'AURA LUXE',
    category: 'Women',
    subCategory: 'Dresses',
    description: 'An ethereal evening slip dress featuring a fluid bias-cut silhouette, delicate cowl neckline, and subtle asymmetric hem line crafted from mulberry silk blend.',
    highlights: [
      '70% Mulberry Silk, 30% Rayon for luster & drape',
      'Adjustable crossover back straps',
      'Bias cut contours gently to the body',
      'Concealed side zipper'
    ],
    careInstructions: [
      'Dry clean only',
      'Cool iron with press cloth'
    ],
    basePrice: 4299,
    originalPrice: 5999,
    discountPercentage: 28,
    rating: 5.0,
    reviewCount: 36,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1000'
    ],
    fit: 'Slim',
    material: 'Italian Silk',
    occasion: ['Party', 'Wedding', 'Formal', 'Date Night'],
    tags: ['Eveningwear', 'Haute Couture', 'Best Seller'],
    isBestSeller: true,
    isTrending: true,
    salesVelocity: 'high',
    createdAt: '2026-08-15',
    variants: [
      { id: 'v3-emerald-xs', colorName: 'Emerald Green', colorHex: '#046307', size: 'XS', sku: 'AL-SBD-EME-XS', stock: 5, price: 4299, originalPrice: 5999 },
      { id: 'v3-emerald-s', colorName: 'Emerald Green', colorHex: '#046307', size: 'S', sku: 'AL-SBD-EME-S', stock: 2, price: 4299, originalPrice: 5999 },
      { id: 'v3-emerald-m', colorName: 'Emerald Green', colorHex: '#046307', size: 'M', sku: 'AL-SBD-EME-M', stock: 8, price: 4299, originalPrice: 5999 },
      { id: 'v3-champagne-s', colorName: 'Champagne Gold', colorHex: '#e6c8a2', size: 'S', sku: 'AL-SBD-GOL-S', stock: 4, price: 4299, originalPrice: 5999 },
      { id: 'v3-champagne-m', colorName: 'Champagne Gold', colorHex: '#e6c8a2', size: 'M', sku: 'AL-SBD-GOL-M', stock: 6, price: 4299, originalPrice: 5999 }
    ]
  },
  {
    id: 'prod-4',
    name: 'Minimalist Italian Leather Trench Coat',
    slug: 'minimalist-italian-leather-trench-coat',
    brand: 'AURA LUXE',
    category: 'Women',
    subCategory: 'Outerwear',
    description: 'Statement outerwear in supple nappa leather. Features double-breasted button closure, storm flap, horn buttons, and detachable waist belt for versatile styling.',
    highlights: [
      '100% Full-grain Italian Nappa Leather',
      'Smooth cupro satin lining',
      'Storm flap & back vent detail',
      'Custom engraved hardware'
    ],
    careInstructions: [
      'Specialist leather clean only',
      'Store on wide padded hanger'
    ],
    basePrice: 12999,
    originalPrice: 17999,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000'
    ],
    fit: 'Tailored',
    material: 'Cashmere',
    occasion: ['Formal', 'Streetwear', 'Workwear', 'Office'],
    tags: ['Investment Piece', 'Limited Drop'],
    isLimitedDrop: true,
    salesVelocity: 'medium',
    createdAt: '2026-09-05',
    variants: [
      { id: 'v4-black-s', colorName: 'Espresso Brown', colorHex: '#362419', size: 'S', sku: 'AL-LTC-BRN-S', stock: 3, price: 12999, originalPrice: 17999 },
      { id: 'v4-black-m', colorName: 'Espresso Brown', colorHex: '#362419', size: 'M', sku: 'AL-LTC-BRN-M', stock: 1, price: 12999, originalPrice: 17999 },
      { id: 'v4-black-l', colorName: 'Espresso Brown', colorHex: '#362419', size: 'L', sku: 'AL-LTC-BRN-L', stock: 2, price: 12999, originalPrice: 17999 }
    ]
  },
  {
    id: 'prod-5',
    name: 'Raw Edge Japanese Selvedge Jeans',
    slug: 'raw-edge-japanese-selvedge-jeans',
    brand: 'AURA LUXE',
    category: 'Men',
    subCategory: 'Jeans',
    description: '14oz Kurabo Mills Japanese selvedge denim. Unwashed indigo raw finish designed to wear into personalized fades over time. Straight leg vintage fit with copper rivets.',
    highlights: [
      '14 oz 100% Cotton Kurabo Selvedge Denim',
      'Redline selvedge ID seam',
      'Custom branded brass button fly',
      'Reinforced rear pocket lining'
    ],
    careInstructions: [
      'Wear frequently before first wash',
      'Wash inside out in cold water',
      'Hang dry'
    ],
    basePrice: 3899,
    originalPrice: 4999,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=1000'
    ],
    fit: 'Regular',
    material: 'Denim',
    occasion: ['Casual', 'Streetwear', 'Weekend'],
    tags: ['Selvedge Denim', 'Heritage'],
    isTrending: true,
    salesVelocity: 'high',
    createdAt: '2026-08-20',
    variants: [
      { id: 'v5-indigo-30', colorName: 'Raw Deep Indigo', colorHex: '#1b2a4a', size: 'S', sku: 'AL-JSJ-IND-30', stock: 7, price: 3899, originalPrice: 4999 },
      { id: 'v5-indigo-32', colorName: 'Raw Deep Indigo', colorHex: '#1b2a4a', size: 'M', sku: 'AL-JSJ-IND-32', stock: 4, price: 3899, originalPrice: 4999 },
      { id: 'v5-indigo-34', colorName: 'Raw Deep Indigo', colorHex: '#1b2a4a', size: 'L', sku: 'AL-JSJ-IND-34', stock: 6, price: 3899, originalPrice: 4999 }
    ]
  },
  {
    id: 'prod-6',
    name: 'Handcrafted Italian Leather Chelsea Boots',
    slug: 'handcrafted-italian-leather-chelsea-boots',
    brand: 'AURA LUXE',
    category: 'Accessories',
    subCategory: 'Footwear',
    description: 'Goodyear welted Chelsea boots crafted by master artisans in Tuscany. Calfsuede leather upper with durable Vibram sole and elasticated side gussets.',
    highlights: [
      'Full grain Tuscan calfskin suede',
      'Goodyear welt construction (re-soleable)',
      'Cushioned leather footbed',
      'Hand-burnished toe box'
    ],
    careInstructions: [
      'Use suede protector spray',
      'Clean with brass wire brush'
    ],
    basePrice: 7999,
    originalPrice: 9999,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 24,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1000'
    ],
    fit: 'Regular',
    material: 'Wool Blend',
    occasion: ['Formal', 'Casual', 'Party', 'Date Night'],
    tags: ['Footwear', 'Craftsmanship'],
    isBestSeller: true,
    salesVelocity: 'high',
    createdAt: '2026-08-01',
    variants: [
      { id: 'v6-tan-m', colorName: 'Tobacco Suede', colorHex: '#8c593b', size: 'M', sku: 'AL-ICB-TOB-M', stock: 3, price: 7999, originalPrice: 9999 },
      { id: 'v6-tan-l', colorName: 'Tobacco Suede', colorHex: '#8c593b', size: 'L', sku: 'AL-ICB-TOB-L', stock: 5, price: 7999, originalPrice: 9999 }
    ]
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerName: 'Aarav Mehta',
    rating: 5,
    title: 'Flawless heavyweight drape!',
    comment: 'The 280 GSM cotton feels so thick and premium. Dropped shoulder look is spot on for contemporary streetwear aesthetics.',
    date: '2026-09-20',
    verifiedPurchase: true,
    helpfulCount: 18
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    customerName: 'Rohan Sharma',
    rating: 4,
    title: 'Great fit, size down for slim look',
    comment: 'Runs true to oversized fit. If you want a standard fit go 1 size smaller. Quality is immaculate.',
    date: '2026-09-18',
    verifiedPurchase: true,
    helpfulCount: 7
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    customerName: 'Priya Kapoor',
    rating: 5,
    title: 'Felt like a million bucks at the wedding gala',
    comment: 'The silk fabric catches light gorgeously. Wore it with simple heels and got non-stop compliments.',
    date: '2026-09-22',
    verifiedPurchase: true,
    helpfulCount: 25
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-101',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@example.com',
    phone: '+91 98201 44521',
    joinedDate: '2025-11-12',
    totalSpent: 38450,
    ordersCount: 8,
    loyaltyPoints: 1920,
    loyaltyTier: 'Platinum',
    referralCode: 'VIKRAM-AURA',
    segment: 'VIP',
    preferredCategories: ['Men', 'Accessories'],
    styleDna: initialStyleDna,
    savedAddresses: [
      {
        id: 'addr-1',
        label: 'Home',
        street: '702 Raheja Towers, Pali Hill',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true
      }
    ]
  },
  {
    id: 'cust-102',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@example.com',
    phone: '+91 97112 33890',
    joinedDate: '2026-02-18',
    totalSpent: 17298,
    ordersCount: 4,
    loyaltyPoints: 860,
    loyaltyTier: 'Gold',
    referralCode: 'ANANYA-AURA',
    segment: 'Frequent',
    preferredCategories: ['Women', 'Outerwear'],
    savedAddresses: [
      {
        id: 'addr-2',
        label: 'Apartment',
        street: 'B-404 Golf Course Road',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122002',
        isDefault: true
      }
    ]
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-8001',
    orderNumber: 'AL-2026-8001',
    customerId: 'cust-101',
    customerName: 'Vikramaditya Roy',
    customerEmail: 'vikram.roy@example.com',
    customerPhone: '+91 98201 44521',
    shippingAddress: {
      street: '702 Raheja Towers, Pali Hill',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      country: 'India'
    },
    items: [
      {
        productId: 'prod-1',
        productName: 'Monochrome Heavyweight Oversized Tee',
        productImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000',
        variantId: 'v1-black-m',
        color: 'Obsidian Black',
        size: 'M',
        quantity: 1,
        price: 1499
      },
      {
        productId: 'prod-2',
        productName: 'Tailored Linen Pleated Trousers',
        productImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1000',
        variantId: 'v2-sand-m',
        color: 'Desert Sand',
        size: 'M',
        quantity: 1,
        price: 3299
      }
    ],
    subtotal: 4798,
    discount: 400,
    tax: 220,
    shippingFee: 0,
    totalAmount: 4618,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Out for Delivery',
    trackingNumber: 'DEL-IND-998241',
    estimatedDeliveryDate: '2026-10-04',
    timeline: [
      { status: 'Processing', timestamp: '2026-10-01 10:15', description: 'Order confirmed and inventory reserved.' },
      { status: 'Shipped', timestamp: '2026-10-02 14:30', description: 'Dispatched from Bandra Central Hub via Express.' },
      { status: 'Out for Delivery', timestamp: '2026-10-03 08:00', description: 'Out with delivery agent Rakesh (+91 98000 12345).' }
    ],
    createdAt: '2026-10-01 10:15',
    waysToWear: [
      {
        title: 'Monochrome Minimalist',
        desc: 'Pair your Oversized Tee with your owned Tailored Black Pleated Chinos and Clean Leather Sneakers.',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600'
      },
      {
        title: 'Summer Resort Luxe',
        desc: 'Style your Linen Pleated Trousers with an unbuttoned Oxford shirt and suede mules.',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600'
      },
      {
        title: 'Layered Evening Silhouette',
        desc: 'Layer your Oversized Tee under a Denim Overshirt with Chelsea boots for late night drinks.',
        image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=600'
      }
    ]
  }
];

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Festive Season VIP Early Access',
    audienceSegment: 'VIP',
    channel: 'WhatsApp',
    offerCode: 'VIPAURA20',
    discountPercent: 20,
    messageTemplate: 'Hi {{name}}! ✨ Exclusive 20% OFF Early Access to our new Silk & Tweed Winter Collection. Use code VIPAURA20 at checkout.',
    scheduledDate: '2026-10-05',
    status: 'Active',
    sentCount: 142,
    convertedCount: 38,
    revenueGenerated: 164000
  }
];

export const initialLookbooks: LookBookItem[] = [
  {
    id: 'look-1',
    title: 'The Contemporary Resort Look',
    occasion: 'Summer Luxury',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200',
    hotspots: [
      { id: 'h1', xPercent: 45, yPercent: 35, productId: 'prod-1' },
      { id: 'h2', xPercent: 52, yPercent: 70, productId: 'prod-2' },
      { id: 'h3', xPercent: 60, yPercent: 88, productId: 'prod-6' }
    ]
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    user: 'Store Owner (Admin)',
    action: 'Price Update',
    details: 'Updated Monochrome Oversized Tee price to ₹1,499 (Discount 32%)',
    timestamp: '2026-10-02 11:20'
  }
];
