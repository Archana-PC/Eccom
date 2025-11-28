import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';


const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    upiId: '',
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Pay with your credit or debit card' },
    { id: 'upi', name: 'UPI', icon: '📱', description: 'Fast and secure UPI payment' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'Transfer from your bank account' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💰', description: 'Pay when you receive your order' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment
    console.log('Payment submitted:', { paymentMethod, formData });
    navigate('/checkout/confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment Method</h1>
        <p className="text-gray-600 mt-2">Choose how you want to pay</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
          {paymentMethods.map((method) => (
            <label key={method.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-pink-300 cursor-pointer transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 text-pink-500 focus:ring-pink-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <span className="font-medium text-gray-900">{method.name}</span>
                    <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Card Details */}
        {paymentMethod === 'card' && (
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Card Details</h3>
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date (MM/YY)"
                placeholder="12/25"
                value={formData.expiry}
                onChange={(e) => setFormData(prev => ({ ...prev, expiry: e.target.value }))}
                required
              />
              <Input
                label="CVV"
                placeholder="123"
                type="password"
                value={formData.cvv}
                onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                required
              />
            </div>
            <Input
              label="Name on Card"
              placeholder="John Doe"
              value={formData.nameOnCard}
              onChange={(e) => setFormData(prev => ({ ...prev, nameOnCard: e.target.value }))}
              required
            />
          </div>
        )}

        {/* UPI Details */}
        {paymentMethod === 'upi' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">UPI Payment</h3>
            <Input
              label="UPI ID"
              placeholder="yourname@upi"
              value={formData.upiId}
              onChange={(e) => setFormData(prev => ({ ...prev, upiId: e.target.value }))}
              required
            />
            <p className="text-sm text-gray-600 mt-2">You'll be redirected to your UPI app for payment</p>
          </div>
        )}

        {/* COD Message */}
        {paymentMethod === 'cod' && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-yellow-800">Cash on Delivery</p>
                <p className="text-sm text-yellow-700">Pay when your order is delivered. Additional charges may apply.</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Address</span>
          </button>
          
          <Button
            type="submit"
            variant="primary"
            size="large"
            className="bg-pink-500 hover:bg-pink-600 px-8"
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Payment