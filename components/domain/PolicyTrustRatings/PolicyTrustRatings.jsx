import React from 'react';
import trustpilotBadge from '../../../assets/images/trustpilot-badge.png';
export function PolicyTrustRatings() {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', textAlign: 'center' }}>
      <img src={trustpilotBadge} alt="Trustpilot" style={{ height: 36 }} />
      <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--gunmetal)', margin: 0 }}>
        By continuing you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </p>
      <a href="#" style={{ fontSize: 16 }}>Already have an account? Log in</a>
    </div>
  );
}
