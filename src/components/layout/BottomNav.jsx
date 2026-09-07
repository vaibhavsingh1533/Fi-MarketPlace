import React from 'react';
import { Home, Store, Receipt, TrendingUp, User } from 'lucide-react';

export function BottomNav({ activeNav = 'Shop', onNavClick }) {
  const navItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Shop', label: 'Shop', icon: Store },
    { id: 'EMI Dues', label: 'EMI Dues', icon: Receipt },
    { id: 'Limit', label: 'Limit', icon: TrendingUp },
    { id: 'Profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="bottom-nav-bar" aria-label="Bottom Navigation">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeNav === item.id;
        return (
          <button
            key={item.id}
            id={`nav-item-${item.id.toLowerCase().replace(/\s+/g, '-')}`}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavClick && onNavClick(item.id)}
          >
            <IconComponent size={20} color={isActive ? 'var(--primary-purple)' : '#6B7280'} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
