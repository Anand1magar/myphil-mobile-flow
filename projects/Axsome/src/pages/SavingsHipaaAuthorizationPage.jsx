import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { SignaturePad } from '@ds/components/domain/SignaturePad/SignaturePad.jsx';
import { BrandHeader as MyPhilHeader } from '../components/BrandHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

const stopToggle = (e) => e.stopPropagation();

export function SavingsHipaaAuthorizationPage() {
  const navigate = useNavigate();
  const [eligibilityAgreed, setEligibilityAgreed] = useState(true);
  const [hipaaAgreed, setHipaaAgreed] = useState(true);
  const [stayConnected, setStayConnected] = useState(false);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Great News, Great Savings!</h1>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Agree to the terms and conditions below for potential savings.</p>
        </div>

        <div style={{ borderTop: '1px solid var(--fade)' }} />

        <Checkbox
          checked={eligibilityAgreed}
          onChange={() => setEligibilityAgreed((v) => !v)}
          label={
            <>
              <strong>Eligibility &amp; Terms</strong>. By using this offer, the patient certifies...{' '}
              <a href="#" onClick={stopToggle} style={{ color: 'var(--sky)' }}>View full terms</a>
            </>
          }
        />

        <Checkbox
          checked={hipaaAgreed}
          onChange={() => setHipaaAgreed((v) => !v)}
          label={
            <>
              <strong>HIPAA Authorization:</strong> By clicking the checkbox, I agree that ...{' '}
              <a href="#" onClick={stopToggle} style={{ color: 'var(--sky)' }}>View full terms</a>
            </>
          }
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--gunmetal)', margin: 0 }}>
            <em>(Required)</em> Draw your signature in the box below
          </p>
          <SignaturePad />
        </div>

        <Checkbox
          checked={stayConnected}
          onChange={() => setStayConnected((v) => !v)}
          label={
            <>
              <em>(Optional)</em> Stay connected - check the box to receive helpful updates, resources, and information about the manufacturer, its products, and services.{' '}
              <a href="#" onClick={stopToggle} style={{ color: 'var(--sky)' }}>Read More</a>
            </>
          }
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={() => navigate('/enrollment-success')}>Enroll</Button>
        </div>
      </div>

      <MyPhilFooter />
    </div>
  );
}
