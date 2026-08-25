import React from 'react';
export function MDDashButton({ status = 'primary', size = 'md', state = 'idle', children } = {}) {
  return (
    <button disabled={state === 'disabled'} style={{
      height: size === 'lg' ? 48 : size === 'sm' ? 32 : 40,
      minWidth: 100,
      width: size === 'block' ? '100%' : undefined,
      padding: '0 16px',
      borderRadius: 4,
      border: 'none',
      cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      ...({
        primary: { background: state === 'disabled' ? 'var(--sky-disabled)' : 'var(--sky)', color: '#fff' },
        secondary: { background: 'transparent', color: 'var(--sky)', boxShadow: 'inset 0 0 0 1px var(--sky)' },
        muted: { background: 'var(--paper)', color: 'var(--gunmetal)' },
        back: { background: 'transparent', color: 'var(--gunmetal)' },
        danger: { background: 'var(--ruby)', color: '#fff' },
      }[status]),
    }}>{children}</button>
  );
}
