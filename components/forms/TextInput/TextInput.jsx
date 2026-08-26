import React, { useState } from 'react';
export function TextInput({ label, placeholder = 'Placeholder', state = 'default', helperText, icon = null, value, onChange, type = 'text' }) {
  const [focused, setFocused] = useState(false);
  const effState = focused ? 'focused' : state;
  const borderColor = { default: 'var(--pitch)', focused: 'var(--sky)', error: 'var(--ruby)', verified: 'var(--foliage)', filled: 'var(--pitch)' }[effState];
  const helperColor = effState === 'error' ? 'var(--ruby)' : 'var(--gunmetal)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-body)' }}>
      {label && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', letterSpacing: '0.002em', color: 'var(--pitch)' }}>{label}</span>
      </div>}
      <div style={{ height: 48, borderRadius: 4, boxShadow: `0 0 0 1px ${borderColor}`, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', background: state === 'filled' ? 'var(--paper)' : 'transparent' }}>
        {icon}
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 18, lineHeight: '28px', letterSpacing: '0.002em', color: 'var(--pitch)' }} />
      </div>
      {helperText && <span style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '0.002em', color: helperColor }}>{helperText}</span>}
    </div>
  );
}
