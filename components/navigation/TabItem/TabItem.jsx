import React from 'react';
export function TabItem({ label = 'Prescriptions', active = false, icon = null, onClick }) {
  return (
    <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 12px', borderBottom: active ? '2px solid var(--sky)' : '2px solid transparent', fontFamily: 'var(--font-body)', color: active ? 'var(--sky)' : 'var(--gunmetal)' }}>
      {icon}
      <span style={{ fontWeight: 700, fontSize: 14 }}>{label}</span>
    </button>
  );
}
