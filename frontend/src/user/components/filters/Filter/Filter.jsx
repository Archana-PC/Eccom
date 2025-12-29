import React, { useState } from 'react';
import FilterGroup from '../FilterGroup/FilterGroup';

const Filter = ({
  category = 'all',
  onFilterChange,
  onClearFilters,
  className = ''
}) => {
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    price: [],
    brand: [],
    fit: [],
    material: [],
    type: [],
    width: []
  });

  // Filter configurations based on category
  const filterConfigs = {
    clothing: [
      {
        type: 'size',
        title: 'Size',
        options: [
          { value: 'xs', name: 'XS', count: 23 },
          { value: 's', name: 'S', count: 45 },
          { value: 'm', name: 'M', count: 67 },
          { value: 'l', name: 'L', count: 54 },
          { value: 'xl', name: 'XL', count: 32 },
          { value: 'xxl', name: 'XXL', count: 18 }
        ]
      },
      {
        type: 'color',
        title: 'Color',
        options: [
          { value: '#000000', name: 'Black', count: 89 },
          { value: '#FFFFFF', name: 'White', count: 76 },
          { value: '#1a237e', name: 'Navy', count: 45 },
          { value: '#757575', name: 'Gray', count: 56 },
          { value: '#d32f2f', name: 'Red', count: 34 },
          { value: '#1976d2', name: 'Blue', count: 42 },
          { value: '#388e3c', name: 'Green', count: 28 },
          { value: '#5d4037', name: 'Brown', count: 31 }
        ]
      },
      {
        type: 'price',
        title: 'Price Range',
        priceConfig: {
          min: 0,
          max: 500,
          step: 10,
          currency: '$'
        }
      },
      {
        type: 'brand',
        title: 'Brand',
        options: [
          { value: 'nike', name: 'Nike', count: 45, logo: '/logos/nike.png' },
          { value: 'adidas', name: 'Adidas', count: 38, logo: '/logos/adidas.png' },
          { value: 'zara', name: 'Zara', count: 52 },
          { value: 'hm', name: 'H&M', count: 41 },
          { value: 'uniqlo', name: 'Uniqlo', count: 29 },
          { value: 'gap', name: 'Gap', count: 33 }
        ]
      },
      {
        type: 'fit',
        title: 'Fit',
        options: [
          { value: 'slim', name: 'Slim Fit', count: 67 },
          { value: 'regular', name: 'Regular Fit', count: 89 },
          { value: 'loose', name: 'Loose Fit', count: 34 },
          { value: 'oversized', name: 'Oversized', count: 23 }
        ]
      },
      {
        type: 'material',
        title: 'Material',
        options: [
          { value: 'cotton', name: 'Cotton', count: 78 },
          { value: 'polyester', name: 'Polyester', count: 45 },
          { value: 'wool', name: 'Wool', count: 23 },
          { value: 'linen', name: 'Linen', count: 19 },
          { value: 'denim', name: 'Denim', count: 34 },
          { value: 'silk', name: 'Silk', count: 12 }
        ]
      }
    ],
    shoes: [
      {
        type: 'size',
        title: 'Size',
        options: [
          { value: '6', name: 'US 6', count: 12 },
          { value: '7', name: 'US 7', count: 18 },
          { value: '8', name: 'US 8', count: 24 },
          { value: '9', name: 'US 9', count: 31 },
          { value: '10', name: 'US 10', count: 28 },
          { value: '11', name: 'US 11', count: 22 },
          { value: '12', name: 'US 12', count: 15 }
        ]
      },
      {
        type: 'color',
        title: 'Color',
        options: [
          { value: '#000000', name: 'Black', count: 45 },
          { value: '#FFFFFF', name: 'White', count: 38 },
          { value: '#5d4037', name: 'Brown', count: 29 },
          { value: '#1a237e', name: 'Navy', count: 23 },
          { value: '#d32f2f', name: 'Red', count: 16 }
        ]
      },
      {
        type: 'price',
        title: 'Price Range',
        priceConfig: {
          min: 0,
          max: 300,
          step: 5,
          currency: '$'
        }
      },
      {
        type: 'brand',
        title: 'Brand',
        options: [
          { value: 'nike', name: 'Nike', count: 67 },
          { value: 'adidas', name: 'Adidas', count: 54 },
          { value: 'puma', name: 'Puma', count: 32 },
          { value: 'converse', name: 'Converse', count: 28 },
          { value: 'vans', name: 'Vans', count: 24 }
        ]
      },
      {
        type: 'type',
        title: 'Type',
        options: [
          { value: 'sneakers', name: 'Sneakers', count: 89 },
          { value: 'boots', name: 'Boots', count: 34 },
          { value: 'sandals', name: 'Sandals', count: 23 },
          { value: 'formal', name: 'Formal Shoes', count: 45 },
          { value: 'casual', name: 'Casual Shoes', count: 56 }
        ]
      },
      {
        type: 'width',
        title: 'Width',
        options: [
          { value: 'narrow', name: 'Narrow', count: 12 },
          { value: 'regular', name: 'Regular', count: 89 },
          { value: 'wide', name: 'Wide', count: 23 },
          { value: 'extra-wide', name: 'Extra Wide', count: 8 }
        ]
      }
    ],
    accessories: [
      {
        type: 'color',
        title: 'Color',
        options: [
          { value: '#000000', name: 'Black', count: 34 },
          { value: '#5d4037', name: 'Brown', count: 28 },
          { value: '#C0C0C0', name: 'Silver', count: 22 },
          { value: '#FFD700', name: 'Gold', count: 19 }
        ]
      },
      {
        type: 'price',
        title: 'Price Range',
        priceConfig: {
          min: 0,
          max: 200,
          step: 5,
          currency: '$'
        }
      },
      {
        type: 'brand',
        title: 'Brand',
        options: [
          { value: 'coach', name: 'Coach', count: 23 },
          { value: 'michael-kors', name: 'Michael Kors', count: 19 },
          { value: 'kate-spade', name: 'Kate Spade', count: 15 },
          { value: 'fossil', name: 'Fossil', count: 28 }
        ]
      },
      {
        type: 'type',
        title: 'Type',
        options: [
          { value: 'bags', name: 'Bags', count: 45 },
          { value: 'watches', name: 'Watches', count: 32 },
          { value: 'jewelry', name: 'Jewelry', count: 28 },
          { value: 'belts', name: 'Belts', count: 19 },
          { value: 'sunglasses', name: 'Sunglasses', count: 24 }
        ]
      }
    ]
  };

  // Get current category filters or default
  const currentFilters = filterConfigs[category] || filterConfigs.clothing;

  // Handle filter changes
  const handleFilterChange = (filterType, values) => {
    const newFilters = {
      ...filters,
      [filterType]: values
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    setFilters(clearedFilters);
    onClearFilters?.();
  };

  // Count active filters
  const activeFiltersCount = Object.values(filters).reduce(
    (count, filterValues) => count + filterValues.length,
    0
  );

  return (
    <div className={`bg-white  ${className}`}>
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([filterType, values]) =>
              values.map((value, index) => (
                <span
                  key={`${filterType}-${index}`}
                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                >
                  {Array.isArray(value) ? `$${value[0]} - $${value[1]}` : value}
                  <button
                    onClick={() => {
                      const newValues = values.filter((_, i) => i !== index);
                      handleFilterChange(filterType, newValues);
                    }}
                    className="ml-1 text-grey-600 hover:text-grey-800"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      )}

      {/* Filter Groups */}
      
        <div className="space-y-4 p-4">
          {currentFilters.map((filterConfig, index) => (
            <FilterGroup
              key={`${filterConfig.type}-${index}`}
              type={filterConfig.type}
              title={filterConfig.title}
              options={filterConfig.options || []}
              selectedValues={filters[filterConfig.type] || []}
              onSelectionChange={(values) => handleFilterChange(filterConfig.type, values)}
              priceConfig={filterConfig.priceConfig}
            />
          ))}
        </div>
      
    </div>
  );
};

export default Filter;