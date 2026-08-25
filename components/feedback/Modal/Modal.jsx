import React from 'react';
export function Modal({ open, onClose, title, children, size = 'sm' }) {
  if (!open) return null;
  const width = size === 'sm' ? 400 : size === 'md' ? 560 : 720;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width, maxWidth: '90vw', background: '#fff', borderRadius: 8, boxShadow: 'var(--shadow-modal)', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--fade)' }}>
          <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--pitch)' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gunmetal)' }}>✕</button>
        </div>
        <div style={{ padding: 24, fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{children}</div>
      </div>
    </div>
  );
}
