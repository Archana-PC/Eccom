import React, { useState } from 'react';
import Button from '../Button/Button';

const OrderSummary = ({
  items = [],
  subtotal = 0,
  discountAmount = 0,
  shipping = 0,
  tax = 0,
  total = 0,
  appliedPromo = null,
  onPromoCodeApply,
  onPromoCodeRemove,
  onCheckout,
  showCheckoutButton = true,
  showPromoCode = true,
  className = '',
  checkoutButtonText = "Proceed to Checkout",
  showItems = false,
  freeShippingThreshold = 100
}) => {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.trim() && onPromoCodeApply) {
      onPromoCodeApply(promoCode);
      setPromoCode('');
    }
  };

  const handleRemovePromo = () => {
    if (onPromoCodeRemove) {
      onPromoCodeRemove();
    }
  };

  const isFreeShippingEligible = subtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
        
        {/* Items List (Optional) */}
        {showItems && items.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Items ({items.length})</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Promo Code Section */}
        {showPromoCode && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promo Code
            </label>
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-green-800">
                    {appliedPromo.code} Applied
                  </span>
                </div>
                <button
                  onClick={handleRemovePromo}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
                <Button
                  variant="outline"
                  size="medium"
                  onClick={handleApplyPromo}
                  disabled={!promoCode.trim()}
                >
                  Apply
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          
          {appliedPromo && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Discount ({appliedPromo.code})</span>
              <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">
              {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">${tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between text-base font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Free Shipping Notice */}
        {!isFreeShippingEligible && shipping > 0 && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-blue-800">
                Add ${amountNeededForFreeShipping.toFixed(2)} more to get free shipping!
              </p>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        {showCheckoutButton && (
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={onCheckout}
            className="mb-4"
          >
            {checkoutButtonText}
          </Button>
        )}

        {/* Security Notice */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secure checkout</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;