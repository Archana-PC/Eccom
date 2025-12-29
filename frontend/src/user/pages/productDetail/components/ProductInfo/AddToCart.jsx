import React, { useState } from 'react';

const AddToCart = ({
  product,
  selectedSize,
  selectedColor,
  quantity,
  onAddToCart,
  onAddToWishlist,
  inStock
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const totalPrice = (product.price * quantity).toFixed(2);

  const handleAddToCart = async () => {
    if (!inStock) return;
    
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onAddToCart();
    setIsAddingToCart(false);
  };

  const handleBuyNow = async () => {
    if (!inStock) return;
    
    setIsBuyingNow(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onAddToCart();
    setIsBuyingNow(false);
    // Redirect to checkout would happen here
    alert('Proceeding to checkout...');
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist();
  };

  return (
    <div className="space-y-4">
      {/* Selection Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-200">
        <h4 className="font-medium text-gray-900 text-sm">Your Selection:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          {selectedSize && (
            <div className="flex justify-between">
              <span>Size:</span>
              <span className="font-medium">{selectedSize}</span>
            </div>
          )}
          {selectedColor && (
            <div className="flex justify-between">
              <span>Color:</span>
              <span className="font-medium">{selectedColor.name}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Quantity:</span>
            <span className="font-medium">{quantity}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock || isAddingToCart}
          className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            inStock
              ? 'bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-gray-400 cursor-not-allowed'
          } ${isAddingToCart ? 'opacity-75 cursor-wait' : ''}`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding to Cart...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </>
          )}
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWishlist}
            disabled={!inStock}
            className={`flex items-center justify-center space-x-2 py-3 px-4 border rounded-lg font-medium transition-all duration-200 ${
              isWishlisted
                ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            } ${!inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isWishlisted ? (
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            <span>{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!inStock || isBuyingNow}
            className={`flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-lg font-medium text-white transition-all duration-200 ${
              inStock
                ? 'bg-gray-800 hover:bg-gray-900'
                : 'bg-gray-400 cursor-not-allowed'
            } ${isBuyingNow ? 'opacity-75 cursor-wait' : ''}`}
          >
            {isBuyingNow ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span>{isBuyingNow ? 'Processing...' : 'Buy Now'}</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
          <div className="text-center">
            <svg className="w-6 h-6 mx-auto mb-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure Payment</span>
          </div>
          <div className="text-center">
            <svg className="w-6 h-6 mx-auto mb-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Free Shipping</span>
          </div>
          <div className="text-center">
            <svg className="w-6 h-6 mx-auto mb-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;