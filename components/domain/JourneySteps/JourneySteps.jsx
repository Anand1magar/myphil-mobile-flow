import React from 'react';
export function JourneySteps({ steps = [], activeIndex = 0 }) {
  return (
    <div style={{ width: 288, borderRadius: 4, background: '#fff', boxShadow: '10px 10px 10px 0px rgba(0,0,0,0.1)', padding: 16, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 4 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 24 }}>
          <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: i < activeIndex ? 'var(--foliage)' : i === activeIndex ? 'var(--sky)' : 'var(--mortar-grey)' }} />
          </span>
          <span style={{ fontSize: 16, lineHeight: '24px', letterSpacing: '0.002em', color: i === activeIndex ? 'var(--pitch)' : 'var(--gunmetal)', fontWeight: i === activeIndex ? 700 : 400 }}>{s}</span>
        </div>
      ))}
    </div>
  );
}
