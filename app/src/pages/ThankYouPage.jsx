import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ds/components/forms/Button/Button.jsx';
import { ThankyouContent } from '@ds/components/domain/ThankyouContent/ThankyouContent.jsx';

export function ThankYouPage() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '60px 16px' }}>
      <ThankyouContent />
      {/*
        No dashboard exists yet (out of scope per the spec's Non-goals).
        This loops back to /welcome as a stand-in until that phase begins.
      */}
      <Button hierarchy="primary" fullWidth onClick={() => navigate('/welcome')}>
        Go to My Phil
      </Button>
    </div>
  );
}
