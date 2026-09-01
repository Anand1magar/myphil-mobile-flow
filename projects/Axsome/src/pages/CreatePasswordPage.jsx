import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { BrandHeader as MyPhilHeader } from '../components/BrandHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

export function CreatePasswordPage() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 120px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Create Password</h1>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Select a secure password to protect your Axsome OnMySide account.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TextInput
            label="New password"
            placeholder="New password"
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextInput
            label="Confirm password"
            placeholder="Confirm password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p style={{ fontSize: 12, lineHeight: '18px', color: 'var(--pitch)', margin: 0 }}>
            8 characters or longer; include letter &amp; number; do not include any spaces
          </p>
        </div>

        <Checkbox checked={showPassword} onChange={() => setShowPassword((v) => !v)} label="Show Password" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={() => navigate('/enrollment-success')}>Confirm</Button>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>
            By proceeding, you agree to our{' '}
            <a href="#" style={{ color: 'var(--gunmetal)' }}>terms of use</a>,{' '}
            <a href="#" style={{ color: 'var(--gunmetal)' }}>privacy policy,</a> and{' '}
            <a href="#" style={{ color: 'var(--gunmetal)' }}>HIPAA policy</a>.
          </p>
        </div>
      </div>

      <MyPhilFooter />
    </div>
  );
}
