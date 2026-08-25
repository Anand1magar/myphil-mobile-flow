import React from 'react';
export function CouponEnrollment({ savings = '84' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>You qualify for a manufacturer coupon</h2>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>Enrolling could save you about {'$' + savings} on this fill.</p>
      <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Enroll me</button>
      <button style={{ height: 48, borderRadius: 4, background: 'transparent', color: 'var(--gunmetal)', border: 'none', boxShadow: 'inset 0 0 0 1px var(--gunmetal)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>No thanks</button>
    </div>
  );
}
