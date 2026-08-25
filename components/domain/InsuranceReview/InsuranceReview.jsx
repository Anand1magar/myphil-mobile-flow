import React from 'react';
export function InsuranceReview({ state = 'verified' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Insurance review</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: state === 'verified' ? 'var(--foliage)' : 'var(--sun)', flexShrink: 0 }} />
        <span style={{ fontSize: 16, color: 'var(--pitch)' }}>{state === 'verified' ? 'Verified — your plan covers this medication.' : 'Still checking with your plan.'}</span>
      </div>
    </div>
  );
}
