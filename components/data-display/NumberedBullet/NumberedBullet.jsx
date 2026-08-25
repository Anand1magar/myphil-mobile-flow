import React from 'react';
export function NumberedBullet({ value = 1, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-body)' }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgb(74,144,226)', boxShadow: 'inset 0 0 0 1px #fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 18, lineHeight: '26px', flexShrink: 0 }}>{value}</span>
      {label && <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{label}</span>}
    </div>
  );
}
