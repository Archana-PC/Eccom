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
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent';
  
  const variants = {
    primary: 'bg-primary-600 text-black hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800 shadow-sm hover:shadow-md border-primary-600 hover:border-primary-700',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400 active:bg-secondary-700 shadow-sm hover:shadow-md border-secondary-500 hover:border-secondary-600',
    outline: 'bg-white text-primary-700 border-primary-300 hover:bg-primary-50 hover:border-primary-400 focus:ring-primary-500 active:bg-primary-100 shadow-sm hover:shadow',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-400 active:bg-neutral-200 border-transparent',
    premium: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-400 active:from-accent-700 active:to-accent-800 shadow-md hover:shadow-lg border-accent-500',
    minimal: 'bg-transparent text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 focus:ring-neutral-400 border-transparent',
    danger: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-400 active:bg-error-700 shadow-sm hover:shadow-md border-error-500 hover:border-error-600',
    success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-400 active:bg-success-700 shadow-sm hover:shadow-md border-success-500 hover:border-success-600'
  };

  const sizes = {
    small: iconOnly ? 'p-2 rounded-md' : 'px-2 py-1.5 text-sm rounded-md min-h-[32px]',
    medium: iconOnly ? 'p-2.5 rounded-lg' : 'px-4 py-2.5 text-sm rounded-lg min-h-[40px]',
    large: iconOnly ? 'p-3 rounded-lg' : 'px-6 py-3 text-base rounded-lg min-h-[48px]'
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
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current flex-shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && !loading && (
        <span className={`flex-shrink-0 ${children ? 'mr-2' : ''}`}>
          {icon}
        </span>
      )}
      
      {children && <span className="truncate">{children}</span>}
    </button>
  );
};

export default Button;