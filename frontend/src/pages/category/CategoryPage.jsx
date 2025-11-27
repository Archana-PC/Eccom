import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ui/ProductCard/ProductCard';

// import Pagination from '../../components/ui/Pagination/Pagination';

const CategoryPage = ({ category: propCategory, gender, filter }) => {
  const { category: urlCategory, subcategory } = useParams();
  const [searchParams] = useSearchParams();
  
  // Get context from CategoryLayout
  const { 
    activeFilters = {}, 
    sortOption = 'newest',
    onFilterChange,
    onSortChange 
  } = useOutletContext() || {};

  // State for products and pagination
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage] = useState(12);

  // Determine the actual category
  const actualCategory = propCategory || urlCategory || 'all';

  // Mock product data (updated to match ProductCard expected structure)
  const mockProducts = [
    {
      id: 1,
      name: "Classic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "/images/products/tshirt1.jpg",
      brand: "Nike",
      category: "clothing",
      sizes: ["S", "M", "L", "XL"],
      colors: ["#000000", "#FFFFFF", "#808080"],
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      isOnSale: true,
      isOutOfStock: false
    },
    {
      id: 2,
      name: "Running Sneakers",
      price: 89.99,
      originalPrice: 129.99,
      image: "/images/products/shoes1.jpg",
      brand: "Adidas",
      category: "shoes",
      sizes: ["8", "9", "10", "11"],
      colors: ["#FFFFFF", "#000000"],
      rating: 4.8,
      reviewCount: 256,
      isNew: false,
      isOnSale: true,
      isOutOfStock: false
    },
    {
      id: 3,
      name: "Leather Handbag",
      price: 159.99,
      originalPrice: 199.99,
      image: "/images/products/bag1.jpg",
      brand: "Coach",
      category: "accessories",
      sizes: [],
      colors: ["#5d4037", "#000000"],
      rating: 4.7,
      reviewCount: 89,
      isNew: true,
      isOnSale: false,
      isOutOfStock: false
    },
    {
      id: 4,
      name: "Denim Jacket",
      price: 79.99,
      originalPrice: 99.99,
      image: "/images/products/jacket1.jpg",
      brand: "Gap",
      category: "clothing",
      sizes: ["S", "M", "L", "XL"],
      colors: ["#1976d2", "#000080"],
      rating: 4.3,
      reviewCount: 67,
      isNew: false,
      isOnSale: true,
      isOutOfStock: false
    },
    {
      id: 5,
      name: "Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      image: "/images/products/headphones1.jpg",
      brand: "Sony",
      category: "accessories",
      sizes: [],
      colors: ["#000000", "#FFFFFF", "#FF0000", "#0000FF"],
      rating: 4.6,
      reviewCount: 203,
      isNew: true,
      isOnSale: true,
      isOutOfStock: false
    },
    {
      id: 6,
      name: "Summer Dress",
      price: 59.99,
      originalPrice: 79.99,
      image: "/images/products/dress1.jpg",
      brand: "Zara",
      category: "clothing",
      sizes: ["XS", "S", "M", "L"],
      colors: ["#388e3c", "#ff69b4", "#ffeb3b"],
      rating: 4.4,
      reviewCount: 145,
      isNew: false,
      isOnSale: true,
      isOutOfStock: false
    },
    {
      id: 7,
      name: "Canvas Sneakers",
      price: 45.99,
      originalPrice: 65.99,
      image: "/images/products/canvas-shoes1.jpg",
      brand: "Converse",
      category: "shoes",
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["#FFFFFF", "#000000", "#FF0000"],
      rating: 4.2,
      reviewCount: 98,
      isNew: false,
      isOnSale: true,
      isOutOfStock: false
    },
    {
      id: 8,
      name: "Smart Watch",
      price: 299.99,
      originalPrice: 349.99,
      image: "/images/products/watch1.jpg",
      brand: "Apple",
      category: "accessories",
      sizes: ["38mm", "42mm"],
      colors: ["#000000", "#C0C0C0"],
      rating: 4.9,
      reviewCount: 456,
      isNew: true,
      isOnSale: true,
      isOutOfStock: false
    }
  ];

  // Filter products based on active filters
  const filterProducts = (products) => {
    return products.filter(product => {
      // Category filter
      if (actualCategory !== 'all' && product.category !== actualCategory) {
        return false;
      }

      // Subcategory filter
      if (subcategory && product.subcategory !== subcategory) {
        return false;
      }

      // Gender filter
      if (gender && product.gender !== gender) {
        return false;
      }

      // Special filters
      if (filter === 'new' && !product.isNew) {
        return false;
      }
      if (filter === 'sale' && !product.isOnSale) {
        return false;
      }

      // Active filters
      if (activeFilters.size && activeFilters.size.length > 0) {
        const hasMatchingSize = activeFilters.size.some(size => 
          product.sizes && product.sizes.includes(size)
        );
        if (!hasMatchingSize) return false;
      }

      if (activeFilters.color && activeFilters.color.length > 0) {
        const hasMatchingColor = activeFilters.color.some(color => 
          product.colors && product.colors.includes(color)
        );
        if (!hasMatchingColor) return false;
      }

      if (activeFilters.brand && activeFilters.brand.length > 0) {
        if (!activeFilters.brand.includes(product.brand.toLowerCase())) return false;
      }

      if (activeFilters.price && activeFilters.price.length > 0) {
        const priceRange = activeFilters.price[0];
        if (Array.isArray(priceRange)) {
          const [min, max] = priceRange;
          if (product.price < min || product.price > max) return false;
        }
      }

      return true;
    });
  };

  // Sort products
  const sortProducts = (products, sortOption) => {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popular':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'discount':
        return sorted.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        });
      case 'newest':
      default:
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  };

  // Load products
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredProducts = filterProducts(mockProducts);
      const sortedProducts = sortProducts(filteredProducts, sortOption);
      
      // Calculate pagination
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
      
      setProducts(paginatedProducts);
      setTotalProducts(sortedProducts.length);
      setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage));
      setLoading(false);
    }, 500);
    
  }, [actualCategory, subcategory, gender, filter, activeFilters, sortOption, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, sortOption]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  // Add to cart handler
  const handleAddToCart = (product) => {
    // Implement add to cart logic
    console.log('Adding to cart:', product);
  };

  // Add to wishlist handler
  const handleAddToWishlist = (product) => {
    // Implement add to wishlist logic
    console.log('Adding to wishlist:', product);
  };

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            {loading ? (
              'Loading...'
            ) : (
              <>
                Showing {products.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1}-
                {Math.min(currentPage * itemsPerPage, totalProducts)} of {totalProducts} results
                {actualCategory !== 'all' && (
                  <span className="ml-1">
                    for "{actualCategory}"
                    {subcategory && ` > ${subcategory}`}
                    {gender && ` (${gender})`}
                  </span>
                )}
              </>
            )}
          </p>
        </div>
        
        {/* Additional sort options for desktop */}
        <div className="hidden lg:block">
          <select 
            value={sortOption}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            {(actualCategory === 'sale' || filter === 'sale') && (
              <option value="discount">Highest Discount</option>
            )}
          </select>
        </div>
      </div>

      {/* Products Grid using ProductCard */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
          // Loading skeletons
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))
        ) : (
          // Actual products - Pass the entire product object
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              className="w-full"
              showWishlist={true}
              showQuickView={true}
            />
          ))
        )}
      </div>

      {/* No Products Message */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
          <button
            onClick={() => onFilterChange?.({})}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {/* {!loading && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showPageNumbers={true}
            maxVisiblePages={5}
          />
        </div>
      )} */}
    </div>
  );
};

export default CategoryPage;