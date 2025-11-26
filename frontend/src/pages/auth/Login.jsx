import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  return (
    <div>
      {/* Page-specific header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-primary-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-neutral-600">
          Welcome back! Please enter your details.
        </p>
      </div>

      {/* Use the LoginForm component */}
      <LoginForm />

      {/* Page-specific footer */}
      <div className="mt-8 text-center">
        <p className="text-neutral-600">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;