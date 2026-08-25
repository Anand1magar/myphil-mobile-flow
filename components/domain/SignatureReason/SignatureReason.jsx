import React from 'react';
export function SignatureReason({ reason = 'Your state requires a signature for controlled substances.' } = {}) {
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, background: 'var(--sky-tint)', boxShadow: 'inset 0 0 0 1px #A7C1E7', padding: 16, fontSize: 14, lineHeight: '22px', color: 'var(--pitch)' }}>
      <strong>Why a signature?</strong> {reason}
    </div>
  );
}
