import React from 'react';
export function Signature({ state = 'empty' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 120, borderRadius: 4, boxShadow: '0 0 0 1px ' + (state === 'error' ? 'var(--ruby)' : 'var(--fade)'), background: state === 'signed' ? '#fff' : 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {state === 'signed' ? <span style={{ fontFamily: 'cursive', fontSize: 32, color: 'var(--pitch)' }}>Jane Doe</span> : <span style={{ fontSize: 14, color: 'var(--mortar-grey)' }}>Sign here</span>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, color: state === 'error' ? 'var(--ruby)' : 'var(--gunmetal)' }}>{state === 'error' ? 'A signature is required.' : 'Use your finger or mouse'}</span>
        <a href="#" style={{ fontSize: 14 }}>Clear</a>
      </div>
    </div>
  );
}
