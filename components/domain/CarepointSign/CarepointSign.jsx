import React from 'react';
export function CarepointSign({ signed = false } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Sign for your prescription</h2>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>A signature is required by your state for this medication.</p>
      <div style={{ height: 120, borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: signed ? '#fff' : 'var(--paper)' }}>
        {signed ? <span style={{ fontFamily: 'cursive', fontSize: 32, color: 'var(--pitch)' }}>Jane Doe</span> : <span style={{ fontSize: 14, color: 'var(--mortar-grey)' }}>Sign here</span>}
      </div>
      <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Submit signature</button>
    </div>
  );
}
