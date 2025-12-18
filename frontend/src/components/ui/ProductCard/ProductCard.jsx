import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "../../../hooks/useMediaQuery";
import QuickViewModal from "../QuickView/QuickViewModal";
import Rating from "../Rating/Rating";

const ProductCard = ({
  product,
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
    hoverImage,
    category,
    brand,
    rating,
    reviewCount,
    isNew = false,
    isOnSale = false,
    isOutOfStock = false,
    colors = [],
    sizes = [],
  } = product;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleQuickView = (e) => {
    if (!isLargeScreen) return;
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      {/* CARD */}
      <div
        className={`
          group bg-white border border-neutral-200
          overflow-hidden shadow-sm hover:shadow-lg 
          transition-all duration-300 cursor-pointer
          ${className}
        `}
      >
        {/* IMAGE */}
        {/* IMAGE */}
<div className="relative bg-neutral-100 aspect-2/3 overflow-hidden flex items-center justify-center">
  <Link
    to={`/product/${id}`}
    className="relative w-full h-full flex items-center justify-center"
  >
    {/* MAIN IMAGE – full image, no cutting */}
    <img
      src={image}
      alt={name}
      className="
        max-h-full max-w-full
        object-contain
        transition-transform duration-500
        group-hover:scale-105
        
      "
    />

    {/* HOVER IMAGE – same fit, fades in on hover */}
    {hoverImage && (
      <img
        src={hoverImage}
        alt={`${name} hover`}
        className="
          absolute inset-0 m-auto
          max-h-full max-w-full
          object-contain
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          p-2
        "
      />
    )}

    {/* BADGES (UNCHANGED) */}
    <div className="absolute top-3 left-3 space-y-2">
      {isNew && (
        <span className="bg-[#006699] text-white px-2 py-1 text-xs rounded shadow-md">
          NEW
        </span>
      )}

      {isOnSale && originalPrice && (
        <span
          className="px-2 py-1 text-xs rounded shadow-md text-white"
          style={{ backgroundColor: "#006699" }}
        >
          -{discount}%
        </span>
      )}

      {isOutOfStock && (
        <span className="bg-gray-600 text-white px-2 py-1 text-xs rounded shadow-md">
          OUT OF STOCK
        </span>
      )}
    </div>

    {/* WISHLIST ICON (UNCHANGED) */}
    {showWishlist && (
      <button
        onClick={(e) => {
          e.preventDefault();
          onAddToWishlist?.(product);
        }}
        className="
          absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full 
          shadow hover:shadow-md transition-all opacity-0 group-hover:opacity-100
        "
      >
        <svg
          className="w-4 h-4 text-gray-700 hover:text-red-500 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 
            20.364l7.682-7.682a4.5 4.5 0 
            00-6.364-6.364L12 7.636l-1.318-1.318a4.5 
            4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    )}

    {/* QUICK VIEW (UNCHANGED) */}
    {showQuickView && isLargeScreen && (
      <button
        onClick={handleQuickView}
        className="
          absolute bottom-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full
          shadow opacity-0 group-hover:opacity-100 transition-all hover:bg-white
        "
      >
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={2}
            d="M15 10l4.553 2.276a1 1 0 010 1.788L15 16M3 6h12M3 12h9M3 18h12"
          />
        </svg>
      </button>
    )}
  </Link>
</div>


        {/* PRODUCT INFO */}
        <div className="p-3">
          {/* CATEGORY */}
          <p className="text-xs text-gray-500 uppercase">{category}</p>

          {/* NAME */}
          <Link to={`/product/${id}`}>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mt-1">
              {name}
            </h3>
          </Link>

          {/* RATING SECTION */}
          {rating && (
            <div className="mt-1">
              <Rating
                rating={rating}
                reviewCount={reviewCount}
                size="sm"
                showReviewCount={true}
                className="text-[#006699]"
              />
            </div>
          )}

          {/* PRICE (Myntra style) */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-semibold text-gray-900">
              ₹{price}
            </span>

            {originalPrice && (
              <span className="text-xs line-through text-gray-400">
                ₹{originalPrice}
              </span>
            )}

            {originalPrice && (
              <span
                className="text-xs font-semibold"
                style={{ color: "#006699" }}
              >
                {discount}% OFF
              </span>
            )}
          </div>

          {/* COLORS PREVIEW */}
          {colors.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {colors.slice(0, 3).map((color, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {isLargeScreen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
