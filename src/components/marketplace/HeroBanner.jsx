import React from 'react';
import { Percent, ShieldCheck, Zap } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="hero-banner">
      <div className="hero-tag">
        <Percent size={12} />
        <span>1Fi Special Offer</span>
      </div>

      <h2 className="hero-title">
        Upgrade to Latest Tech with <span style={{ color: 'var(--primary-cyan)' }}>0% Interest EMI</span>
      </h2>

      <p className="hero-sub">
        Zero down payment. Instant pre-approval against your 1Fi Credit Limit.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '14px',
          fontSize: '11px',
          color: 'var(--text-muted)',
          fontWeight: '600'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Zap size={14} color="var(--primary-mint)" /> No Processing Fees
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} color="var(--primary-cyan)" /> 100% Digital Process
        </span>
      </div>
    </div>
  );
}
