function PrescriptionDetail({ rx, onBack }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button onClick={onBack} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--sky)', cursor: 'pointer', fontSize: 16, textDecoration: 'underline', padding: 0 }}>← Back to prescriptions</button>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--pitch)', margin: 0 }}>{rx.name}</h1>
      <div style={{ width: 288, borderRadius: 4, background: '#fff', boxShadow: '10px 10px 10px 0px rgba(0,0,0,0.1)', padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {['Order placed', 'Processing', 'Shipped', 'Delivered'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: i < 1 ? 'var(--foliage)' : i === 1 ? 'var(--sky)' : 'var(--mortar-grey)' }} />
            <span style={{ fontSize: 16, color: i === 1 ? 'var(--pitch)' : 'var(--gunmetal)', fontWeight: i === 1 ? 700 : 400 }}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{ width: 320, borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', padding: 16 }}>
        <div onClick={() => setOpen(o => !o)} style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Total cost</span><span style={{ fontWeight: 700, fontSize: 18 }}>$24.99</span>
        </div>
        {open && <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--gunmetal)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Copay</span><span>$19.99</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shipping</span><span>$5.00</span></div>
        </div>}
        <div onClick={() => setOpen(o => !o)} style={{ marginTop: 8, fontSize: 14, color: 'var(--sky)', textDecoration: 'underline', cursor: 'pointer' }}>{open ? 'See less' : 'See breakdown'}</div>
      </div>
    </div>
  );
}
window.PrescriptionDetail = PrescriptionDetail;
