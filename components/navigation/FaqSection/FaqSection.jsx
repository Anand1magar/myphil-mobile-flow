import React from 'react';
export function FaqSection({ title = 'Frequently asked questions', items = [] } = {}) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ width: 340, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>{title}</h2>
      <div style={{ borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div key={i} style={{ borderTop: i ? '1px solid var(--fade)' : 'none' }}>
            <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 16, display: 'flex', justifyContent: 'space-between', fontFamily: 'inherit', fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>
              {it.q}<span>{open === i ? '\u2212' : '+'}</span>
            </button>
            {open === i && <p style={{ margin: 0, padding: '0 16px 16px', fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)' }}>{it.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
