import React from 'react';
import philrxLogo from '@ds/assets/logos/philrx-logo-color.png';

// PhilRx marketing header: logo + "Rx at your fingertips" tagline.
// Sticks to the top of the viewport and stays visible while the page scrolls.
export function MyPhilHeader() {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, width: '100%', height: 60, background: 'var(--pure)', borderBottom: '1px solid var(--fade)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 17px', boxSizing: 'border-box' }}>
      <img src={philrxLogo} alt="PhilRx" style={{ height: 20 }} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, color: 'var(--foliage)' }}>Rx at your fingertips</span>
    </div>
  );
}
