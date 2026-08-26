import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { PhilRxFooter } from '../components/PhilRxFooter.jsx';

const DELIVERY_OPTIONS = [
  { id: 'email', label: 'Email', detail: '****isa@gmail.com' },
  { id: 'text', label: 'Text message', detail: '(***)***-1301' },
];

export function OtpDeliveryPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState(null);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Where should we send your one-time code?</h1>

        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          Please choose where you&rsquo;d like to receive your 6-digit code.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DELIVERY_OPTIONS.map((option) => (
            <label
              key={option.id}
              style={{ display: 'flex', alignItems: 'center', gap: 8, height: 56, border: '1px solid var(--fade)', borderRadius: 4, padding: '12px 8px', boxSizing: 'border-box', cursor: 'pointer' }}
            >
              <span style={{ width: 24, height: 24, borderRadius: '50%', boxShadow: '0 0 0 1px var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {method === option.id && <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--sky)' }} />}
              </span>
              <input type="radio" name="otp-method" checked={method === option.id} onChange={() => setMethod(option.id)} style={{ display: 'none' }} />
              <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>
                {option.label} <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--sky)' }}>{option.detail}</span>
              </span>
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={() => navigate('/otp-verify')}>Send Code</Button>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>
            Message &amp; data rates may apply if you select to receive your code by text message.
          </p>
        </div>
      </div>

      <PhilRxFooter />
    </div>
  );
}
