import React from 'react';
export function DrugPrerequisites({ items = [['Insurance','Verified'],['Prescriber confirmation','Received'],['Prior authorization','Needed']] } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Before we can ship</h2>
      {items.map(([k, v]) => {
        const done = v !== 'Needed';
        return (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--pitch)' }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', background: done ? 'var(--foliage)' : 'var(--sun)', flexShrink: 0 }} />{k}
            </span>
            <span style={{ fontSize: 14, color: done ? 'var(--foliage)' : 'var(--gunmetal)' }}>{v}</span>
          </div>
        );
      })}
    </div>
  );
}
