import React, { useState, useEffect } from 'react';
import CategoryGrid from '../../category/CategoryGrid/CategoryGrid';
import Button from '../../ui/Button/Button';


const CategoriesSection = ({
  title = "SHOP BY CATEGORY",
  subtitle = "Discover our complete collection designed for the modern man",
  showAll = true,
  maxCategories = 6,
  variant = "default",
  columns = 3,
  className = "",
  onCategoryClick,
  onSubcategoryClick
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Updated category data with better images
  const allCategories = [
    {
      id: 'tops',
      name: 'Tops',
      icon: '👕',
      description: 'Premium shirts, hoodies and casual wear for every occasion',
      subcategories: ['T-Shirts', 'Polo Shirts', 'Casual Shirts', 'Formal Shirts', 'Hoodies', 'Sweaters'],
      stats: { itemCount: 240, newItems: 12 },
      badge: { text: 'Popular', variant: 'hot' }
    },
    {
      id: 'bottoms',
      name: 'Bottoms',
      icon: '👖',
      description: 'Perfect fit jeans, chinos and trousers in premium fabrics',
      subcategories: ['Jeans', 'Casual Pants', 'Formal Trousers', 'Shorts', 'Joggers', 'Cargos'],
      stats: { itemCount: 180, newItems: 8 }
    },
    {
      id: 'outerwear',
      name: 'Outerwear',
      icon: '🧥',
      description: 'Stay stylish with our collection of jackets and coats',
      subcategories: ['Jackets', 'Coats', 'Blazers', 'Bomber Jackets', 'Leather Jackets', 'Windbreakers'],
      stats: { itemCount: 95, newItems: 15 },
      badge: { text: 'New', variant: 'new' }
    },
    {
      id: 'footwear',
      name: 'Footwear',
      icon: '👟',
      description: 'Step up your game with our premium shoe collection',
      subcategories: ['Sneakers', 'Formal Shoes', 'Boots', 'Sandals', 'Loafers', 'Sports Shoes'],
      stats: { itemCount: 160, newItems: 5 }
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: '⌚',
      description: 'Complete your look with carefully curated accessories',
      subcategories: ['Watches', 'Belts', 'Wallets', 'Sunglasses', 'Hats', 'Bags'],
      stats: { itemCount: 120, newItems: 3 }
    },
    {
      id: 'activewear',
      name: 'Activewear',
      icon: '🏃',
      description: 'Performance meets style in our activewear collection',
      subcategories: ['Sports T-Shirts', 'Training Pants', 'Gym Shorts', 'Sports Jackets', 'Athletic Shoes'],
      stats: { itemCount: 85, newItems: 7 },
      badge: { text: 'Sale', variant: 'sale' }
    }
  ];

  useEffect(() => {
    const loadCategories = () => {
      setTimeout(() => {
        const displayCategories = maxCategories 
          ? allCategories.slice(0, maxCategories)
          : allCategories;
        setCategories(displayCategories);
        setLoading(false);
      }, 800);
    };

    loadCategories();
  }, [maxCategories]);

  const handleCategoryClick = (category, event) => {
    console.log('Category clicked:', category);
    if (onCategoryClick) {
      onCategoryClick(category, event);
    }
  };

  const handleSubcategoryClick = (subcategory, event) => {
    console.log('Subcategory clicked:', subcategory);
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategory, event);
    }
  };

  return (
    <section className={`py-20 lg:py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Categories Grid */}
        <CategoryGrid
          categories={categories}
          variant={variant}
          columns={columns}
          showSubcategories={false}
          maxSubcategories={4}
          loading={loading}
          loadingCount={6}
          onCategoryClick={handleCategoryClick}
          onSubcategoryClick={handleSubcategoryClick}
          className="mb-16"
        />

        {/* View All Categories Button */}
        {showAll && !loading && (
          <div className="text-center">
            <Button
              variant="outline"
              size="large"
              onClick={() => window.location.href = '/categories'}
              className="px-10 py-4 text-lg font-medium border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              View All Categories
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;