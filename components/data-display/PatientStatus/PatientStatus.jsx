import React from 'react';
export function PatientStatus({ name = 'Jane Doe', rx = 'Atorvastatin 20mg', status = 'In progress' }) {
  return (
    <div style={{ width: 340, display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', fontFamily: 'var(--font-body)', background: '#fff' }}>
      <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--sky)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500, fontSize: 16, flexShrink: 0 }}>{name.split(' ').map(w => w[0]).join('')}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>{name}</div>
        <div style={{ fontSize: 14, color: 'var(--gunmetal)' }}>{rx}</div>
      </div>
      <span style={{ padding: '4px 12px', borderRadius: 99, background: 'var(--sky-tint)', color: 'var(--sky)', fontWeight: 700, fontSize: 12, letterSpacing: '0.02em' }}>{status}</span>
    </div>
  );
}
