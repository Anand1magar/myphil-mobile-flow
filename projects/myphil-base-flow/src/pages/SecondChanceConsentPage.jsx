import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { DeclineEnrollmentModal } from '@ds/components/domain/DeclineEnrollmentModal/DeclineEnrollmentModal.jsx';
import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import { SavingsConsentBlock } from '../components/SavingsConsentBlock.jsx';

export function SecondChanceConsentPage() {
  const navigate = useNavigate();
  const [declineOpen, setDeclineOpen] = useState(false);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Great News, Great Savings!</h1>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Agree to the terms and conditions below for potential savings.</p>
        </div>

        <div style={{ borderTop: '1px solid var(--fade)' }} />

        <SavingsConsentBlock />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={() => navigate('/second-chance-enrolled')}>Enroll</Button>
          <Button hierarchy="link" onClick={() => setDeclineOpen(true)}>Decline</Button>
        </div>
      </div>

      <MyPhilFooter />

      <DeclineEnrollmentModal
        open={declineOpen}
        onClose={() => setDeclineOpen(false)}
        onEnroll={() => {
          setDeclineOpen(false);
          navigate('/second-chance-enrolled');
        }}
        onDecline={() => {
          setDeclineOpen(false);
          navigate('/second-chance-enrollment?combined=1');
        }}
      />
    </div>
  );
}
