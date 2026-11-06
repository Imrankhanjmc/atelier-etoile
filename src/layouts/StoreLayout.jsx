import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../components/common/AnnouncementBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import SearchModal from '../components/common/SearchModal';
import QuickViewModal from '../components/common/QuickViewModal';
import SizeGuideModal from '../components/common/SizeGuideModal';

export const StoreLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideCategory, setSizeGuideCategory] = useState(null);

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleOpenSizeGuide = (category = 'women') => {
    setSizeGuideCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 selection:bg-stone-900 selection:text-white">
      <AnnouncementBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Outlet with context for quick view & size guide */}
      <main className="flex-1">
        <Outlet context={{ openQuickView: handleOpenQuickView, openSizeGuide: handleOpenSizeGuide }} />
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={handleOpenSizeGuide}
      />
      <SizeGuideModal
        isOpen={!!sizeGuideCategory}
        onClose={() => setSizeGuideCategory(null)}
        defaultCategory={sizeGuideCategory || 'women'}
      />
    </div>
  );
};

export default StoreLayout;
