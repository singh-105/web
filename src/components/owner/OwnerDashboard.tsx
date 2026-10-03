import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Megaphone,
  BarChart2,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useStore } from '../../context/StoreContext';

export const OwnerDashboard: React.FC = () => {
  const {
    products,
    orders,
    customers,
    storePulseAlerts,
    resolvePulseAlert,
    updateProductPrice,
    updateOrderStatus,
    createNewCampaign,
    showToast
  } = useStore();

  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | '90d'>('7d');
  const [selectedAlertForSim, setSelectedAlertForSim] = useState<string | null>(null);

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  const chartData7D = [
    { day: 'Mon', revenue: 24000 },
    { day: 'Tue', revenue: 32000 },
    { day: 'Wed', revenue: 28000 },
    { day: 'Thu', revenue: 45000 },
    { day: 'Fri', revenue: 52000 },
    { day: 'Sat', revenue: 68000 },
    { day: 'Sun', revenue: totalRevenue > 0 ? totalRevenue : 41000 }
  ];

  const categoryDistribution = [
    { name: 'Men Apparel', value: 42, color: '#f59e0b' },
    { name: 'Women Dresses', value: 35, color: '#10b981' },
    { name: 'Accessories & Boots', value: 15, color: '#6366f1' },
    { name: 'Kids', value: 8, color: '#ec4899' }
  ];

  const handleSimulateCampaign = (alertTitle: string) => {
    createNewCampaign({
      name: `Simulated Campaign - ${alertTitle}`,
      audienceSegment: 'VIP',
      channel: 'WhatsApp',
      offerCode: 'SIMULATE20',
      discountPercent: 20,
      messageTemplate: 'Automated Store Pulse campaign dispatch.',
      scheduledDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
    showToast(`Campaign launched! Projected revenue impact +₹84,000.`);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
            EXECUTIVE CONTROL HUB
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-stone-100 uppercase">
            Store Pulse & Operating Signal
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Actionable store telemetry pointing out exactly what needs your decision today.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-stone-900 border border-stone-800 rounded-xl p-1 text-xs font-medium">
          {(['7d', '30d', '90d'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeFilter(tf)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeFilter === tf ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 28: WHAT NEEDS YOUR ATTENTION TODAY? (STORE PULSE CARDS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-heading text-2xl font-bold text-stone-100 uppercase tracking-wide">
            What Needs Your Attention Today?
          </h2>
          <span className="text-xs text-amber-400 font-semibold">{storePulseAlerts.length} Active Operational Signals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storePulseAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                alert.level === 'critical'
                  ? 'bg-red-500/10 border-red-500/40 text-stone-100'
                  : alert.level === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/40 text-stone-100'
                  : 'bg-stone-900 border-stone-800 text-stone-100'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    alert.level === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                  }`}></span>
                  <h3 className="font-bold text-sm">{alert.title}</h3>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800">
                  {alert.metric}
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">{alert.description}</p>

              <div className="pt-2 flex items-center justify-between border-t border-stone-800/80">
                <span className="text-[11px] text-amber-400 font-semibold">Recommended: {alert.suggestedAction}</span>
                <button
                  onClick={() => {
                    handleSimulateCampaign(alert.title);
                    resolvePulseAlert(alert.id);
                  }}
                  className="bg-amber-500 text-stone-950 font-bold px-3.5 py-1.5 rounded-lg text-xs uppercase hover:bg-amber-400 flex items-center space-x-1"
                >
                  <span>Take Action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400">
            <span>Sales Revenue</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">+18.4% velocity growth</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">{totalOrdersCount}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">+12.1% order volume</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400">
            <span>Average Order Value (AOV)</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">₹{aov.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">+₹450 via Outfit Studio</div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400">
            <span>Active Customers</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-stone-100">{customers.length}</div>
          <div className="text-[11px] text-stone-400">72% Repeat Buyer Rate</div>
        </div>
      </div>

      {/* SECTION 30: VISUAL INVENTORY HEALTH SYSTEM */}
      <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
        <h3 className="font-serif-heading text-xl font-bold text-stone-100">Visual Inventory Health Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center text-xs">
          {[
            { label: 'FAST MOVING', count: 4, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
            { label: 'HEALTHY', count: 12, color: 'text-stone-300 bg-stone-950 border-stone-800' },
            { label: 'LOW STOCK', count: 3, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
            { label: 'STOCKOUT RISK', count: 2, color: 'text-red-400 bg-red-500/10 border-red-500/30' },
            { label: 'SLOW MOVING', count: 3, color: 'text-amber-300 bg-amber-500/10 border-amber-500/30' },
            { label: 'OVERSTOCK', count: 1, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' }
          ].map((ih, i) => (
            <div key={i} className={`p-3 rounded-xl border font-semibold ${ih.color}`}>
              <span className="text-xl font-bold block">{ih.count}</span>
              <span className="text-[10px] uppercase tracking-wider">{ih.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-stone-100 font-serif-heading">7-Day Trailing Revenue Velocity</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData7D}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#78716c" fontSize={11} />
                <YAxis stroke="#78716c" fontSize={11} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: '8px', color: '#f5f5f4', fontSize: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-stone-100 font-serif-heading">Category Mix</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4}>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
