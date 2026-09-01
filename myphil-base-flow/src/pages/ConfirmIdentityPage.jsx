import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

export function ConfirmIdentityPage() {
  const navigate = useNavigate();
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Enter your information to get started</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextInput label="Last Name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <TextInput label="Date of birth (MM/DD/YYYY)" placeholder="MM/DD/YYYY" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>

        <Button hierarchy="primary" fullWidth onClick={() => navigate('/otp-delivery')}>Confirm</Button>
      </div>

      <MyPhilFooter />
    </div>
  );
}
