import React from 'react';
export function OrderSummary({ drug = 'Atorvastatin 20mg', qty = '30 tablets', refills = '3 refills left', total = '$24.99' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Order summary</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>{drug}</span>
        <span style={{ fontSize: 14, color: 'var(--gunmetal)' }}>{qty} · {refills}</span>
      </div>
      <div style={{ height: 1, background: 'var(--fade)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18, color: 'var(--pitch)' }}>
        <span>Total due</span><span>{total}</span>
      </div>
    </div>
  );
}
