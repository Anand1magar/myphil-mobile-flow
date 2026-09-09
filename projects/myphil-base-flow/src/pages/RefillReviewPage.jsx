import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { Radio } from '@ds/components/forms/Radio/Radio.jsx';
import { SignaturePad } from '@ds/components/domain/SignaturePad/SignaturePad.jsx';
import { Icon } from '@ds/assets/icons/Icon.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import applePayMark from '../assets/apple-pay-mark.svg';
import applePayWordmark from '../assets/apple-pay-wordmark.svg';
import paypalLogo from '../assets/paypal-logo.png';

const SHIPPING_ADDRESS = { line1: '123 Main Street, Apt. 5', line2: 'San Francisco, CA 44512' };
const SAVED_CARD = { brand: 'Mastercard', last4: '4242' };
const TOTAL = '$10';

const SIGNATURE_FAQ_ANSWER = `We collect your signature as required by your insurer to verify and confirm that you are only receiving prescriptions you really want. We won't fill your prescription without your approval.`;

const CardBrandMarks = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
    <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 15, letterSpacing: '-0.4px', color: '#1a1f71' }}>VISA</span>
    <div style={{ position: 'relative', width: 27, height: 17 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 17, height: 17, borderRadius: '50%', background: '#eb001b' }} />
      <div style={{ position: 'absolute', left: 10, top: 0, width: 17, height: 17, borderRadius: '50%', background: '#f79e1b', opacity: 0.9 }} />
    </div>
  </div>
);

const ApplePayMarks = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
    <img src={applePayMark} alt="" style={{ height: 16 }} />
    <img src={applePayWordmark} alt="" style={{ height: 16 }} />
  </div>
);

const SectionLabel = ({ children }) => (
  <p style={{ margin: 0, fontSize: 14, color: 'var(--gunmetal)' }}>{children}</p>
);

const OutlinedBox = ({ children }) => (
  <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
    {children}
  </div>
);

// Refill checkout: a flat review-and-confirm screen. Payment starts collapsed
// to the card already on file and expands on demand, first to the card form,
// then to the full method picker.
const PAYMENT_STAGE = { SAVED: 'saved', CARD_FORM: 'cardForm', PICKER: 'picker' };

export function RefillReviewPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(PAYMENT_STAGE.SAVED);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFsaCard, setIsFsaCard] = useState(false);
  const [billingAddress, setBillingAddress] = useState('same');
  const [autoRefill, setAutoRefill] = useState(true);
  const [showSignatureFaq, setShowSignatureFaq] = useState(false);

  const autoRefillCheckbox = (
    <Checkbox
      checked={autoRefill}
      onChange={() => setAutoRefill((v) => !v)}
      label={
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>Ship refills automatically if the price stays the same.</span>
          <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} style={{ fontSize: 14, color: 'var(--sky)', textDecoration: 'underline' }}>Learn more</a>
        </span>
      }
    />
  );

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader active="rx" />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 16px 60px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Review and confirm</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Order summary</SectionLabel>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: '26px', color: 'var(--pitch)' }}>Drugname (chemical compositions) (volume)</p>
          <OutlinedBox>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: '26px', color: 'var(--pitch)' }}>30 Day Supply with Coupon for $20</p>
            <p style={{ margin: 0, fontSize: 16, color: 'var(--pitch)' }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--sky)' }}>Learn more</a> about your cost
            </p>
          </OutlinedBox>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Shipping</SectionLabel>
          <OutlinedBox>
            <div style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>
              <p style={{ margin: 0 }}>{SHIPPING_ADDRESS.line1}</p>
              <p style={{ margin: 0 }}>{SHIPPING_ADDRESS.line2}</p>
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 14, color: 'var(--sky)' }}>Edit</a>
          </OutlinedBox>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--pitch)' }}>
            Your prescription has{' '}
            <span style={{ fontWeight: 700, fontStyle: 'italic', color: 'var(--foliage)' }}>FREE SHIPPING!</span>
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Payment</SectionLabel>

          {stage === PAYMENT_STAGE.SAVED && (
            <>
              <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', boxSizing: 'border-box', border: '2px solid var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--sky)' }} />
                </span>
                <CardBrandMarks />
                <span style={{ flex: 1, fontSize: 16, color: 'var(--pitch)' }}>&bull;&bull;&bull;&bull;{SAVED_CARD.last4}</span>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setStage(PAYMENT_STAGE.CARD_FORM); }}
                  style={{ fontSize: 14, color: 'var(--sky)', flexShrink: 0 }}
                >
                  Edit
                </a>
              </div>
              <Button hierarchy="link" onClick={() => setStage(PAYMENT_STAGE.PICKER)}>Change payment method</Button>
            </>
          )}

          {stage === PAYMENT_STAGE.CARD_FORM && (
            <>
              <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: 12, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', boxSizing: 'border-box', border: '2px solid var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--sky)' }} />
                  </span>
                  <span style={{ flex: 1, fontSize: 16, color: 'var(--pitch)' }}>Credit/Debit Card</span>
                  <CardBrandMarks />
                </div>

                <TextInput label="Credit/debit card number" placeholder="1234-1234-1234-1234" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                <div style={{ display: 'flex', gap: 12, width: '100%' }}>
                  <div style={{ flex: '1 1 0%', minWidth: 0 }}>
                    <TextInput label="Expiration date" placeholder="MM/YY" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
                  </div>
                  <div style={{ flex: '1 1 0%', minWidth: 0 }}>
                    <TextInput label="CVV" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                  </div>
                </div>

                <Checkbox label="This is a FSA, HSA or HRA card" checked={isFsaCard} onChange={() => setIsFsaCard((v) => !v)} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--pitch)' }}>Billing address</p>
                  <Radio
                    borderless
                    name="refill-billing-address"
                    checked={billingAddress === 'same'}
                    onChange={() => setBillingAddress('same')}
                    label="Same as shipping address"
                    supportingText={`${SHIPPING_ADDRESS.line1}\n${SHIPPING_ADDRESS.line2}`}
                  />
                  <Radio
                    borderless
                    name="refill-billing-address"
                    checked={billingAddress === 'new'}
                    onChange={() => setBillingAddress('new')}
                    label="Add new address"
                  />
                </div>
              </div>
              <Button hierarchy="link" onClick={() => setStage(PAYMENT_STAGE.PICKER)}>Change payment method</Button>
            </>
          )}

          {stage === PAYMENT_STAGE.PICKER && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: '4px 12px' }}>
                <Radio
                  borderless
                  name="refill-payment-method"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  label={
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                      <span style={{ flex: 1 }}>Credit/Debit Card</span>
                      <CardBrandMarks />
                    </span>
                  }
                />
              </div>
              <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: '4px 12px' }}>
                <Radio
                  borderless
                  name="refill-payment-method"
                  checked={paymentMethod === 'apple-pay'}
                  onChange={() => setPaymentMethod('apple-pay')}
                  label={
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                      <span style={{ flex: 1 }}>Apple Pay</span>
                      <ApplePayMarks />
                    </span>
                  }
                />
              </div>
              <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: '4px 12px' }}>
                <Radio
                  borderless
                  name="refill-payment-method"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  label={
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                      <span style={{ flex: 1 }}>Pay later with Paypal</span>
                      <img src={paypalLogo} alt="PayPal" style={{ height: 14, flexShrink: 0 }} />
                    </span>
                  }
                />
              </div>
            </div>
          )}
        </div>

        {autoRefillCheckbox}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Signature</SectionLabel>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>Draw your signature in the box below</p>
          <SignaturePad height={145} />
        </div>

        <Button hierarchy="primary" fullWidth onClick={() => navigate('/order-confirmation')}>Confirm {TOTAL}</Button>

        <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)' }}>
          By signing electronically, I, {'{{.pt_consent_name}}'},..{' '}
          <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--sky)' }}>View full terms</a>
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

      <MyPhilFooter insuranceNote />
    </div>
  );
}
