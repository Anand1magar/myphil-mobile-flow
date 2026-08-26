import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { PhilRxFooter } from '../components/PhilRxFooter.jsx';

const SHIPPING_ADDRESS = { line1: '123 Main Street, Apt. 5', line2: 'San Francisco, CA 44512' };

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>
          Success! Next step: Delivery
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Your prescription is being prepared and will ship to:
          </p>
          <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--pitch)', borderRadius: 4, padding: '12px 16px' }}>
            <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{SHIPPING_ADDRESS.line1}</p>
            <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{SHIPPING_ADDRESS.line2}</p>
          </div>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Free shipping is always included!
            <br />
            Tracking info will be shared once shipped.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Go to your account for updates.
          </p>
          <Button hierarchy="primary" fullWidth onClick={() => navigate('/my-prescriptions')}>Go to my account</Button>
        </div>
      </div>

      <PhilRxFooter insuranceNote />
    </div>
  );
}
