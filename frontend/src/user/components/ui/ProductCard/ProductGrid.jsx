import React from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductGrid = ({
  products = [],
  loading = false,
  className = "",
  title = "",
}) => {
  return (
    <section className={`w-full py-12 ${className}`}>
      {title && (
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {!loading &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,

                // ✅ PRICE
                price: product.starting_price,
                originalPrice: product.mrp,

                // ✅ META
                brand: product.brand_name,
                category_name: product.category_name,

                // ✅ IMAGE
                image: product.image,

                // ✅ BADGE FROM BACKEND
                badge: product.badge,

                // ✅ UI FLAGS (derived)
                isNew: product.badge === "NEW",
                isFeatured: product.badge === "FEATURED",
                isTrending: product.badge === "TRENDING",
                isOnSale: product.discount_percent > 0,

                // OPTIONAL SAFE DEFAULTS
                rating: null,
                reviewCount: 0,
                isOutOfStock: false,
                colors: [],
                sizes: [],
              }}
            />
          ))}

        {loading &&
          Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </div>
    </section>
  );
};

export default ProductGrid;
