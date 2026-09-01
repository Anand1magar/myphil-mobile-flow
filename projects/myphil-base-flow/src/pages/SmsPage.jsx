import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SmsMessageScreen } from '../components/SmsMessageScreen.jsx';

export function SmsPage() {
  const navigate = useNavigate();
  return (
    <SmsMessageScreen>
      <p style={{ margin: 0, fontFamily: 'Arial, sans-serif', fontSize: 16, lineHeight: 1.25, color: '#191919', opacity: 0.9, whiteSpace: 'pre-wrap' }}>
        Your Drugname (chemical compositions) (volume) is ready at PhilRx Pharmacy. Tap to finish fast setup:{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/welcome'); }} style={{ color: '#2363c3', textDecoration: 'none' }}>
          https://philrx.com/sign-up/dasyhk
        </a>
      </p>
      <p style={{ margin: '8px 0 0', fontFamily: 'Arial, sans-serif', fontSize: 16, lineHeight: 1.25, color: '#191919' }}>
        Note: Reply HELP for help or STOP to unsubscribe. About 4 msgs/month. Msg&amp;Data rates may apply.
      </p>
    </SmsMessageScreen>
  );
}
