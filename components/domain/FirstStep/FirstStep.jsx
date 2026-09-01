import React from 'react';
export function FirstStep({ label = 'Add your insurance to see your price' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', background: '#fff' }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--slime)', border: '2px solid var(--foliage)', color: 'var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, lineHeight: '24px', letterSpacing: '0.02em', flexShrink: 0 }}>1</span>
      <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{label}</span>
    </div>
  );
}
