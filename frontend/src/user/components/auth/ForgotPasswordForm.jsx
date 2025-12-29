import React, { useState } from 'react';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-900">Check your email</h3>
        <p className="text-neutral-600">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        <p className="text-sm text-neutral-500">
          Didn't receive the email? Check your spam folder or{' '}
          <button 
            onClick={() => setSubmitted(false)}
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            try again
          </button>
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-error-50 border border-error-200 rounded-xl p-4">
          <p className="text-error-700 text-sm">{error}</p>
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />

      <Button
        type="submit"
        variant="primary"
        size="large"
        loading={loading}
        className="w-full"
      >
        Send Reset Link
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;