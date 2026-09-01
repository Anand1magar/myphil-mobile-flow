import React from 'react';

// Matches the Figma "Radio Buttons" component: a bordered card whose background
// and border shift on selection, with an optional gray supporting line.
// Pass `borderless` for a plain radio row (no card chrome).
export function Radio({ label, supportingText, checked = false, onChange, disabled = false, name, borderless = false }) {
  return (
    <label
      style={{
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        alignItems: 'center',
        gap: 8,
        padding: borderless ? '0 0 8px' : '18px 16px',
        borderRadius: borderless ? 0 : 4,
        border: borderless ? 'none' : `1px solid ${checked ? 'var(--sky)' : 'var(--fade)'}`,
        background: borderless ? 'transparent' : checked ? 'var(--sky-tint)' : 'var(--pure)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-body)',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{ width: 24, height: 24, borderRadius: '50%', boxSizing: 'border-box', border: `2px solid ${checked ? 'var(--sky)' : 'var(--gunmetal)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--sky)' }} />}
      </span>
      <input type="radio" name={name} checked={checked} onChange={onChange} disabled={disabled} style={{ display: 'none' }} />
      {(label || supportingText) && (
        <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {label && <span style={{ fontSize: 16, lineHeight: '24px', letterSpacing: '0.024px', color: 'var(--pitch)' }}>{label}</span>}
          {supportingText && <span style={{ fontSize: 14, lineHeight: '20px', letterSpacing: '0.035px', color: 'var(--gunmetal)' }}>{supportingText}</span>}
        </span>
      )}
    </label>
  );
}
