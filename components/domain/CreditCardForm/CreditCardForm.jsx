import React, { useState } from 'react';
import { useFocusRing, fieldRing } from '../../forms/useFocusRing.js';
function Field({ label, ph, w }) {
  const { focused, focusProps } = useFocusRing();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: w }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--pitch)' }}>{label}</span>
      <div style={{ height: 44, borderRadius: 4, boxShadow: fieldRing(focused), display: 'flex', alignItems: 'center', padding: '0 12px' }}>
        <input placeholder={ph} {...focusProps} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-body)', fontSize: 16 }} />
      </div>
    </div>
  );
}
export function CreditCardForm() {
  const [num, setNum] = useState('');
  return (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--font-body)', padding: 16, borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)' }}>
      <Field label="Card number" ph="1234 5678 9012 3456" w="100%" />
      <div style={{ display: 'flex', gap: 12 }}>
        <Field label="Expiration" ph="MM/YY" w="50%" />
        <Field label="CVV" ph="123" w="50%" />
      </div>
      <Field label="Billing ZIP" ph="94103" w="100%" />
    </div>
  );
}
