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

export function SmsMessageScreen({ contactLabel = '744-579', onBack, children }) {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate(-1));

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'relative', width: '100%', boxSizing: 'border-box', background: '#f1f1f2', boxShadow: '0px 0.5px 0px 0px #b2b2b2', padding: '10px 20px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 14, color: '#191919' }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <img src={cellular} alt="" style={{ width: 17, height: 11 }} />
            <img src={wifi} alt="" style={{ width: 15, height: 11 }} />
            <img src={battery} alt="" style={{ width: 24, height: 11 }} />
          </div>
        </div>

        <img
          src={backArrow}
          alt="Back"
          style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, cursor: 'pointer' }}
          onClick={handleBack}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 8 }}>
          <img src={avatarPlaceholder} alt="" style={{ width: 32, height: 32 }} />
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 10, color: '#191919' }}>{contactLabel}</span>
        </div>
      </div>

      <div style={{ width: '100%', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 10, color: '#909093', padding: '12px 0' }}>
        <span style={{ fontWeight: 700 }}>Today </span>
        <span>3:25 PM</span>
      </div>

      <div style={{ width: '100%', boxSizing: 'border-box', padding: '0 20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 360, background: '#e9e9eb', borderRadius: 20, padding: '8px 12px', boxSizing: 'border-box' }}>
          {children}
          <img src={messageTail} alt="" style={{ position: 'absolute', bottom: 0, left: -5, width: 16.5, height: 17 }} />
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 40 }} />

      <div style={{ width: '100%', boxSizing: 'border-box', background: 'white', display: 'flex', alignItems: 'center', gap: 18, padding: '12px 18px' }}>
        <img src={camera} alt="" style={{ width: 25.5, height: 20 }} />
        <img src={appStore} alt="" style={{ width: 27.6, height: 20 }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.5)', border: '1px solid #c8c8cc', borderRadius: 80, padding: '4px 12px' }}>
          <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 16, color: 'rgba(60,60,67,0.3)' }}>iMessage</span>
          <img src={dictation} alt="" style={{ width: 20, height: 20 }} />
        </div>
      </div>

      <div style={{ width: '100%', height: 34, flexShrink: 0, background: '#d6d7dd', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 135, height: 5, borderRadius: 100, background: '#191919' }} />
      </div>
    </div>
  );
}
