import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DeviceFrame } from './components/DeviceFrame.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { InsuranceDetailsPage } from './pages/InsuranceDetailsPage.jsx';
import { ContactInformationPage } from './pages/ContactInformationPage.jsx';
import { SavingsHipaaAuthorizationPage } from './pages/SavingsHipaaAuthorizationPage.jsx';
import { EnrollmentSuccessPage } from './pages/EnrollmentSuccessPage.jsx';
import { CreatePasswordPage } from './pages/CreatePasswordPage.jsx';

const WELCOME_MAX_WIDTH = 600;

// Axsome patient enrollment flow — 6 screens, in order:
//   /welcome → /insurance-details → /contact-information → /savings-hipaa
//   → /enrollment-success → /create-password
function Screen({ children }) {
  return (
    <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
      {children}
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <DeviceFrame hostname="axsome.com">
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Screen><WelcomePage /></Screen>} />
          <Route path="/insurance-details" element={<Screen><InsuranceDetailsPage /></Screen>} />
          <Route path="/contact-information" element={<Screen><ContactInformationPage /></Screen>} />
          <Route path="/savings-hipaa" element={<Screen><SavingsHipaaAuthorizationPage /></Screen>} />
          <Route path="/enrollment-success" element={<Screen><EnrollmentSuccessPage /></Screen>} />
          <Route path="/create-password" element={<Screen><CreatePasswordPage /></Screen>} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </DeviceFrame>
    </BrowserRouter>
  );
}
