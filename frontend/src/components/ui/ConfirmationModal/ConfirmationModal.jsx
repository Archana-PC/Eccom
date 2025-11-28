import React from 'react';
import Button from '../Button/Button';

const ConfirmationModal = ({
  isOpen = false,
  onClose,
  onConfirm,
  onMoveToWishlist,
  title = "Remove Item",
  message = "Are you sure you want to remove this item from your cart?",
  confirmText = "Remove",
  wishlistText = "Move to Wishlist",
  itemName = "",
  showWishlistOption = true
}) => {
  if (!isOpen) return null;

  const handleMoveToWishlist = () => {
    onMoveToWishlist?.();
    onClose();
  };

  const handleRemove = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/55 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {itemName && (
              <div className="mb-3">
                <p className="font-medium text-gray-900 truncate">{itemName}</p>
              </div>
            )}
            <p className="text-gray-700 mb-6">{message}</p>

            {/* Buttons */}
            <div className="flex flex-row gap-2 ">
              {showWishlistOption && (
                <Button
                  variant="outline"
                  size="medium"
                  fullWidth
                  onClick={handleMoveToWishlist}
                //   className="border-primary-300 text-primary-700 hover:bg-primary-50"
                >
                  {wishlistText}
                </Button>
              )}
                <Button
                  variant="outline"
                  size="medium"
                  fullWidth
                  onClick={handleRemove}
                >
                  {confirmText}
                </Button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;