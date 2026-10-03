export type FitType = 'Oversized' | 'Slim' | 'Regular' | 'Relaxed' | 'Tailored';
export type MaterialType = 'Organic Cotton' | 'Linen' | 'Italian Silk' | 'Denim' | 'Cashmere' | 'Wool Blend' | 'Polyester';
export type OccasionType = 'Casual' | 'Party' | 'Wedding' | 'Summer' | 'Formal' | 'Streetwear' | 'Workwear' | 'Vacation' | 'Date Night' | 'Office' | 'Weekend';

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  sku: string;
  stock: number;
  price: number;
  originalPrice?: number;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  userImages?: string[];
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories';
  subCategory: string;
  description: string;
  highlights: string[];
  careInstructions: string[];
  basePrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  fit: FitType;
  material: MaterialType;
  occasion: OccasionType[];
  tags: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isLimitedDrop?: boolean;
  variants: ProductVariant[];
  createdAt: string;
  salesVelocity: 'high' | 'medium' | 'low';
  personalityStyling?: {
    personality: 'Minimal' | 'Office' | 'Street' | 'Date Night';
    suggestedCombo: string;
    imageOverride?: string;
  }[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId: string;
  selectedColor: string;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Returned' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantId: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'COD' | 'NetBanking' | 'Wallet';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  orderStatus: OrderStatus;
  trackingNumber: string;
  estimatedDeliveryDate: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
  createdAt: string;
  waysToWear?: { title: string; desc: string; image: string }[];
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  colorHex: string;
  image: string;
  isOwnedByCustomer: boolean;
  purchaseDate?: string;
  tags: string[];
}

export interface StyleDnaProfile {
  isCompleted: boolean;
  archetypes: {
    minimal: number;
    street: number;
    classic: number;
    resort: number;
  };
  preferredFit: FitType;
  primaryColors: string[];
  priceSensitivity: 'Budget Aware' | 'Balanced' | 'Luxury Investment';
  favoriteOccasions: OccasionType[];
}

export interface ShoppingBrief {
  occasion: OccasionType;
  budgetLimit: number;
  styleVibe: string;
  preference: string;
  generatedLooks: {
    id: string;
    title: string;
    description: string;
    items: Product[];
    totalPrice: number;
    discountedTotal: number;
    reasoning: string[];
  }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinedDate: string;
  totalSpent: number;
  ordersCount: number;
  loyaltyPoints: number;
  loyaltyTier: 'Silver' | 'Gold' | 'Platinum';
  referralCode: string;
  segment: 'VIP' | 'Frequent' | 'First-Time' | 'Inactive' | 'Cart Abandoner';
  preferredCategories: string[];
  styleDna?: StyleDnaProfile;
  savedAddresses: {
    id: string;
    label: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }[];
}

export interface Campaign {
  id: string;
  name: string;
  audienceSegment: string;
  channel: 'WhatsApp' | 'Email' | 'SMS' | 'Push';
  offerCode: string;
  discountPercent: number;
  messageTemplate: string;
  scheduledDate: string;
  status: 'Draft' | 'Scheduled' | 'Sent' | 'Active';
  sentCount: number;
  convertedCount: number;
  revenueGenerated: number;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface LookBookItem {
  id: string;
  title: string;
  image: string;
  occasion: string;
  hotspots: {
    id: string;
    xPercent: number;
    yPercent: number;
    productId: string;
  }[];
}

export interface CmsSectionConfig {
  id: string;
  title: string;
  enabled: boolean;
  type: 'hero' | 'situation_cards' | 'flash_sale' | 'new_arrivals' | 'categories' | 'shop_the_scene' | 'instagram' | 'testimonials' | 'ai_assistant';
}

export interface StorePulseAlert {
  id: string;
  level: 'critical' | 'warning' | 'positive' | 'info';
  title: string;
  metric: string;
  description: string;
  suggestedAction: string;
  actionType: 'restock' | 'promote' | 'discount' | 'campaign' | 'review';
  targetId?: string;
}
