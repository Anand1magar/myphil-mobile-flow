import React from 'react';
import { Modal } from '../../feedback/Modal/Modal.jsx';
import { Icon } from '../../../assets/icons/Icon.jsx';
import pharmacyExample1 from '../../../assets/images/card-guide/pharmacy-example-1.png';
import pharmacyExample2 from '../../../assets/images/card-guide/pharmacy-example-2.png';
import pharmacyExample3 from '../../../assets/images/card-guide/pharmacy-example-3.png';
import medicaidExample1 from '../../../assets/images/card-guide/medicaid-example-1.png';
import medicaidExample2 from '../../../assets/images/card-guide/medicaid-example-2.png';
import discountExample1 from '../../../assets/images/card-guide/discount-example-1.png';

const CARD_TYPES = [
  {
    accepted: true,
    title: 'Prescription/Pharmacy Card',
    description: 'Your prescription insurance card can be used for your prescription medication. It usually has your RxBIN and RxPCN. It may also have your RxGroup or Member ID.\nIf your card is a digital card or in your Apple wallet, make sure these numbers are visible.',
  },
  {
    accepted: true,
    title: 'Medicaid Card',
    description: 'This card only shows a Member ID. If you have a Medicaid managed care plan, you can still get pharmacy benefits.',
  },
  {
    accepted: false,
    title: 'Medical Card',
    description: 'This card is for doctor or hospital visits and cannot be used for prescription medication.',
  },
  {
    accepted: false,
    title: 'Discount or Coupon Card',
    description: 'This card may offer savings, but is not an insurance card. Don’t worry, we’ll check any available offers to find your lowest price.',
  },
];

const EXAMPLE_GROUPS = [
  {
    accepted: true,
    label: 'Prescription/Pharmacy Card Examples:',
    cards: [
      { name: 'Pharmacy card example 1', image: pharmacyExample1 },
      { name: 'Pharmacy card example 2', image: pharmacyExample2 },
      { name: 'Pharmacy card example 3', image: pharmacyExample3 },
    ],
  },
  {
    accepted: true,
    label: 'Medicaid Card Example:',
    cards: [
      { name: 'Medicaid card example 1', image: medicaidExample1 },
    ],
  },
  {
    accepted: false,
    label: 'Medical Card Example:',
    cards: [{ name: 'Medical card example', image: medicaidExample2 }],
  },
  {
    accepted: false,
    label: 'Discount Card Example:',
    cards: [{ name: 'Discount card example', image: discountExample1 }],
  },
];

function StatusIcon({ accepted }) {
  return accepted
    ? <Icon name="CheckCircleStyleFilled" size={20} style={{ color: 'var(--teal-bright)', flexShrink: 0 }} />
    : <Icon name="CancelStyleFilled" size={20} style={{ color: 'var(--ruby)', flexShrink: 0 }} />;
}

function PlaceholderCard({ name, image }) {
  return (
    <div style={{ border: '1px solid var(--fade)', borderRadius: 8, background: image ? 'var(--pure)' : 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: image ? 0 : 100, boxSizing: 'border-box', padding: image ? 8 : 16, overflow: 'hidden' }}>
      {image
        ? <img src={image} alt={name} style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block' }} />
        : <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gunmetal)', textAlign: 'center' }}>{name}</span>}
    </div>
  );
}

export function CardGuideModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} size="full">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%', fontFamily: 'var(--font-body)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>Upload the Right Card</h2>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            To help us identify your insurance, the two most important details we need are your <strong>RxBIN</strong> and <strong>RxPCN</strong>.
          </p>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            You might have more than one insurance card. Here&rsquo;s how to tell them apart:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {CARD_TYPES.map((c) => (
            <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <StatusIcon accepted={c.accepted} />
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>{c.title}</span>
              </div>
              <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0, whiteSpace: 'pre-line' }}>{c.description}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--pitch)', margin: 0 }}>Can&rsquo;t find your RxBIN, RxPCN, or RxGroup on your card?</h3>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Check the back of your card, it&rsquo;s not always on the front!</p>
        </div>

        <div style={{ borderTop: '1px solid var(--fade)' }} />

        {EXAMPLE_GROUPS.map((group) => (
          <div key={group.label} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <StatusIcon accepted={group.accepted} />
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pitch)' }}>{group.label}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {group.cards.map((card) => {
                const name = typeof card === 'string' ? card : card.name;
                const image = typeof card === 'string' ? null : card.image;
                return <PlaceholderCard key={name} name={name} image={image} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
