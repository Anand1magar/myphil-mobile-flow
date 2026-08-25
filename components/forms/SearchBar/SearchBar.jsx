import React from 'react';
export function SearchBar({ label, placeholder = 'Search', iconSide = 'left', value, onChange }) {
  const icon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="6.5" stroke="var(--gunmetal)" strokeWidth="1.5"/><path d="M14 14l4 4" stroke="var(--gunmetal)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--pitch)' }}>{label}</span>}
      <div style={{ height: 44, borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px', background: '#fff' }}>
        {iconSide === 'left' && icon}
        <input value={value} onChange={onChange} placeholder={placeholder} style={{ border: 'none', outline: 'none', flex: 1, fontFamily: 'inherit', fontSize: 16, color: 'var(--pitch)' }} />
        {iconSide === 'right' && icon}
      </div>
    </div>
  );
}
