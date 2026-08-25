import React from 'react';
import { useNavigate } from 'react-router-dom';
import battery from '../assets/battery.svg';
import wifi from '../assets/wifi.svg';
import cellular from '../assets/cellular.svg';
import avatarPlaceholder from '../assets/avatar-placeholder.svg';
import backArrow from '../assets/back-arrow.svg';
import messageTail from '../assets/message-tail.svg';
import camera from '../assets/camera.svg';
import appStore from '../assets/app-store.svg';
import dictation from '../assets/dictation.svg';

export function SmsPage() {
  const navigate = useNavigate();
  return (
    <div style={{ background: 'white', width: 320, height: 568, position: 'relative', overflow: 'hidden', boxShadow: '4px 4px 8px 0px rgba(56,56,56,0.1)', fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 320, height: 101, background: '#f1f1f2', boxShadow: '0px 0.5px 0px 0px #b2b2b2' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: 320, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 14, color: '#191919' }}>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <img src={cellular} alt="" style={{ width: 17, height: 11 }} />
          <img src={wifi} alt="" style={{ width: 15, height: 11 }} />
          <img src={battery} alt="" style={{ width: 24, height: 11 }} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: 44, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <img src={avatarPlaceholder} alt="" style={{ width: 32, height: 32 }} />
        <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, color: '#191919' }}>744-579</span>
      </div>
      <img src={backArrow} alt="Back" style={{ position: 'absolute', left: 0, top: '50.5px', width: 36, height: 36, cursor: 'pointer' }} onClick={() => navigate(-1)} />

      <div style={{ position: 'absolute', top: '123.5px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 10, color: '#909093', whiteSpace: 'nowrap' }}>
        <span style={{ fontWeight: 700 }}>Today </span>
        <span>3:25 PM</span>
      </div>

      <div style={{ position: 'absolute', top: 146, left: '50%', transform: 'translateX(-50%)', width: 280, background: '#e9e9eb', borderRadius: 20, padding: '8px 12px', boxSizing: 'border-box' }}>
        <p style={{ margin: 0, fontFamily: 'Arial, sans-serif', fontSize: 16, lineHeight: 1.25, color: '#191919', opacity: 0.9, whiteSpace: 'pre-wrap' }}>
          Your Drugname (chemical compositions) (volume) is ready at PhilRx Pharmacy. Tap to finish fast setup:{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/welcome'); }} style={{ color: '#2363c3', textDecoration: 'none' }}>
            https://philrx.com/sign-up/dasyhk
          </a>
        </p>
        <p style={{ margin: '8px 0 0', fontFamily: 'Arial, sans-serif', fontSize: 16, lineHeight: 1.25, color: '#191919' }}>
          Note: Reply HELP for help or STOP to unsubscribe. About 4 msgs/month. Msg&amp;Data rates may apply.
        </p>
        <img src={messageTail} alt="" style={{ position: 'absolute', bottom: 0, left: -5, width: 16.5, height: 17 }} />
      </div>

      <div style={{ position: 'absolute', top: 498, left: 0, width: 320, background: 'white', display: 'flex', alignItems: 'center', gap: 18, padding: '0 18px', boxSizing: 'border-box' }}>
        <img src={camera} alt="" style={{ width: 25.5, height: 20 }} />
        <img src={appStore} alt="" style={{ width: 27.6, height: 20 }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.5)', border: '1px solid #c8c8cc', borderRadius: 80, padding: '4px 12px' }}>
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 16, color: 'rgba(60,60,67,0.3)' }}>iMessage</span>
          <img src={dictation} alt="" style={{ width: 20, height: 20 }} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: 534, left: 0, width: 320, height: 34, background: '#d6d7dd' }}>
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 135, height: 5, borderRadius: 100, background: '#191919' }} />
      </div>
    </div>
  );
}
