import React from 'react';
export function ThankyouContent({ heading = "You're all set", body = "We're processing your prescription. You'll get a text when it ships." } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', padding: 16 }}>
      <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--foliage)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none"><path d="M2 12L12 22L30 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>{heading}</h2>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>{body}</p>
    </div>
  );
}
