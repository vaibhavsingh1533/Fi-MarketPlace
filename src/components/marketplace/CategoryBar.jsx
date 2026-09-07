import React from 'react';

const CATEGORIES = ['All', 'Mobiles', 'Laptops', 'Audio', 'Smartwatches'];

export function CategoryBar({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-chips-bar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          id={`cat-chip-${cat.toLowerCase()}`}
          className={`chip-item ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
