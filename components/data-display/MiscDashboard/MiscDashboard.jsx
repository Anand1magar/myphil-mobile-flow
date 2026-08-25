import React from 'react';
export function MiscDashboard({ label = 'Prescriptions in review', value = '128', tone = 'default' } = {}) {
  return (
    <div style={{ width: 200, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gunmetal)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-spec)', fontWeight: 700, fontSize: 36, lineHeight: '100%', color: tone === 'alert' ? 'var(--ruby)' : 'var(--pitch)' }}>{value}</span>
    </div>
  );
}
