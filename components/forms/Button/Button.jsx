import React from 'react';
const SIZE = { sm: { h: 40, pad: '8px 14px', font: 16 }, md: { h: 48, pad: '12px 16px', font: 18 }, block: { h: 48, pad: '12px 16px', font: 18 } };
export function Button({ hierarchy = 'primary', size = 'md', disabled = false, icon = null, iconPosition = 'left', fullWidth = false, children, onClick, type = 'button' }) {
  const s = SIZE[size] || SIZE.md;
  const base = { fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: s.font, lineHeight: '24px', letterSpacing: '0.02em', borderRadius: 'var(--radius-sm)', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: s.pad, minWidth: 124, maxWidth: fullWidth ? 'none' : 288, width: fullWidth ? '100%' : undefined, boxSizing: 'border-box', transition: 'background-color .15s ease, color .15s ease, box-shadow .15s ease' };
  const variants = {
    primary: disabled ? { background: 'var(--sky-disabled)', color: '#fff', boxShadow: 'inset 0 0 0 1px var(--sky-disabled)' } : { background: 'var(--sky)', color: '#fff', boxShadow: 'inset 0 0 0 1px var(--sky)' },
    secondary: disabled ? { background: 'transparent', color: 'var(--sky-disabled)', boxShadow: 'inset 0 0 0 1px var(--sky-disabled)' } : { background: 'transparent', color: 'var(--sky)', boxShadow: 'inset 0 0 0 1px var(--sky)' },
    tertiary: disabled ? { background: '#fff', color: 'var(--fade)', boxShadow: 'inset 0 0 0 1px var(--fade)' } : { background: '#fff', color: 'var(--gunmetal)', boxShadow: 'inset 0 0 0 1px var(--gunmetal)' },
    link: { background: 'transparent', color: disabled ? 'var(--sky-disabled)' : 'var(--sky)', textDecoration: 'underline', fontWeight: 400, minWidth: 'auto', maxWidth: 'none', justifyContent: 'flex-start', padding: 0, height: 24 },
  };
  const hoverBg = { primary: 'var(--sky-hover)' };
  const [hover, setHover] = React.useState(false);
  const v = variants[hierarchy] || variants.primary;
  const style = { ...base, ...v, height: hierarchy === 'link' ? 24 : s.h };
  if (hover && !disabled && hierarchy === 'primary') style.background = 'var(--sky-hover)';
  if (hover && !disabled && hierarchy === 'secondary') style.background = 'var(--sky-tint)';
  if (hover && !disabled && hierarchy === 'tertiary') style.background = 'var(--paper)';
  return React.createElement('button', { type, disabled, onClick, style, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) },
    icon && iconPosition === 'left' ? icon : null,
    React.createElement('span', null, children),
    icon && iconPosition === 'right' ? icon : null);
}
