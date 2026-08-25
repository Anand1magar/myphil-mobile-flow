import React from 'react';
export function Checkbox({ label, checked = false, onChange, disabled = false }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', opacity: disabled ? 0.5 : 1 }}>
      <span style={{ width: 24, height: 24, borderRadius: 4, boxShadow: checked ? 'none' : '0 0 0 1px var(--gunmetal)', background: checked ? 'var(--sky)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ display: 'none' }} />
      {label && <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{label}</span>}
    </label>
  );
}
