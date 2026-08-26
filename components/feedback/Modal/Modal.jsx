import React from 'react';
import { Icon } from '../../../assets/icons/Icon.jsx';

export function Modal({ open, onClose, title, children, size = 'sm' }) {
  if (!open) return null;

  if (size === 'full') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 100 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--sky)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'var(--sky)' }} />
        <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', boxSizing: 'border-box', padding: '84px 16px 60px', fontFamily: 'var(--font-body)' }}>
          {children}
        </div>
        <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: 20, right: 16, width: 24, height: 24, padding: 0, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fade)', zIndex: 1 }}>
          <Icon name="MyPhil24Cross" size={24} />
        </button>
      </div>
    );
  }

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
