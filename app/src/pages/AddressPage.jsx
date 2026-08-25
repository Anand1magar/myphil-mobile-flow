import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { useEnrollment } from '../state/EnrollmentContext.jsx';

export function AddressPage() {
  const navigate = useNavigate();
  const { data, updateData } = useEnrollment();
  const [sameAsBilling, setSameAsBilling] = useState(true);

  const setField = (field) => (e) => updateData({ address: { ...data.address, [field]: e.target.value } });
  const canContinue = data.address.street && data.address.city && data.address.zip;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '40px 16px', fontFamily: 'var(--font-body)' }}>
      <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-black)', color: 'var(--pitch)', margin: 0 }}>
        Where should we ship it?
      </h1>
      <TextInput label="Street address" placeholder="123 Market St" value={data.address.street} onChange={setField('street')} />
      <TextInput label="City" placeholder="San Francisco" value={data.address.city} onChange={setField('city')} />
      <TextInput label="ZIP code" placeholder="94103" value={data.address.zip} onChange={setField('zip')} />
      <Checkbox label="Same as billing address" checked={sameAsBilling} onChange={() => setSameAsBilling((v) => !v)} />
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <Button hierarchy="tertiary" fullWidth onClick={() => navigate('/insurance')}>
            Back
          </Button>
        </div>
        <div style={{ flex: 2 }}>
          <Button hierarchy="primary" fullWidth disabled={!canContinue} onClick={() => navigate('/thank-you')}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
