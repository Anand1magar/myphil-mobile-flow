import React from 'react';
export function DeliveryConfirmationSign() {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Confirm you received it</h2>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>Sign below to confirm delivery of your prescription.</p>
      <div style={{ height: 120, borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--mortar-grey)' }}>Sign here</div>
      <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Confirm delivery</button>
    </div>
  );
}
