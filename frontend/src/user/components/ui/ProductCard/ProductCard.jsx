import React, { useState } from "react";
import { Link } from "react-router-dom";

import QuickViewModal from "../QuickView/QuickViewModal";
import Rating from "../Rating/Rating";
import useMediaQuery from "../../../../hooks/useMediaQuery";

const BACKEND_URL = "http://127.0.0.1:8000";

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
    name,
    slug,
    price,
    originalPrice,
    image,
    category_name,
    rating,
    reviewCount,
    badge,
  } = product;

  const discount =
    originalPrice && price
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
      <div
        className={`
          group bg-white border border-neutral-200
          overflow-hidden shadow-sm hover:shadow-lg 
          transition-all duration-300 cursor-pointer
          ${className}
        `}
      >
        {/* IMAGE */}
        <div className="relative bg-neutral-100 aspect-2/3 overflow-hidden flex items-center justify-center">
          <Link
            to={`/product/${slug}`}
            className="relative w-full h-full flex items-center justify-center"
          >
            {image && (
              <img
                src={`${BACKEND_URL}${image}`}
                alt={name}
                className="
                  max-h-full max-w-full
                  object-contain
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />
            )}

            
            {/* PREMIUM RIBBON BADGE */}
            {badge && (
              <div className="absolute top-0 left-0 z-10">
                <div
                  className={`
                      relative px-4 py-1 text-[10px] font-semibold tracking-wider text-white
                      ${
                        badge === "NEW"
                          ? "bg-linear-to-r from-[#006699] to-[#0088cc]"
                          : badge === "FEATURED"
                          ? "bg-linear-to-r from-[#ff6a00] to-[#ff8c3c]"
                          : "bg-linear-to-r from-[#16a34a] to-[#22c55e]"
                      }
                    `}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                  }}
                >
                  {badge}
                </div>
              </div>
            )}

            {/* SHARK PLUS WISHLIST – MINIMAL, NO CIRCLE */}
            {showWishlist && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToWishlist?.(product);
                }}
                className="
                    absolute top-3 right-3 z-20

                    text-var(--text-muted)
                    opacity-0
                    pointer-events-none

                    group-hover:opacity-100
                    group-hover:pointer-events-auto

                    transition-all duration-300
                    hover:text-var(--brand-primary)
                  "
                aria-label="Add to wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                      2 5.42 4.42 3 7.5 3
                      c1.74 0 3.41.81 4.5 2.09
                      C13.09 3.81 14.76 3 16.5 3
                      19.58 3 22 5.42 22 8.5
                      c0 3.78-3.4 6.86-8.55 11.18L12 21z"
                  />
                </svg>
              </button>
            )}
            {/* SHARK PLUS QUICK VIEW */}
            {showQuickView && isLargeScreen && (
              <div
                onClick={handleQuickView}
                className="
                    absolute bottom-0 left-0 w-full
                    bg-[var(--brand-primary)]
                    text-white text-xs font-medium tracking-wide
                    py-2 text-center
                    translate-y-full
                    group-hover:translate-y-0
                    transition-transform duration-300
                    cursor-pointer
                  "
              >
                QUICK VIEW
              </div>
            )}
          </Link>
        </div>

        {/* INFO */}
        <div className="p-3">
          <p className="text-xs text-gray-500 uppercase">{category_name}</p>

          <Link to={`/product/${slug}`}>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-1 mt-1">
              {name}
            </h3>
          </Link>

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

          {/* PRICE */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-semibold text-gray-900">
              ₹{price}
            </span>

            {originalPrice && (
              <span className="text-xs line-through text-gray-400">
                ₹{originalPrice}
              </span>
            )}

            {discount > 0 && (
              <span className="text-xs font-semibold text-[#006699]">
                {discount}% OFF
              </span>
            )}
          </div>
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
