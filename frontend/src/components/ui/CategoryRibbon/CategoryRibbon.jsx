import React from 'react';
import { Link } from 'react-router-dom';

const CategoryRibbon = ({ 
  categories = [], 
  showSaleBadge = true,
  saleBadgeText = "Sale Ends Soon",
  className = "",
  onCategoryClick = null
}) => {
  const defaultCategories = [
    { id: 1, name: "New Arrivals", slug: "new-arrivals" },
    { id: 2, name: "Best Sellers", slug: "best-sellers" },
    { id: 3, name: "Spring Collection", slug: "spring-collection" },
    { id: 4, name: "Summer Essentials", slug: "summer-essentials" },
    { id: 5, name: "Formal Wear", slug: "formal-wear" },
    { id: 6, name: "Accessories", slug: "accessories" },
    { id: 7, name: "Limited Edition", slug: "limited-edition" },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  const handleCategoryClick = (category) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <div className={`bg-white border-b border-gray-100  ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between py-2">
          
          {/* Sale Badge */}
          {showSaleBadge && (
            <div className="shrink-0 mr-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full 
                             bg-linear-to-r from-[#0099CC] to-[#006699] 
                             text-white text-xs font-bold">
                <span className="hidden md:inline">{saleBadgeText}</span>
                <span className="md:hidden">SALE</span>
              </span>
            </div>
          )}

          {/* Categories Container */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center space-x-4 lg:space-x-8 overflow-x-auto 
                          scrollbar-hide py-1">
              {displayCategories.map((category) => (
                <Link
                  key={category.id || category.slug}
                  to={`/category/${category.slug}`}
                  onClick={() => handleCategoryClick(category)}
                  className="group relative shrink-0"
                >
                  <span className="text-xs md:text-sm font-medium text-gray-700 
                                 group-hover:text-[#006699] transition-colors duration-200
                                 whitespace-nowrap">
                    {category.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 
                                 bg-[#0099CC] group-hover:w-full 
                                 transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryRibbon;