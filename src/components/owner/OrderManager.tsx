import React, { useState } from 'react';
import { Package, Truck, Printer, CheckCircle2, Clock, Eye } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';

export const OrderManager: React.FC = () => {
  const { orders, updateOrderStatus, showToast } = useStore();
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
          FULFILLMENT OPERATIONS
        </span>
        <h1 className="font-serif-heading text-3xl font-bold text-stone-100">Customer Order Pipeline</h1>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-stone-400 text-[11px] font-bold uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {orders.map(ord => (
                <tr key={ord.id} className="hover:bg-stone-800/40">
                  <td className="p-4 font-mono font-bold text-amber-400">{ord.orderNumber}</td>
                  <td className="p-4">
                    <p className="font-semibold text-stone-100">{ord.customerName}</p>
                    <p className="text-[10px] text-stone-500">{ord.customerEmail}</p>
                  </td>
                  <td className="p-4">{ord.createdAt}</td>
                  <td className="p-4 font-bold text-stone-100">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">{ord.paymentMethod} ({ord.paymentStatus})</td>
                  <td className="p-4">
                    <select
                      value={ord.orderStatus}
                      onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className="bg-stone-950 border border-stone-800 text-amber-300 text-xs px-2.5 py-1 rounded-lg font-semibold"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedOrderForInvoice(ord)}
                      className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg"
                      title="Print Invoice"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal Simulator */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 max-w-xl w-full rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 font-serif-heading">TAX INVOICE — {selectedOrderForInvoice.orderNumber}</h3>
              <button onClick={() => setSelectedOrderForInvoice(null)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="bg-stone-950 p-6 rounded-xl space-y-4 text-xs font-mono text-stone-300">
              <div className="flex justify-between border-b border-stone-800 pb-3">
                <div>
                  <p className="font-bold text-amber-400 text-sm">AURA LUXE ATELIER LTD.</p>
                  <p className="text-stone-400">GSTIN: 27AABCA1234F1ZM</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Date: {selectedOrderForInvoice.createdAt}</p>
                  <p className="text-stone-400">Tracking: {selectedOrderForInvoice.trackingNumber}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-stone-100">Billed To:</p>
                <p>{selectedOrderForInvoice.customerName}</p>
                <p>{selectedOrderForInvoice.shippingAddress.street}, {selectedOrderForInvoice.shippingAddress.city}</p>
              </div>

              <div className="border-t border-stone-800 pt-3 space-y-2">
                {selectedOrderForInvoice.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{it.productName} ({it.size}) x{it.quantity}</span>
                    <span>₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-amber-400 border-t border-stone-800 pt-2 text-sm">
                  <span>TOTAL AMOUNT PAID</span>
                  <span>₹{selectedOrderForInvoice.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => { showToast('Invoice sent to printer driver!'); setSelectedOrderForInvoice(null); }}
              className="w-full bg-amber-500 text-stone-950 font-bold py-3 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Tax Invoice & Packing Slip</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
