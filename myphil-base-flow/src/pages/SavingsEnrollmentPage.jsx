import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { DeclineEnrollmentModal } from '@ds/components/domain/DeclineEnrollmentModal/DeclineEnrollmentModal.jsx';
import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

const TERMS_TEXT = 'I understand that if my prescription is not covered by my government sponsored program, I may be eligible for assistance programs from the manufacturer.  If I do take such assistance from the manufacturer on my prescription, I understand that I cannot and will not seek reimbursement from my government sponsored program';

export function SavingsEnrollmentPage() {
  const navigate = useNavigate();
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Great News, Great Savings!</h1>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Agree to the terms and conditions below for potential savings.</p>
        </div>

        <div style={{ height: 180, overflowY: 'auto', border: '2px solid var(--fade)', borderRadius: 4, padding: 16, boxSizing: 'border-box' }}>
          <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--pitch)', margin: 0, whiteSpace: 'pre-wrap' }}>{TERMS_TEXT}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={() => navigate('/hipaa-authorization')}>Agree and enroll</Button>
          <Button hierarchy="secondary" fullWidth onClick={() => setShowDeclineModal(true)}>Decline enrollment</Button>
        </div>

        <p style={{ fontSize: 12, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>*Percentage depends on your insurance coverage.</p>
      </div>

      <MyPhilFooter />

      <DeclineEnrollmentModal
        open={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onEnroll={() => { setShowDeclineModal(false); navigate('/hipaa-authorization'); }}
        onDecline={() => setShowDeclineModal(false)}
      />
    </div>
  );
}
