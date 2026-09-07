import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CheckoutModal({ product, selectedColor, selectedStorage, plan, onClose }) {
  const [step, setStep] = useState(1); // 1: Review, 2: Verification, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);

  const handleApply = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 1000);
  };

  const handleFinalConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = '1FI-ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setStep(3);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback if canvas confetti fails
      }
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          <X size={18} />
        </button>

        {/* STEP 1: Plan Summary & Review */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: '11px', color: 'var(--primary-purple)', fontWeight: '700', textTransform: 'uppercase' }}>
              Step 1 of 2 • Checkout Review
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '14px' }}>
              Confirm Your EMI Plan
            </h3>

            {/* Product Summary */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '14px'
              }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{product.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Variant: {selectedColor?.name || 'Default'} • {selectedStorage?.size || 'Standard'}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-purple)', marginTop: '4px' }}>
                  {formatCurrency(plan.monthlyInstallment)} <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '400' }}>/ month x {plan.tenureMonths} mos</span>
                </div>
              </div>
            </div>

            {/* Payout Breakdown */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Tenure Duration</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{plan.tenureMonths} Months</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Interest Rate</span>
                <span style={{ color: '#059669', fontWeight: '700' }}>{plan.annualInterestRate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Down Payment Required</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>₹0 (Zero)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Processing Fee</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>
                  {plan.processingFee > 0 ? formatCurrency(plan.processingFee) : '₹0 (FREE)'}
                </span>
              </div>

              {plan.savings > 0 && (
                <div
                  style={{
                    padding: '6px 10px',
                    background: '#ecfdf5',
                    borderRadius: '6px',
                    color: '#047857',
                    fontWeight: '700',
                    textAlign: 'center',
                    fontSize: '11px'
                  }}
                >
                  🎉 Saving {formatCurrency(plan.savings)} with 0% No-Cost EMI!
                </div>
              )}
            </div>

            <button
              className="btn-primary-purple"
              onClick={handleApply}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Request...' : 'Proceed to Credit Approval'}
              {!isProcessing && <ArrowRight size={16} />}
            </button>
          </div>
        )}

        {/* STEP 2: Credit Approval */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', padding: '10px 0 16px' }}>
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
                  margin: '0 auto 12px'
                }}
              >
                <ShieldCheck size={32} />
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                Pre-Approved Credit Check Passed!
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '300px', margin: '0 auto' }}>
                Your pre-approved limit covers this order of {formatCurrency(plan.totalPayable)}.
              </p>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '11px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: 'var(--text-primary)', fontWeight: '700' }}>
                <Sparkles size={14} color="var(--primary-purple)" /> Automatic EMI Mandate
              </div>
              <div style={{ color: 'var(--text-muted)', lineHeight: '1.4' }}>
                First monthly installment of <strong>{formatCurrency(plan.monthlyInstallment)}</strong> will be due on the 5th of next month.
              </div>
            </div>

            <button
              className="btn-primary-purple"
              onClick={handleFinalConfirm}
              disabled={isProcessing}
            >
              {isProcessing ? 'Confirming Order...' : 'Authorize & Place EMI Order'}
            </button>
          </div>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '10px 0 10px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px'
              }}
            >
              <CheckCircle2 size={38} />
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              EMI Order Placed!
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Order ID: <strong style={{ color: 'var(--primary-purple)' }}>{orderId}</strong>
            </p>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                textAlign: 'left',
                marginBottom: '16px',
                fontSize: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Product:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{product.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Monthly EMI:</span>
                <span style={{ color: 'var(--primary-purple)', fontWeight: '800' }}>{formatCurrency(plan.monthlyInstallment)} / mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tenure:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{plan.tenureMonths} Months</span>
              </div>
            </div>

            <button className="btn-primary-purple" onClick={onClose}>
              Done & Return to Marketplace
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
