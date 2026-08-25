import React from 'react';
export function Future({ enrolled = false, date = 'Oct 12' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Auto-refill</h2>
      <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>{enrolled ? 'Your next refill ships automatically on ' + date + '.' : 'Turn on auto-refill and never run out.'}</p>
      <button style={{ ...({ height: 48, borderRadius: 4, border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, cursor: 'pointer' }), background: enrolled ? 'transparent' : 'var(--sky)', color: enrolled ? 'var(--gunmetal)' : '#fff', boxShadow: enrolled ? 'inset 0 0 0 1px var(--gunmetal)' : 'none' }}>{enrolled ? 'Pause auto-refill' : 'Turn on auto-refill'}</button>
    </div>
  );
}
