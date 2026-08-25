import React from 'react';
export function NoticeInformation({ title, children }) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 8, padding: 16, background: 'var(--paper)', borderRadius: 4 }}>
      {title && <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gunmetal)' }}>{title}</span>}
      <p style={{ margin: 0, fontSize: 14, lineHeight: '22px', color: 'var(--gunmetal)' }}>{children}</p>
    </div>
  );
}
