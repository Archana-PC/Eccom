import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryBadge from '../CategoryBadge/CategoryBadge';
import SubcategoryList from '../SubcategoryList/SubcategoryList';


const CategoryCard = ({
  category,
  variant = 'default', // 'default', 'compact', 'minimal', 'hero'
  showSubcategories = false, // Changed default to false for cleaner look
  maxSubcategories = 4,
  onCategoryClick,
  onSubcategoryClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCategoryClick = (e) => {
    if (onCategoryClick) {
      onCategoryClick(category, e);
    }
  };

  const categoryPath = `/men/${category.name.toLowerCase().replace(/\s+/g, '-')}`;

  // Image mapping for categories (you can move this to category data)
  const categoryImages = {
    'tops': 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop&crop=center',
    'bottoms': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&crop=center',
    'outerwear': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop&crop=center',
    'footwear': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center',
    'accessories': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop&crop=center',
    'activewear': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=center'
  };

  const variants = {
    default: 'group cursor-pointer',
    compact: 'group cursor-pointer',
    minimal: 'group cursor-pointer',
    hero: 'group cursor-pointer'
  };

  const cardHeights = {
    default: 'h-80',
    compact: 'h-64',
    minimal: 'h-72',
    hero: 'h-96'
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      <Link
        to={categoryPath}
        onClick={handleCategoryClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative ${cardHeights[variant]} overflow-hidden rounded-2xl bg-gray-100 transition-all duration-700 ease-out group-hover:shadow-2xl`}>
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={categoryImages[category.id] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop'}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>

          {/* Badge */}
          {category.badge && (
            <div className="absolute top-4 right-4 z-10">
              <CategoryBadge 
                text={category.badge.text}
                variant={category.badge.variant}
                size="small"
                className="backdrop-blur-sm bg-white/20 text-white border border-white/30"
              />
            </div>
          )}

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            {/* Category Info */}
            <div className="transform transition-transform duration-500 ease-out group-hover:translate-y-0 translate-y-2">
              {/* Icon - Floating above title */}
              <div className="mb-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                  <span className="text-2xl">{category.icon}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 tracking-tight">
                {category.name}
              </h3>
              
              {/* Description */}
              {category.description && variant !== 'compact' && (
                <p className="text-white/80 text-sm mb-3 line-clamp-2">
                  {category.description}
                </p>
              )}

              {/* Stats */}
              {category.stats && variant !== 'minimal' && (
                <div className="flex items-center justify-between text-xs text-white/70 mb-3">
                  <span>{category.stats.itemCount} items</span>
                  {category.stats.newItems > 0 && (
                    <span className="text-green-300">{category.stats.newItems} new</span>
                  )}
                </div>
              )}

              {/* Call to Action */}
              <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                <span>Shop Now</span>
                <svg 
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300 pointer-events-none"></div>
        </div>
      </Link>

      {/* Subcategories - Only show if enabled and on hover/click */}
      {showSubcategories && category.subcategories?.length > 0 && isHovered && (
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <SubcategoryList
            subcategories={category.subcategories}
            parentPath={categoryPath}
            maxVisible={maxSubcategories}
            onSubcategoryClick={onSubcategoryClick}
            className="bg-white rounded-lg p-4 shadow-lg border"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryCard;