import React from 'react';
export function InfoBox({ type = 'info', children }) {
  const map = { info: { bg: 'var(--sky-tint)', border: '#A7C1E7' }, discount: { bg: '#D5F1F0', border: 'var(--grass)' } };
  const c = map[type] || map.info;
  return (
    <div style={{ width: 320, borderRadius: 4, background: c.bg, boxShadow: `inset 0 0 0 1px ${c.border}`, padding: 16, fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>
      {children}
    </div>
  );
}
