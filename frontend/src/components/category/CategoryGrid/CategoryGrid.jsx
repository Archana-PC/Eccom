import React from "react";
import CategoryCardSkeleton from "../CategoryCard/CategoryCardSkeleton";
import CategoryCard from "../CategoryCard/CategoryCard";

const CategoryGrid = ({
  categories = [],
  variant = "circle", // updated default for your new design
  columns = 4,
  loading = false,
  loadingCount = 8,
  onCategoryClick,
  onSubcategoryClick,
  className = "",
  showTitle = true,
  title = "FEATURED CATEGORIES",
  subtitle = "Explore our curated collections",
}) => {
  // Clean grid columns matching journal-style spacing
  const gridColumns = {
    1: "grid-cols-1 place-items-center",
    2: "grid-cols-2 md:grid-cols-2 place-items-center",
    3: "grid-cols-2 md:grid-cols-3 place-items-center",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center",
  };

  // LOADING UI
  if (loading) {
    return (
      <div
        className={`grid ${gridColumns[columns]} gap-6 ${className}`}
      >
        {Array.from({ length: loadingCount }).map((_, index) => (
          <CategoryCardSkeleton key={index} variant={variant} />
        ))}
      </div>
    );
  }

  // EMPTY STATE
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No categories found
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Check back later for new collections.
        </p>
      </div>
    );
  }

  return (
    <div className={`px-4 md:px-8 lg:px-12 ${className}`}>
      {/* HEADER */}
      {showTitle && (
        <div className="text-center mb-10">
          {subtitle && (
            <p className="text-xs md:text-sm font-medium text-gray-500 uppercase mb-1">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* CATEGORY GRID */}
      <div
        className={`
          grid ${gridColumns[columns]}
          gap-6 md:gap-8 lg:gap-10
        `}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.id || category.name}
            category={category}
            variant={variant}
            onCategoryClick={onCategoryClick}
            onSubcategoryClick={onSubcategoryClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
