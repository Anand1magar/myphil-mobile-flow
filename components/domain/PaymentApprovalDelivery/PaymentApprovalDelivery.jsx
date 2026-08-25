import React from 'react';
export function PaymentApprovalDelivery({ speed = 'Standard', eta = 'Arrives Sep 3–5', cost = 'Free' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Delivery</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>{speed}</div>
          <div style={{ fontSize: 14, color: 'var(--gunmetal)' }}>{eta}</div>
        </div>
        <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--foliage)' }}>{cost}</span>
      </div>
      <a href="#" style={{ fontSize: 16 }}>Change delivery speed</a>
    </div>
  );
}
