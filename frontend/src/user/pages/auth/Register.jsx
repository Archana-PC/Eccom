import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import { useSignupMutation } from '../../../services/auth/authApi';

const Register = () => {
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const apiData = {
        username: formData.email,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      await signup(apiData).unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div>
      
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error?.data?.message || 'Something went wrong'}
      />
    </div>
  );
};

export default Register;
