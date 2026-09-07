import React from 'react';
import { X, Calendar, ShieldCheck } from 'lucide-react';

export function EMIScheduleModal({ plan, productName, onClose }) {
  if (!plan) return null;

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <button className="modal-close-icon" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--primary-purple)', fontWeight: '700', textTransform: 'uppercase' }}>
            1Fi Repayment Timeline
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
            {plan.tenureMonths}-Month EMI Schedule
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{productName}</p>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
          {plan.schedule.map((item) => (
            <div
              key={item.monthNumber}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'var(--primary-purple-subtle)',
                    color: 'var(--primary-purple)',
                    fontWeight: '800',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  #{item.monthNumber}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Installment {item.monthNumber}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={10} /> Due by {item.dueDate}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-purple)' }}>
                {formatCurrency(item.amount)}
              </div>
            </div>
          ))}
        </div>

        {/* Auto Debit Banner */}
        <div
          style={{
            marginTop: '16px',
            padding: '10px 12px',
            background: '#ecfdf5',
            border: '1px dashed #059669',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: '#047857'
          }}
        >
          <ShieldCheck size={16} />
          <span>Auto-debit from your linked 1Fi mandate on due dates.</span>
        </div>
      </div>
    </div>
  );
}
