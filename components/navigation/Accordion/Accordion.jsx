import React, { useState } from 'react';
export function Accordion({ items = [] }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 320, fontFamily: 'var(--font-body)', boxShadow: 'inset 0 0 0 1px var(--fade)', borderRadius: 4, overflow: 'hidden' }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: i ? '1px solid var(--fade)' : 'none' }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'inherit', fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>
            {it.q}
            <span style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▾</span>
          </button>
          {open === i && <div style={{ padding: '0 16px 16px', fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)' }}>{it.a}</div>}
        </div>
      ))}
    </div>
  );
}
