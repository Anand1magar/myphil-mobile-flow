function WelcomeScreen({ onNext }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '40px 16px', maxWidth: 320, margin: '0 auto', fontFamily: 'var(--font-body)' }}>
      <img src="../../assets/images/welcome-hero.png" alt="" style={{ width: '100%', borderRadius: 8 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--pitch)', margin: 0 }}>Get your medication delivered, for less</h1>
        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>My Phil finds you the lowest price on your prescription and ships it free, right to your door.</p>
      </div>
      <button onClick={onNext} style={{ width: '100%', height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Get started</button>
      <img src="../../assets/images/trustpilot-badge.png" alt="Trustpilot" style={{ height: 36 }} />
    </div>
  );
}

window.WelcomeScreen = WelcomeScreen;
