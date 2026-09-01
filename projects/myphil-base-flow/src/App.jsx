import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

const WELCOME_MAX_WIDTH = 600;

export function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f4f4f4', padding: 0, boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/sms" replace />} />
          <Route
            path="/sms"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <SmsPage />
              </div>
            }
          />
          <Route
            path="/welcome"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <WelcomePage />
              </div>
            }
          />
          <Route
            path="/insurance-details"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <InsuranceDetailsPage />
              </div>
            }
          />
          <Route
            path="/insurance-card-upload"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <InsuranceCardUploadPage />
              </div>
            }
          />
          <Route
            path="/insurance-card-review"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <InsuranceCardReviewPage />
              </div>
            }
          />
          <Route
            path="/contact-information"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <ContactInformationPage />
              </div>
            }
          />
          <Route
            path="/savings-enrollment"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <SavingsEnrollmentPage />
              </div>
            }
          />
          <Route
            path="/hipaa-authorization"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <HipaaAuthorizationPage />
              </div>
            }
          />
          <Route
            path="/savings-enrollment-hipaa-authorization-combined"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <SavingsHipaaAuthorizationPage />
              </div>
            }
          />
          <Route
            path="/enrollment-success"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <EnrollmentSuccessPage />
              </div>
            }
          />
          <Route
            path="/create-password"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <CreatePasswordPage />
              </div>
            }
          />
          <Route
            path="/checkout-sms"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <CheckoutSmsPage />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <LoginPage />
              </div>
            }
          />
          <Route
            path="/confirm-identity"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <ConfirmIdentityPage />
              </div>
            }
          />
          <Route
            path="/otp-delivery"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <OtpDeliveryPage />
              </div>
            }
          />
          <Route
            path="/otp-verify"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <OtpVerifyPage />
              </div>
            }
          />
          <Route
            path="/my-prescriptions"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <MyPrescriptionsPage />
              </div>
            }
          />
          <Route
            path="/payment"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <PaymentPage />
              </div>
            }
          />
          <Route
            path="/payment-offer"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <PaymentOfferPage />
              </div>
            }
          />
          <Route
            path="/order-confirmation"
            element={
              <div style={{ width: '100%', maxWidth: WELCOME_MAX_WIDTH, margin: '0 auto', background: '#fff' }}>
                <OrderConfirmationPage />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
