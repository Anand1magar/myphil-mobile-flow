import React from 'react';
export function HeaderPagination({ step = 2, total = 5, label = 'Insurance' }) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--gunmetal)' }}>
        <span>{label}</span><span>Step {step} of {total}</span>
      </div>
      <div style={{ height: 4, borderRadius: 99, background: 'var(--base)', overflow: 'hidden' }}>
        <div style={{ width: ((step / total) * 100) + '%', height: '100%', background: 'var(--sky)' }} />
      </div>
    </div>
  );
}
