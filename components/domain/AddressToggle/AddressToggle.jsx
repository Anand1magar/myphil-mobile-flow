import React, { useState } from 'react';
export function AddressToggle({ address = '123 Market St, San Francisco, CA 94103', error = false }) {
  const [editing, setEditing] = useState(false);
  return (
    <div style={{ width: 320, fontFamily: 'var(--font-body)', borderRadius: 4, boxShadow: 'inset 0 0 0 1px ' + (error ? 'var(--ruby)' : 'var(--fade)'), padding: 16, display: 'flex', flexDirection: 'column', gap: 8, background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ fontSize: 16, lineHeight: '24px', color: 'var(--pitch)' }}>{address}</span>
        <button onClick={() => setEditing(e => !e)} style={{ background: 'none', border: 'none', color: 'var(--sky)', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, padding: 0, flexShrink: 0 }}>{editing ? 'Done' : 'Edit'}</button>
      </div>
      {editing && <div style={{ height: 48, borderRadius: 4, boxShadow: '0 0 0 1px var(--pitch)', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <input defaultValue={address} style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: 16 }} />
      </div>}
      {error && <span style={{ fontSize: 14, color: 'var(--ruby)' }}>We couldn't verify this address.</span>}
    </div>
  );
}
