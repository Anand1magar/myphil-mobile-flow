import React from 'react';
export function ActionBox({ title = 'Action required', tone = 'info', children, cta }) {
  const bg = { info: '#4A90E2', warning: 'var(--sun)', danger: 'var(--ruby)' }[tone] || '#4A90E2';
  const fg = tone === 'warning' ? 'var(--pitch)' : '#fff';
  return (
    <div style={{ width: 288, borderRadius: 4, boxShadow: 'inset 0 0 0 1px rgb(209,214,220)', overflow: 'hidden', background: '#fff', fontFamily: 'var(--font-body)' }}>
      <div style={{ background: bg, color: fg, padding: '10px 16px', display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-brand)', fontWeight: 500, fontSize: 18, lineHeight: '24px' }}>{title}</div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>
        {children}
        {cta && <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>{cta}</button>}
      </div>
    </div>
  );
}
