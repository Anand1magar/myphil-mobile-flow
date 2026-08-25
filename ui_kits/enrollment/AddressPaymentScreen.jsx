function AddressPaymentScreen({ onNext, onBack }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 16px', maxWidth: 320, margin: '0 auto', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--pitch)', margin: 0 }}>Where should we ship it?</h1>
      {['Street address', 'City', 'ZIP code'].map(l => (
        <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--pitch)' }}>{l}</span>
          <div style={{ height: 48, borderRadius: 4, boxShadow: '0 0 0 1px var(--pitch)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <input placeholder={l} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-body)', fontSize: 18 }} />
          </div>
        </div>
      ))}
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <span style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span style={{ fontSize: 16 }}>Same as billing address</span>
      </label>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={{ flex: 1, height: 48, borderRadius: 4, background: 'transparent', color: 'var(--gunmetal)', border: 'none', boxShadow: 'inset 0 0 0 1px var(--gunmetal)', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Back</button>
        <button onClick={onNext} style={{ flex: 2, height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Continue to payment</button>
      </div>
    </div>
  );
}

window.AddressPaymentScreen = AddressPaymentScreen;
