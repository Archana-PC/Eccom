// src/layouts/CategoryLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import MobileFilterModal from '../../components/filters/Filter/MobileFilterModal';
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
    <div className="min-h-screen flex flex-col overflow-x-hidden"> {/* FIXED: Added overflow-x-hidden */}
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
      
      {/* FIXED: Added max-w-full and removed horizontal padding */}
      <div className="flex flex-1 w-full max-w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-60 bg-white">
          <div className="sticky top-24">
            <Filter
              category={category || 'all'}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </aside>
        
        {/* Main Content - FIXED: Added overflow-hidden */}
        <main className="flex-1 overflow-hidden"> {/* FIXED: Added overflow-hidden */}
          {/* Mobile Filter Button - FIXED: Added max-w-full container */}
          <div className="lg:hidden border-b p-4 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between space-x-4 max-w-full"> {/* FIXED: Added max-w-full */}
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors shrink-0" /* FIXED: Added flex-shrink-0 */
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="truncate">Filters</span> {/* FIXED: Added truncate */}
                {activeFiltersCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center shrink-0">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              {/* Sort Dropdown - FIXED: Added max-width */}
              <select 
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-w-[140px] truncate" /* FIXED: Added max-w-[140px] truncate */
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
          
          {/* Products Grid - FIXED: Added overflow-x-hidden */}
          <div className="p-2 lg:p-6 overflow-x-hidden"> {/* FIXED: Added overflow-x-hidden */}
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

      {/* Use FilterModal Component */}
      <MobileFilterModal
        category={category || 'all'}
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        activeFiltersCount={activeFiltersCount}
      />
    </div>
  );
};

export default CategoryLayout;