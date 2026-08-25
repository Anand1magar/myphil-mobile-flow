import React from 'react';
export function DeliveryInfo({ carrier = 'UPS', eta = 'Wed, Sep 3', tracking = '1Z999AA10123456784', address = '123 Market St, San Francisco, CA' }) {
  const rows = [['Carrier', carrier], ['Estimated arrival', eta], ['Tracking', tracking], ['Shipping to', address]];
  return (
    <div style={{ width: 340, borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', overflow: 'hidden', fontFamily: 'var(--font-body)', background: '#fff' }}>
      {rows.map(([k, v], i) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 16px', borderTop: i ? '1px solid var(--fade)' : 'none' }}>
          <span style={{ fontSize: 14, color: 'var(--gunmetal)', flexShrink: 0 }}>{k}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--pitch)', textAlign: 'right' }}>{v}</span>
        </div>
      ))}
    </div>
  );
}
