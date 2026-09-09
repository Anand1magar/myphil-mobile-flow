import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { NextSteps } from '@ds/components/domain/NextSteps/NextSteps.jsx';
import { CaregiverModal } from '@ds/components/domain/CaregiverModal/CaregiverModal.jsx';
import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import trustpilotRating from '@ds/assets/images/trustpilot-rating.png';
import bbbAccredited from '@ds/assets/images/bbb-accredited-business.jpg';
import soc2Badge from '@ds/assets/images/soc2-badge.png';
import hipaaVector from '@ds/assets/icons/hipaa-badge/hipaa-vector.svg';
import hipaaLabel from '@ds/assets/icons/hipaa-badge/hipaa-label.svg';
import compliantLabel from '@ds/assets/icons/hipaa-badge/compliant-label.svg';
import hipaaVectorStroke from '@ds/assets/icons/hipaa-badge/hipaa-vector-stroke.svg';

const PATIENT_NAME = 'Patricia';

const WHY_PHILRX = [
  'Automated refills that are processed and delivered as part of our auto-refill program',
  'Free shipping with every delivery',
  'Manufacturer offers that may be applied to lower your cost',
];

function HipaaBadge() {
  return (
    <div style={{ position: 'relative', width: 81, height: 40, flexShrink: 0 }}>
      <div style={{ background: 'var(--foliage)', borderRadius: '1px 17px 1px 1px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 13px 8px 8px', position: 'relative' }}>
        <img src={hipaaVector} alt="" style={{ position: 'absolute', right: -8, top: 4, width: 16, height: 22 }} />
        <img src={hipaaLabel} alt="" style={{ width: 50, height: 13 }} />
        <img src={compliantLabel} alt="" style={{ width: 51, height: 7 }} />
        <img src={hipaaVectorStroke} alt="" style={{ position: 'absolute', right: -10, top: 3, width: 19, height: 25 }} />
      </div>
    </div>
  );
}

export function WelcomePage() {
  const navigate = useNavigate();
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [showCaregiverModal, setShowCaregiverModal] = useState(false);
  const canContinue = lastName && dob;

  return (
    <div style={{ width: '100%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 28, padding: '20px 16px 60px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Welcome, {PATIENT_NAME}!</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Dr. Cristina Truman sent your Drugname (chemical compositions) (volume) prescription. Confirm your identity to continue.
          </p>
          <TextInput label="Last name" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <TextInput label="Date of birth (MM/DD/YYYY)" placeholder="Date of birth (MM/DD/YYYY)" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>

        <Button hierarchy="primary" fullWidth disabled={!canContinue} onClick={() => setShowCaregiverModal(true)}>Next</Button>
      </div>

      <div style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--pitch)', margin: 0, maxWidth: 194 }}>
            By proceeding, you agree to <a href="#" style={{ color: 'var(--pitch)' }}>terms of use</a>, our <a href="#" style={{ color: 'var(--pitch)' }}>privacy policy</a> and <a href="#" style={{ color: 'var(--pitch)' }}>HIPAA policy.</a>
          </p>
          <HipaaBadge />
        </div>
        <div style={{ borderTop: '1px solid var(--fade)' }} />
        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          Already have a PHILRx account? <a href="#" style={{ color: 'var(--sky)', fontWeight: 700, textDecoration: 'underline' }}>Log in</a>
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={trustpilotRating} alt="Trustpilot" style={{ height: 36 }} />
          <img src={bbbAccredited} alt="BBB Accredited Business" style={{ height: 36 }} />
          <img src={soc2Badge} alt="SOC 2 Type II" style={{ height: 44 }} />
        </div>
      </div>

      <div style={{ width: '100%', boxSizing: 'border-box', padding: '0 16px 20px' }}>
        <NextSteps
          title="What's next"
          steps={[
            'Confirm your information',
            'PHILRx will find your lowest price',
            'Confirm your price, and we’ll ship your medication',
          ]}
        />
      </div>

      <div style={{ width: '100%', background: 'var(--paper)', padding: '24px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 18, fontWeight: 700, lineHeight: '28px', color: 'var(--pitch)', margin: 0 }}>Why should I use PHILRx?</p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            PHILRx coordinates with your doctor, your insurance company, and our network of partner pharmacies to work on finding your lowest cost and get your prescription filled. PHILRx has:
          </p>
          <ul style={{ margin: 0, paddingLeft: 24, fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>
            {WHY_PHILRX.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            PHILRx is here to help manage your prescription!
          </p>
        </div>
      </div>

      <MyPhilFooter />

      <CaregiverModal
        open={showCaregiverModal}
        onClose={() => setShowCaregiverModal(false)}
        onConfirm={() => navigate('/insurance-details')}
        patientName={PATIENT_NAME}
      />
    </div>
  );
}
