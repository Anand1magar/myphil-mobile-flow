import React from 'react';
export function SavingsCard({ program = 'Manufacturer savings card', memberId = 'MP-4820-3391', savings = '84' }) {
  return (
    <div style={{ width: 320, borderRadius: 8, background: 'var(--foliage)', color: '#fff', padding: 20, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 18 }}>{program}</span>
      <span style={{ fontSize: 40, fontWeight: 900, lineHeight: '100%' }}>{'$' + savings}<span style={{ fontSize: 16, fontWeight: 400 }}> saved</span></span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.8 }}>Member ID</span>
        <span style={{ fontSize: 16, fontWeight: 700 }}>{memberId}</span>
      </div>
    </div>
  );
}
