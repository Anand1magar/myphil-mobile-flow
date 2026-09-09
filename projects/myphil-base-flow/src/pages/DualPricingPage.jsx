import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { SavingsConsentBlock } from '../components/SavingsConsentBlock.jsx';
import { Radio } from '@ds/components/forms/Radio/Radio.jsx';
import { Icon } from '@ds/assets/icons/Icon.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import { PaymentAccordions } from '../components/PaymentAccordions.jsx';

// Figma "Border / grey border" — a touch cooler than the --fade default.
const DUAL_PAYMENT_BORDER = '#D1D6DC';

const PRICING_OPTIONS = [
  { id: 'final', label: 'Final price, $XX' },
  { id: 'manufacturer', label: 'Manufacturer offer, $XX' },
];

export function DualPricingPage() {
  const [searchParams] = useSearchParams();
  // When HIPAA and the coupon are combined, choosing the manufacturer offer
  // reveals the full consent block in place of the short terms note.
  const combined = searchParams.get('combined') === '1';
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [pricing, setPricing] = useState('final');
  const [openSection, setOpenSection] = useState(null);

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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Drugname (chemical compositions) (volume)</p>
                  <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--pitch)', margin: 0 }}>XX-day supply</p>
                </div>

                <div style={{ width: '100%', boxSizing: 'border-box', background: 'var(--pure)', border: `1px solid ${DUAL_PAYMENT_BORDER}`, borderRadius: 4, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {PRICING_OPTIONS.map((option) => (
                    <Radio
                      key={option.id}
                      borderless
                      name="dual-pricing"
                      checked={pricing === option.id}
                      onChange={() => setPricing(option.id)}
                      label={<span style={{ fontWeight: 700 }}>{option.label}</span>}
                    />
                  ))}

                  <p style={{ margin: 0, fontSize: 14, lineHeight: '22px', color: 'var(--pitch)' }}>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--sky)', textDecoration: 'underline' }}>Learn more</a> about these pricing
                  </p>
                </div>

                {combined && pricing === 'manufacturer' && (
                  <div
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'var(--pure)',
                      border: '1px solid var(--sky)',
                      borderLeftWidth: 7,
                      borderRadius: 4,
                      padding: '11px 7px 11px 14px',
                    }}
                  >
                    <SavingsConsentBlock heading="Great News, Great Savings!" showRules optionalBeforeSignature />
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: 16, fontWeight: 700, lineHeight: '24px', color: 'var(--pitch)' }}>
                  <span>Your total cost</span>
                  <span>$XX.00</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                <Button
                  hierarchy="primary"
                  fullWidth
                  onClick={() => {
                    setSummaryOpen(false);
                    setOpenSection('shipping');
                  }}
                >
                  Next
                </Button>
                <Button hierarchy="tertiary" fullWidth>Manage your prescription</Button>
              </div>
            </React.Fragment>
          )}
        </div>

        {openSection === null && (
          <p style={{ fontSize: 16, color: 'var(--pitch)', margin: 0 }}>Please select next to move to the next step.</p>
        )}

        <PaymentAccordions openSection={openSection} onOpenSectionChange={setOpenSection} />
      </div>

      <MyPhilFooter insuranceNote />
    </div>
  );
}
