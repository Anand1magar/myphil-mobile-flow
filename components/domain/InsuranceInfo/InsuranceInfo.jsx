import React from 'react';
export function InsuranceInfo({ plan = 'Blue Cross Blue Shield', memberId = 'XZK-994-1120', group = '0084221' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Insurance on file</h2>
      {[['Plan', plan], ['Member ID', memberId], ['Group', group]].map(([k, v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
          <span style={{ color: 'var(--gunmetal)' }}>{k}</span><span style={{ fontWeight: 700, color: 'var(--pitch)' }}>{v}</span>
        </div>
      ))}
    </div>
  );
}
