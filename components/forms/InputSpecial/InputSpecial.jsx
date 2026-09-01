import React from 'react';
import { useFocusRing } from '../useFocusRing.js';
function Cell({ border }) {
  const { focused, focusProps } = useFocusRing();
  return (
    <input maxLength={1} {...focusProps} style={{ width: 40, height: 48, borderRadius: 4, border: 'none', boxShadow: focused ? '0 0 0 2px var(--sky)' : '0 0 0 1px ' + border, textAlign: 'center', fontFamily: 'inherit', fontSize: 18, color: 'var(--pitch)', outline: 'none' }} />
  );
}
export function InputSpecial({ label = 'Verification code', length = 6, state = 'default' }) {
  const border = { default: 'var(--pitch)', error: 'var(--ruby)', verified: 'var(--foliage)', filled: 'var(--pitch)' }[state];
  return (
    <div style={{ fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)' }}>{label}</span>
      <div style={{ display: 'flex', gap: 8 }}>
        {Array.from({ length }).map((_, i) => (
          <Cell key={i} border={border} />
        ))}
      </div>
    </div>
  );
}
