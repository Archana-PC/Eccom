import React from 'react';
import CategoryCardSkeleton from '../CategoryCard/CategoryCardSkeleton';
import CategoryCard from '../CategoryCard/CategoryCard';


const CategoryGrid = ({
  categories = [],
  variant = 'default',
  columns = 'auto',
  showSubcategories = false, // Changed default for cleaner look
  maxSubcategories = 4,
  loading = false,
  loadingCount = 6, // Reduced for better look
  onCategoryClick,
  onSubcategoryClick,
  className = ''
}) => {
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  if (loading) {
    return (
      <div className={`grid ${gridColumns[columns]} gap-6 lg:gap-8 ${className}`}>
        {Array.from({ length: loadingCount }).map((_, index) => (
          <CategoryCardSkeleton key={index} variant={variant} />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No categories found</h3>
        <p className="text-gray-500 max-w-sm mx-auto">Check back later for new categories and collections.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridColumns[columns]} gap-6 lg:gap-8 ${className}`}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id || category.name}
          category={category}
          variant={variant}
          showSubcategories={showSubcategories}
          maxSubcategories={maxSubcategories}
          onCategoryClick={onCategoryClick}
          onSubcategoryClick={onSubcategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;