import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { PhilRxFooter } from '../components/PhilRxFooter.jsx';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Log In to your account</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <TextInput label="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput
            label="Password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Checkbox checked={showPassword} onChange={() => setShowPassword((v) => !v)} label="Show password" />

        <div style={{ alignSelf: 'flex-start' }}>
          <Button hierarchy="link">Forgot password?</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={() => navigate('/confirm-identity')}>Log In</Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--fade)' }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--pitch)' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--fade)' }} />
          </div>

          <Button hierarchy="secondary" fullWidth>Log in with one-time code</Button>

          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>
            By proceeding, you agree to our{' '}
            <a href="#" style={{ color: 'var(--gunmetal)' }}>terms of use</a>,{' '}
            <a href="#" style={{ color: 'var(--gunmetal)' }}>privacy policy,</a> and{' '}
            <a href="#" style={{ color: 'var(--gunmetal)' }}>HIPAA policy</a>.
          </p>
        </div>
      </div>

      <div style={{ width: '100%', marginTop: 126 }}>
        <PhilRxFooter />
      </div>
    </div>
  );
}
