import React from 'react';
export function DropdownElements({ label = 'Item 1', state = 'default' } = {}) {
  return (
    <div style={{ width: 288, height: 48, padding: '8px 16px', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: '28px', letterSpacing: '0.002em', color: 'var(--pitch)', background: state === 'hover' ? 'var(--paper)' : '#fff', boxShadow: 'inset 0 0 0 1px var(--fade)', cursor: 'pointer' }}>
      {label}
    </div>
  );
}
