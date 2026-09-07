import React from 'react';
import { Check } from 'lucide-react';

export function VariantSelector({
  variants,
  selectedColor,
  onSelectColor,
  selectedStorage,
  onSelectStorage
}) {
  if (!variants) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '14px 0' }}>
      {/* Color Selection */}
      {variants.colors && variants.colors.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Color: <span style={{ color: 'var(--text-primary)' }}>{selectedColor?.name || 'Default'}</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {variants.colors.map((color) => {
              const isSelected = selectedColor?.name === color.name;
              return (
                <button
                  key={color.name}
                  id={`color-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--primary-purple-subtle)' : '#f8fafc',
                    border: isSelected ? '1px solid var(--primary-purple)' : '1px solid var(--border-light)',
                    color: isSelected ? 'var(--primary-purple)' : 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: isSelected ? '700' : '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onClick={() => onSelectColor(color)}
                >
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: '1px solid rgba(0,0,0,0.15)'
                    }}
                  />
                  <span>{color.name}</span>
                  {isSelected && <Check size={12} color="var(--primary-purple)" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Storage / Spec Selection */}
      {variants.storages && variants.storages.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
            Storage / Spec: <span style={{ color: 'var(--text-primary)' }}>{selectedStorage?.size || 'Standard'}</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {variants.storages.map((storage) => {
              const isSelected = selectedStorage?.size === storage.size;
              const formatOffset =
                storage.priceOffset > 0
                  ? ` (+₹${storage.priceOffset.toLocaleString('en-IN')})`
                  : '';
              return (
                <button
                  key={storage.size}
                  id={`storage-${storage.size.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--primary-purple-subtle)' : '#f8fafc',
                    border: isSelected ? '1px solid var(--primary-purple)' : '1px solid var(--border-light)',
                    color: isSelected ? 'var(--primary-purple)' : 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: isSelected ? '700' : '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onClick={() => onSelectStorage(storage)}
                >
                  <span>
                    {storage.size}
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>{formatOffset}</span>
                  </span>
                  {isSelected && <Check size={12} color="var(--primary-purple)" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
