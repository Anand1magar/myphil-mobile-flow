import React from 'react';
export function WelcomeMsg({ name = 'Jane', drug = 'Atorvastatin 20mg' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Welcome, {name}</h2>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>Your prescriber sent us a prescription for <strong style={{ color: 'var(--pitch)' }}>{drug}</strong>. Let's get it on its way.</p>
    </div>
  );
}
