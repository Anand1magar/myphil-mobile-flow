import React from 'react';
export function Header({ variant = 'dashboard', userName = 'Jane Doe' }) {
  const dark = variant === 'website';
  return (
    <header style={{ height: 60, background: dark ? 'var(--pitch)' : '#fff', borderBottom: dark ? 'none' : '1px solid var(--fade)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', fontFamily: 'var(--font-body)' }}>
      <img src="../../assets/logos/myphil-wordmark-white.svg" alt="My Phil" style={{ height: 24, filter: dark ? 'none' : 'invert(1) brightness(0.1)' }} />
      <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {['Prescriptions','Profile','Support'].map(l => <a key={l} href="#" style={{ color: dark ? '#fff' : 'var(--pitch)', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>{l}</a>)}
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--sky)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500, fontSize: 14 }}>{userName.split(' ').map(w=>w[0]).join('')}</div>
      </nav>
    </header>
  );
}
