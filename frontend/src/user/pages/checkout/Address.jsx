import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressFormComponent from '../../components/ui/AddressForm/AddressForm';
import Button from '../../components/ui/Button/Button';
import OrderSummary from '../../components/ui/OrderSummary/OrderSummary';

const Address = () => {
  const navigate = useNavigate();
  
  // Mock order data (would come from cart context)
  const orderData = {
    items: [
      {
        id: 1,
        name: "Men Pure Cotton T-shirt",
        price: 499,
        originalPrice: 799,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
        quantity: 2,
        size: "M"
      }
    ],
    subtotal: 998,
    discountAmount: 0,
    shipping: 40,
    tax: 0,
    total: 1038
  };

  // User's saved addresses (would come from backend/context)
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      fullName: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '9876543210',
      email: 'john@example.com',
      isDefault: true
    }
  ]);

  const [selectedAddress, setSelectedAddress] = useState(savedAddresses.length > 0 ? savedAddresses[0].id : null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(savedAddresses.length === 0);

  // Handle save new address
  const handleSaveAddress = (addressData) => {
    const newAddress = {
      id: Date.now(),
      name: 'New Address',
      fullName: `${addressData.firstName} ${addressData.lastName}`,
      address: `${addressData.address}${addressData.apartment ? ', ' + addressData.apartment : ''}`,
      city: addressData.city,
      state: addressData.state,
      pincode: addressData.pincode,
      phone: addressData.phone,
      email: addressData.email,
      isDefault: savedAddresses.length === 0
    };

    if (addressData.saveAddress) {
      setSavedAddresses(prev => [...prev, newAddress]);
    }
    
    setSelectedAddress(newAddress.id);
    setShowNewAddressForm(false);
  };

  // Handle cancel new address form
  const handleCancelNewAddress = () => {
    setShowNewAddressForm(false);
  };

  // Handle continue to payment
  const handleContinueToPayment = () => {
    const selectedAddressData = selectedAddress ? 
      savedAddresses.find(addr => addr.id === selectedAddress) : null;
    
    if (selectedAddressData) {
      // Store selected address in context/state management
      console.log('Selected Address:', selectedAddressData);
      navigate('/checkout/payment');
    }
  };

  // Get current selected address
  const currentAddress = selectedAddress ? 
    savedAddresses.find(addr => addr.id === selectedAddress) : null;

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <div className="lg:flex lg:gap-8">
        {/* Address Form - Left Side */}
        <div className="lg:flex-1">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Delivery Address</h1>
            <p className="text-gray-600 mt-2">Where should we deliver your order?</p>
          </div>

          {/* Saved Addresses Section */}
          {savedAddresses.length > 0 && !showNewAddressForm && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Address</h2>
              <div className="space-y-4">
                {savedAddresses.map((address) => (
                  <label 
                    key={address.id} 
                    className={`flex items-start space-x-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAddress === address.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="savedAddress"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="mt-1 text-blue-500 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{address.fullName}</span>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Default</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{address.address}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">Phone: {address.phone}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <button 
                  onClick={() => setShowNewAddressForm(true)}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  + Add New Address
                </button>
              </div>
            </div>
          )}

          {/* New Address Form */}
          {showNewAddressForm && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Add New Address</h3>
                {savedAddresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ✕ Cancel
                  </button>
                )}
              </div>

              <AddressFormComponent
                onSaveAddress={handleSaveAddress}
                onCancel={savedAddresses.length > 0 ? handleCancelNewAddress : undefined}
                showCancelButton={savedAddresses.length > 0}
                submitButtonText="Save Address"
              />
            </div>
          )}

          {/* Navigation Buttons */}
          {!showNewAddressForm && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Cart</span>
              </button>
              
              <Button
                onClick={handleContinueToPayment}
                variant="primary"
                size="large"
                disabled={!selectedAddress}
                className="px-8"
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-800">Your information is secure</p>
                <p className="text-sm text-blue-700">We use encryption to protect your personal data</p>
              </div>
            </div>
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default Address;