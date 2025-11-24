import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const QuickViewModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart 
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const {
    id,
    name,
    price,
    originalPrice,
    images = [product.image],
    category,
    brand,
    rating,
    reviewCount,
    description = "Premium quality product with excellent craftsmanship and attention to detail.",
    sizes = [],
    colors = []
  } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    onAddToCart(cartItem);
    onClose();
  };

  const handleWishlist = () => {
    console.log('Added to wishlist:', product);
    // Add your wishlist logic here
  };

  const handleCompare = () => {
    console.log('Added to compare:', product);
    // Add your compare logic here
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Quick View"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={images[0]} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square bg-neutral-100 rounded overflow-hidden">
                <img 
                  src={image} 
                  alt={`${name} ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <div className="mb-4">
            <span className="text-neutral-500 text-sm uppercase tracking-wide">
              {category}
            </span>
            {brand && (
              <span className="text-primary-600 text-sm font-semibold ml-2">
                • {brand}
              </span>
            )}
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-4">
            {name}
          </h1>

          {/* Rating */}
          {rating && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= rating
                        ? 'text-accent-500 fill-current'
                        : 'text-neutral-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {reviewCount && (
                <span className="text-neutral-500 text-sm">
                  ({reviewCount} reviews)
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl font-bold text-primary-800">
              ${price}
            </span>
            {originalPrice && (
              <>
                <span className="text-xl text-neutral-400 line-through">
                  ${originalPrice}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-neutral-600 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Size Selection */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary-900 mb-3">
                Size: <span className="text-primary-600">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-neutral-300 text-neutral-700 hover:border-primary-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {colors.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary-900 mb-3">
                Color
              </label>
              <div className="flex flex-wrap gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary-600 ring-2 ring-primary-200'
                        : 'border-neutral-300 hover:border-primary-400'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 transition-colors rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-12 text-center font-semibold bg-neutral-50">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 transition-colors rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex-1">
              <Button
                variant="primary"
                size="large"
                className="w-full py-3 text-lg"
                onClick={handleAddToCart}
              >
                Add to Cart - ${(price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="medium"
              className="flex-1"
              onClick={handleWishlist}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
            >
              Wishlist
            </Button>
            <Button
              variant="outline"
              size="medium"
              className="flex-1"
              onClick={handleCompare}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              }
            >
              Compare
            </Button>
          </div>

          {/* Product Features */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-600">In Stock</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-600">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-neutral-600">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;