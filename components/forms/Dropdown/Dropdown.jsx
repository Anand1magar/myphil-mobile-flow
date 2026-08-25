import React, { useState } from 'react';
export function Dropdown({ items = ['Item 1','Item 2','Item 3','Item 4','Item 5'], searchable = true, onSelect }) {
  const [q, setQ] = useState('');
  const shown = items.filter(i => i.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ width: 288, borderRadius: 4, background: '#fff', boxShadow: '0 0 0 1px var(--pitch)', paddingBottom: 20, fontFamily: 'var(--font-body)' }}>
      {searchable && <div style={{ height: 48, border: '1px solid var(--gunmetal)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: 16, lineHeight: '24px', letterSpacing: '0.002em', color: 'var(--pitch)' }} />
      </div>}
      {shown.map((i, k) => (
        <div key={k} onClick={() => onSelect && onSelect(i)} style={{ height: 48, padding: '8px 16px', display: 'flex', alignItems: 'center', fontSize: 20, lineHeight: '28px', letterSpacing: '0.002em', color: 'var(--pitch)', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{i}</div>
      ))}
    </div>
  );
}
