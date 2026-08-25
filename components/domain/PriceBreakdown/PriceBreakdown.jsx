import React, { useState } from 'react';
export function PriceBreakdown({ items = [], total }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', padding: 16, background: '#fff' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--pitch)' }}>Total cost</span>
        <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--pitch)' }}>${total}</span>
      </button>
      {open && <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--gunmetal)' }}>
            <span>{it.label}</span><span>${it.value}</span>
          </div>
        ))}
      </div>}
      <div onClick={() => setOpen(o => !o)} style={{ marginTop: 8, fontSize: 14, color: 'var(--sky)', cursor: 'pointer', textDecoration: 'underline' }}>{open ? 'See less' : 'See breakdown'}</div>
    </div>
  );
}
