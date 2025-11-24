import React from 'react';

const ProductCardSkeleton = ({ className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-elegant border border-neutral-200 overflow-hidden animate-pulse ${className}`}>
      {/* Image Skeleton */}
      <div className="aspect-[3/4] bg-neutral-200" />
      
      {/* Content Skeleton */}
      <div className="p-4 lg:p-6">
        <div className="flex justify-between mb-2">
          <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/6"></div>
        </div>
        
        <div className="h-5 bg-neutral-200 rounded mb-2"></div>
        <div className="h-4 bg-neutral-200 rounded w-3/4 mb-3"></div>
        
        <div className="flex items-center space-x-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-4 h-4 bg-neutral-200 rounded"></div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
          <div className="flex space-x-1">
            {[1, 2, 3].map((circle) => (
              <div key={circle} className="w-3 h-3 bg-neutral-200 rounded-full"></div>
            ))}
          </div>
        </div>
        
        <div className="h-10 bg-neutral-200 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;