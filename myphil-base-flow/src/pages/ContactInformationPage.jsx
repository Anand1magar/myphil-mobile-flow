import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { PhilRxHeader } from '../components/PhilRxHeader.jsx';
import { PhilRxFooter } from '../components/PhilRxFooter.jsx';

const ADDRESS = { line1: '123 Main Street, Apt. 5', line2: 'San Francisco, CA 44512' };
const ALLERGY_OPTIONS = ['Aspirin', 'Penicillin', 'Insulin', 'NSAIDs', 'Morphin', 'Latex', 'Other'];

const textareaStyle = {
  width: '100%',
  boxSizing: 'border-box',
  border: '1px solid var(--pitch)',
  borderRadius: 4,
  padding: '8px 16px',
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  color: 'var(--pitch)',
  resize: 'vertical',
  outline: 'none',
};

export function ContactInformationPage() {
  const navigate = useNavigate();
  const [notifyByText, setNotifyByText] = useState(true);
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [noKnownAllergies, setNoKnownAllergies] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');

  const toggleAllergy = (allergy) => {
    setAllergies((prev) => (prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]));
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxHeader />

      <div style={{ width: '100%', boxSizing: 'border-box', background: 'var(--paper)', padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Do you have another insurance?</p>
        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          If you do, please{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/insurance-card-upload'); }} style={{ color: 'var(--sky)' }}>upload it here</a>{' '}
          so we can get you the lowest possible price for your prescription.
        </p>
      </div>

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Contact Information</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Address</p>
          <div style={{ border: '1px solid var(--pitch)', borderRadius: 4, padding: '12px 16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, boxSizing: 'border-box' }}>
            <div style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>
              <p style={{ margin: 0 }}>{ADDRESS.line1}</p>
              <p style={{ margin: 0 }}>{ADDRESS.line2}</p>
            </div>
            <Button hierarchy="link">Edit</Button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--fade)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            How would you like to be notified about important prescription updates?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Checkbox label="Text messages (recommended)" checked={notifyByText} onChange={() => setNotifyByText((v) => !v)} />
            <Checkbox label="Email" checked={notifyByEmail} onChange={() => setNotifyByEmail((v) => !v)} />
          </div>
        </div>

        <TextInput label="Email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div style={{ borderTop: '1px solid var(--fade)' }} />

        <Checkbox
          label="No known allergies, medical history, or current medications"
          checked={noKnownAllergies}
          onChange={() => setNoKnownAllergies((v) => !v)}
        />

        {!noKnownAllergies && (
          <div style={{ width: '100%', boxSizing: 'border-box', border: '1px solid var(--fade)', borderRadius: 4, padding: 8, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Allergies</p>
              <div style={{ borderTop: '1px solid var(--fade)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {ALLERGY_OPTIONS.map((allergy) => (
                  <Checkbox key={allergy} label={allergy} checked={allergies.includes(allergy)} onChange={() => toggleAllergy(allergy)} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Medical history</p>
              <div style={{ borderTop: '1px solid var(--fade)' }} />
              <textarea rows={3} placeholder="Type here" value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} style={textareaStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Current medication</p>
              <div style={{ borderTop: '1px solid var(--fade)' }} />
              <textarea rows={3} placeholder="Type here" value={currentMedication} onChange={(e) => setCurrentMedication(e.target.value)} style={textareaStyle} />
            </div>
          </div>
        )}

        <Button hierarchy="primary" fullWidth onClick={() => navigate('/savings-enrollment')}>Next</Button>

        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          By clicking next and choosing email and/or text, you agree to receive prescription updates by email and/or text. Text message frequency may vary. Message and data rates may apply. Reply STOP to{' '}
          <a href="https://philhelp.zendesk.com/hc/en-us/p/faq#section2answer7" target="_blank" rel="noreferrer" style={{ color: 'var(--sky)' }}>unsubscribe</a>.
        </p>
      </div>

      <PhilRxFooter />
    </div>
  );
}
