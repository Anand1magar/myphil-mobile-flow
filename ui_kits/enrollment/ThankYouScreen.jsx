function ThankYouScreen({ onRestart }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '60px 16px', maxWidth: 320, margin: '0 auto', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
      <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--foliage)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none"><path d="M2 12L12 22L30 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--pitch)', margin: 0 }}>You're all set!</h1>
      <p style={{ fontSize: 16, color: 'var(--gunmetal)', margin: 0 }}>We're processing your prescription. You'll get a text when it ships.</p>
      <button onClick={onRestart} style={{ width: '100%', height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 18, cursor: 'pointer' }}>Go to My Phil</button>
    </div>
  );
}

window.ThankYouScreen = ThankYouScreen;
