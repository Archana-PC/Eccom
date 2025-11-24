import React from 'react';
import CartNavbar from '../../components/navbar/varitants/CartNavbar';
import Button from '../../components/ui/Button/Button';

const Cart = () => {
  const cartItemsCount = 3;
  
  const cartItems = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      size: "M",
      color: "White",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
      category: "T-Shirts"
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 79.99,
      size: "32x32",
      color: "Dark Blue",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
      category: "Jeans"
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 89.99,
      size: "US 10",
      color: "Black",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
      category: "Footwear"
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-neutral-50">
      <CartNavbar cartItemsCount={cartItemsCount} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Your Shopping Cart</h1>
            <p className="text-neutral-600">{cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'}</p>
          </div>
          
          {/* Cart Items */}
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 lg:p-6 border border-neutral-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex items-start space-x-4 flex-1">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-lg mb-1">{item.name}</h3>
                    <p className="text-neutral-500 text-sm mb-2">{item.category}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    {item.originalPrice && (
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-slate-400 line-through text-sm">${item.originalPrice}</span>
                        <span className="bg-red-500 text-white px-2 py-1 text-xs rounded font-semibold">
                          Save ${(item.originalPrice - item.price).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-4 sm:mt-0 space-x-6">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-800">${item.price}</p>
                    {item.originalPrice && (
                      <p className="text-green-600 text-sm font-semibold">
                        You save ${(item.originalPrice - item.price).toFixed(2)}
                      </p>
                    )}
                  </div>
                  <button className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-neutral-50 rounded-lg p-6 lg:p-8 border border-neutral-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal ({cartItemsCount} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-neutral-300 pt-3">
                <div className="flex justify-between text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <label htmlFor="promo" className="block text-sm font-medium text-slate-700 mb-2">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <Button variant="outline" className="whitespace-nowrap">
                  Apply
                </Button>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              variant="premium"
              size="large"
              className="w-full text-lg py-4"
            >
              PROCEED TO CHECKOUT - ${total.toFixed(2)}
            </Button>

            {/* Continue Shopping */}
            <div className="text-center mt-4">
              <button className="text-slate-600 hover:text-slate-800 transition-colors font-medium">
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Free Returns</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              <span>Fast Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;