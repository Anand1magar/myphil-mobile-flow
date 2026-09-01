import React, { useState } from 'react';
export function Select({ label, options = ['Item 1', 'Item 2', 'Item 3'], value, onChange, placeholder = 'Select an option' }) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(value);
  return (
    <div style={{ width: 288, fontFamily: 'var(--font-body)', position: 'relative' }}>
      {label && <div style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', marginBottom: 8 }}>{label}</div>}
      <div onClick={() => setOpen(o => !o)} style={{ height: 48, borderRadius: 4, boxShadow: open ? '0 0 0 2px var(--sky)' : '0 0 0 1px var(--pitch)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', cursor: 'pointer' }}>
        <span style={{ fontSize: 18, lineHeight: '28px', color: sel ? 'var(--pitch)' : 'var(--gunmetal)' }}>{sel || placeholder}</span>
        <svg width="12" height="8" viewBox="0 0 12 8" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}><path d="M1 1l5 5 5-5" stroke="#0A0A0A" strokeWidth="1.5" fill="none"/></svg>
      </div>
      {open && <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#fff', boxShadow: 'var(--shadow-card)', borderRadius: 4, zIndex: 10 }}>
        {options.map((o, i) => <div key={i} onClick={() => { setSel(o); setOpen(false); onChange && onChange(o); }} style={{ padding: '8px 16px', height: 48, display: 'flex', alignItems: 'center', fontSize: 20, lineHeight: '28px', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{o}</div>)}
      </div>}
    </div>
  );
}
