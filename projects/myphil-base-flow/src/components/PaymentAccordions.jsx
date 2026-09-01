import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { Radio } from '@ds/components/forms/Radio/Radio.jsx';
import { SignaturePad } from '@ds/components/domain/SignaturePad/SignaturePad.jsx';
import { Icon } from '@ds/assets/icons/Icon.jsx';

const SIGNATURE_CONSENT_FULL = `By signing electronically, I, {{.pt_consent_name}}, authorize PhilRx and {{.pharmacy_name}} or another pharmacy in the PhilRx network to coordinate with my medical provider and any applicable insurance and charge my credit card on file. I attest that I request to process and ship this medication and all subsequent refills, until such time as I cancel this automatic refill. Subsequent refills will be shipped on schedule automatically. Out of pocket effective as of [mm/dd/yyyy]. PhilRx will contact to confirm any pricing changes.`;

const SIGNATURE_FAQ_ANSWER = `We collect your signature as required by your insurer to verify and confirm that you are only receiving prescriptions you really want. We won't fill your prescription without your approval.`;
import applePayMark from '../assets/apple-pay-mark.svg';
import applePayWordmark from '../assets/apple-pay-wordmark.svg';
import paypalLogo from '../assets/paypal-logo.png';

const SHIPPING_ADDRESS = { line1: '123 Main Street, Apt. 5', line2: 'San Francisco, CA 44512' };

const CardBrandMarks = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
    <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 11, letterSpacing: '-0.4px', color: '#1a1f71' }}>VISA</span>
    <div style={{ position: 'relative', width: 20, height: 12 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 12, height: 12, borderRadius: '50%', background: '#eb001b' }} />
      <div style={{ position: 'absolute', left: 6, top: 0, width: 12, height: 12, borderRadius: '50%', background: '#f79e1b', opacity: 0.9 }} />
    </div>
  </div>
);

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card', brand: <CardBrandMarks /> },
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    brand: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        <img src={applePayMark} alt="" style={{ height: 12 }} />
        <img src={applePayWordmark} alt="" style={{ height: 12 }} />
      </div>
    ),
  },
  {
    id: 'paypal',
    label: 'PayPal Pay Later',
    brand: <img src={paypalLogo} alt="PayPal" style={{ height: 14, flexShrink: 0 }} />,
  },
];

const ACCORDION_SECTIONS = [
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'signature', label: 'Signature' },
];

export function PaymentAccordions() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);
  const [autoRefill, setAutoRefill] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFsaCard, setIsFsaCard] = useState(false);
  const [billingAddress, setBillingAddress] = useState('same');

  const [showFullTerms, setShowFullTerms] = useState(false);
  const [showSignatureFaq, setShowSignatureFaq] = useState(false);

  return (
    <>
      {ACCORDION_SECTIONS.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div
            key={section.id}
            style={{ width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid var(--fade)', borderRadius: 4, overflow: 'hidden' }}
          >
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? null : section.id)}
              style={{ width: '100%', boxSizing: 'border-box', background: 'none', border: 'none', cursor: 'pointer', padding: 16, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', textAlign: 'left' }}
            >
              <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>{section.label}</span>
              <Icon name={isOpen ? 'ArrowDropUpStyleFilled' : 'ArrowDropDownStyleFilled'} size={24} style={{ color: 'var(--pitch)', flexShrink: 0 }} />
            </button>

            {isOpen && (
              <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {section.id === 'shipping' && (
                  <>
                    <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--gunmetal)', borderRadius: 4, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                      <div style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)' }}>
                        <p style={{ margin: 0 }}>{SHIPPING_ADDRESS.line1}</p>
                        <p style={{ margin: 0 }}>{SHIPPING_ADDRESS.line2}</p>
                      </div>
                      <a href="#" style={{ fontSize: 14, color: 'var(--sky)' }}>Edit</a>
                    </div>

                    <div style={{ borderTop: '1px solid var(--fade)', width: '100%', paddingTop: 12 }}>
                      <p style={{ margin: 0, fontSize: 14, color: 'var(--pitch)' }}>
                        Your prescription has{' '}
                        <span style={{ fontWeight: 700, fontStyle: 'italic', color: 'var(--foliage)' }}>FREE SHIPPING!</span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAutoRefill((v) => !v)}
                      style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', gap: 8, alignItems: 'flex-start', textAlign: 'left', fontFamily: 'var(--font-body)' }}
                    >
                      <span style={{ width: 24, height: 24, borderRadius: 4, boxShadow: autoRefill ? 'none' : '0 0 0 1px var(--gunmetal)', background: autoRefill ? 'var(--sky)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {autoRefill && <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </span>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 16, color: 'var(--pitch)' }}>Ship refills automatically</span>
                        <span style={{ fontSize: 14, color: 'var(--pitch)' }}>
                          We&rsquo;ll notify before your refill ships. You can unenroll any time.{' '}
                          <span style={{ color: 'var(--sky)', textDecoration: 'underline' }}>Learn more</span>
                        </span>
                      </span>
                    </button>
                  </>
                )}

                {section.id === 'payment' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {PAYMENT_METHODS.map((method) => {
                      const selected = paymentMethod === method.id;
                      return (
                        <div
                          key={method.id}
                          style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: `8px 12px ${selected ? 20 : 8}px`, display: 'flex', flexDirection: 'column', gap: 16 }}
                        >
                          <label style={{ width: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0', cursor: 'pointer' }}>
                            <span style={{ width: 24, height: 24, borderRadius: '50%', boxShadow: '0 0 0 1px var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {selected && <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--sky)' }} />}
                            </span>
                            <input
                              type="radio"
                              name="payment-method"
                              checked={selected}
                              onChange={() => setPaymentMethod(method.id)}
                              style={{ display: 'none' }}
                            />
                            <span style={{ flex: 1, fontSize: 16, color: 'var(--pitch)' }}>{method.label}</span>
                            {method.brand}
                          </label>

                          {selected && method.id === 'card' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                              <TextInput
                                label="Credit/debit card number"
                                placeholder="1234-1234-1234-1234"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                              />
                              <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                                <div style={{ flex: '1 1 0%', minWidth: 0 }}>
                                  <TextInput label="Expiration date" placeholder="MM/YY" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                                </div>
                                <div style={{ flex: '1 1 0%', minWidth: 0 }}>
                                  <TextInput label="CVV" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                                </div>
                              </div>

                              <Checkbox
                                label="This is a FSA, HSA or HRA card"
                                checked={isFsaCard}
                                onChange={() => setIsFsaCard((v) => !v)}
                              />

                              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--pitch)' }}>Billing address</p>
                                <Radio
                                  borderless
                                  name="billing-address"
                                  checked={billingAddress === 'same'}
                                  onChange={() => setBillingAddress('same')}
                                  label={
                                    <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                      <span style={{ color: 'var(--pitch)' }}>Same as shipping address</span>
                                      <span style={{ fontSize: 14, color: 'var(--gunmetal)' }}>
                                        {SHIPPING_ADDRESS.line1}
                                        <br />
                                        {SHIPPING_ADDRESS.line2}
                                      </span>
                                    </span>
                                  }
                                />
                                <Radio
                                  borderless
                                  name="billing-address"
                                  checked={billingAddress === 'new'}
                                  onChange={() => setBillingAddress('new')}
                                  label="Add new address"
                                />
                              </div>
                            </div>
                          )}

                          {selected && method.id === 'apple-pay' && (
                            <button
                              type="button"
                              style={{ width: '100%', boxSizing: 'border-box', height: 48, border: '1px solid var(--pitch)', borderRadius: 4, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}
                            >
                              <img src={applePayMark} alt="" style={{ height: 18 }} />
                              <img src={applePayWordmark} alt="Pay" style={{ height: 22 }} />
                            </button>
                          )}

                          {selected && method.id === 'paypal' && (
                            <p style={{ margin: 0, fontSize: 14, color: 'var(--gunmetal)' }}>
                              You&rsquo;ll be redirected to PayPal to complete your purchase.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {section.id === 'signature' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                    <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>Draw your signature in the box below</p>

                    <SignaturePad height={145} />

                    <Button hierarchy="primary" fullWidth onClick={() => navigate('/order-confirmation')}>Confirm $XX</Button>

                    <div style={{ borderTop: '1px solid var(--fade)', width: '100%' }} />

                    <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)' }}>
                      {showFullTerms ? (
                        SIGNATURE_CONSENT_FULL
                      ) : (
                        <>
                          By signing electronically, I, {'{{.pt_consent_name}}'},..{' '}
                          <a href="#" onClick={(e) => { e.preventDefault(); setShowFullTerms(true); }} style={{ color: 'var(--sky)' }}>
                            View full terms
                          </a>
                        </>
                      )}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                      <button
                        type="button"
                        onClick={() => setShowSignatureFaq((v) => !v)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)' }}
                      >
                        <span style={{ fontSize: 16, color: 'var(--sky)', textDecoration: 'underline' }}>Why do we need your signature?</span>
                        <Icon name={showSignatureFaq ? 'KeyboardArrowUpStyleFilled' : 'KeyboardArrowDownStyleFilled'} size={20} style={{ color: 'var(--sky)', flexShrink: 0 }} />
                      </button>
                      {showSignatureFaq && (
                        <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{SIGNATURE_FAQ_ANSWER}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
