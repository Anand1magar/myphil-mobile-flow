import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

const SCENARIOS = [
  {
    id: 'payment',
    name: 'Payment',
    route: '/payment',
    description: 'Your best price is already found. Review the order summary, then step through shipping, payment and signature.',
  },
  {
    id: 'second-chance-banner',
    name: 'Second chance enrollment — banner',
    route: '/second-chance-enrollment',
    description: 'A manufacturer offer banner sits above the insurance price. Enrolling opens the savings terms; declining opens the “Why pay full price?” prompt.',
  },
  {
    id: 'second-chance-banner-combined',
    name: 'Second chance enrollment — banner (HIPAA + coupon combined)',
    route: '/second-chance-enrollment?combined=1',
    description: 'The banner flow, but enrolling opens one screen with the eligibility and HIPAA checkboxes plus the signature, rather than a terms scroll-box.',
  },
  {
    id: 'second-chance-dual-pricing',
    name: 'Second chance enrollment — dual pricing',
    route: '/dual-pricing',
    description: 'Two prices side by side — final price versus manufacturer offer — chosen before checkout begins.',
  },
  {
    id: 'second-chance-dual-pricing-combined',
    name: 'Second chance enrollment — dual pricing (HIPAA + coupon combined)',
    route: '/dual-pricing?combined=1',
    description: 'Dual pricing where choosing the manufacturer offer expands the order summary to hold the consent checkboxes and signature inline.',
  },
  {
    id: 'refills',
    name: 'Refills',
    route: '/refill-review',
    description: 'A returning patient reviews and confirms a refill on one screen, using the card already on file.',
  },
];

export function PaymentScenariosPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: 'var(--paper)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader active="rx" />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Choose a payment flow</h1>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Each option is a different version of the same checkout. Pick one to walk through it end to end.
          </p>
        </div>

        {SCENARIOS.map((scenario) => (
          <div
            key={scenario.id}
            style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid var(--fade)', borderRadius: 4, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>{scenario.name}</p>
              <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--gunmetal)', margin: 0 }}>{scenario.description}</p>
            </div>
            <Button hierarchy="primary" fullWidth onClick={() => navigate(scenario.route)}>View this flow</Button>
          </div>
        ))}
      </div>

      <MyPhilFooter insuranceNote />
    </div>
  );
}
