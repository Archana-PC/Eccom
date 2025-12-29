import React, { useState, useEffect, useRef } from "react";
import Button from "../../../../shared/Button/Button";

const CategoriesSection = ({
  title = "Shop by Category",
  subtitle = "",
  showAll = true,
  maxCategories = null,
  className = "",
  onCategoryClick
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  // Premium Journal-like Images
  const allCategories = [
    {
      id: "tops",
      name: "Tops",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      products: 12,
    },
    {
      id: "bottoms",
      name: "Bottoms",
      image:
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=600&q=80",
      products: 9,
    },
    {
      id: "outerwear",
      name: "Outerwear",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
      products: 7,
    },
    {
      id: "footwear",
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      products: 5,
    },
    {
      id: "accessories",
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=600&q=80",
      products: 6,
    },
    {
      id: "activewear",
      name: "Activewear",
      image:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=600&q=80",
      products: 4,
    },
    {
      id: "activewear",
      name: "Activewear",
      image:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=600&q=80",
      products: 4,
    },
    {
      id: "activewear2",
      name: "Activewear",
      image:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=600&q=80",
      products: 4,
    },
    {
      id: "activewear3",
      name: "Activewear",
      image:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=600&q=80",
      products: 4,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      const displayCategories = maxCategories
        ? allCategories.slice(0, maxCategories)
        : allCategories;

      setCategories(displayCategories);
      setLoading(false);
    }, 400);
  }, [maxCategories]);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <section className={`py-20 w-full bg-white ${className}`}>
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
      </div>

      {/* FULL WIDTH WRAPPER */}
      <div className="relative w-full">

        {/* LEFT ARROW */}
        <button
          onClick={scrollLeft}
          className="
            absolute left-2 top-1/2 -translate-y-1/2 
            bg-white shadow-xl p-3 rounded-full z-20 
            hidden md:block
          "
        >
          ❮
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={scrollRight}
          className="
            absolute right-2 top-1/2 -translate-y-1/2 
            bg-white shadow-xl p-3 rounded-full z-20 
            hidden md:block
          "
        >
          ❯
        </button>

        {/* HORIZONTAL SCROLL AREA */}
        <div
          ref={sliderRef}
          className="
            flex gap-10 overflow-x-auto px-[calc((100vw-1280px)/2)] 
            scrollbar-hide snap-x snap-mandatory py-4 
          "
          style={{ scrollBehavior: "smooth" }}
        >
          {/* LOADING PLACEHOLDERS */}
          {loading &&
            Array.from({ length: maxCategories }).map((_, i) => (
              <div
                key={i}
                className="w-32 h-32 rounded-full bg-gray-200 animate-pulse shrink-0"
              />
            ))}

          {/* CATEGORY SLIDES */}
          {!loading &&
            categories.map((cat) => (
              <div
                key={cat.id}
                className="snap-center shrink-0 text-center cursor-pointer"
                onClick={() => onCategoryClick?.(cat)}
              >
                {/* Circle Image */}
                <div
                  className="
                    w-32 h-32 md:w-36 md:h-36 rounded-full 
                    overflow-hidden shadow-lg hover:shadow-xl 
                    hover:-translate-y-1 transition-all duration-300
                    bg-gray-100
                  "
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  {cat.name}
                </p>

              </div>
            ))}
        </div>
      </div>

      {/* VIEW ALL */}
      {/* {showAll && !loading && (
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="medium"
            className="border-[#006699] text-[#006699] hover:bg-[#006699] hover:text-white"
            onClick={() => (window.location.href = "/categories")}
          >
            View All →
          </Button>
        </div>
      )} */}
    </section>
  );
};

export default CategoriesSection;
