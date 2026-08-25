import React from 'react';
export function PriceBreakdownSteps({ steps = [['List price','$142.00'],['Insurance','-$104.00'],['Coupon','-$13.01'],['You pay','$24.99']] } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', padding: 16, background: '#fff', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {steps.map(([k, v], i) => {
        const last = i === steps.length - 1;
        return (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: last ? 18 : 16, fontWeight: last ? 700 : 400, color: last ? 'var(--pitch)' : 'var(--gunmetal)', paddingTop: last ? 10 : 0, borderTop: last ? '1px solid var(--fade)' : 'none' }}>
            <span>{k}</span><span>{v}</span>
          </div>
        );
      })}
    </div>
  );
}
