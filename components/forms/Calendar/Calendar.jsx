import React, { useState } from 'react';
export function Calendar({ month = 'September 2026', selected = 3 }) {
  const [sel, setSel] = useState(selected);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div style={{ width: 288, borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', background: '#fff', padding: 16, fontFamily: 'var(--font-body)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>{month}</span>
        <span style={{ color: 'var(--gunmetal)', fontSize: 14 }}>&lsaquo; &rsaquo;</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {['S','M','T','W','T','F','S'].map((d, i) => <span key={i} style={{ textAlign: 'center', fontSize: 11, color: 'var(--mortar-grey)' }}>{d}</span>)}
        {days.map(d => (
          <button key={d} onClick={() => setSel(d)} style={{ height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, background: sel === d ? 'var(--sky)' : 'transparent', color: sel === d ? '#fff' : 'var(--pitch)' }}>{d}</button>
        ))}
      </div>
    </div>
  );
}
