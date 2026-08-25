import React from 'react';
export function FirstStep({ label = 'Add your insurance to see your price' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', background: '#fff' }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgb(74,144,226)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>1</span>
      <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{label}</span>
    </div>
  );
}
