// src/layouts/CategoryLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Filter from '../../components/filters/Filter/Filter';

const CategoryLayout = () => {
  const { category } = useParams();
  const [activeFilters, setActiveFilters] = useState({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  
  const categoryConfig = {
    clothing: {
      title: 'Clothing',
      description: 'Discover our premium clothing collection'
    },
    shoes: {
      title: 'Shoes',
      description: 'Step up your style with our shoe collection'
    },
    accessories: {
      title: 'Accessories',
      description: 'Complete your look with our accessories'
    },
    sale: {
      title: 'Sale',
      description: 'Great deals and discounts'
    }
  };

  const currentCategory = categoryConfig[category] || {
    title: 'Shop',
    description: 'Discover our collection'
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    console.log('Filters applied:', filters);
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    setActiveFilters({});
    console.log('Filters cleared');
  };

  // Handle sort change
  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    console.log('Sort changed to:', newSortOption);
  };

  // Close mobile filter when category changes
  useEffect(() => {
    setIsMobileFilterOpen(false);
  }, [category]);

  // Count active filters for mobile button
  const activeFiltersCount = Object.values(activeFilters).reduce(
    (count, filterValues) => count + (Array.isArray(filterValues) ? filterValues.length : 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        navConfig={{
          logo: { text: "STYLEHUB", link: "/" },
          showSearch: true,
          showUserAccount: true,
          showCart: true,
          cartItemsCount: 2,
          showWishlist: true,
        }}
      />
      
      {/* Category Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentCategory.title}
          </h1>
          <p className="text-gray-600 mt-2">
            {currentCategory.description}
          </p>
        </div>
      </div>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
       
        <aside className="hidden lg:block w-80 border-r bg-white">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Filter 
              category={category || 'all'}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              className="h-full"
            />
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Mobile Filter Button */}
          <div className="lg:hidden border-b p-4 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between space-x-4">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center space-x-2 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-20px text-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              {/* Sort Dropdown */}
              <select 
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                {(category === 'sale') && (
                  <option value="discount">Highest Discount</option>
                )}
              </select>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="p-4 lg:p-6">
            <Outlet context={{ 
              category, 
              activeFilters, 
              sortOption,
              onFilterChange: handleFilterChange,
              onSortChange: handleSortChange 
            }} />
          </div>
        </main>
      </div>

      {/* Mobile Filter Overlay - Myntra Style */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          {/* Filter Panel - Full screen on mobile like Myntra */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
            {/* Mobile Filter Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Filter Content */}
            <div className="h-full overflow-hidden">
              <Filter 
                category={category || 'all'}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                className="h-full"
              />
            </div>
            
            {/* Mobile Filter Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              <div className="flex space-x-3">
                <button
                  onClick={handleClearFilters}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Apply Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-white text-gray-900 text-xs rounded-full px-2 py-1">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryLayout;