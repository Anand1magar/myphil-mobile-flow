function ProfileScreen() {
  const rows = [['Name','Jane Doe'],['Email','jane@example.com'],['Phone','(555) 123-4567'],['Delivery address','123 Market St, San Francisco, CA']];
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--sky)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500, fontSize: 20 }}>JD</div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--pitch)', margin: 0 }}>Jane Doe</h1>
      </div>
      <div style={{ borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', overflow: 'hidden' }}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: 16, borderTop: i ? '1px solid var(--fade)' : 'none' }}>
            <span style={{ color: 'var(--gunmetal)', fontSize: 14 }}>{k}</span>
            <span style={{ color: 'var(--pitch)', fontSize: 16, fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
window.ProfileScreen = ProfileScreen;
