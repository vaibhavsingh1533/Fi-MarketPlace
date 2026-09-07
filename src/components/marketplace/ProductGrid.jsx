import React from 'react';
import { ProductCard } from './ProductCard';
import { SearchX, RefreshCw } from 'lucide-react';

export function ProductGrid({ products, loading, error, onProductSelect, onResetFilters }) {
  if (loading) {
    return (
      <div className="products-container">
        <div className="section-title">
          <span>Marketplace Products</span>
        </div>
        <div className="products-grid-list">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="product-card-1fi"
              style={{ height: '270px', pointerEvents: 'none' }}
            >
              <div className="skeleton-box" style={{ width: '100%', height: '120px', marginBottom: '10px' }} />
              <div className="skeleton-box" style={{ width: '40%', height: '10px', marginBottom: '6px' }} />
              <div className="skeleton-box" style={{ width: '80%', height: '14px', marginBottom: '6px' }} />
              <div className="skeleton-box" style={{ width: '50%', height: '10px', marginBottom: '12px' }} />
              <div className="skeleton-box" style={{ width: '100%', height: '32px', marginTop: 'auto' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
        <p style={{ color: '#dc2626', marginBottom: '12px', fontSize: '13px' }}>{error}</p>
        <button
          className="btn-primary-purple"
          style={{ width: 'auto', margin: '0 auto', padding: '8px 16px', fontSize: '12px' }}
          onClick={onResetFilters}
        >
          <RefreshCw size={14} /> Retry Loading
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 20px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--primary-purple-subtle)',
            color: 'var(--primary-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}
        >
          <SearchX size={26} />
        </div>
        <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>No products found</h4>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Try clearing your search keyword or switching categories.
        </p>
        <button
          className="btn-primary-purple"
          style={{ width: 'auto', margin: '0 auto', padding: '8px 16px', fontSize: '12px' }}
          onClick={onResetFilters}
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="section-title">
        <span>Marketplace Products</span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
          {products.length} Available
        </span>
      </div>

      <div className="products-grid-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={onProductSelect} />
        ))}
      </div>
    </div>
  );
}
