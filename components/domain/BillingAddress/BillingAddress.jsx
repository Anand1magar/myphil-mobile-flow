import React, { useState } from 'react';
export function BillingAddress({ sameAsShipping = true }) {
  const [same, setSame] = useState(sameAsShipping);
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)' }}>Billing address</span>
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }} onClick={() => setSame(s => !s)}>
        <span style={{ width: 24, height: 24, borderRadius: 4, background: same ? 'var(--sky)' : 'transparent', boxShadow: same ? 'none' : '0 0 0 1px var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {same && <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </span>
        <span style={{ fontSize: 16, color: 'var(--pitch)' }}>Same as shipping address</span>
      </label>
      {!same && ['Street address','City','ZIP code'].map(l => (
        <div key={l} style={{ height: 48, borderRadius: 4, boxShadow: '0 0 0 1px var(--pitch)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <input placeholder={l} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: 16 }} />
        </div>
      ))}
    </div>
  );
}
