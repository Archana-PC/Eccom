import React from 'react';
import AddToCart from './AddToCart';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';

// import ProductActions from './ProductActions';

const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  onAddToCart,
  onAddToWishlist
}) => {
  const {
    name,
    brand,
    price,
    originalPrice,
    discount,
    description,
    sizes,
    colors,
    inStock,
    stockQuantity,
    sku,
    reviews,
    features,
    category
  } = product;

  // Calculate savings
  const savings = originalPrice - price;
  const savingsPercentage = Math.round((savings / originalPrice) * 100);

  return (
    <div className="space-y-6">
      {/* Brand & Category */}
      <div className="border-b pb-4">
        <p className="text-sm text-primary-600 font-medium uppercase tracking-wide mb-1">
          {brand}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">{name}</h1>
        <p className="text-sm text-gray-500 mt-2">{category}</p>
      </div>

      {/* Reviews & Rating */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-5 h-5 ${
                  star <= reviews.average
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-900">
            {reviews.average.toFixed(1)}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          ({reviews.count.toLocaleString()} reviews)
        </span>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
          Write a review
        </button>
      </div>

      {/* Price Section */}
      <div className="flex items-baseline space-x-3">
        <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
        {originalPrice > price && (
          <>
            <span className="text-xl text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-1 rounded-full">
              Save ${savings.toFixed(2)} ({savingsPercentage}%)
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <div className="prose prose-sm text-gray-700 leading-relaxed">
        <p>{description}</p>
      </div>

      {/* Key Features */}
      {features && features.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Key Features</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Size Selector */}
      {sizes && sizes.length > 0 && (
        <SizeSelector
          sizes={sizes}
          selectedSize={selectedSize}
          onSizeSelect={setSelectedSize}
        />
      )}

      {/* Color Selector */}
      {colors && colors.length > 0 && (
        <ColorSelector
          colors={colors}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />
      )}

      {/* Quantity Selector */}
      <div className="border-t border-b py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-900">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-4 py-2 text-gray-900 font-medium min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= stockQuantity}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors border-l border-gray-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {inStock ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">
                  In Stock
                </span>
                <span className="text-xs text-gray-500">
                  ({stockQuantity} available)
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SKU */}
      <div className="text-sm text-gray-500">
        <span className="font-medium">SKU:</span> {sku}
      </div>

      {/* Add to Cart & Actions */}
      <AddToCart
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        quantity={quantity}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        inStock={inStock}
      />

      {/* Additional Actions */}
      {/* <ProductActions product={product} /> */}
    </div>
  );
};

export default ProductInfo;