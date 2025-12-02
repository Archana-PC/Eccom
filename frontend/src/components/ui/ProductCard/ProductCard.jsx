import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Button from "../Button/Button";
import QuickViewModal from "../QuickView/QuickViewModal";
import Rating from "../Rating/Rating";

const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  className = "",
  showWishlist = true,
  showQuickView = true,
}) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

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
    colors = [],
  } = product;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  // Only create quick view handlers if on large screen
  const handleQuickView = isLargeScreen
    ? (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsQuickViewOpen(true);
      }
    : undefined;

  const handleCloseQuickView = isLargeScreen
    ? () => {
        setIsQuickViewOpen(false);
      }
    : undefined;

  return (
    <>
      <div
        className={`group bg-white rounded-xl shadow-elegant border border-neutral-200 overflow-hidden hover:shadow-premium transition-all duration-300 ${className}`}
      >
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
          {isLargeScreen && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="primary"
                size="medium"
                className="w-full shadow-lg"
                onClick={handleQuickView}
              >
                Quick View
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

          {rating !== undefined && (
            <Rating
              rating={rating}
              reviewCount={reviewCount}
              size="sm"
              className="mb-3"
              showReviewCount={true}
            />
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
        </div>
      </div>
      {isLargeScreen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      )}
    </>
  );
};

export default ProductCard;
