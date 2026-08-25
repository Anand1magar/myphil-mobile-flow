import React from 'react';
export function ConfirmInformation({ rows = [['Name','Jane Doe'],['Date of birth','04/12/1984'],['Phone','(555) 123-4567']] } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Confirm your information</h2>
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
          <span style={{ color: 'var(--gunmetal)' }}>{k}</span><span style={{ fontWeight: 700, color: 'var(--pitch)' }}>{v}</span>
        </div>
      ))}
      <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>This is correct</button>
    </div>
  );
}
