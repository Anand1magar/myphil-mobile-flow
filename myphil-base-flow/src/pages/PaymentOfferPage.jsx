import React, { useState } from 'react';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { Icon } from '@ds/assets/icons/Icon.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import { PaymentAccordions } from '../components/PaymentAccordions.jsx';

export function PaymentOfferPage() {
  const [summaryOpen, setSummaryOpen] = useState(true);
  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: 'var(--paper)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 16px 80px' }}>
        <div style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid var(--fade)', borderRadius: 4, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button
            type="button"
            onClick={() => setSummaryOpen((o) => !o)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)' }}
          >
            <p style={{ flex: 1, fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Order summary</p>
            <Icon name={summaryOpen ? 'ArrowDropUpStyleFilled' : 'ArrowDropDownStyleFilled'} size={24} style={{ color: 'var(--pitch)', flexShrink: 0 }} />
          </button>

          {summaryOpen && (
            <React.Fragment>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Drugname (chemical compositions) (volume)</p>
                <p style={{ fontSize: 14, color: 'var(--pitch)', margin: 0 }}>30-day supply</p>
              </div>

              <div style={{ borderTop: '1px solid var(--fade)', width: '100%' }} />

              <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--sky)', borderRadius: 4, padding: '16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--pitch)', textTransform: 'uppercase' }}>Pay as low as $XX!</p>
                  <p style={{ margin: 0, fontSize: 16, color: 'var(--pitch)' }}>Save up to xx% by enrolling in the manufacturer offer!</p>
                </div>
                <Button hierarchy="primary">Enroll now</Button>
              </div>

              <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: '12px' }}>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>30 Day Supply with Insurance for $XX</p>
              </div>

              <p style={{ margin: 0, fontSize: 16, color: 'var(--pitch)' }}>
                <a href="#" style={{ color: 'var(--sky)' }}>Learn more</a> about your cost
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>Your total cost</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>$XX.00</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                <Button hierarchy="primary" fullWidth>Next</Button>
                <Button hierarchy="tertiary" fullWidth>Manage your prescription</Button>
              </div>
            </React.Fragment>
          )}
        </div>

        <p style={{ fontSize: 16, color: 'var(--pitch)', margin: 0 }}>Please select next to move to the next step.</p>

        <PaymentAccordions />
      </div>

      <MyPhilFooter insuranceNote />
    </div>
  );
}
