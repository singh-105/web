import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bot,
  Package,
  TrendingUp,
  ShoppingBag,
  Users,
  Megaphone,
  Layers,
  ShieldCheck,
  Store,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OwnerDashboard } from './OwnerDashboard';
import { AiBusinessAssistant } from './AiBusinessAssistant';
import { ProductManager } from './ProductManager';
import { InventoryIntelligence } from './InventoryIntelligence';
import { OrderManager } from './OrderManager';
import { CustomerCRM } from './CustomerCRM';
import { CampaignBuilder } from './CampaignBuilder';
import { CmsEditor } from './CmsEditor';
import { AuditLogView } from './AuditLogView';
import { brandConfig } from '../../config/brandConfig';

export const OwnerLayout: React.FC = () => {
  const { setActiveMode, setActivePage } = useStore();
  const [currentTab, setCurrentTab] = useState<
    'dashboard' | 'ai_copilot' | 'products' | 'inventory' | 'orders' | 'crm' | 'campaigns' | 'cms' | 'audit'
  >('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai_copilot', label: 'AI Business Copilot', icon: Bot },
    { id: 'products', label: 'Products & Catalog', icon: Package },
    { id: 'inventory', label: 'Inventory Intelligence', icon: TrendingUp },
    { id: 'orders', label: 'Orders Pipeline', icon: ShoppingBag },
    { id: 'crm', label: 'Customer CRM 360', icon: Users },
    { id: 'campaigns', label: 'WhatsApp Marketing', icon: Megaphone },
    { id: 'cms', label: 'CMS Layout Editor', icon: Layers },
    { id: 'audit', label: 'Security Audit Log', icon: ShieldCheck },
  ] as const;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-stone-900 border-r border-stone-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30 font-bold">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif-heading text-lg font-bold text-stone-100 uppercase tracking-wider block">
                {brandConfig.brandName}
              </span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block -mt-1">
                OWNER HUB
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to Customer Storefront button */}
        <div className="pt-6 border-t border-stone-800">
          <button
            onClick={() => {
              setActiveMode('storefront');
              setActivePage('home');
            }}
            className="w-full bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-400 p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch to Customer View</span>
          </button>
        </div>
      </aside>

      {/* Main Admin View Content Container */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {currentTab === 'dashboard' && <OwnerDashboard />}
        {currentTab === 'ai_copilot' && <AiBusinessAssistant />}
        {currentTab === 'products' && <ProductManager />}
        {currentTab === 'inventory' && <InventoryIntelligence />}
        {currentTab === 'orders' && <OrderManager />}
        {currentTab === 'crm' && <CustomerCRM />}
        {currentTab === 'campaigns' && <CampaignBuilder />}
        {currentTab === 'cms' && <CmsEditor />}
        {currentTab === 'audit' && <AuditLogView />}
      </main>
    </div>
  );
};
