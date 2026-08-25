import React from 'react';
export function InputField({ position = 'default', state = 'default', placeholder = 'Placeholder' } = {}) {
  return (
    <div style={{ width: 288, height: 48, display: 'flex', alignItems: 'center', padding: '8px 16px', fontFamily: 'var(--font-body)', background: '#fff', boxShadow: '0 0 0 1px ' + ({ default: 'var(--pitch)', focus: 'var(--sky)', error: 'var(--ruby)', verified: 'var(--foliage)', filled: 'var(--pitch)' }[state]), borderRadius: ({ default: 4, top: '4px 4px 0 0', middle: 0, bottom: '0 0 4px 4px' })[position] }}>
      <input placeholder={placeholder} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: 18, lineHeight: '28px', color: 'var(--pitch)' }} />
    </div>
  );
}
