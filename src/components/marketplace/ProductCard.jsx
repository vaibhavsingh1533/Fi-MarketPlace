import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { apiService } from '../../services/apiService';

export function ProductCard({ product, onClick }) {
  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  // Calculate starting monthly EMI for 6-month tenure
  const lowestEMIPayout = apiService.calculateEMIPlan(
    product.defaultPrice,
    6,
    product.isNoCostEMIAvailable
  ).monthlyInstallment;

  return (
    <div
      className="product-card-1fi"
      onClick={() => onClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(product)}
    >
      {product.badge && <div className="product-badge-tag">{product.badge}</div>}

      <div className="product-image-box">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
      </div>

      <div>
        <span className="brand-text">{product.brand}</span>
        <h4 className="product-name-text">{product.name}</h4>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
      </div>

      <div className="price-row-wrap">
        <div>
          <span className="main-price-text">{formatPrice(product.defaultPrice)}</span>
          {product.originalMrp && (
            <span className="mrp-price-text">{formatPrice(product.originalMrp)}</span>
          )}
        </div>

        {/* Dynamic Monthly EMI Badge */}
        <div className="emi-highlight-pill">
          <div>
            <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: '700' }}>EMI STARTS</div>
            <div className="emi-amount-text">{formatPrice(lowestEMIPayout)}/mo</div>
          </div>
          {product.isNoCostEMIAvailable ? (
            <span className="no-cost-tag">0% EMI</span>
          ) : (
            <ChevronRight size={12} color="var(--primary-purple)" />
          )}
        </div>
      </div>
    </div>
  );
}
