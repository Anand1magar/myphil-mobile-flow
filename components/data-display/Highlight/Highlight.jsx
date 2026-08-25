import React from 'react';
export function Highlight({ point = 'left', children }) {
  const tail = { left: { left: -6, top: 'calc(50% - 6px)' }, right: { right: -6, top: 'calc(50% - 6px)' }, up: { top: -6, left: 'calc(50% - 6px)' }, down: { bottom: -6, left: 'calc(50% - 6px)' } }[point];
  return (
    <div style={{ position: 'relative', maxWidth: 260, background: 'var(--pitch)', color: '#fff', borderRadius: 4, padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: '20px' }}>
      <span style={{ position: 'absolute', width: 12, height: 12, background: 'var(--pitch)', transform: 'rotate(45deg)', ...tail }} />
      {children}
    </div>
  );
}
