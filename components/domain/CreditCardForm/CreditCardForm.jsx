import React, { useState } from 'react';
export function CreditCardForm() {
  const [num, setNum] = useState('');
  const field = (label, ph, w) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: w }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--pitch)' }}>{label}</span>
      <div style={{ height: 44, borderRadius: 4, boxShadow: '0 0 0 1px var(--pitch)', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
        <input placeholder={ph} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-body)', fontSize: 16 }} />
      </div>
    </div>
  );
  return (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--font-body)', padding: 16, borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)' }}>
      {field('Card number', '1234 5678 9012 3456', '100%')}
      <div style={{ display: 'flex', gap: 12 }}>
        {field('Expiration', 'MM/YY', '50%')}
        {field('CVV', '123', '50%')}
      </div>
      {field('Billing ZIP', '94103', '100%')}
    </div>
  );
}
