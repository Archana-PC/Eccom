import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';

const Register = () => {
  return (
    <div>
      {/* Page-specific header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-primary-900">
          Create your account
        </h2>
        <p className="mt-2 text-neutral-600">
          Join thousands of satisfied customers today.
        </p>
      </div>

      {/* Use your existing RegisterForm component */}
      <RegisterForm />

      {/* Page-specific footer */}
      <div className="mt-8 text-center">
        <p className="text-neutral-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;