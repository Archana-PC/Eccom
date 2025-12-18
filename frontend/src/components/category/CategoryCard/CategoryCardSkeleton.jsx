import React from 'react';

const CategoryCardSkeleton = ({ variant = 'default' }) => {
  const cardHeights = {
    default: 'h-80',
    compact: 'h-64',
    minimal: 'h-72',
    hero: 'h-96'
  };

  return (
    <div className="group cursor-pointer">
      <div className={`relative ${cardHeights[variant]} overflow-hidden rounded-2xl bg-gray-200 animate-pulse`}>
        {/* Image placeholder */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-300 to-gray-200"></div>
        
        {/* Content placeholder */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Icon placeholder */}
          <div className="mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          </div>
          
          {/* Title placeholder */}
          <div className="bg-gray-300 h-6 w-32 rounded mb-2"></div>
          
          {/* Description placeholder */}
          {variant !== 'compact' && (
            <div className="bg-gray-300 h-4 w-48 rounded mb-3"></div>
          )}
          
          {/* Stats placeholder */}
          {variant !== 'minimal' && (
            <div className="flex justify-between mb-3">
              <div className="bg-gray-300 h-3 w-16 rounded"></div>
              <div className="bg-gray-300 h-3 w-12 rounded"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;