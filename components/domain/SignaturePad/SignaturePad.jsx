import React from 'react';
export function SignaturePad({ signed = false, name = '' }) {
  return (
    <div style={{ width: 288, fontFamily: 'var(--font-body)' }}>
      <div style={{ height: 120, borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: signed ? '#fff' : 'var(--paper)' }}>
        {signed ? <span style={{ fontFamily: 'cursive', fontSize: 32, color: 'var(--pitch)' }}>{name || 'Signature'}</span> : <span style={{ color: 'var(--mortar-grey)', fontSize: 14 }}>Sign here</span>}
      </div>
      <div style={{ marginTop: 8, height: 1, background: 'var(--pitch)' }} />
    </div>
  );
}
