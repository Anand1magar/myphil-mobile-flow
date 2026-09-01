import React from 'react';
export function NumberedBullet({ value = 1, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-body)' }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--slime)', border: '2px solid var(--foliage)', color: 'var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, lineHeight: '24px', letterSpacing: '0.02em', flexShrink: 0 }}>{value}</span>
      {label && <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{label}</span>}
    </div>
  );
}
