import React from 'react';
import philrxLogo from '@ds/assets/logos/philrx-logo-color.png';

export function PhilRxHeader() {
  return (
    <div style={{ width: '100%', height: 60, background: '#fff', borderBottom: '1px solid #d7dcdc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 17px', boxSizing: 'border-box' }}>
      <img src={philrxLogo} alt="PhilRx" style={{ height: 20 }} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, color: 'var(--foliage)' }}>Rx at your fingertips</span>
    </div>
  );
}
