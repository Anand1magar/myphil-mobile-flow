import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EnrollmentProvider } from './state/EnrollmentContext.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { InsurancePage } from './pages/InsurancePage.jsx';
import { AddressPage } from './pages/AddressPage.jsx';

export function App() {
  return (
    <EnrollmentProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: '#fff', maxWidth: 400, margin: '0 auto', boxShadow: '0 0 24px rgba(0,0,0,0.08)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/address" element={<AddressPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </EnrollmentProvider>
  );
}
