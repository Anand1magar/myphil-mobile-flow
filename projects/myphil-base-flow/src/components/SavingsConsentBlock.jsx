import React, { useState } from 'react';
import { Checkbox } from '@ds/components/forms/Checkbox/Checkbox.jsx';
import { SignaturePad } from '@ds/components/domain/SignaturePad/SignaturePad.jsx';

const stopToggle = (e) => e.stopPropagation();

const RULE = <div style={{ width: '100%', borderTop: '2px solid #D9D9D9' }} />;

// The combined HIPAA + coupon consent: eligibility and HIPAA checkboxes, a
// signature that appears once HIPAA is agreed, and an optional opt-in.
//
// The standalone consent screen puts the optional opt-in after the signature;
// the dual-pricing card groups all three checkboxes together and separates the
// signature with rules, so both orders are supported.
export function SavingsConsentBlock({ heading, showRules = false, optionalBeforeSignature = false }) {
  const [eligibilityAgreed, setEligibilityAgreed] = useState(true);
  const [hipaaAgreed, setHipaaAgreed] = useState(true);
  const [stayConnected, setStayConnected] = useState(false);

  const optionalCheckbox = (
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
  );

  const signatureBlock = hipaaAgreed && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--gunmetal)', margin: 0 }}>
        <em>(Required)</em> Draw your signature in the box below
      </p>
      <SignaturePad />
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: showRules ? 12 : 20, width: '100%' }}>
      {heading && (
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, lineHeight: '21px', letterSpacing: '0.021px', color: '#424243', textTransform: 'uppercase' }}>{heading}</p>
      )}

      {showRules && heading && RULE}

      <div style={{ display: 'flex', flexDirection: 'column', gap: showRules ? 6 : 20, width: '100%' }}>
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

        {optionalBeforeSignature && optionalCheckbox}
      </div>

      {showRules && RULE}

      {signatureBlock}

      {!optionalBeforeSignature && optionalCheckbox}
    </div>
  );
}
