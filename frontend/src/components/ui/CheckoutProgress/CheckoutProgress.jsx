import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutProgress = ({
  currentStep = 1,
  steps = [
    { number: 1, label: 'Cart', path: '/cart' },
    { number: 2, label: 'Information', path: '/checkout' },
    { number: 3, label: 'Shipping', path: '/checkout/shipping' },
    { number: 4, label: 'Payment', path: '/checkout/payment' },
    { number: 5, label: 'Confirmation', path: '/checkout/confirmation' }
  ],
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Header with Logo, Progress, and Security Badge */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <span className="text-xl font-bold text-gray-900">MANSTYLE</span>
        </Link>

        {/* Desktop Progress Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            const isUpcoming = step.number > currentStep;

            return (
              <React.Fragment key={step.number}>
                {/* Step Indicator - Simple Text */}
                <div className="flex flex-col items-center">
                  <span
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isCompleted
                        ? 'text-black-500'
                        : isCurrent
                        ? 'text-black-500 font-semibold'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>
                  {/* Current Step Dot */}
                  {isCurrent && (
                    <div className="w-1.5 h-1.5 bg-black-500 rounded-full mt-1" />
                  )}
                </div>

                {/* Connector Line - Reduced Height */}
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-4 ${
                      step.number < currentStep ? 'bg-black-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 100% Secure Badge */}
        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>100% Secure</span>
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-sm">
              <p className="text-xs text-gray-500">Step {currentStep} of {steps.length}</p>
              <p className="text-sm font-medium text-gray-900">
                {steps.find(step => step.number === currentStep)?.label}
              </p>
            </div>
          </div>
          
          {/* Mobile Security Badge */}
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secure</span>
          </div>
        </div>
        
        {/* Mobile Progress Line - Reduced Height */}
        <div className="w-full bg-gray-200 rounded-full h-0.5">
          <div
            className="bg-black-500 h-0.5 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
            }}
          />
        </div>
        
        {/* Mobile Step Labels */}
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span
              key={step.number}
              className={`text-xs ${
                step.number <= currentStep ? 'text-black-500 font-medium' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>
    
    </div>
  );
};

export default CheckoutProgress;