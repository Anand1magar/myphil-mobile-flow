import React from 'react';
export function DashboardNavLabels({ items = [['Dashboard', 12], ['Patients', 0], ['Prescriptions', 4]], activeIndex = 0 } = {}) {
  return (
    <div style={{ display: 'flex', gap: 8, fontFamily: 'var(--font-body)' }}>
      {items.map(([label, count], i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 4, background: i === activeIndex ? 'var(--sky-tint)' : 'transparent', color: i === activeIndex ? 'var(--sky)' : 'var(--gunmetal)', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          {label}
          {count > 0 && <span style={{ minWidth: 20, height: 20, borderRadius: 99, background: i === activeIndex ? 'var(--sky)' : 'var(--base)', color: i === activeIndex ? '#fff' : 'var(--gunmetal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{count}</span>}
        </div>
      ))}
    </div>
  );
}
