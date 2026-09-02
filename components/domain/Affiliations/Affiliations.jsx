import React from 'react';

// Logo-grid section: centered heading + subtitle over a responsive grid of
// hairline-separated cards, each a partner/member wordmark with a category tag.
// Pass real logos as `items[].logo` (an <img> src or a node) once available;
// until then each item renders its name as a muted wordmark placeholder.
const DEFAULT_ITEMS = [
  { name: 'Northwind', category: 'Logistics' },
  { name: 'Contoso', category: 'Fintech' },
  { name: 'Fabrikam', category: 'Computer Software' },
  { name: 'Tailwind', category: 'Retail' },
  { name: 'Proseware', category: 'Media & Entertainment' },
  { name: 'Adventure Works', category: 'Oil & Gas' },
  { name: 'Wide World', category: 'Logistics' },
  { name: 'Litware', category: 'Healthcare' },
  { name: 'Coho', category: 'Computer Software' },
  { name: 'Fourth Coffee', category: 'Retail' },
  { name: 'Graphic Design Inst.', category: 'Media & Entertainment' },
  { name: 'Alpine Ski House', category: 'Fintech' },
];

export function Affiliations({
  title = 'Affiliations',
  subtitle = 'Organizations across the GBMIC network.',
  items = DEFAULT_ITEMS,
}) {
  return (
    <section style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-body)', background: 'var(--paper)', padding: '48px 16px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, lineHeight: '38px', color: 'var(--pitch)' }}>{title}</h2>
          {subtitle && (
            <p style={{ margin: 0, maxWidth: 520, fontSize: 16, lineHeight: '24px', color: 'var(--gunmetal)' }}>{subtitle}</p>
          )}
        </div>

        <div
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 1,
            background: 'var(--fade)',
            border: '1px solid var(--fade)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              style={{
                background: 'var(--pure)',
                minHeight: 176,
                padding: '28px 14px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
              }}
            >
              <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                {item.logo
                  ? (typeof item.logo === 'string'
                    ? <img src={item.logo} alt={item.name} style={{ maxWidth: '100%', maxHeight: 40, objectFit: 'contain' }} />
                    : item.logo)
                  : <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--mortar-grey)' }}>{item.name}</span>}
              </span>
              {item.category && (
                <span style={{ fontSize: 11, lineHeight: '16px', color: 'var(--gunmetal)', border: '1px solid var(--fade)', borderRadius: 999, padding: '3px 10px', whiteSpace: 'nowrap' }}>
                  {item.category}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
