import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import shieldHeartIcon from '@ds/assets/icons/shield-heart.svg';

export function EnrollmentSuccessPage() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 120px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>
            You did it! We&rsquo;re working on getting your best Drugname (chemical compositions) (volume) price!
          </h1>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>What&rsquo;s next:</p>
          <div style={{ border: '1px solid var(--fade)', borderRadius: 4, padding: 16, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <img src={shieldHeartIcon} alt="" width={30} height={30} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
                We&rsquo;ll check with your insurance to confirm your cost and let you know when it&rsquo;s ready.
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--fade)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Set up a password for faster access (optional &mdash; you can always log in with a one-time code instead).
          </p>
          <Button hierarchy="link" onClick={() => navigate('/create-password')}>Set up password</Button>
        </div>
      </div>

      <MyPhilFooter />
    </div>
  );
}
