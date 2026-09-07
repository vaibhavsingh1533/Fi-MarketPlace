import React from 'react';
import { Sparkles } from 'lucide-react';

export function HeroBanner() {
  return (
    <div className="hero-banner-1fi">
      <div className="hero-pill-badge">
        <Sparkles size={12} />
        <span>NO-COST EMIs</span>
      </div>

      <h1 className="hero-heading">
        Shop today,<br />
        <em>Pay later using</em><br />
        Mutual funds.
      </h1>

      <p className="hero-subtitle">
        No credit score required. No interest. Backed by your investments.
      </p>
    </div>
  );
}
