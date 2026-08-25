import React from 'react';
export function PartsUpdates({ news = 'shipped', title = 'Your order shipped', time = '2h ago' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', gap: 12, padding: 16, borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', background: '#fff' }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', marginTop: 6, flexShrink: 0, background: ({ shipped: 'var(--sky)', delivered: 'var(--foliage)', issue: 'var(--ruby)', pending: 'var(--mortar-grey)' })[news] }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>{title}</span>
        <span style={{ fontSize: 14, color: 'var(--gunmetal)' }}>{time}</span>
      </div>
    </div>
  );
}
