import React from 'react';
export function InsuranceUpload() {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Upload your insurance card</h2>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>Take a photo of the front and back.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        {['Front', 'Back'].map(s => (
          <div key={s} style={{ flex: 1, height: 100, borderRadius: 4, border: '1px dashed var(--mortar-grey)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--gunmetal)', cursor: 'pointer' }}>+ {s}</div>
        ))}
      </div>
      <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Upload and continue</button>
    </div>
  );
}
