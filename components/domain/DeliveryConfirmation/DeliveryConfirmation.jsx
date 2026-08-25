import React from 'react';
export function DeliveryConfirmation({ date = 'Sep 3, 2026', by = 'Jane Doe' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Delivery confirmed</h2>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>Received {date}, signed for by {by}.</p>
      <span style={{ alignSelf: 'flex-start', padding: '4px 12px', borderRadius: 99, background: '#E7F4F0', color: 'var(--foliage)', fontWeight: 700, fontSize: 12, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Delivered</span>
    </div>
  );
}
