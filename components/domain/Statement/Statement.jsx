import React from 'react';
export function Statement({ lines = [], total }) {
  return (
    <div style={{ width: 340, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, background: '#fff' }}>
      {lines.map((l, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: 'var(--gunmetal)' }}>
          <span>{l.label}</span><span>{l.value}</span>
        </div>
      ))}
      <div style={{ height: 1, background: 'var(--fade)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: 'var(--pitch)' }}>
        <span>Total due</span><span>{total}</span>
      </div>
    </div>
  );
}
