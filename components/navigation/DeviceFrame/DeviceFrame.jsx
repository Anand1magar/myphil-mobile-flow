import React, { useEffect, useLayoutEffect, useState } from 'react';

// Wraps a whole app so that on a computer (mouse/trackpad + a window wider than
// MIN_WIDTH) it renders inside an iPhone + mobile-Safari mockup — a client
// opening the link on a laptop sees it as a phone. On a real touch device, or a
// narrow window, the frame is dropped and the app fills the viewport unchanged.
// The Safari back/forward buttons drive window.history, which a BrowserRouter
// app picks up like any browser nav.
//
// Override per visit with ?frame=1 (force on) or ?frame=0 (force off).
const MIN_WIDTH = 800;
const FRAME_QUERY = '(min-width: ' + MIN_WIDTH + 'px) and (pointer: fine)';

const SCREEN_W = 393;
const SCREEN_H = 852;
const BEZEL = 14;
const FRAME_W = SCREEN_W + BEZEL * 2;
const FRAME_H = SCREEN_H + BEZEL * 2;

function queryOverride() {
  if (typeof window === 'undefined') return null;
  const v = new URLSearchParams(window.location.search).get('frame');
  if (v === '1' || v === 'on' || v === 'true') return true;
  if (v === '0' || v === 'off' || v === 'false') return false;
  return null;
}

function useShowFrame() {
  const [show, setShow] = useState(() => {
    const o = queryOverride();
    if (o !== null) return o;
    return typeof window !== 'undefined' && window.matchMedia(FRAME_QUERY).matches;
  });
  useEffect(() => {
    if (queryOverride() !== null) return undefined;
    const mq = window.matchMedia(FRAME_QUERY);
    const onChange = (e) => setShow(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return show;
}

// Scale the frame down so the whole phone is visible on short laptop screens.
function useFitScale(enabled) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    if (!enabled) return undefined;
    const recompute = () => {
      const s = Math.min(1, (window.innerHeight - 48) / FRAME_H, (window.innerWidth - 48) / FRAME_W);
      setScale(s > 0 ? s : 1);
    };
    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
  }, [enabled]);
  return scale;
}

const toolbarIcon = { width: 26, height: 26, flexShrink: 0 };

function SafariToolbar() {
  const btn = { background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--sky)' };
  return (
    <div style={{ height: 48, flexShrink: 0, background: '#f7f7f8', borderTop: '0.5px solid #cfcfd4', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', color: 'var(--sky)' }}>
      <button type="button" onClick={() => window.history.back()} aria-label="Back" style={btn}>
        <svg viewBox="0 0 24 24" style={toolbarIcon} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" onClick={() => window.history.forward()} aria-label="Forward" style={btn}>
        <svg viewBox="0 0 24 24" style={toolbarIcon} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
      </button>
      <svg viewBox="0 0 24 24" style={toolbarIcon} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3m0 0L8 7m4-4l4 4" /><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
      <svg viewBox="0 0 24 24" style={toolbarIcon} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5a2 2 0 012-2h9v18H6a2 2 0 01-2-2z" /><path d="M15 3l4 3v15" /></svg>
      <svg viewBox="0 0 24 24" style={toolbarIcon} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="12" height="14" rx="2" /><path d="M9 6V4a2 2 0 012-2h7a2 2 0 012 2v12a2 2 0 01-2 2h-2" /></svg>
    </div>
  );
}

function IOSStatusBar() {
  return (
    <div style={{ height: 46, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px 0 32px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: 'var(--pitch)' }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="4.5" width="3" height="7.5" rx="1" /><rect x="10" y="2" width="3" height="10" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 3.5c2.3 0 4.4.9 6 2.4l1.3-1.4A11 11 0 008.5 1.5 11 11 0 00.7 4.5L2 5.9a8.5 8.5 0 016.5-2.4zm0 4c1.2 0 2.3.5 3.1 1.2l1.3-1.3a6.6 6.6 0 00-8.8 0l1.3 1.3A4.6 4.6 0 018.5 7.5zm0 4l2-2a2.8 2.8 0 00-4 0z" /></svg>
        <span style={{ width: 24, height: 12, borderRadius: 3, border: '1px solid currentColor', position: 'relative', opacity: 0.9, display: 'inline-block' }}>
          <span style={{ position: 'absolute', inset: 1.5, background: 'currentColor', borderRadius: 1 }} />
          <span style={{ position: 'absolute', right: -3, top: 3.5, width: 2, height: 5, background: 'currentColor', borderRadius: 1 }} />
        </span>
      </span>
    </div>
  );
}

export function DeviceFrame({ children, hostname = 'philrx.com' }) {
  const showFrame = useShowFrame();
  const scale = useFitScale(showFrame);

  if (!showFrame) {
    return <div style={{ minHeight: '100vh', background: '#f4f4f4', boxSizing: 'border-box' }}>{children}</div>;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at 50% 0%, #f1f3f6, #dfe3e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* keep pages sized to the frame, not the browser viewport */}
      <style>{'.device-frame-screen [style*="100vh"]{min-height:100% !important;height:auto !important}'}</style>

      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <div style={{ width: FRAME_W, height: FRAME_H, background: '#101012', borderRadius: 60, padding: BEZEL, boxSizing: 'border-box', boxShadow: '0 40px 80px -20px rgba(16,18,22,0.55), 0 0 0 2px rgba(255,255,255,0.04) inset' }}>
          <div className="device-frame-screen" style={{ position: 'relative', width: SCREEN_W, height: SCREEN_H, borderRadius: 46, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)', width: 122, height: 34, background: '#000', borderRadius: 18, zIndex: 5 }} />

            <IOSStatusBar />

            <div style={{ flexShrink: 0, background: '#f7f7f8', padding: '6px 14px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 1, height: 38, background: '#e6e6ea', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--pitch)' }}>
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="var(--gunmetal)" strokeWidth="1.4"><rect x="1.5" y="6" width="9" height="7" rx="1.5" /><path d="M3.5 6V4a2.5 2.5 0 015 0v2" /></svg>
                {hostname}
              </span>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', background: '#fff', WebkitOverflowScrolling: 'touch' }}>
              {children}
            </div>

            <SafariToolbar />

            <div style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: '#000', opacity: 0.28, zIndex: 5 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
