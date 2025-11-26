import React from 'react';

const CategoryBadge = ({ 
  text, 
  variant = 'default', 
  size = 'small',
  className = ''
}) => {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    new: 'bg-green-100 text-green-700',
    hot: 'bg-red-100 text-red-700',
    sale: 'bg-orange-100 text-orange-700',
    premium: 'bg-purple-100 text-purple-700'
  };

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`
      ${variants[variant]} 
      ${sizes[size]} 
      rounded-full 
      font-medium 
      uppercase 
      tracking-wide
      ${className}
    `}>
      {text}
    </span>
  );
};

export default CategoryBadge;