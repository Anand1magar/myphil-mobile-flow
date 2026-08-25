import React from 'react';
export function MissingDelivery() {
  return (
    <div style={{ width: 320, borderRadius: 4, boxShadow: 'inset 0 0 0 1px rgb(209,214,220)', overflow: 'hidden', background: '#fff', fontFamily: 'var(--font-body)' }}>
      <div style={{ background: 'var(--ruby)', color: '#fff', padding: '10px 16px', fontFamily: 'var(--font-brand)', fontWeight: 500, fontSize: 18 }}>Package not delivered</div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>The courier marked your package delivered but you haven't received it. We'll open a claim and reship.</p>
        <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Report missing package</button>
      </div>
    </div>
  );
}
