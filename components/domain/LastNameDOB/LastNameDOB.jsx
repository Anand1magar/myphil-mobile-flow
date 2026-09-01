import React from 'react';
import { useFocusRing, fieldRing } from '../../forms/useFocusRing.js';
function Field({ label, placeholder }) {
  const { focused, focusProps } = useFocusRing();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)' }}>{label}</span>
      <div style={{ height: 48, borderRadius: 4, boxShadow: fieldRing(focused), display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <input placeholder={placeholder} {...focusProps} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-body)', fontSize: 18 }} />
      </div>
    </div>
  );
}
export function LastNameDOB({ error = false } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Verify it's you</h2>
      <Field label="Last name" placeholder="Doe" />
      <Field label="Date of birth" placeholder="MM/DD/YYYY" />
      {error && <span style={{ fontSize: 16, color: 'var(--ruby)' }}>That doesn't match our records.</span>}
      <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Continue</button>
    </div>
  );
}
