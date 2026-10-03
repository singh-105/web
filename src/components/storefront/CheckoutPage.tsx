import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  MapPin,
  ArrowRight,
  PackageCheck,
  QrCode,
  Lock,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartTotal,
    currentCustomer,
    placeOrder,
    setActivePage,
    setActiveMode
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [street, setStreet] = useState('702 Raheja Towers, Pali Hill');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400050');

  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [upiId, setUpiId] = useState('vikram@okaxis');

  // Confirmation Order
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleCompleteOrder = () => {
    const created = placeOrder(
      {
        street,
        city,
        state,
        pincode,
        country: 'India'
      },
      paymentMethod
    );

    setCompletedOrder(created);

    // Trigger subtle milestone confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">ORDER CONFIRMED</span>
          <h1 className="font-serif-heading text-4xl font-bold text-stone-100">
            Thank You, {completedOrder.customerName}!
          </h1>
          <p className="text-xs text-stone-400">
            Order <span className="text-stone-200 font-mono font-bold">{completedOrder.orderNumber}</span> has been dispatched to our Bandra Atelier fulfillment team.
          </p>
        </div>

        {/* Order Details & Live Timeline Card */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl text-left space-y-6">
          <div className="flex justify-between items-center border-b border-stone-800 pb-4">
            <div>
              <p className="text-xs text-stone-400">Estimated Express Delivery</p>
              <p className="text-sm font-bold text-stone-100">{completedOrder.estimatedDeliveryDate}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400">Tracking Code</p>
              <p className="text-sm font-mono font-bold text-amber-400">{completedOrder.trackingNumber}</p>
            </div>
          </div>

          {/* Timeline Status */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-stone-300 uppercase tracking-wider">Fulfillment Status Timeline</p>
            <div className="space-y-3">
              {completedOrder.timeline.map((t, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                  <div>
                    <span className="font-bold text-stone-200">{t.status}</span>
                    <span className="text-stone-500 ml-2">({t.timestamp})</span>
                    <p className="text-stone-400 mt-0.5">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connected Action Button: Jump to Owner Platform to inspect new order live! */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActivePage('account')}
            className="bg-stone-900 text-stone-200 border border-stone-800 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-stone-800"
          >
            View Customer Order Portal
          </button>
          <button
            onClick={() => setActiveMode('owner')}
            className="bg-amber-500 text-stone-950 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 shadow-xl flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Switch to Owner Dashboard (Inspect New Order Live)</span>
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <p className="text-stone-300 text-sm">Your cart is empty.</p>
        <button
          onClick={() => setActivePage('catalog')}
          className="bg-amber-500 text-stone-950 px-6 py-2.5 rounded-xl font-bold text-xs uppercase"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      <div className="border-b border-stone-800 pb-6">
        <h1 className="font-serif-heading text-3xl font-bold text-stone-100 uppercase">Atelier Express Checkout</h1>
        <p className="text-xs text-stone-400 mt-1">256-bit Encrypted Commerce Transaction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Step Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Address */}
          <div className={`bg-stone-900 border ${step === 1 ? 'border-amber-500' : 'border-stone-800'} p-6 rounded-2xl space-y-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="text-base font-bold text-stone-100">Shipping & Delivery Address</h3>
              </div>
              {step > 1 && (
                <button onClick={() => setStep(1)} className="text-xs text-amber-400 font-semibold hover:underline">Edit</button>
              )}
            </div>

            {step === 1 && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-stone-400 block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={street}
                      onChange={e => setStreet(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={e => setState(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">Pincode</label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-3 rounded-xl"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="bg-amber-500 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider"
                >
                  Continue to Delivery Method
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Payment Gateway Selection */}
          <div className={`bg-stone-900 border ${step === 2 ? 'border-amber-500' : 'border-stone-800'} p-6 rounded-2xl space-y-4`}>
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="text-base font-bold text-stone-100">Select Payment Gateway</h3>
            </div>

            {step === 2 && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { type: 'UPI', label: 'Instant UPI / GPay' },
                    { type: 'Card', label: 'Credit / Debit Card' },
                    { type: 'NetBanking', label: 'Net Banking' },
                    { type: 'COD', label: 'Cash On Delivery' }
                  ].map(pm => (
                    <button
                      key={pm.type}
                      onClick={() => setPaymentMethod(pm.type as any)}
                      className={`p-4 rounded-xl border text-left font-semibold transition-all ${
                        paymentMethod === pm.type
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                          : 'bg-stone-950 border-stone-800 text-stone-400'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="bg-stone-950 border border-stone-800 p-4 rounded-xl space-y-2 text-xs">
                    <label className="text-stone-400 block">VPA / UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                    />
                  </div>
                )}

                <button
                  onClick={handleCompleteOrder}
                  className="w-full bg-amber-500 text-stone-950 font-bold py-4 rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 shadow-xl flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order (₹{cartTotal.toLocaleString('en-IN')})</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-stone-100 font-serif-heading">Order Summary</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-12 object-cover rounded" />
                  <div>
                    <p className="font-semibold text-stone-200 truncate w-32">{item.product.name}</p>
                    <p className="text-stone-400">Qty: {item.quantity} • {item.selectedSize}</p>
                  </div>
                </div>
                <span className="font-bold text-stone-200">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs border-t border-stone-800 pt-3 text-stone-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span>-₹{cartDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax (5% GST)</span>
              <span>₹{cartTax.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-100 font-bold text-base pt-2 border-t border-stone-800">
              <span>Total Amount</span>
              <span className="text-amber-400">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
