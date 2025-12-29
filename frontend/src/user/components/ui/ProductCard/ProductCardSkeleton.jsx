import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div
      className="
        bg-white border border-neutral-200
        overflow-hidden shadow-sm
        animate-pulse
      "
    >
      {/* IMAGE */}
      <div className="relative bg-neutral-200 aspect-2/3" />

      {/* INFO */}
      <div className="p-3">
        {/* CATEGORY */}
        <div className="h-3 w-1/3 bg-gray-200 rounded mb-2" />

        {/* NAME (2 lines) */}
        <div className="h-4 w-full bg-gray-200 rounded mb-1" />
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-3" />

        {/* PRICE ROW */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-3 w-1/5 bg-gray-200 rounded" />
          <div className="h-3 w-1/6 bg-gray-200 rounded" />
        </div>

        {/* COLORS */}
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-200" />
          <div className="w-3 h-3 rounded-full bg-gray-200" />
          <div className="w-3 h-3 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
