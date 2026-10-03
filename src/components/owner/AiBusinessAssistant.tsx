import React, { useState } from 'react';
import { Sparkles, Bot, ArrowRight, RefreshCw, Send, CheckCircle2, Megaphone } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AiBusinessAssistant: React.FC = () => {
  const { products, orders, customers, campaigns, createNewCampaign, showToast } = useStore();
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [chatLog, setChatLog] = useState<{
    sender: 'owner' | 'ai';
    text: string;
    actionableCampaign?: { name: string; segment: string; offer: string };
  }[]>([
    {
      sender: 'ai',
      text: 'Greetings, Store Principal. I am your AURA Atelier Business Intelligence Copilot. Ask me questions regarding sales velocity, inventory restock urgency, or campaign creation based on real-time store telemetry.'
    }
  ]);

  const handleAskQuestion = (promptText: string) => {
    if (!promptText.trim()) return;

    const newLog = [...chatLog, { sender: 'owner' as const, text: promptText }];
    setChatLog(newLog);
    setQuery('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const q = promptText.toLowerCase();

      if (q.includes('promote') || q.includes('this week')) {
        setChatLog(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `Based on current inventory levels and season trends, I recommend promoting the **Monochrome Heavyweight Oversized Tee** (highest margin) and **Tailored Linen Pleated Trousers** (rising search velocity). Combined, these items yield a 34% higher Average Order Value.`,
            actionableCampaign: {
              name: 'Resort Chic Weekend Promo',
              segment: 'VIP',
              offer: 'VIPAURA20'
            }
          }
        ]);
      } else if (q.includes('restock') || q.includes('inventory')) {
        const lowStockNames = products
          .filter(p => p.variants.some(v => v.stock <= 3))
          .map(p => p.name)
          .join(', ');

        setChatLog(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `Critical Restock Alert: The following items are nearing total stockout: **${lowStockNames || 'Obsidian Black Oversized Tee (Size M)'}**. Estimated sell-out window is 4 to 6 days at current order velocity. Recommend issuing supplier purchase order immediately.`
          }
        ]);
      } else if (q.includes('size') || q.includes('demanded')) {
        setChatLog(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `Size **Medium (M)** accounts for 48% of total customer orders, followed by **Large (L)** at 32%. We recommend maintaining a 2:1 ratio for M to XL inventory allocation on future production runs.`
          }
        ]);
      } else if (q.includes('whatsapp') || q.includes('campaign')) {
        setChatLog(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `I have prepared a high-converting WhatsApp promotional campaign targeted at your 140 VIP customers offering early access to the upcoming Festive Collection.`,
            actionableCampaign: {
              name: 'WhatsApp VIP Festive Early Access',
              segment: 'VIP',
              offer: 'VIPFEST20'
            }
          }
        ]);
      } else {
        setChatLog(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `Store Analysis: Current 7-day revenue is **₹${orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString('en-IN')}** across ${orders.length} completed orders. Conversion rate stands at a healthy **3.8%**, outperforming standard apparel benchmarks (2.1%).`
          }
        ]);
      }
    }, 900);
  };

  const handleLaunchSuggestedCampaign = (campData: { name: string; segment: string; offer: string }) => {
    createNewCampaign({
      name: campData.name,
      audienceSegment: campData.segment,
      channel: 'WhatsApp',
      offerCode: campData.offer,
      discountPercent: 20,
      messageTemplate: `Hi {{name}}! Exclusive 20% OFF access code ${campData.offer} for our top VIP clients.`,
      scheduledDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
    showToast(`Campaign "${campData.name}" created and queued for dispatch!`);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-6 animate-fade-in max-w-4xl mx-auto shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif-heading text-xl font-bold text-stone-100">AI Store Copilot & Strategy Assistant</h2>
            <p className="text-xs text-stone-400">Live store telemetry Q&A and automated campaign generator</p>
          </div>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          "Which products should I promote this week?",
          "What inventory should I restock urgently?",
          "Which size is most demanded by buyers?",
          "Create a WhatsApp campaign for VIP clients"
        ].map((p, i) => (
          <button
            key={i}
            onClick={() => handleAskQuestion(p)}
            className="bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-300 px-3 py-1.5 rounded-lg transition-colors text-left"
          >
            "{p}"
          </button>
        ))}
      </div>

      {/* Chat Conversation History */}
      <div className="space-y-4 max-h-[420px] overflow-y-auto p-4 bg-stone-950/60 border border-stone-800 rounded-2xl">
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'owner' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'owner'
                  ? 'bg-amber-500 text-stone-950 font-semibold rounded-br-none'
                  : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-bl-none space-y-3'
              }`}
            >
              <p>{msg.text}</p>

              {msg.actionableCampaign && (
                <div className="bg-stone-950 border border-amber-500/40 p-3 rounded-xl space-y-2 mt-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold">
                    <Megaphone className="w-4 h-4" />
                    <span>Suggested Action: Launch Campaign</span>
                  </div>
                  <p className="text-stone-300 text-[11px]">
                    Campaign Name: <strong>{msg.actionableCampaign.name}</strong> • Segment: <strong>{msg.actionableCampaign.segment}</strong>
                  </p>
                  <button
                    onClick={() => handleLaunchSuggestedCampaign(msg.actionableCampaign!)}
                    className="w-full bg-amber-500 text-stone-950 font-bold py-2 rounded-lg text-xs uppercase tracking-wider hover:bg-amber-400"
                  >
                    1-Click Launch WhatsApp Campaign
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-stone-900 border border-stone-800 text-stone-400 px-4 py-3 rounded-2xl text-xs flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Analyzing order velocity and segment conversion metrics...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask questions about store sales, inventory, or strategy..."
          className="flex-1 bg-stone-950 border border-stone-800 text-stone-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500"
          onKeyDown={e => e.key === 'Enter' && handleAskQuestion(query)}
        />
        <button
          onClick={() => handleAskQuestion(query)}
          className="bg-amber-500 text-stone-950 font-bold px-5 py-3 rounded-xl text-xs hover:bg-amber-400 transition-colors flex items-center space-x-1"
        >
          <Send className="w-4 h-4" />
          <span>Ask</span>
        </button>
      </div>
    </div>
  );
};
