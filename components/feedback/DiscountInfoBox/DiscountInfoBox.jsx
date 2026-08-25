import React from 'react';
export function DiscountInfoBox({ savings = '84', cta = 'See how' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, background: '#D5F1F0', boxShadow: 'inset 0 0 0 1px var(--grass)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--pitch)' }}>{'You saved $' + savings}</span>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>A manufacturer coupon was applied to this fill automatically.</p>
      {cta && <a href="#" style={{ fontSize: 16, color: 'var(--foliage)' }}>{cta}</a>}
    </div>
  );
}
