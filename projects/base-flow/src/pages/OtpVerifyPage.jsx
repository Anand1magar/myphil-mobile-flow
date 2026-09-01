import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { PhilRxAppHeader } from '../components/PhilRxAppHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

const CODE_LENGTH = 6;
const BORDER_COLOR = { default: 'var(--pitch)', focused: 'var(--sky)', error: 'var(--ruby)', filled: 'var(--pitch)' };

export function OtpVerifyPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, '').slice(-1);
    setHasError(false);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    const incomplete = digits.some((d) => d === '');
    setHasError(incomplete);
    if (!incomplete) {
      navigate('/my-prescriptions');
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxAppHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Enter Verification Code</h1>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            We&rsquo;ve sent a one-time code to your email address at ****isa@gmail.com. Enter the code below to verify.
          </p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            If you don&rsquo;t see the email, check your spam or junk folder. The code expires in 15 minutes.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {digits.map((digit, index) => {
              const boxState = hasError ? 'error' : digit ? 'filled' : 'default';
              const effState = focusedIndex === index ? 'focused' : boxState;
              return (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex((current) => (current === index ? null : current))}
                  style={{
                    width: 42,
                    height: 48,
                    border: 'none',
                    borderRadius: 4,
                    boxShadow: `0 0 0 ${focusedIndex === index ? 2 : 1}px ${BORDER_COLOR[effState]}`,
                    background: boxState === 'filled' ? 'var(--paper)' : 'transparent',
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: 'var(--pitch)',
                    boxSizing: 'border-box',
                  }}
                />
              );
            })}
          </div>
          {hasError && <span style={{ fontSize: 14, lineHeight: '20px', color: 'var(--ruby)' }}>Incorrect code</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={handleConfirm}>Confirm</Button>
          <Button hierarchy="secondary" fullWidth>Resend Code</Button>
        </div>
      </div>

      <MyPhilFooter />
    </div>
  );
}
