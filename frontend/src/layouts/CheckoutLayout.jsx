// src/layouts/CheckoutLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import CheckoutProgress from '../components/CheckoutProgress';

const CheckoutLayout = () => {
  const steps = ['Cart', 'Information', 'Shipping', 'Payment'];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            MANSTYLE
          </Link>
        </div>
      </header>
      
      {/* Checkout Progress */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <CheckoutProgress steps={steps} currentStep={2} />
        </div>
      </div>
      
      {/* Checkout Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Outlet />
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              {/* Order summary component */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutLayout;