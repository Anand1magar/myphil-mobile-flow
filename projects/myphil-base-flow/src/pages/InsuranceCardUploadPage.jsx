import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';
import cameraUploadIcon from '@ds/assets/icons/camera-upload.svg';

export function InsuranceCardUploadPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 120px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>
          Upload your prescription insurance card
        </h1>

        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          Make sure the <strong>Rx BIN</strong> is clearly visible. <a href="#" style={{ color: 'var(--sky)', textDecoration: 'none' }}>Which card do I need?</a>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/insurance-card-review')}
              style={{ width: '100%', boxSizing: 'border-box', background: '#F7F7F7', border: '2px dashed #ADB2B9', borderRadius: 16, padding: '42px 2px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, cursor: 'pointer' }}
            >
              <div style={{ width: 64, height: 64, borderRadius: 24, background: 'var(--slime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={cameraUploadIcon} alt="" style={{ width: 28, height: 28 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <span style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: 'var(--pitch)' }}>Take a photo</span>
                <span style={{ fontSize: 14, lineHeight: '20px', color: '#71717A' }}>or tap to upload from library</span>
              </div>
            </button>

            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact-information'); }} style={{ fontSize: 16, lineHeight: '24px', color: 'var(--sky)', textAlign: 'center', textDecoration: 'underline solid' }}>I don&rsquo;t have prescription insurance</a>
          </div>

          <div style={{ borderTop: '1px solid var(--fade)' }} />

          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            NOTE: You will get to review the pricing before you pay for your prescription.
          </p>
        </div>
      </div>

      <MyPhilFooter />
    </div>
  );
}
