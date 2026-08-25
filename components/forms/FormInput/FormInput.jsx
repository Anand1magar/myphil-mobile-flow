import React from 'react';
export function FormInput({ type = 'text', label = 'Label' } = {}) {
  return (
    <div style={{ width: 288, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--pitch)' }}>{label}</span>
      {type === 'textarea'
        ? <textarea rows={3} placeholder="Type here" style={{ borderRadius: 4, border: 'none', boxShadow: '0 0 0 1px var(--fade)', padding: 12, fontFamily: 'inherit', fontSize: 16, resize: 'vertical', outline: 'none' }} />
        : <input placeholder="Type here" style={{ height: 44, borderRadius: 4, border: 'none', boxShadow: '0 0 0 1px var(--fade)', padding: '0 12px', fontFamily: 'inherit', fontSize: 16, outline: 'none' }} />}
    </div>
  );
}
