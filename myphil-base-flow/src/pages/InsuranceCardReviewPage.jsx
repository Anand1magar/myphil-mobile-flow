import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { CardGuideModal } from '@ds/components/domain/CardGuideModal/CardGuideModal.jsx';
import { PhilRxHeader } from '../components/PhilRxHeader.jsx';
import { PhilRxFooter } from '../components/PhilRxFooter.jsx';
import checkedDotBlue from '@ds/assets/icons/checked-dot-blue.svg';

const CHECKLIST = ['Is not blurry or cut off', 'Is your current insurance', 'Contains your Rx BIN'];

export function InsuranceCardReviewPage() {
  const navigate = useNavigate();
  const [showCardGuide, setShowCardGuide] = useState(false);

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <PhilRxHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 28, padding: '20px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Please check the card and make sure it:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CHECKLIST.map((item) => (
              <div key={item} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src={checkedDotBlue} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ width: '100%', height: 217, background: 'var(--fade)', borderRadius: 4 }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button hierarchy="link" onClick={() => navigate('/insurance-card-upload')}>Retake photo</Button>
            <Button hierarchy="primary" onClick={() => navigate('/contact-information')}>Save</Button>
          </div>
        </div>

        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          Having trouble uploading, or don&rsquo;t have the card with you? <a href="#" onClick={(e) => { e.preventDefault(); setShowCardGuide(true); }} style={{ color: 'var(--sky)' }}>Click here</a>.
        </p>

        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          NOTE: You will get to review the pricing before you pay for your prescription.
        </p>
      </div>

      <PhilRxFooter />

      <CardGuideModal open={showCardGuide} onClose={() => setShowCardGuide(false)} />
    </div>
  );
}
