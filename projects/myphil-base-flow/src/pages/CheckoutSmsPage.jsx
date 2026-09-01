import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SmsMessageScreen } from '../components/SmsMessageScreen.jsx';

export function CheckoutSmsPage() {
  const navigate = useNavigate();
  return (
    <SmsMessageScreen>
      <p style={{ margin: 0, fontFamily: 'Arial, sans-serif', fontSize: 16, lineHeight: 1.25, color: '#191919', opacity: 0.9, whiteSpace: 'pre-wrap' }}>
        We found your best price on Drugname (chemical compositions) (volume)! Tap to complete order:{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{ color: '#2363c3', textDecoration: 'none' }}>
          https://philrx.com/checkout/Yu2YquwuVw
        </a>
      </p>
    </SmsMessageScreen>
  );
}
