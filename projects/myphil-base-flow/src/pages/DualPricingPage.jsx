import React, { useState } from 'react';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { Radio } from '@ds/components/forms/Radio/Radio.jsx';
import { Icon } from '@ds/assets/icons/Icon.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import { PaymentAccordions } from '../components/PaymentAccordions.jsx';

const PRICING_OPTIONS = [
  {
    id: 'final',
    label: 'Final price, $XX',
    note: 'By choosing this option, your purchase will count towards your insurance deductible and out-of-pocket max.',
  },
  {
    id: 'manufacturer',
    label: 'Manufacturer offer, $XX',
    note: (
      <>
        By selecting the manufacturer offer, you agree not to seek reimbursement from insurance company, and agree to the{' '}
        <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--sky)' }}>Terms &amp; Conditions</a>.
      </>
    ),
  },
];

export function DualPricingPage() {
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Drugname (chemical compositions) (volume)</p>
                <p style={{ fontSize: 14, color: 'var(--pitch)', margin: 0 }}>XX-day supply</p>
              </div>

              <div style={{ width: '100%', boxSizing: 'border-box', background: 'var(--sky-tint)', borderRadius: 4, padding: 12 }}>
                <p style={{ margin: 0, fontSize: 14, lineHeight: '20px', color: 'var(--pitch)' }}>
                  Good news! There&rsquo;s a manufacturer offer available to lower your price. Review the Terms &amp; Conditions after selecting manufacturer offer to get the lower price.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
                {PRICING_OPTIONS.map((option) => (
                  <div key={option.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                    <Radio
                      borderless
                      name="dual-pricing"
                      checked={pricing === option.id}
                      onChange={() => setPricing(option.id)}
                      label={option.label}
                    />
                    {pricing === option.id && (
                      <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: 12 }}>
                        <p style={{ margin: 0, fontSize: 14, lineHeight: '20px', color: 'var(--pitch)' }}>{option.note}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p style={{ margin: 0, fontSize: 16, color: 'var(--pitch)' }}>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--sky)' }}>Learn more</a> about these pricing
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>Your total cost</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>$XX.00</span>
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
