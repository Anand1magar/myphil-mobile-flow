import React, { useState } from 'react';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { SignaturePad } from '@ds/components/domain/SignaturePad/SignaturePad.jsx';

const stopToggle = (e) => e.stopPropagation();

// The combined HIPAA + coupon consent: eligibility and HIPAA checkboxes, a
// signature that appears once HIPAA is agreed, and an optional opt-in.
// Used standalone on the consent screen and inlined in the dual-pricing card.
export function SavingsConsentBlock({ heading }) {
  const [eligibilityAgreed, setEligibilityAgreed] = useState(true);
  const [hipaaAgreed, setHipaaAgreed] = useState(true);
  const [stayConnected, setStayConnected] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
      {heading && (
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--pitch)', textTransform: 'uppercase' }}>{heading}</p>
      )}

      <Checkbox
        checked={eligibilityAgreed}
        onChange={() => setEligibilityAgreed((v) => !v)}
        label={
          <>
            <strong>Eligibility &amp; Terms</strong>. By using this offer, the patient certifies...{' '}
            <a href="#" onClick={stopToggle} style={{ color: 'var(--sky)' }}>View full terms</a>
          </>
        }
      />

      <Checkbox
        checked={hipaaAgreed}
        onChange={() => setHipaaAgreed((v) => !v)}
        label={
          <>
            <strong>HIPAA Authorization:</strong> By clicking the checkbox, I agree that ...{' '}
            <a href="#" onClick={stopToggle} style={{ color: 'var(--sky)' }}>View full terms</a>
          </>
        }
      />

      <Checkbox
        checked={stayConnected}
        onChange={() => setStayConnected((v) => !v)}
        label={
          <>
            <em>(Optional)</em> Stay connected - check the box to receive helpful updates, resources, and information about the manufacturer, its products, and services.{' '}
            <a href="#" onClick={stopToggle} style={{ color: 'var(--sky)' }}>Read More</a>
          </>
        }
      />

      {hipaaAgreed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--gunmetal)', margin: 0 }}>
            <em>(Required)</em> Draw your signature in the box below
          </p>
          <SignaturePad />
        </div>
      )}
    </div>
  );
}
