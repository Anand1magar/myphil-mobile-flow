import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

export function SecondChanceEnrolledPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 120px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>
          You&rsquo;re now enrolled in the manufacturer savings program!
        </h1>

        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          We&rsquo;ll apply the manufacturer savings program to your prescription and notify you once your cost is ready for you to review.
        </p>

        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          Go to your account for updates.
        </p>

        <Button hierarchy="primary" fullWidth onClick={() => navigate('/my-prescriptions')}>Go to my account</Button>
      </div>

      <MyPhilFooter />
    </div>
  );
}
