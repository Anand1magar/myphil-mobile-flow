import React from 'react';

// PhilRx page footer: "Questions?" FAQ line + legal links, with an optional
// "Insurance questions?" note above it (used on payment / prescription screens).
export function MyPhilFooter({ insuranceNote = false }) {
  return (
    <div style={{ width: '100%', background: 'var(--pure)', borderTop: '0.5px solid var(--base)', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '16px 16px 28px' }}>
      {insuranceNote && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>Insurance questions?</span>
          <span style={{ fontSize: 14, color: 'var(--pitch)' }}>
            Contact your insurance company. You can find their number on the back of your insurance card.
          </span>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>{insuranceNote ? 'Other questions?' : 'Questions?'}</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#" style={{ fontSize: 16, color: 'var(--sky)' }}>View our FAQ</a>
          <span style={{ fontSize: 14, color: 'var(--pitch)' }}>or</span>
          <a href="#" style={{ fontSize: 16, color: 'var(--sky)' }}>Contact us</a>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: 14, color: 'var(--pitch)' }}>
        <span>© Phil, Inc.</span>
        <a href="#" style={{ color: 'var(--pitch)' }}>Terms of Use</a>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: 14, color: 'var(--pitch)' }}>
        <a href="#" style={{ color: 'var(--pitch)' }}>Privacy Policy</a>
        <a href="#" style={{ color: 'var(--pitch)' }}>HIPAA Policy</a>
      </div>
    </div>
  );
}
