import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useWishlist } from '../../../context/WishlistContext';
import Button from '../Button/Button';
import QuickViewModal from '../QuickView/QuickViewModal';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist,
  className = "",
  showWishlist = true,
  showQuickView = true 
}) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  // const { isInWishlist } = useWishlist();

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    brand,
    rating,
    reviewCount,
    isNew = false,
    isOnSale = false,
    isOutOfStock = false,
    sizes = [],
    colors = []
  } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // const handleAddToCart = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (onAddToCart) {
  //     onAddToCart(product);
  //   }
  // };

  // const handleAddToWishlist = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (onAddToWishlist) {
  //     onAddToWishlist(product);
  //   }
  // };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <div className={`group bg-white rounded-xl shadow-elegant border border-neutral-200 overflow-hidden hover:shadow-premium transition-all duration-300 ${className}`}>
        {/* Product Image Container */}
        <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden">
          <Link to={`/product/${id}`}>
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {isNew && (
              <span className="bg-accent-500 text-white px-2 py-1 text-xs font-semibold rounded-full shadow-md">
                New
              </span>
            )}
            {isOnSale && originalPrice && (
              <span className="bg-primary-600 text-white px-2 py-1 text-xs font-semibold rounded shadow-md">
                -{discount}%
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-neutral-500 text-white px-2 py-1 text-xs font-semibold rounded shadow-md">
                Out of Stock
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {showWishlist && (
              <Button
                variant="minimal"
                size="small"
                iconOnly
                // onClick={handleAddToWishlist}
                // className={`shadow-md hover:shadow-lg ${
                //   isInWishlist(id) 
                //     ? "bg-red-500 text-white hover:bg-red-600" 
                //     : "bg-white hover:bg-neutral-50"
                // }`}
              >
                {/* <svg className="w-4 h-4" fill={isInWishlist(id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg> */}
              </Button>
            )}
            
            {showQuickView && (
              <Button
                variant="minimal"
                size="small"
                iconOnly
                onClick={handleQuickView}
                className="bg-white shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Button>
            )}
          </div>

          {/* Add to Cart Button - Appears on Hover */}
          {!isOutOfStock && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="primary"
                size="medium"
                className="w-full shadow-lg"
                // onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 lg:p-6">
          {/* Category and Brand */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-neutral-500 text-sm uppercase tracking-wide">
              {category}
            </span>
            {brand && (
              <span className="text-primary-600 text-xs font-semibold">
                {brand}
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-primary-900 text-lg mb-2 line-clamp-2 hover:text-primary-700 transition-colors">
              {name}
            </h3>
          </Link>

          {/* Rating */}
          {rating && (
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
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
                  ({reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-800">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-neutral-400 line-through text-sm">
                  ${originalPrice}
                </span>
              )}
            </div>
            
            {/* Color Swatches */}
            {colors.length > 0 && (
              <div className="flex space-x-1">
                {colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-neutral-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {colors.length > 3 && (
                  <div className="w-3 h-3 rounded-full bg-neutral-200 border border-neutral-300 text-[8px] flex items-center justify-center">
                    +{colors.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Add to Cart Button */}
          {!isOutOfStock && (
            <Button
              variant="primary"
              size="medium"
              className="w-full lg:hidden mt-2"
              // onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>


      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        // onAddToCart={onAddToCart}
        // onAddToWishlist={onAddToWishlist}
      />
    </>
  );
};

export default ProductCard;