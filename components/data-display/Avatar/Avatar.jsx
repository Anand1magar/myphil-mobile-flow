import React from 'react';
const COLORS = ['#2363C3','#00827E','#B91D13','#EDBE3D','#09AAA5','#525252'];
function hash(s){let h=0;for(let i=0;i<s.length;i++)h=s.charCodeAt(i)+((h<<5)-h);return Math.abs(h);}
export function Avatar({ name = 'Phil User', size = 32, image }) {
  const initials = name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  const bg = COLORS[hash(name) % COLORS.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: image ? undefined : bg, backgroundImage: image ? `url(${image})` : undefined, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: size * 0.42, letterSpacing: '0.002em', color: '#fff', flexShrink: 0 }}>
      {!image && initials}
    </div>
  );
}
