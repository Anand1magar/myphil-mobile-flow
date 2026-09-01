import React, { useState } from 'react';
import { Modal } from '../../feedback/Modal/Modal.jsx';
import { Radio } from '../../forms/Radio/Radio.jsx';
import { Button } from '../../forms/Button/Button.jsx';
import { TextInput } from '../../forms/TextInput/TextInput.jsx';

export function CaregiverModal({ open, onClose, onConfirm, patientName = 'the patient' }) {
  const [isCaregiver, setIsCaregiver] = useState(null);
  const [caregiverName, setCaregiverName] = useState('');
  const nameRequired = isCaregiver === true && caregiverName.trim() === '';
  return (
    <Modal open={open} onClose={onClose} size="full">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: '100%', fontFamily: 'var(--font-body)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <h2 style={{ fontWeight: 700, fontSize: 26, lineHeight: '36px', color: 'var(--pitch)', margin: 0 }}>
            Caregiver info for minors (under 18 years)
          </h2>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            Since {patientName} is a minor, an adult caregiver must complete the enrollment. Are you {patientName}'s legal caregiver?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Radio borderless name="isCaregiver" label="Yes, I am" checked={isCaregiver === true} onChange={() => setIsCaregiver(true)} />
            {isCaregiver === true && (
              <TextInput placeholder="Name of caregiver" value={caregiverName} onChange={e => setCaregiverName(e.target.value)} />
            )}
            <Radio borderless name="isCaregiver" label="No, I am not" checked={isCaregiver === false} onChange={() => setIsCaregiver(false)} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button hierarchy="primary" fullWidth disabled={isCaregiver === null || nameRequired} onClick={() => onConfirm && onConfirm(isCaregiver, caregiverName)}>Confirm</Button>
          <Button hierarchy="tertiary" fullWidth onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}
