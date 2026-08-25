import React from 'react';
export function Checklist({ items = [] }) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="10" cy="10" r="10" fill="var(--foliage)"/><path d="M5.5 10.5l3 3 6-6.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{it}</span>
        </div>
      ))}
    </div>
  );
}
