import React from 'react';
import { Link } from 'react-router-dom';

const SubcategoryItem = ({ 
  subcategory, 
  parentPath,
  onClick,
  className = ''
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(subcategory, e);
    }
  };

  return (
    <Link
      to={`${parentPath}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={handleClick}
      className={`
        block py-2 px-3 
        text-sm text-neutral-600 
        hover:text-primary-700 
        hover:bg-primary-50 
        rounded-md 
        transition-all duration-200 
        border-l-2 border-transparent 
        hover:border-primary-400
        ${className}
      `}
    >
      {subcategory}
    </Link>
  );
};

export default SubcategoryItem;