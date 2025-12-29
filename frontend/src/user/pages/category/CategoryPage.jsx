import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, useSearchParams } from "react-router-dom";
import ProductGrid from "../../components/ui/ProductCard/ProductGrid";
import { useGetProductsByCategorySlugQuery } from "../../../services/catalog/catalogApi";


// import Pagination from '../../components/ui/Pagination/Pagination';

const CategoryPage = ({ category: propCategory, gender, filter }) => {
  const { category: urlCategory, subcategory } = useParams();
  const [searchParams] = useSearchParams();

  // Get context from CategoryLayout
  const {
    activeFilters = {},
    sortOption = "newest",
    onFilterChange,
    onSortChange,
  } = useOutletContext() || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [itemsPerPage] = useState(12);

  // Determine the actual category
  const actualCategory = propCategory || urlCategory || "all";

  const {
    data: products = [],
    isLoading: loading,
    isError,
  } = useGetProductsByCategorySlugQuery(actualCategory, {
    skip: !actualCategory,
  });

  console.log("products", products);
  // Filter products based on active filters

  // Sort products

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters, sortOption]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    console.log("Adding to cart:", product);
  };

  // Add to wishlist handler
  const handleAddToWishlist = (product) => {
    // Implement add to wishlist logic
    console.log("Adding to wishlist:", product);
  };

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            {loading ? (
              "Loading..."
            ) : (
              <>
                Showing{" "}
                {products.length === 0
                  ? 0
                  : (currentPage - 1) * itemsPerPage + 1}
                -{Math.min(currentPage * itemsPerPage, totalProducts)} of{" "}
                {totalProducts} results
                {actualCategory !== "all" && (
                  <span className="ml-1">
                    for "{actualCategory}"{subcategory && ` > ${subcategory}`}
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
            {(actualCategory === "sale" || filter === "sale") && (
              <option value="discount">Highest Discount</option>
            )}
          </select>
        </div>
      </div>

      {/* Products Grid using ProductCard */}
      <ProductGrid products={products}
      loading={loading}
      // onFilterChange={handleFilterChange}
      />
      
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
