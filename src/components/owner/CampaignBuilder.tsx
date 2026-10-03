import React, { useState } from 'react';
import { Megaphone, MessageSquare, Send, Plus, CheckCircle2, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CampaignBuilder: React.FC = () => {
  const { campaigns, createNewCampaign, launchCampaign, showToast } = useStore();

  const [name, setName] = useState('Festive Collection Early Access');
  const [segment, setSegment] = useState('VIP');
  const [channel, setChannel] = useState<'WhatsApp' | 'Email' | 'SMS'>('WhatsApp');
  const [offerCode, setOfferCode] = useState('VIPFEST20');
  const [message, setMessage] = useState('Hi {{name}}! ✨ Exclusive 20% OFF Early Access code VIPFEST20 for our new Autumn Atelier drops. Shop now: auraluxe.com');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createNewCampaign({
      name,
      audienceSegment: segment,
      channel,
      offerCode,
      discountPercent: 20,
      messageTemplate: message,
      scheduledDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
          AUTOMATED MARKETING & OMNICHANNEL
        </span>
        <h1 className="font-serif-heading text-3xl font-bold text-stone-100">WhatsApp & Email Campaign Studio</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Builder Form */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-stone-100 font-serif-heading">Create New Campaign Broadcast</h3>

          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="text-stone-400 block mb-1">Campaign Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-stone-400 block mb-1">Target Segment</label>
                <select
                  value={segment}
                  onChange={e => setSegment(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                >
                  <option value="VIP">VIP High-Value</option>
                  <option value="Cart Abandoner">Cart Abandoners</option>
                  <option value="Frequent">Frequent Buyers</option>
                  <option value="Inactive">Inactive (60+ Days)</option>
                </select>
              </div>

              <div>
                <label className="text-stone-400 block mb-1">Broadcast Channel</label>
                <select
                  value={channel}
                  onChange={e => setChannel(e.target.value as any)}
                  className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
                >
                  <option value="WhatsApp">WhatsApp Business API</option>
                  <option value="Email">Email Digest</option>
                  <option value="SMS">SMS Gateway</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-stone-400 block mb-1">Offer Promo Code</label>
              <input
                type="text"
                value={offerCode}
                onChange={e => setOfferCode(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
              />
            </div>

            <div>
              <label className="text-stone-400 block mb-1">Message Template Body</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-2.5 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-stone-950 font-bold py-3 rounded-xl uppercase tracking-wider text-xs flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Save & Launch Broadcast Campaign</span>
            </button>
          </form>
        </div>

        {/* Live Message Preview Card */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-stone-100 font-serif-heading">Live Mobile WhatsApp Preview</h3>

          {/* WhatsApp UI Simulation Card */}
          <div className="bg-[#0b141a] p-4 rounded-2xl border border-stone-800 space-y-2 max-w-sm mx-auto shadow-2xl">
            <div className="flex items-center space-x-2 border-b border-stone-800/60 pb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-stone-200">AURA LUXE Official Verified</span>
            </div>
            <div className="bg-[#202c33] p-3 rounded-xl text-xs text-stone-200 space-y-2">
              <p>{message}</p>
              <span className="text-[10px] text-stone-400 block text-right">10:42 AM • Delivered</span>
            </div>
          </div>

          {/* List of Active Campaigns */}
          <div className="pt-4 border-t border-stone-800 space-y-3">
            <p className="text-xs font-bold text-stone-300 uppercase">Active Campaigns History</p>
            {campaigns.map(c => (
              <div key={c.id} className="bg-stone-950 border border-stone-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-stone-200">{c.name}</p>
                  <p className="text-stone-400">{c.channel} • {c.sentCount} Dispatched • ₹{c.revenueGenerated.toLocaleString('en-IN')} Generated</p>
                </div>
                <button
                  onClick={() => launchCampaign(c.id)}
                  className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-lg text-[11px] font-semibold"
                >
                  Dispatch Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
