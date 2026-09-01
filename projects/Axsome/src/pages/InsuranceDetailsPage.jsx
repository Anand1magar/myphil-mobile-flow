import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { BrandHeader as MyPhilHeader } from '../components/BrandHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

const INSURANCE = {
  idNumber: '123456789',
  rxBin: '123456',
  rxGroup: 'GROUP987654',
  rxPcn: '02050000',
};

export function InsuranceDetailsPage() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 80px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>
          Awesome! We found your insurance.
        </h1>

        <div style={{ background: 'var(--paper)', borderRadius: 10, padding: '16px 19px 16px 10px', display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>ID Number: <strong>{INSURANCE.idNumber}</strong></p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Rx BIN: <strong>{INSURANCE.rxBin}</strong></p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Rx Group: <strong>{INSURANCE.rxGroup}</strong></p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Rx PCN: <strong>{INSURANCE.rxPcn}</strong></p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Button hierarchy="primary" fullWidth onClick={() => navigate('/contact-information')}>Use this insurance card</Button>
            <Button hierarchy="secondary" fullWidth onClick={() => navigate('/contact-information')}>No, I have a different card</Button>
            <Button hierarchy="link">I don&rsquo;t have insurance</Button>
          </div>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            NOTE: You will get to review the pricing before you pay for your prescription.
          </p>
        </div>
      </div>

      <MyPhilFooter />
    </div>
  );
}
