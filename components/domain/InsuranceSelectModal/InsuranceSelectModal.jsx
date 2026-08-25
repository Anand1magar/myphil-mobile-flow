import React from 'react';
export function InsuranceSelectModal({ plans = ['Aetna','Blue Cross Blue Shield','Cigna','Humana','United Healthcare'] } = {}) {
  const [sel, setSel] = React.useState(null);
  return (
    <div style={{ width: 360, borderRadius: 8, background: '#fff', boxShadow: 'var(--shadow-modal)', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--fade)', fontWeight: 700, fontSize: 20, color: 'var(--pitch)' }}>Select your insurance</div>
      {plans.map((p, i) => (
        <div key={p} onClick={() => setSel(p)} style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', borderTop: i ? '1px solid var(--fade)' : 'none', background: sel === p ? 'var(--sky-tint)' : '#fff' }}>
          <span style={{ width: 20, height: 20, borderRadius: '50%', boxShadow: '0 0 0 1px var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {sel === p && <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--sky)' }} />}
          </span>
          <span style={{ fontSize: 16, color: 'var(--pitch)' }}>{p}</span>
        </div>
      ))}
    </div>
  );
}
