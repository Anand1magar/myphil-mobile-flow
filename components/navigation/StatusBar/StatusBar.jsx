import React from 'react';
export function StatusBar({ theme = 'light', transparent = false } = {}) {
  return (
    <div style={{ width: 320, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, background: transparent ? 'transparent' : (theme === 'dark' ? 'var(--pitch)' : '#fff'), color: theme === 'dark' ? '#fff' : 'var(--pitch)' }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span style={{ width: 17, height: 11, borderRadius: 2, boxShadow: 'inset 0 0 0 1px currentColor', opacity: 0.6 }} />
        <span style={{ width: 22, height: 11, borderRadius: 3, boxShadow: 'inset 0 0 0 1px currentColor' }} />
      </span>
    </div>
  );
}
