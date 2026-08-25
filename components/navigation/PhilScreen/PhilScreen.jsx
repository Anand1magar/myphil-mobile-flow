import React from 'react';
export function PhilScreen({ size = 'mobile', children } = {}) {
  return (
    <div style={{ width: ({ mobile: 320, tablet: 600, desktop: 1200 })[size], background: '#fff', margin: '0 auto', fontFamily: 'var(--font-body)', minHeight: 200, boxShadow: '0 0 24px rgba(0,0,0,0.08)' }}>
      {children}
    </div>
  );
}
