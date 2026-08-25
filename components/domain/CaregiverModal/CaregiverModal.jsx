import React, { useState } from 'react';
import { Modal } from '../../feedback/Modal/Modal.jsx';
import { Radio } from '../../forms/Radio/Radio.jsx';
import { Button } from '../../forms/Button/Button.jsx';

export function CaregiverModal({ open, onClose, onConfirm, patientName = 'the patient' }) {
  const [isCaregiver, setIsCaregiver] = useState(null);
  return (
    <Modal open={open} onClose={onClose} title="">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 21, width: 288, fontFamily: 'var(--font-body)' }}>
        <h2 style={{ fontWeight: 700, fontSize: 26, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>
          Caregiver info for minors (under 18 years)
        </h2>
        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
          Since {patientName} is a minor, an adult caregiver must complete the enrollment. Are you {patientName}'s legal caregiver?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Radio name="isCaregiver" label="Yes, I am" checked={isCaregiver === true} onChange={() => setIsCaregiver(true)} />
          <Radio name="isCaregiver" label="No, I am not" checked={isCaregiver === false} onChange={() => setIsCaregiver(false)} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
          <Button hierarchy="primary" fullWidth disabled={isCaregiver === null} onClick={() => onConfirm && onConfirm(isCaregiver)}>Confirm</Button>
          <Button hierarchy="tertiary" fullWidth onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}
