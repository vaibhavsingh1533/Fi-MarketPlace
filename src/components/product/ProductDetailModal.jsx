import React, { useState } from 'react';
import { X, Star, Calendar, ChevronRight } from 'lucide-react';
import { VariantSelector } from './VariantSelector';
import { useEMICalculator } from '../../hooks/useEMICalculator';
import { EMIScheduleModal } from '../emi/EMIScheduleModal';
import { CheckoutModal } from '../checkout/CheckoutModal';

export function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  // Selected Variant State
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.colors?.[0] || null
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.variants?.storages?.[0] || null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Dynamic EMI Calculation Hook
  const {
    effectivePrice,
    selectedTenure,
    setSelectedTenure,
    setCustomPriceOffset,
    currentPlan,
    availableTenuresSummary
  } = useEMICalculator(
    product.defaultPrice,
    product.emiConfig,
    product.emiConfig?.noCostTenures?.[0] || 6
  );

  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
    setCustomPriceOffset(storage.priceOffset || 0);
  };

  const formatPrice = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-icon" onClick={onClose}>
            <X size={18} />
          </button>

          {/* Product Gallery (Compact, object-fit: contain to avoid cropping) */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <div
              style={{
                width: '100%',
                height: '210px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px'
              }}
            >
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selectedImageIndex === idx ? '2px solid var(--primary-purple)' : '1px solid var(--border-light)',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                  >
                    <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Brand & Title */}
          <span className="brand-text">{product.brand}</span>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', margin: '2px 0 6px', lineHeight: '1.3' }}>
            {product.name}
          </h2>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <Star size={13} color="#f59e0b" fill="#f59e0b" />
            <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{product.rating}</span>
            <span>({product.reviewCount} reviews)</span>
          </div>

          {/* Price Recalculation */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
              {formatPrice(effectivePrice)}
            </span>
            {product.originalMrp && (
              <span className="mrp-price-text" style={{ fontSize: '13px' }}>
                {formatPrice(product.originalMrp + (selectedStorage?.priceOffset || 0))}
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="no-cost-tag" style={{ padding: '2px 6px', fontSize: '10px' }}>
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Variant Selector */}
          <VariantSelector
            variants={product.variants}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            selectedStorage={selectedStorage}
            onSelectStorage={handleStorageChange}
          />

          {/* EMI Tenure Selection Grid */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)' }}>
                Select EMI Plan
              </div>
              <button
                onClick={() => setShowScheduleModal(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-purple)',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <Calendar size={12} /> Schedule <ChevronRight size={12} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {availableTenuresSummary.map((planSummary) => {
                const isSelected = selectedTenure === planSummary.tenureMonths;
                return (
                  <div
                    key={planSummary.tenureMonths}
                    id={`tenure-${planSummary.tenureMonths}m`}
                    style={{
                      background: isSelected ? 'var(--primary-purple-subtle)' : '#ffffff',
                      border: isSelected ? '2px solid var(--primary-purple)' : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px 12px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onClick={() => setSelectedTenure(planSummary.tenureMonths)}
                  >
                    {planSummary.isNoCost && (
                      <span className="no-cost-tag" style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '8px' }}>
                        0% NO-COST
                      </span>
                    )}
                    <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {planSummary.tenureMonths} Months
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-purple)', marginTop: '2px' }}>
                      {formatPrice(planSummary.monthlyInstallment)}/mo
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Total: {formatPrice(planSummary.totalPayable)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chosen Plan Summary Box */}
          {currentPlan && (
            <div
              style={{
                background: 'var(--primary-purple-subtle)',
                border: '1px solid var(--border-purple)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                marginTop: '12px',
                fontSize: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Chosen Tenure:</span>
                <strong style={{ color: 'var(--primary-purple)' }}>
                  {currentPlan.tenureMonths} Months @ {currentPlan.annualInterestRate}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Down Payment:</span>
                <strong style={{ color: 'var(--text-primary)' }}>₹0 (Zero Down Payment)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Processing Fee:</span>
                <strong style={{ color: 'var(--text-primary)' }}>
                  {currentPlan.processingFee > 0 ? formatPrice(currentPlan.processingFee) : 'FREE (₹0)'}
                </strong>
              </div>
            </div>
          )}

          {/* Specifications */}
          {product.specs && product.specs.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Key Specifications
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {product.specs.map((spec, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      padding: '6px 10px',
                      background: '#f8fafc',
                      borderRadius: '6px'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>{spec.label}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Action CTA Button */}
          <button
            className="btn-primary-purple"
            id="proceed-emi-btn"
            onClick={() => setShowCheckoutModal(true)}
          >
            <span>
              Proceed with {currentPlan?.tenureMonths}M Plan ({formatPrice(currentPlan?.monthlyInstallment)}/mo)
            </span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Schedule Sub-Modal */}
      {showScheduleModal && (
        <EMIScheduleModal
          plan={currentPlan}
          productName={product.name}
          onClose={() => setShowScheduleModal(false)}
        />
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <CheckoutModal
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
          plan={currentPlan}
          onClose={() => setShowCheckoutModal(false)}
        />
      )}
    </>
  );
}
