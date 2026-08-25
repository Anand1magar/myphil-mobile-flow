import React from 'react';
export function PaymentMethod({ brand = 'Mastercard', last4 = '4242', hsa = false } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Payment method</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 40, height: 26, borderRadius: 4, background: 'var(--paper)', boxShadow: 'inset 0 0 0 1px var(--fade)', flexShrink: 0 }} />
        <span style={{ fontSize: 16, color: 'var(--pitch)' }}>{brand} ending {last4}</span>
      </div>
      {hsa && <span style={{ fontSize: 14, color: 'var(--foliage)' }}>HSA/FSA card detected</span>}
    </div>
  );
}
