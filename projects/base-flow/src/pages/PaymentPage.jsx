import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { Icon } from '@ds/assets/icons/Icon.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import { PaymentAccordions } from '../components/PaymentAccordions.jsx';

export function PaymentPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: 'var(--paper)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 16px' }}>
        <div style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid var(--fade)', borderRadius: 4, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <p style={{ flex: 1, fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Order summary</p>
            <Icon name="ArrowDropUpStyleFilled" size={24} style={{ color: 'var(--pitch)', flexShrink: 0 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Drugname (chemical compositions) (volume)</p>
            <p style={{ fontSize: 14, color: 'var(--pitch)', margin: 0 }}>30-day supply</p>
          </div>

          <div style={{ borderTop: '1px solid var(--fade)', width: '100%' }} />

          <p style={{ fontSize: 20, fontWeight: 700, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>
            We found your best price on Drugname (chemical compositions) (volume)!
          </p>

          <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>
              30 Day Supply with Coupon for <span>$XX</span>{' '}
              <span style={{ fontWeight: 400, textDecoration: 'line-through', color: '#9e9e9e' }}>$XX*</span>
            </p>
            <span style={{ background: '#fee000', color: 'var(--pitch)', fontSize: 11, fontWeight: 700, padding: '2px 6px', borderRadius: 2 }}>93% OFF</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>Your total cost</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>$XX.00</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <Button hierarchy="primary" fullWidth onClick={() => navigate('/payment-offer')}>Next</Button>
            <Button hierarchy="tertiary" fullWidth>Manage your prescription</Button>
          </div>

          <p style={{ fontSize: 14, color: 'var(--gunmetal)', opacity: 0.8, margin: 0 }}>
            *GoodRx reported price as of 10/15/2025
          </p>
        </div>

        <p style={{ fontSize: 16, color: 'var(--pitch)', margin: 0 }}>Please select next to move to the next step.</p>

        <PaymentAccordions />
      </div>

      <MyPhilFooter insuranceNote />
    </div>
  );
}
