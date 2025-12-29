import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import LoginForm from '../../components/auth/LoginForm';
import { useLoginMutation } from '../../../services/auth/authApi';

const UserLogin = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const apiData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await login(apiData).unwrap();

      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
      <LoginForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error?.data?.message || error?.error}
      />
  );
};

export default UserLogin;
