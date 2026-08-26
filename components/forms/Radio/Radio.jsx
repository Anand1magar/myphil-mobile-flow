import React from 'react';
export function Radio({ label, checked = false, onChange, disabled = false, name }) {
  return (
    <label style={{ display: 'flex', width: '100%', boxSizing: 'border-box', alignItems: 'flex-start', gap: 10, paddingBottom: 8, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', opacity: disabled ? 0.5 : 1 }}>
      <span style={{ width: 24, height: 24, borderRadius: '50%', boxShadow: '0 0 0 1px var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--sky)' }} />}
      </span>
      <input type="radio" name={name} checked={checked} onChange={onChange} disabled={disabled} style={{ display: 'none' }} />
      {label && <span style={{ flex: 1, fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{label}</span>}
    </label>
  );
}
