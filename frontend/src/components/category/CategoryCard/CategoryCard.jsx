import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({
  category,
  onCategoryClick,
  className = "",
}) => {
  const handleCategoryClick = (e) => {
    if (onCategoryClick) {
      e.preventDefault();
      onCategoryClick(category);
    }
  };

  return (
    <div className={`group flex flex-col items-center ${className}`}>
      <Link
        to={`/category/${category.slug || category.id}`}
        onClick={handleCategoryClick}
        className="flex flex-col items-center"
      >
        {/* CIRCLE IMAGE */}
        <div
          className="
            relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36
            rounded-full overflow-hidden bg-gray-100
            border-2 border-gray-200 shadow-sm
            transition-all duration-300
            group-hover:shadow-lg group-hover:border-[#006699]
          "
        >
          <img
            src={
              category.image ||
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
            }
            alt={category.name}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-110
            "
            loading="lazy"
          />
        </div>

        {/* TITLE BELOW */}
        <h3
          className="
            mt-3 text-sm md:text-base font-semibold text-gray-800 
            tracking-wide text-center
            transition-colors duration-300
            group-hover:text-[#006699]
          "
        >
          {category.name}
        </h3>
      </Link>
    </div>
  );
};

export default CategoryCard;
