import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Gift, Tag, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isGiftWrapped,
    setIsGiftWrapped,
    setActivePage
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif-heading text-xl font-bold text-stone-100">Shopping Bag ({cart.length})</h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4 divide-y divide-stone-800/80">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto" />
                <p className="text-sm text-stone-300 font-semibold">Your shopping bag is empty</p>
                <p className="text-xs text-stone-500">Explore our luxury catalog to select pieces.</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="pt-4 first:pt-0 flex space-x-4 items-center">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 object-cover rounded-xl border border-stone-800 shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-xs font-semibold text-stone-100 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-stone-400">Color: {item.selectedColor} • Size: {item.selectedSize}</p>
                    <p className="text-xs font-bold text-amber-400">₹{item.unitPrice.toLocaleString('en-IN')}</p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2 bg-stone-950 border border-stone-800 rounded-lg px-2 py-0.5">
                        <button onClick={() => updateCartQuantity(item.id, -1)} className="text-stone-400 hover:text-stone-100">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-200 px-1">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)} className="text-stone-400 hover:text-stone-100">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-stone-500 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Financial Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-stone-950/60 space-y-4">
              {/* Promo Code Form */}
              {appliedCoupon ? (
                <div className="flex justify-between items-center bg-amber-500/10 border border-amber-500/30 px-3 py-2 rounded-xl text-xs text-amber-300">
                  <div className="flex items-center space-x-1.5 font-medium">
                    <Tag className="w-4 h-4" />
                    <span>Coupon: {appliedCoupon.code}</span>
                  </div>
                  <button onClick={removeCoupon} className="text-stone-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="Enter Promo Code (e.g. AURA10)"
                    className="flex-1 bg-stone-950 border border-stone-800 text-stone-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                  <button type="submit" className="bg-stone-800 text-stone-200 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-stone-700">
                    Apply
                  </button>
                </form>
              )}

              {/* Gift Wrap Checkbox */}
              <label className="flex items-center space-x-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGiftWrapped}
                  onChange={e => setIsGiftWrapped(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <Gift className="w-4 h-4 text-amber-400" />
                <span>Add Signature Luxury Gift Wrapping (+₹150)</span>
              </label>

              {/* Financial Totals */}
              <div className="space-y-1.5 text-xs border-t border-stone-800 pt-3">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Estimated Tax (5% GST)</span>
                  <span>₹{cartTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-100 font-bold text-sm pt-2 border-t border-stone-800">
                  <span>Total</span>
                  <span className="text-amber-400">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActivePage('checkout');
                }}
                className="w-full bg-amber-500 text-stone-950 font-bold py-3.5 rounded-xl hover:bg-amber-400 transition-colors uppercase tracking-wider text-xs flex items-center justify-center space-x-2 shadow-xl"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
