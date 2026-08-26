import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { TextInput } from '@ds/components/forms/TextInput/TextInput.jsx';
import { NextSteps } from '@ds/components/domain/NextSteps/NextSteps.jsx';
import { CaregiverModal } from '@ds/components/domain/CaregiverModal/CaregiverModal.jsx';
import { Icon } from '@ds/assets/icons/Icon.jsx';
import { PhilRxHeader } from '../components/PhilRxHeader.jsx';
import { PhilRxFooter } from '../components/PhilRxFooter.jsx';
import trustpilotRating from '@ds/assets/images/trustpilot-rating.png';
import bbbAccredited from '@ds/assets/images/bbb-accredited-business.jpg';
import soc2Badge from '@ds/assets/images/soc2-badge.png';
import hipaaVector from '@ds/assets/icons/hipaa-badge/hipaa-vector.svg';
import hipaaLabel from '@ds/assets/icons/hipaa-badge/hipaa-label.svg';
import compliantLabel from '@ds/assets/icons/hipaa-badge/compliant-label.svg';
import hipaaVectorStroke from '@ds/assets/icons/hipaa-badge/hipaa-vector-stroke.svg';

const PATIENT_NAME = 'Patricia';

const FAQ_LINKS = ['Who is Phil?', 'How it works', 'What past users have said'];

const HOW_IT_WORKS = [
  'Phil partners with the makers of Drugname (chemical compositions) (volume) to make it easy for patients to access their medications.',
  'Phil partners with the makers of Drugname (chemical compositions) (volume) to make it easy for patients to access their medications.',
  'We work with our nationwide network of pharmacies to deliver prescriptions quickly and easily.',
];

function HipaaBadge() {
  return (
    <div style={{ position: 'relative', width: 81, height: 40, flexShrink: 0 }}>
      <div style={{ background: '#191919', borderRadius: '1px 17px 1px 1px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 13px 8px 8px', position: 'relative' }}>
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
      <PhilRxHeader />

      <div style={{ width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 28, padding: '20px 16px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Welcome, {PATIENT_NAME}!</h1>

        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          Your Drugname (chemical compositions) (volume) is ready! Dr. Cristina Truman sent your prescription to PhilRx.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            To keep your info safe and get your medication fast, confirm your identity.
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
          Already have a Phil account? <a href="#" style={{ color: 'var(--sky)', fontWeight: 700 }}>Log in</a>
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
            'Complete this online form to confirm your identity and insurance.',
            "We'll work with your insurance to find the lowest price.",
            'Once payment is received, your prescription will be delivered to you.',
          ]}
        />
      </div>

      <div style={{ width: '100%', background: '#f4f4f4', padding: 16, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Frequently asked questions</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {FAQ_LINKS.map((q) => (
              <p key={q} style={{ fontSize: 16, color: 'var(--sky)', margin: 0 }}>{q} &gt;</p>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Who is Phil?</p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            At Phil, we are on a mission to help people get their prescriptions quickly, easily and affordably. Our simple experience helps get your medication covered by insurance and delivered to your door while keeping you updated on the process.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>How it works</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HOW_IT_WORKS.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Icon name="CheckCircleStyleFilled" size={24} style={{ color: 'var(--sky)', flexShrink: 0 }} />
                <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Testimonial</p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            &ldquo;I am grateful for the price of my prescription medication, your communication, and delivery services!&rdquo;
          </p>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--pitch)', textAlign: 'right', margin: 0 }}>- Phil user</p>
        </div>
      </div>

      <PhilRxFooter />

      <CaregiverModal
        open={showCaregiverModal}
        onClose={() => setShowCaregiverModal(false)}
        onConfirm={() => navigate('/insurance-details')}
        patientName={PATIENT_NAME}
      />
    </div>
  );
}
