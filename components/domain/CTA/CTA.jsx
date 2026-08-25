import React from 'react';
export function CTA({ label = 'Approve and pay $24.99', note = 'You can cancel any time before it ships.', special = false } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button style={{ height: 48, borderRadius: 4, background: special ? 'var(--foliage)' : 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>{label}</button>
      {note && <span style={{ fontSize: 14, color: 'var(--gunmetal)', textAlign: 'center' }}>{note}</span>}
    </div>
  );
}
