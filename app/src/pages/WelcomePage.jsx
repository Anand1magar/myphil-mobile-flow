import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { PolicyTrustRatings } from '@ds/components/domain/PolicyTrustRatings/PolicyTrustRatings.jsx';
import heroImage from '@ds/assets/images/welcome-hero.png';

export function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '40px 16px', fontFamily: 'var(--font-body)' }}>
      <img src={heroImage} alt="" style={{ width: '100%', borderRadius: 8 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-black)', color: 'var(--pitch)', margin: 0 }}>
          Get your medication delivered, for less
        </h1>
        <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--gunmetal)', margin: 0 }}>
          My Phil finds you the lowest price on your prescription and ships it free, right to your door.
        </p>
      </div>
      <Button hierarchy="primary" fullWidth onClick={() => navigate('/insurance')}>
        Get started
      </Button>
      <PolicyTrustRatings />
    </div>
  );
}
