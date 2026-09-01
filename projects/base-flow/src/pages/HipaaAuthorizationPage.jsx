import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { SignaturePad } from '@ds/components/domain/SignaturePad/SignaturePad.jsx';
import { MyPhilHeader } from '@ds/components/navigation/MyPhilHeader/MyPhilHeader.jsx';
import { MyPhilFooter } from '@ds/components/navigation/MyPhilFooter/MyPhilFooter.jsx';

const HIPAA_PARAGRAPHS = [
  'I authorize my healthcare providers, pharmacies (including Phil Rx), and health insurers, and their service providers (“Providers”) to disclose information relating to my insurance coverage, treatment and prescription details (“Personal Information”) to Manufacturer Pharma, Inc., its affiliates and service providers (“Manufacturer”) to provide the Services (as described below).  My Providers and Manufacturer may use my personal Information to provide the Services, which include to:',
  '•   Help coordinate insurance coverage for access to and receipt of my medication, including but not limited to prior authorization, formulary exception & appeal.',
  '•   Communicate with me about available copay assistance and financial assistance programs I might be eligible for if I have limited or no prescription coverage, and if I am enrolled, administer my participation in those programs.',
  '•   Send communications about [Drugname] that describe its benefits and related information that might help me manage my condition and its treatment, as well as requests for feedback related to the Services and my treatment, using the contact information I have provided to reach me by mail or email.',
  '•   Conduct quality assurance reviews of the Services provided',
  'My Providers may receive payment, directly or indirectly, from Manufacturer for providing the Services. Once I authorize disclosure of my Personal Information, it may no longer be protected by federal health privacy law and applicable state laws.  I understand I do not have to sign this Authorization to get my medication or insurance coverage, and if I sign I can cancel this Authorization at any time by writing to:',
  'Manufacturer Pharma',
  'c/o Phil, Inc.',
  '6991 E. Camelback Rd., Suite 340C',
  'Scottsdale, AZ 85251',
  'Cancellation will not affect uses or disclosures that occurred before my cancellation.  I also have a right to a copy of this Authorization which I may obtain by calling (855) 588-0387, Option 3.',
  'This Authorization will expire 5 years after I sign it, or earlier if required by state law, unless I cancel it sooner.  If I do not sign this Authorization or cancel it, I may no longer qualify for the Services, but it will not impact my treatment, enrollment in my health plan or my insurance benefits. I have read and agree to the Authorization statement above.',
];

const NEXT_ROUTE = '/savings-enrollment-hipaa-authorization-combined';

export function HipaaAuthorizationPage() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', minHeight: '100vh', boxSizing: 'border-box', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)' }}>
      <MyPhilHeader />

      <div style={{ width: '100%', flex: 1, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 16px 147px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>HIPAA Authorization</h1>
          <p style={{ fontSize: 16, lineHeight: '24px', letterSpacing: '0.024px', color: 'var(--pitch)', margin: 0 }}>
            To assist us in processing your prescription, please review and sign the HIPAA authorization below.
          </p>
        </div>

        <div style={{ height: 154, overflowY: 'auto', border: '2px solid var(--fade)', borderRadius: 4, padding: 16, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {HIPAA_PARAGRAPHS.map((paragraph, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: '20px', letterSpacing: '0.035px', color: 'var(--pitch)', margin: 0, whiteSpace: 'pre-wrap' }}>{paragraph}</p>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: '0.024px', color: 'var(--pitch)', margin: 0 }}>Draw your signature in the box below</p>
          <SignaturePad height={141} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={() => navigate(NEXT_ROUTE)}>Confirm</Button>
          <Button hierarchy="secondary" fullWidth onClick={() => navigate(NEXT_ROUTE)}>No thanks</Button>
        </div>
      </div>

      <MyPhilFooter />
    </div>
  );
}
