import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SmsPage } from './pages/SmsPage.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';

export function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f4f4f4', display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
        <div style={{ background: '#fff', boxShadow: '0 0 24px rgba(0,0,0,0.08)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/sms" replace />} />
            <Route path="/sms" element={<SmsPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
