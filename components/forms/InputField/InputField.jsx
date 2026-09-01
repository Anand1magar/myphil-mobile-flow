import React from 'react';
import { useFocusRing } from '../useFocusRing.js';
export function InputField({ position = 'default', state = 'default', placeholder = 'Placeholder' } = {}) {
  const { focused, focusProps } = useFocusRing();
  const active = focused || state === 'focus';
  const restColor = { default: 'var(--pitch)', focus: 'var(--sky)', error: 'var(--ruby)', verified: 'var(--foliage)', filled: 'var(--pitch)' }[state];
  return (
    <div style={{ width: 288, height: 48, display: 'flex', alignItems: 'center', padding: '8px 16px', fontFamily: 'var(--font-body)', background: '#fff', boxShadow: '0 0 0 ' + (active ? '2px var(--sky)' : '1px ' + restColor), borderRadius: ({ default: 4, top: '4px 4px 0 0', middle: 0, bottom: '0 0 4px 4px' })[position] }}>
      <input placeholder={placeholder} {...focusProps} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: 18, lineHeight: '28px', color: 'var(--pitch)' }} />
    </div>
  );
}
