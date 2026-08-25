import React from 'react';
export function HippaAuth() {
  const [ok, setOk] = React.useState(false);
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>HIPAA authorization</h2>
      <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--gunmetal)', margin: 0 }}>I authorize My Phil to use and disclose my protected health information to process and ship my prescription, coordinate with my prescriber, and administer applicable savings programs.</p>
      <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }} onClick={() => setOk(v => !v)}>
        <span style={{ width: 24, height: 24, borderRadius: 4, background: ok ? 'var(--sky)' : 'transparent', boxShadow: ok ? 'none' : '0 0 0 1px var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {ok && <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </span>
        <span style={{ fontSize: 16, color: 'var(--pitch)' }}>I agree to the authorization above</span>
      </label>
      <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }} disabled={!ok}>Sign and continue</button>
    </div>
  );
}
