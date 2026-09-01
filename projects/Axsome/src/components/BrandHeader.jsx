import React from 'react';
import axsomeLogo from '../assets/axsome-logo.png';

// Axsome OnMySide marketing header: brand logo + "Rx at your fingertips" tagline.
// Same layout as the PhilRx MyPhilHeader — only the logo and tagline color are
// brand-specific. Sticks to the top of the viewport while the page scrolls.
export function BrandHeader() {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, width: '100%', height: 60, background: 'var(--pure)', borderBottom: '1px solid var(--fade)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 17px', boxSizing: 'border-box' }}>
      <img src={axsomeLogo} alt="Axsome OnMySide" style={{ height: 34, width: 'auto' }} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, color: '#2F1147' }}>Rx at your fingertips</span>
    </div>
  );
}
