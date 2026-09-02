import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DeviceFrame } from '@ds/components/navigation/DeviceFrame/DeviceFrame.jsx';
import { SmsPage } from './pages/SmsPage.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';
import { InsuranceDetailsPage } from './pages/InsuranceDetailsPage.jsx';
import { InsuranceCardUploadPage } from './pages/InsuranceCardUploadPage.jsx';
import { InsuranceCardReviewPage } from './pages/InsuranceCardReviewPage.jsx';
import { ContactInformationPage } from './pages/ContactInformationPage.jsx';
import { SavingsEnrollmentPage } from './pages/SavingsEnrollmentPage.jsx';
import { HipaaAuthorizationPage } from './pages/HipaaAuthorizationPage.jsx';
import { SavingsHipaaAuthorizationPage } from './pages/SavingsHipaaAuthorizationPage.jsx';
import { EnrollmentSuccessPage } from './pages/EnrollmentSuccessPage.jsx';
import { CreatePasswordPage } from './pages/CreatePasswordPage.jsx';
import { CheckoutSmsPage } from './pages/CheckoutSmsPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ConfirmIdentityPage } from './pages/ConfirmIdentityPage.jsx';
import { OtpDeliveryPage } from './pages/OtpDeliveryPage.jsx';
import { OtpVerifyPage } from './pages/OtpVerifyPage.jsx';
import { MyPrescriptionsPage } from './pages/MyPrescriptionsPage.jsx';
import { PaymentPage } from './pages/PaymentPage.jsx';
import { PaymentOfferPage } from './pages/PaymentOfferPage.jsx';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage.jsx';

const SCREEN_MAX_WIDTH = 600;

const SCREENS = [
  ['/sms', SmsPage],
  ['/welcome', WelcomePage],
  ['/insurance-details', InsuranceDetailsPage],
  ['/insurance-card-upload', InsuranceCardUploadPage],
  ['/insurance-card-review', InsuranceCardReviewPage],
  ['/contact-information', ContactInformationPage],
  ['/savings-enrollment', SavingsEnrollmentPage],
  ['/hipaa-authorization', HipaaAuthorizationPage],
  ['/savings-enrollment-hipaa-authorization-combined', SavingsHipaaAuthorizationPage],
  ['/enrollment-success', EnrollmentSuccessPage],
  ['/create-password', CreatePasswordPage],
  ['/checkout-sms', CheckoutSmsPage],
  ['/login', LoginPage],
  ['/confirm-identity', ConfirmIdentityPage],
  ['/otp-delivery', OtpDeliveryPage],
  ['/otp-verify', OtpVerifyPage],
  ['/my-prescriptions', MyPrescriptionsPage],
  ['/payment', PaymentPage],
  ['/payment-offer', PaymentOfferPage],
  ['/order-confirmation', OrderConfirmationPage],
];

export function App() {
  return (
    <BrowserRouter>
      <DeviceFrame hostname="philrx.com">
        <Routes>
          <Route path="/" element={<Navigate to="/sms" replace />} />
          {SCREENS.map(([path, Page]) => (
            <Route
              key={path}
              path={path}
              element={
                <div style={{ width: '100%', maxWidth: SCREEN_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                  <Page />
                </div>
              }
            />
          ))}
        </Routes>
      </DeviceFrame>
    </BrowserRouter>
  );
}
