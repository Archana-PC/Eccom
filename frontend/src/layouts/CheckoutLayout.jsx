// src/layouts/CheckoutLayout.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import CheckoutProgress from '../components/ui/CheckoutProgress/CheckoutProgress';
import OrderSummary from '../components/ui/OrderSummary/OrderSummary';

const CheckoutLayout = () => {
  const location = useLocation();
  
  // Define checkout steps
  const steps = [
    { number: 1, label: 'Bag', path: '/cart' },
    { number: 2, label: 'Address', path: '/checkout' },
    { number: 3, label: 'Payment', path: '/checkout/payment' }
  ];

  // Determine current step based on route
  const getCurrentStep = () => {
    if (location.pathname.includes('/checkout/payment')) return 3;
    if (location.pathname.includes('/checkout')) return 2;
    return 1; // Cart page
  };

  const currentStep = getCurrentStep();

  // Show order summary only on address and payment pages (not on cart)
  const showOrderSummary = currentStep > 1;

  return (
    <div className="min-h-screen bg-white">
      
      {/* Checkout Progress - Myntra Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <CheckoutProgress 
            steps={steps} 
            currentStep={currentStep}
            showLogo={false}
            className="mb-0"
          />
        </div>
      </div>
      
      {/* Checkout Content */}
      <main className="max-w-7xl mx-auto py-2 ">
        <div className={`${showOrderSummary ? 'lg:grid lg:grid-cols-12 lg:gap-8' : 'max-w-6xl mx-auto'}`}>
          {/* Checkout Form */}
          <div className={showOrderSummary ? 'lg:col-span-8' : 'w-full'}>
            <div className="bg-white rounded-lg">
              <Outlet />
            </div>
          </div>
          
          {/* Order Summary Sidebar - Only show on address and payment pages */}
          {showOrderSummary && (
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="sticky top-4">
                <OrderSummary
                  items={[
                    {
                      id: 1,
                      name: "Men Pure Cotton T-shirt",
                      price: 499,
                      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=200&fit=crop",
                      quantity: 2,
                      brand: "H&M",
                      size: "M",
                      color: "White"
                    },
                    {
                      id: 2,
                      name: "Slim Fit Jeans",
                      price: 1299,
                      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=200&fit=crop",
                      quantity: 1,
                      brand: "Levi's",
                      size: "32",
                      color: "Dark Blue"
                    }
                  ]}
                  subtotal={2297}
                  discountAmount={230}
                  shipping={40}
                  tax={0}
                  total={2107}
                  showItems={true}
                  showCheckoutButton={false}
                  showPromoCode={false}
                  className="border border-gray-200 rounded-lg shadow-sm"
                />
                
                {/* Security Badges - Myntra Style */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-center space-x-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 text-green-500 mb-1">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-600">100% SECURE</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 text-blue-500 mb-1">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-600">EASY RETURNS</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 text-purple-500 mb-1">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-600">AUTHENTIC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 Manstlye. All rights reserved.</p>
            <p className="mt-2">
              Need help? <Link to="/contact" className="text-black-500 hover:text-black-600">Contact Us</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutLayout;