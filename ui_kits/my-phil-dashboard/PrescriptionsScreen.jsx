function PrescriptionsScreen({ onSelect }) {
  const rxs = [
    { name: 'Atorvastatin 20mg', status: 'in-progress', label: 'Processing' },
    { name: 'Lisinopril 10mg', status: 'complete', label: 'Delivered' },
    { name: 'Metformin 500mg', status: 'action-needed', label: 'Action needed' },
  ];
  const colors = { 'in-progress': ['#F4F9FE', '#2363C3'], complete: ['#E7F4F0', '#00827E'], 'action-needed': ['#FBEAE9', '#B91D13'] };
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24, fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--pitch)', margin: 0 }}>Your prescriptions</h1>
      {rxs.map((r, i) => {
        const [bg, fg] = colors[r.status];
        return (
          <div key={i} onClick={() => onSelect(r)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 4, boxShadow: '0 0 0 1px var(--fade)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--pitch)' }}>{r.name}</div>
              <div style={{ fontSize: 14, color: 'var(--gunmetal)' }}>Refill available Sep 12</div>
            </div>
            <span style={{ padding: '4px 12px', borderRadius: 99, background: bg, color: fg, fontWeight: 700, fontSize: 12, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{r.label}</span>
          </div>
        );
      })}
    </div>
  );
}
window.PrescriptionsScreen = PrescriptionsScreen;
