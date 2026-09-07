import React from 'react';
import { Store, Tag, ArrowRight } from 'lucide-react';

export function PlaceholderTab({ tabName, onSwitchToMarketplace }) {
  const isTopBrands = tabName === 'Top Brands';

  return (
    <div style={{ padding: '24px 16px 40px', textAlign: 'center' }}>
      <div className="section-title" style={{ justifyContent: 'center', marginBottom: '8px' }}>
        {tabName}
      </div>

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
          {isTopBrands ? <Tag size={28} /> : <Store size={28} />}
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
          {tabName} Placeholder
        </h3>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '300px', lineHeight: '1.5', marginBottom: '20px' }}>
          As specified in the assignment requirements, no implementation is required for {tabName}. Switch to <strong>1Fi Marketplace</strong> for the complete product & EMI experience.
        </p>

        <button
          className="btn-primary-purple"
          style={{ width: 'auto', padding: '10px 20px', fontSize: '13px' }}
          onClick={onSwitchToMarketplace}
        >
          <span>Explore 1Fi Marketplace</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
