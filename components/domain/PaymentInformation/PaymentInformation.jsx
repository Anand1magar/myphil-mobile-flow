import React from 'react';
function Field({ label, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)' }}>{label}</span>
      <div style={{ height: 48, borderRadius: 4, boxShadow: '0 0 0 1px var(--pitch)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <input placeholder={placeholder} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-body)', fontSize: 18 }} />
      </div>
    </div>
  );
}
export function PaymentInformation({ state = 'collapsed' } = {}) {
  const [open, setOpen] = React.useState(state === 'expanded');
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
        <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Payment information</h2>
        <span style={{ color: 'var(--gunmetal)' }}>{open ? '\u2212' : '+'}</span>
      </div>
      {open && <React.Fragment>
        <Field label="Card number" placeholder="1234 5678 9012 3456" />
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}><Field label="Expiration" placeholder="MM/YY" /></div>
          <div style={{ flex: 1 }}><Field label="CVV" placeholder="123" /></div>
        </div>
        <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Save payment method</button>
      </React.Fragment>}
    </div>
  );
}
