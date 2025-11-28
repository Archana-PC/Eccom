import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';

const AddressForm = () => {
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
  
  // Form state for new address
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    saveAddress: true
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save new address
  const handleSaveAddress = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newAddress = {
        id: Date.now(),
        name: 'New Address',
        fullName: `${formData.firstName} ${formData.lastName}`,
        address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phone: formData.phone,
        email: formData.email,
        isDefault: savedAddresses.length === 0
      };

      if (formData.saveAddress) {
        setSavedAddresses(prev => [...prev, newAddress]);
      }
      
      setSelectedAddress(newAddress.id);
      setShowNewAddressForm(false);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        email: '',
        saveAddress: true
      });
    }
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
            <form onSubmit={handleSaveAddress} className="space-y-6">
              <div className="flex items-center justify-between">
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

              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    placeholder="your@email.com"
                    required
                  />
                  <Input
                    label="Phone Number *"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={errors.phone}
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Shipping Address</h4>
                
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="First Name *"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={errors.firstName}
                    placeholder="John"
                    required
                  />
                  <Input
                    label="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={errors.lastName}
                    placeholder="Doe"
                    required
                  />
                </div>

                {/* Address */}
                <Input
                  label="Street Address *"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={errors.address}
                  placeholder="123 Main Street"
                  required
                  className="mb-4"
                />

                <Input
                  label="Apartment, Suite, etc. (Optional)"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                  placeholder="Apartment 4B"
                  className="mb-4"
                />

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City *"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    error={errors.city}
                    placeholder="Mumbai"
                    required
                  />
                  <Input
                    label="State *"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    error={errors.state}
                    placeholder="Maharashtra"
                    required
                  />
                  <Input
                    label="Pincode *"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    error={errors.pincode}
                    placeholder="400001"
                    required
                  />
                </div>
              </div>

              {/* Save Address Checkbox */}
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  checked={formData.saveAddress}
                  onChange={(e) => handleInputChange('saveAddress', e.target.checked)}
                  className="w-4 h-4 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Save this address for future orders</span>
              </label>

              {/* Form Buttons */}
              <div className="flex space-x-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                >
                  Save Address
                </Button>
                {savedAddresses.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="medium"
                    onClick={() => setShowNewAddressForm(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
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
        </div>
      </div>
    </div>
  );
};

export default AddressForm;