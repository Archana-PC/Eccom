import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  loading = false,
  title = "Featured Products",
  showTitle = true,
  showViewAll = true,
  viewAllLink = "/products",
  className = "",
}) => {
  return (
    <section className={`w-full py-12 ${className}`}>
      
      {/* ===== TITLE (TOP) ===== */}
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
        </div>
      )}

      {/* ===== PRODUCT GRID ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {!loading &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        {/* Skeletons */}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 aspect-4/5"
            />
          ))}
      </div>

      {/* ===== VIEW ALL (BOTTOM) ===== */}
      {showViewAll && (
        <div className="text-center mt-10">
          <Link
            to={viewAllLink}
            className="
              inline-block 
              text-[#006699] 
              font-semibold 
              text-sm 
              px-6 py-2 
              border border-[#006699]
              rounded-full
              hover:bg-[#006699]
              hover:text-white
              transition-all duration-300
            "
          >
            View All →
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
