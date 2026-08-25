import React from 'react';
export function StatusBadge({ status = 'in-progress', children }) {
  const map = {
    'in-progress': { bg: '#F4F9FE', fg: 'var(--sky)' },
    'complete': { bg: '#E7F4F0', fg: 'var(--foliage)' },
    'action-needed': { bg: '#FBEAE9', fg: 'var(--ruby)' },
    'pending': { bg: 'var(--paper)', fg: 'var(--gunmetal)' },
  };
  const c = map[status] || map['pending'];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', borderRadius: 99, background: c.bg, color: c.fg, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
      {children}
    </span>
  );
}
