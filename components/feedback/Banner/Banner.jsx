import React from 'react';
export function Banner({ tone = 'info', title, children, onClose }) {
  const tones = { info: { bg: '#4A90E2', fg: '#fff' }, danger: { bg: '#B91D13', fg: '#fff' }, warning: { bg: '#EDBE3D', fg: '#0A0A0A' }, success: { bg: '#00827E', fg: '#fff' } };
  const t = tones[tone] || tones.info;
  return (
    <div style={{ borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', overflow: 'hidden', width: 288, fontFamily: 'var(--font-body)', background: '#fff' }}>
      <div style={{ background: t.bg, color: t.fg, padding: '10px 16px', fontWeight: 500, fontSize: 18, lineHeight: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title}</span>
        {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', color: t.fg, cursor: 'pointer', fontSize: 16 }}>✕</button>}
      </div>
      <div style={{ padding: 16, fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{children}</div>
    </div>
  );
}
