import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';
import Button from '../../../shared/Button/Button';
import OrderSummary from '../../components/ui/OrderSummary/OrderSummary';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Men Pure Cotton T-shirt",
      price: 499,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      brand: "H&M",
      color: "White",
      size: "M",
      quantity: 2,
      inStock: true,
      deliveryDate: "Delivery by Tomorrow",
      returnPolicy: "14 days return available"
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 1299,
      originalPrice: 1999,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
      brand: "Levi's",
      color: "Dark Blue",
      size: "32",
      quantity: 1,
      inStock: true,
      deliveryDate: "Delivery by Tomorrow",
      returnPolicy: "14 days return available"
    },
    {
      id: 3,
      name: "Casual Blazer",
      price: 2999,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop",
      brand: "ZARA",
      color: "Navy Blue",
      size: "L",
      quantity: 1,
      inStock: false,
      deliveryDate: "Currently unavailable",
      returnPolicy: "14 days return available"
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
  };

  const moveToWishlist = (id) => {
    // Implement wishlist logic here
    console.log(`Moving item ${id} to wishlist`);
    removeItem(id);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const applyPromoCode = (code) => {
    if (code.toLowerCase() === 'myntra10') {
      setAppliedPromo({ code: 'MYNTRA10', discount: 0.1, amount: subtotal * 0.1 });
    } else if (code.toLowerCase() === 'style20') {
      setAppliedPromo({ code: 'STYLE20', discount: 0.2, amount: subtotal * 0.2 });
    } else {
      alert('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  // Calculate totals only for selected items
  const selectedItemsData = cartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = selectedItemsData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? appliedPromo.amount : 0;
  const shipping = subtotal > 999 ? 0 : 40;
  const total = subtotal - discountAmount + shipping;
  const totalSavings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your bag is empty</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Nothing to show here. Start adding your favorite styles!
            </p>
            <Link to="/">
              <Button variant="primary" size="large" className="bg-black-500 hover:bg-black-600">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Checkout Progress */}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Bag</h1>
          <p className="text-gray-600 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="lg:flex lg:gap-6">
          {/* Cart Items - Left Side */}
          <div className="lg:flex-1">
            {/* Select All Bar */}
          

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
               <CartItem
               key={item.id}
               item={item}
               onQuantityChange={updateQuantity}
               onRemove={removeItem}
                onMoveToWishlist={moveToWishlist}
               />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/">
                <Button variant="outline" size="medium" className="border-gray-300 text-gray-700">
                  ← Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:w-80 mt-6 lg:mt-0">
            <OrderSummary
              items={selectedItemsData}
              subtotal={subtotal}
              discountAmount={discountAmount}
              shipping={shipping}
              tax={0} // Myntra often shows tax inclusive pricing
              total={total}
              appliedPromo={appliedPromo}
              onPromoCodeApply={applyPromoCode}
              onPromoCodeRemove={removePromoCode}
              onCheckout={handleCheckout}
              showItems={false}
              showCheckoutButton={true}
              showPromoCode={true}
              checkoutButtonText={`Place Order • ₹${total}`}
              freeShippingThreshold={999}
              className="border-0 shadow-lg"
            />

            {/* Total Savings */}
            {totalSavings > 0 && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800">Total Savings</span>
                  <span className="text-sm font-bold text-green-800">₹{totalSavings}</span>
                </div>
              </div>
            )}

            {/* Security Badges */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 mx-auto mb-2 text-green-500">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 mx-auto mb-2 text-blue-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;