import React, { useState } from 'react';
import QuantitySelector from '../../components/ui/QuantitySelector/QuantitySelector';
import ConfirmationModal from '../../components/ui/ConfirmationModal/ConfirmationModal';

const CartItem = ({ 
  item, 
  onQuantityChange, 
  onRemove, 
  onMoveToWishlist
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    console.log('🔄 Quantity changing to:', newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const handleRemoveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmRemove = () => {
    console.log('🗑️ Removing item:', item.id);
    onRemove(item.id);
  };

  const handleMoveToWishlist = () => {
    console.log('❤️ Moving to wishlist:', item.id);
    onMoveToWishlist?.(item.id);
    setShowConfirmation(false);
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
  };

  // Set a default max quantity
  const maxQuantity = item.stock || 10;

  return (
    <>
      <div className="p-6 border-b border-gray-200 last:border-b-0">
        <div className="flex items-start space-x-4">
          {/* Product Image */}
          <div className="shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-32 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                
                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Variant Info */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span>Color: {item.color}</span>
                  <span>Size: {item.size}</span>
                </div>

                {/* Stock Status */}
                {!item.inStock && (
                  <div className="flex items-center space-x-2 mb-3">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-red-600 font-medium">Out of stock</span>
                  </div>
                )}
              </div>

              {/* Remove Button */}
              <button
                onClick={handleRemoveClick}
                className="text-gray-400 hover:text-red-500 transition-colors shrink-0 ml-4"
                aria-label="Remove item"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Quantity:</span>
                <QuantitySelector
                  value={item.quantity}
                  onChange={handleQuantityChange}  // ✅ Use 'onChange' prop
                  min={1}
                  max={maxQuantity}
                  disabled={!item.inStock}
                  size="small"
                />
              </div>
              
              <div className="text-lg font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRemove}
        onMoveToWishlist={handleMoveToWishlist}
        itemName={item.name}
        title="Remove from Cart"
        message="Are you sure you want to remove this item from your cart?"
        confirmText="Remove from Cart"
        cancelText="Keep in Cart"
        wishlistText="Move to Wishlist"
      />
    </>
  );
};

export default CartItem;