import React from 'react';
import { Modal } from '../../feedback/Modal/Modal.jsx';
import { Button } from '../../forms/Button/Button.jsx';

export function DeclineEnrollmentModal({ open, onClose, onEnroll, onDecline }) {
  return (
    <Modal open={open} onClose={onClose} size="full">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: '100%', fontFamily: 'var(--font-body)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>Why pay full price?</h2>
          <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)', margin: 0 }}>
            If you decline coupon enrollment, you will not receive your first fill at $XX and refills at a discount (if eligible). Are you sure?
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button hierarchy="primary" fullWidth onClick={onEnroll}>Enroll coupon</Button>
          <Button hierarchy="secondary" fullWidth onClick={onDecline}>Decline coupon</Button>
        </div>
      </div>
    </Modal>
  );
}
