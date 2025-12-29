import React from 'react';

const CategoryIcon = ({ 
  icon, 
  name, 
  size = 'medium',
  variant = 'default'
}) => {
  const sizes = {
    small: 'w-8 h-8 text-lg',
    medium: 'w-12 h-12 text-2xl',
    large: 'w-16 h-16 text-3xl'
  };

  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-primary-100 text-primary-700',
    accent: 'bg-accent-100 text-accent-700',
    gradient: 'bg-gradient-to-br from-primary-100 to-accent-100 text-primary-700'
  };

  return (
    <div className={`
      ${sizes[size]} 
      ${variants[variant]} 
      rounded-full 
      flex items-center justify-center 
      transition-all duration-200 
      hover:scale-110 
      shadow-sm
    `}>
      {typeof icon === 'string' ? (
        <span className="font-medium">{icon}</span>
      ) : (
        icon
      )}
    </div>
  );
};

export default CategoryIcon;