import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { Radio } from '@ds/components/forms/Radio/Radio.jsx';
import { useEnrollment } from '../state/EnrollmentContext.jsx';

export function InsurancePage() {
  const navigate = useNavigate();
  const { data, updateData } = useEnrollment();
  const choice = data.hasInsurance;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '40px 16px', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-black)', color: 'var(--pitch)', margin: 0 }}>
        Do you have insurance?
      </h1>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--gunmetal)', margin: 0 }}>
        We'll use it to find your lowest possible price.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Radio
          borderless
          name="hasInsurance"
          label="Yes, I have insurance"
          checked={choice === true}
          onChange={() => updateData({ hasInsurance: true })}
        />
        <Radio
          borderless
          name="hasInsurance"
          label="No, I don't have insurance"
          checked={choice === false}
          onChange={() => updateData({ hasInsurance: false })}
        />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Button hierarchy="tertiary" fullWidth onClick={() => navigate('/welcome')}>
            Back
          </Button>
        </div>
        <div style={{ flex: 2 }}>
          <Button hierarchy="primary" fullWidth disabled={choice === null} onClick={() => navigate('/address')}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
