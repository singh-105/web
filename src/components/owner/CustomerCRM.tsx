import React from 'react';
import { Users, Award, DollarSign, Calendar, Search } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CustomerCRM: React.FC = () => {
  const { customers } = useStore();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
          CLIENT RELATIONSHIP MANAGEMENT
        </span>
        <h1 className="font-serif-heading text-3xl font-bold text-stone-100">Customer 360° Profile Hub</h1>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-stone-400 text-[11px] font-bold uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Segment</th>
                <th className="p-4">Loyalty Tier</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Referral Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-stone-800/40">
                  <td className="p-4 font-semibold text-stone-100">{c.name}</td>
                  <td className="p-4">
                    <p>{c.email}</p>
                    <p className="text-[10px] text-stone-500">{c.phone}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      c.segment === 'VIP' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {c.segment}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-400">{c.loyaltyTier} ({c.loyaltyPoints} pts)</td>
                  <td className="p-4">{c.ordersCount} orders</td>
                  <td className="p-4 font-bold text-stone-100">₹{c.totalSpent.toLocaleString('en-IN')}</td>
                  <td className="p-4 font-mono text-amber-400">{c.referralCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
