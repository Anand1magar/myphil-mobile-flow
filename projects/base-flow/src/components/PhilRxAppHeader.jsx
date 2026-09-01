import React from 'react';
import philrxLogo from '@ds/assets/logos/philrx-logo-color.png';
import navRx from '../assets/nav-rx.svg';
import navProfile from '../assets/nav-profile.svg';

const TABS = [
  { id: 'rx', icon: navRx },
  { id: 'profile', icon: navProfile },
];

export function PhilRxAppHeader({ active }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, width: '100%', height: 60, background: '#fff', borderBottom: '1px solid var(--fade)', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', paddingLeft: 17, boxSizing: 'border-box' }}>
      <img src={philrxLogo} alt="PhilRx" style={{ height: 20, alignSelf: 'center' }} />
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {TABS.map((tab) => (
          <div
            key={tab.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 12px',
              boxSizing: 'border-box',
              background: active === tab.id ? '#f7f7f7' : 'transparent',
              borderBottom: active === tab.id ? '4px solid #edbe3d' : '4px solid transparent',
            }}
          >
            <img src={tab.icon} alt="" style={{ width: 32, height: 32 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
