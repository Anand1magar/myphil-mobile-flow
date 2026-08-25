import React from 'react';
export function InsuranceSelectScreen() {
  const [sel, setSel] = React.useState(null);
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>How would you like to add insurance?</h2>
      {[['Search for my plan', 'Fastest — we look it up for you'], ['Upload my card', 'Snap a photo of the front and back'], ['Enter RxBIN manually', 'For plans we can\u2019t find']].map(([t, d]) => (
        <div key={t} onClick={() => setSel(t)} style={{ padding: 14, borderRadius: 4, boxShadow: sel === t ? '0 0 0 2px var(--sky)' : 'inset 0 0 0 1px var(--fade)', cursor: 'pointer' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>{t}</div>
          <div style={{ fontSize: 14, color: 'var(--gunmetal)' }}>{d}</div>
        </div>
      ))}
    </div>
  );
}
