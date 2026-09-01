import React from 'react';
import { useFocusRing } from '../useFocusRing.js';
export function InputMyPhil({ label = 'Label', property = 'text-left', status = 'idle', value = '' } = {}) {
  const { focused, focusProps } = useFocusRing();
  const ring = focused
    ? '0 0 0 2px var(--sky)'
    : '0 0 0 1px ' + (status === 'error' ? 'var(--ruby)' : status === 'filled' ? 'var(--pitch)' : 'var(--gunmetal)');
  return (
    <div style={{ width: 288, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontWeight: 700, fontSize: 16, lineHeight: '28px', letterSpacing: '0.002em', color: 'var(--pitch)' }}>{label}</span>
      <div style={{ height: 48, borderRadius: 4, boxShadow: ring, display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: property === 'text-right' ? 'flex-end' : 'flex-start', background: '#fff' }}>
        <input defaultValue={value} placeholder="Placeholder" {...focusProps} style={{ border: 'none', outline: 'none', width: '100%', textAlign: property === 'text-right' ? 'right' : 'left', fontFamily: 'inherit', fontSize: 18, color: 'var(--pitch)' }} />
      </div>
    </div>
  );
}
