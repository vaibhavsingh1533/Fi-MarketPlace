import React, { useState } from 'react';
import { HeroBanner } from './components/layout/HeroBanner';
import { ShopTabs } from './components/layout/ShopTabs';
import { BottomNav } from './components/layout/BottomNav';
import { PlaceholderTab } from './components/shop/PlaceholderTab';
import { CategoryBar } from './components/marketplace/CategoryBar';
import { ProductGrid } from './components/marketplace/ProductGrid';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { useProducts } from './hooks/useProducts';
import { Search, Home, Receipt, TrendingUp, User, ArrowRight } from 'lucide-react';

export function App() {
  // Active Navigation States
  const [activeShopTab, setActiveShopTab] = useState('marketplace');
  const [activeBottomNav, setActiveBottomNav] = useState('Shop');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Products Custom Hook
  const {
    products,
    loading,
    error,
    category,
    setCategory,
    search,
    setSearch,
    refetch
  } = useProducts('All');

  const handleResetFilters = () => {
    setCategory('All');
    setSearch('');
    refetch();
  };

  const handleBottomNavClick = (navId) => {
    setActiveBottomNav(navId);
  };

  return (
    <div className="app-container">
      {/* 1Fi Royal Purple Hero Banner */}
      <HeroBanner />

      {/* Main Content View based on Bottom Navigation */}
      {activeBottomNav === 'Shop' ? (
        <>
          {/* Segmented Control Pill Navigation Tabs (Top Brands, Nearby Stores, 1Fi Marketplace) */}
          <ShopTabs activeTab={activeShopTab} onTabChange={setActiveShopTab} />

          {/* TAB A: Top Brands (Blank Placeholder) */}
          {activeShopTab === 'top-brands' && (
            <PlaceholderTab
              tabName="Top Brands"
              onSwitchToMarketplace={() => setActiveShopTab('marketplace')}
            />
          )}

          {/* TAB B: Nearby Stores (Blank Placeholder) */}
          {activeShopTab === 'nearby-stores' && (
            <PlaceholderTab
              tabName="Nearby Stores"
              onSwitchToMarketplace={() => setActiveShopTab('marketplace')}
            />
          )}

          {/* TAB C: 1Fi Marketplace (Full Implementation) */}
          {activeShopTab === 'marketplace' && (
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Pill Search Input */}
              <div className="search-pill-container">
                <Search size={18} className="search-pill-icon" />
                <input
                  type="text"
                  id="marketplace-search-input"
                  className="search-pill-input"
                  placeholder="Search products, brands, or tech..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Category Filter Chips */}
              <CategoryBar activeCategory={category} onCategoryChange={setCategory} />

              {/* Product Listing Grid */}
              <ProductGrid
                products={products}
                loading={loading}
                error={error}
                onProductSelect={setSelectedProduct}
                onResetFilters={handleResetFilters}
              />
            </main>
          )}
        </>
      ) : (
        /* Other Bottom Nav Section View Placeholders */
        <div style={{ padding: '24px 16px 40px', textAlign: 'center' }}>
          <div
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px 20px',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--primary-purple-subtle)',
                color: 'var(--primary-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              {activeBottomNav === 'Home' && <Home size={28} />}
              {activeBottomNav === 'EMI Dues' && <Receipt size={28} />}
              {activeBottomNav === 'Limit' && <TrendingUp size={28} />}
              {activeBottomNav === 'Profile' && <User size={28} />}
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
              1Fi {activeBottomNav}
            </h3>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '300px', lineHeight: '1.5', marginBottom: '20px' }}>
              You are viewing the {activeBottomNav} section. Switch back to the <strong>Shop</strong> tab to explore the <strong>1Fi Marketplace</strong>.
            </p>

            <button
              className="btn-primary-purple"
              style={{ width: 'auto', padding: '10px 20px', fontSize: '13px' }}
              onClick={() => setActiveBottomNav('Shop')}
            >
              <span>Back to Shop Marketplace</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Floating Bottom Navigation Bar */}
      <BottomNav activeNav={activeBottomNav} onNavClick={handleBottomNavClick} />
    </div>
  );
}

export default App;
