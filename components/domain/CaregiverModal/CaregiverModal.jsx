import React from 'react';
function Field({ label, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontWeight: 700, fontSize: 18, lineHeight: '28px', color: 'var(--pitch)' }}>{label}</span>
      <div style={{ height: 48, borderRadius: 4, boxShadow: '0 0 0 1px var(--pitch)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <input placeholder={placeholder} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-body)', fontSize: 18 }} />
      </div>
    </div>
  );
}
export function CaregiverModal() {
  return (
    <div style={{ width: 360, borderRadius: 8, background: '#fff', boxShadow: 'var(--shadow-modal)', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--fade)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 20, color: 'var(--pitch)' }}>Are you a caregiver?</span>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)', margin: 0 }}>Tell us who you're managing this prescription for.</p>
        <Field label="Patient's last name" placeholder="Doe" />
        <button style={{ height: 48, borderRadius: 4, background: 'var(--sky)', color: '#fff', border: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 18, letterSpacing: '0.02em', cursor: 'pointer' }}>Continue as caregiver</button>
      </div>
    </div>
  );
}
