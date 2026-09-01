import React from 'react';

// Placeholder rendering of the member's uploaded insurance card, shown on the
// review screen. Swap for the real uploaded image when that wiring lands.
const ROWS_LEFT = [
  ['Subscriber Name', 'JOHN DOE'],
  ['Identification Number', 'XOF123456789'],
  ['Group Number', '123456'],
  ['Coverage Date', '09/01/08'],
];

const COPAYS = [
  ['Office Copay', '$20'],
  ['Emergency Copay', '$100'],
  ['RX Generic Copay', '$25'],
  ['RX Brand Copay', '$50/$100'],
];

export function SampleInsuranceCard() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 320,
        aspectRatio: '1.586',
        background: '#fff',
        borderRadius: 10,
        border: '1px solid var(--fade)',
        padding: '10px 12px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        fontFamily: 'var(--font-body)',
        color: 'var(--pitch)',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 3,
            background: 'var(--sky)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          +
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.01em' }}>Sample Health Plan</span>
      </div>

      <div style={{ borderTop: '1px solid var(--fade)' }} />

      <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>
        <div style={{ flex: '1 1 55%', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {ROWS_LEFT.map(([label, value]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: 'var(--gunmetal)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{label}</span>
              <span style={{ fontSize: 9, fontWeight: 700 }}>{value}</span>
            </div>
          ))}
          <span style={{ fontSize: 8, marginTop: 'auto', color: 'var(--gunmetal)' }}>SINGLE</span>
        </div>

        <div style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', gap: 2, borderLeft: '1px solid var(--fade)', paddingLeft: 8 }}>
          {COPAYS.map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 7.5 }}>
              <span style={{ color: 'var(--gunmetal)' }}>{label}</span>
              <span style={{ fontWeight: 700 }}>{value}</span>
            </div>
          ))}
          <div style={{ marginTop: 4, fontSize: 7.5, color: 'var(--gunmetal)' }}>
            <div>RxBIN: <span style={{ fontWeight: 700, color: 'var(--pitch)' }}>011550</span></div>
            <div>RxPCN: <span style={{ fontWeight: 700, color: 'var(--pitch)' }}>ILDR</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, fontSize: 10, fontWeight: 700 }}>
        <span>PPO</span>
        <span style={{ fontStyle: 'italic' }}>R</span>
      </div>
    </div>
  );
}
