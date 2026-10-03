import React, { useState } from 'react';
import {
  User,
  Package,
  Award,
  Share2,
  Heart,
  MapPin,
  RefreshCw,
  Clock,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Gift
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CustomerAccountPage: React.FC = () => {
  const {
    currentCustomer,
    orders,
    requestReturn,
    addToCart,
    products,
    wishlistProductIds,
    toggleWishlist,
    setActivePage,
    setSelectedProductId,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'loyalty' | 'referrals' | 'wishlist'>('orders');

  // Return/Exchange Modal State
  const [returnOrderId, setReturnOrderId] = useState<string | null>(null);
  const [returnReason, setReturnReason] = useState('Size did not fit');
  const [isExchange, setIsExchange] = useState(true);
  const [replacementSize, setReplacementSize] = useState('L');

  const customerOrders = orders.filter(o => o.customerEmail === currentCustomer.email || o.customerId === currentCustomer.id);
  const wishlistProducts = products.filter(p => wishlistProductIds.includes(p.id));

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        addToCart(prod, item.variantId, item.quantity);
      }
    });
    showToast(`Items from order ${order.orderNumber} added back to cart!`);
    setActivePage('cart');
  };

  const handleConfirmReturn = () => {
    if (!returnOrderId) return;
    requestReturn(returnOrderId, 'v1-black-m', returnReason, isExchange, replacementSize);
    setReturnOrderId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Customer Header Card */}
      <div className="bg-stone-900 border border-stone-800 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/40 text-amber-400 font-bold text-2xl flex items-center justify-center font-serif-heading">
            {currentCustomer.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-100">{currentCustomer.name}</h1>
              <span className="bg-amber-500 text-stone-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {currentCustomer.loyaltyTier} VIP
              </span>
            </div>
            <p className="text-xs text-stone-400">{currentCustomer.email} • {currentCustomer.phone}</p>
          </div>
        </div>

        {/* Loyalty Quick Stats */}
        <div className="flex space-x-6 text-center border-t md:border-t-0 md:border-l border-stone-800 pt-4 md:pt-0 md:pl-8">
          <div>
            <span className="text-2xl font-bold text-amber-400">{currentCustomer.loyaltyPoints}</span>
            <p className="text-[11px] text-stone-400 uppercase font-semibold">Atelier Points</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-stone-100">{customerOrders.length}</span>
            <p className="text-[11px] text-stone-400 uppercase font-semibold">Orders Placed</p>
          </div>
          <div>
            <span className="text-2xl font-bold text-stone-100">₹{currentCustomer.totalSpent.toLocaleString('en-IN')}</span>
            <p className="text-[11px] text-stone-400 uppercase font-semibold">Lifetime Spend</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-stone-800 pb-3">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'orders' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({customerOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('loyalty')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'loyalty' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Loyalty Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('referrals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'referrals' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Referral Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'wishlist' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlistProducts.length})</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {customerOrders.map(ord => (
            <div key={ord.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800 pb-4 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-amber-400 text-sm">{ord.orderNumber}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      ord.orderStatus === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {ord.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">Placed on {ord.createdAt} • Delivery: {ord.estimatedDeliveryDate}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleReorder(ord)}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Buy Again</span>
                  </button>

                  <button
                    onClick={() => setReturnOrderId(ord.id)}
                    className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-stone-300 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    Return / Exchange
                  </button>
                </div>
              </div>

              {/* Items in Order */}
              <div className="space-y-3">
                {ord.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={item.productImage} alt={item.productName} className="w-12 h-14 object-cover rounded" />
                      <div>
                        <p className="font-semibold text-stone-200">{item.productName}</p>
                        <p className="text-stone-400">Color: {item.color} • Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-amber-400">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Loyalty Rewards */}
      {activeTab === 'loyalty' && (
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">ATELIER PRIVILEGE SOCIETY</span>
            <h2 className="font-serif-heading text-2xl font-bold text-stone-100">Your Tier: {currentCustomer.loyaltyTier}</h2>
            <p className="text-xs text-stone-400">Earn 1 point for every ₹20 spent across online & atelier boutiques.</p>
          </div>

          <div className="bg-stone-950 border border-stone-800 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-stone-300">Progress to Gold Tier (₹15,000 threshold)</span>
              <span className="text-amber-400">100% Unlocked</span>
            </div>
            <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Referrals */}
      {activeTab === 'referrals' && (
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">GIVE ₹500, GET ₹500</span>
            <h2 className="font-serif-heading text-2xl font-bold text-stone-100">Invite Friends to AURA LUXE</h2>
            <p className="text-xs text-stone-400">Share your exclusive code. When your friend places their first order, you both get ₹500 store credit.</p>
          </div>

          <div className="bg-stone-950 border border-stone-800 p-4 rounded-xl flex items-center justify-between max-w-md">
            <span className="font-mono font-bold text-amber-400 text-base">{currentCustomer.referralCode}</span>
            <button
              onClick={() => showToast('Referral link copied to clipboard!')}
              className="bg-amber-500 text-stone-950 px-4 py-2 rounded-lg text-xs font-bold uppercase"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {wishlistProducts.map(prod => (
            <div key={prod.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3">
              <img src={prod.images[0]} alt={prod.name} className="w-full h-48 object-cover rounded-xl" />
              <div>
                <p className="text-xs font-semibold text-stone-200 truncate">{prod.name}</p>
                <p className="text-xs font-bold text-amber-400 mt-1">₹{prod.basePrice.toLocaleString('en-IN')}</p>
              </div>
              <button
                onClick={() => prod.variants.length > 0 && addToCart(prod, prod.variants[0].id, 1)}
                className="w-full bg-amber-500 text-stone-950 font-bold py-2 rounded-lg text-xs uppercase"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Return Request Modal */}
      {returnOrderId && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 max-w-md w-full rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-100 font-serif-heading">Request Return or Size Exchange</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400 block mb-1">Reason for Return</label>
                <select
                  value={returnReason}
                  onChange={e => setReturnReason(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                >
                  <option value="Size did not fit">Size did not fit</option>
                  <option value="Fabric texture preference">Fabric texture preference</option>
                  <option value="Received incorrect variant">Received incorrect variant</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  checked={isExchange}
                  onChange={e => setIsExchange(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <span className="text-stone-200 font-medium">Request direct size exchange instead of refund</span>
              </div>

              {isExchange && (
                <div>
                  <label className="text-stone-400 block mb-1">Replacement Size Needed</label>
                  <select
                    value={replacementSize}
                    onChange={e => setReplacementSize(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                  >
                    <option value="S">Small (S)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Large (L)</option>
                    <option value="XL">Extra Large (XL)</option>
                  </select>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setReturnOrderId(null)}
                  className="flex-1 bg-stone-800 text-stone-300 py-2.5 rounded-xl font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReturn}
                  className="flex-1 bg-amber-500 text-stone-950 py-2.5 rounded-xl font-bold uppercase"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
