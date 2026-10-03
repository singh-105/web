import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { Homepage } from './components/storefront/Homepage';
import { PLP } from './components/storefront/PLP';
import { PDP } from './components/storefront/PDP';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutPage } from './components/storefront/CheckoutPage';
import { CustomerAccountPage } from './components/storefront/CustomerAccountPage';
import { ShoppingBriefView } from './components/storefront/ShoppingBriefView';
import { WardrobeView } from './components/storefront/WardrobeView';
import { LookEngineView } from './components/storefront/LookEngineView';
import { StyleDnaModal } from './components/storefront/StyleDnaModal';
import { FashionCanvasModal } from './components/storefront/FashionCanvasModal';
import { AiStyleAssistantModal } from './components/storefront/AiStyleAssistantModal';
import { VirtualTryOnModal } from './components/storefront/VirtualTryOnModal';
import { OutfitBuilderModal } from './components/storefront/OutfitBuilderModal';
import { VisualSearchModal } from './components/storefront/VisualSearchModal';
import { OwnerLayout } from './components/owner/OwnerLayout';
import { useKeepAlive } from './hooks/useKeepAlive';

import { QuickLookModal } from './components/storefront/QuickLookModal';
import { FindYourAuraModal } from './components/storefront/FindYourAuraModal';
import { AuraStyleMirrorModal } from './components/storefront/AuraStyleMirrorModal';
import { StyleDiscoveryModal } from './components/storefront/StyleDiscoveryModal';

const MainContainer: React.FC = () => {
  const { activeMode, activeNavTab, activePage } = useStore();
  
  // Initialize anti-sleep keep-alive timer (5 minute interval)
  useKeepAlive(5);

  if (activeMode === 'owner') {
    return (
      <>
        <OwnerLayout />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-500/20 selection:text-amber-300">
      <Header />

      <main className="flex-1">
        {activeNavTab === 'wardrobe' ? (
          <WardrobeView />
        ) : activeNavTab === 'style' && activePage === 'look_engine' ? (
          <LookEngineView />
        ) : activePage === 'situation_brief' ? (
          <ShoppingBriefView />
        ) : activePage === 'catalog' ? (
          <PLP />
        ) : activePage === 'pdp' ? (
          <PDP />
        ) : activePage === 'checkout' ? (
          <CheckoutPage />
        ) : activePage === 'account' ? (
          <CustomerAccountPage />
        ) : (
          <Homepage />
        )}
      </main>

      <Footer />

      {/* Global Interactive Modals & Features */}
      <CartDrawer />
      <StyleDnaModal />
      <FashionCanvasModal />
      <AiStyleAssistantModal />
      <VirtualTryOnModal />
      <OutfitBuilderModal />
      <VisualSearchModal />
      <QuickLookModal />
      <FindYourAuraModal />
      <AuraStyleMirrorModal />
      <StyleDiscoveryModal />
      <Toast />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <MainContainer />
    </StoreProvider>
  );
};

export default App;
