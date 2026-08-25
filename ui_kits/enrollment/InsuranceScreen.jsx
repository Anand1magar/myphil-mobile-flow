function InsuranceScreen({ onNext, onBack }) {
  const [choice, setChoice] = React.useState('yes');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '40px 16px', maxWidth: 320, margin: '0 auto', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--pitch)', margin: 0 }}>Do you have insurance?</h1>
      <p style={{ fontSize: 16, color: 'var(--gunmetal)', margin: 0 }}>We'll use it to find your lowest possible price.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[['yes', 'Yes, I have insurance'], ['no', "No, I don't have insurance"]].map(([v, l]) => (
          <label key={v} onClick={() => setChoice(v)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 4, boxShadow: choice === v ? '0 0 0 2px var(--sky)' : '0 0 0 1px var(--fade)', cursor: 'pointer' }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', boxShadow: '0 0 0 1px var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {choice === v && <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--sky)' }} />}
            </span>
            <span style={{ fontSize: 16 }}>{l}</span>
          </label>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onBack} style={{ flex: 1, height: 48, borderRadius: 4, background: 'transparent', color: 'var(--gunmetal)', border: 'none', boxShadow: 'inset 0 0 0 1px var(--gunmetal)', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Back</button>
        <button onClick={onNext} style={{ flex: 2, height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Continue</button>
      </div>
    </div>
  );
}

window.InsuranceScreen = InsuranceScreen;
