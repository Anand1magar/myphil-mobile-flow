import React from 'react';
export function Footer() {
  return (
    <footer style={{ background: 'var(--pitch)', color: '#fff', padding: '40px 24px', fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <img src="../../assets/logos/myphil-wordmark-white.svg" alt="My Phil" style={{ height: 22 }} />
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        {[['Company',['About','Careers','Press']],['Support',['Help Center','Contact Us','FAQs']],['Legal',['Privacy Policy','Terms of Service','HIPAA Notice']]].map(([h, links]) => (
          <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--mortar-grey)' }}>{h}</span>
            {links.map(l => <a key={l} href="#" style={{ color: '#fff', fontSize: 14, textDecoration: 'none' }}>{l}</a>)}
          </div>
        ))}
      </div>
      <span style={{ fontSize: 12, color: 'var(--mortar-grey)' }}>© {new Date().getFullYear()} My Phil. All rights reserved.</span>
    </footer>
  );
}
