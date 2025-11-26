// src/layouts/CategoryLayout.jsx
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import CategorySidebar from '../components/CategorySidebar';
import FilterBar from '../components/FilterBar';

const CategoryLayout = () => {
  const { category } = useParams();
  
  const categoryConfig = {
    clothing: {
      filters: ['Size', 'Color', 'Price', 'Brand', 'Fit', 'Material'],
      sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular']
    },
    shoes: {
      filters: ['Size', 'Color', 'Price', 'Brand', 'Type', 'Width'],
      sortOptions: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular']
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Category Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold capitalize">{category?.replace('-', ' ') || 'Shop'}</h1>
          <p className="text-gray-600 mt-2">Discover our premium collection</p>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar Filters */}
        <aside className="w-64 bg-white border-r hidden lg:block">
          <CategorySidebar category={category} />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Filter Button */}
          <div className="lg:hidden border-b p-4">
            <button className="w-full bg-black text-white py-2 px-4 rounded">
              Show Filters
            </button>
          </div>
          
          {/* Filter Bar */}
          <FilterBar 
            filters={categoryConfig[category]?.filters || []}
            sortOptions={categoryConfig[category]?.sortOptions || []}
          />
          
          {/* Products Grid */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CategoryLayout;