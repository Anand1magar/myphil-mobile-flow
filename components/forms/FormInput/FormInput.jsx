import React from 'react';
import { useFocusRing, fieldRing } from '../useFocusRing.js';
export function FormInput({ type = 'text', label = 'Label' } = {}) {
  const { focused, focusProps } = useFocusRing();
  return (
    <div style={{ width: 288, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--pitch)' }}>{label}</span>
      {type === 'textarea'
        ? <textarea rows={3} placeholder="Type here" {...focusProps} style={{ borderRadius: 4, border: 'none', boxShadow: fieldRing(focused, 'var(--fade)'), padding: 12, fontFamily: 'inherit', fontSize: 16, resize: 'vertical', outline: 'none' }} />
        : <input placeholder="Type here" {...focusProps} style={{ height: 44, borderRadius: 4, border: 'none', boxShadow: fieldRing(focused, 'var(--fade)'), padding: '0 12px', fontFamily: 'inherit', fontSize: 16, outline: 'none' }} />}
    </div>
  );
}
