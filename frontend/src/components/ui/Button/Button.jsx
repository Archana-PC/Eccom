import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  iconOnly = false,
  icon,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-800 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-900 shadow-sm hover:shadow-md rounded-lg',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 active:bg-secondary-700 shadow-sm hover:shadow-md rounded-lg',
    outline: 'bg-transparent text-primary-800 border border-primary-300 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100 rounded-lg',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500 active:bg-neutral-200 rounded-lg',
    premium: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 active:bg-accent-700 shadow-md hover:shadow-lg rounded-lg',
    minimal: 'bg-transparent text-neutral-600 hover:bg-neutral-50 focus:ring-neutral-500 rounded-lg'
  };

  const sizes = {
    small: iconOnly ? 'p-2' : 'px-3 py-2 text-sm',
    medium: iconOnly ? 'p-2' : 'px-4 py-2.5 text-sm',
    large: iconOnly ? 'p-3' : 'px-6 py-3 text-base'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    widthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && !loading && (
        <span className={children ? 'mr-2' : ''}>
          {icon}
        </span>
      )}
      
      {children}
    </button>
  );
};

export default Button;