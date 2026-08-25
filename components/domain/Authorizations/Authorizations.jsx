import React from 'react';
export function Authorizations({ items = [['HIPAA authorization','Signed Aug 12'],['Delivery authorization','Signed Aug 12'],['Auto-refill consent','Not signed']] } = {}) {
  return (
    <div style={{ width: 340, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px var(--fade)', overflow: 'hidden', background: '#fff' }}>
      {items.map(([name, status], i) => (
        <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderTop: i ? '1px solid var(--fade)' : 'none' }}>
          <span style={{ fontSize: 16, color: 'var(--pitch)' }}>{name}</span>
          <span style={{ fontSize: 14, color: status.startsWith('Signed') ? 'var(--foliage)' : 'var(--ruby)' }}>{status}</span>
        </div>
      ))}
    </div>
  );
}
