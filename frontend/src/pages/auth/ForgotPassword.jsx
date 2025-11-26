import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div>
      {/* Page-specific header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-primary-900">
          Reset your password
        </h2>
        <p className="mt-2 text-neutral-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Use the ForgotPasswordForm component */}
      <ForgotPasswordForm />

      {/* Page-specific footer */}
      <div className="mt-8 text-center">
        <p className="text-neutral-600">
          Remember your password?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;