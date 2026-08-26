import React from 'react';
export function NextSteps({ title = "What's next", steps = [] }) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 16, padding: 16, borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', background: '#fff' }}>
      <span style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)' }}>{title}</span>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgb(74,144,226)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{i + 1}</span>
          <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{s}</span>
        </div>
      ))}
    </div>
  );
}
