import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button'; // Import Button component

const Search = ({
  placeholder = 'Search...',
  onSearch,
  size = 'medium',
  variant = 'default',
  className = '',
  immediate = false,
  debounceTime = 300,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (immediate) {
      onSearch?.(value);
      return;
    }

    // Debounce search
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      onSearch?.(value);
    }, debounceTime);

    setTimer(newTimer);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch?.('');
    if (timer) {
      clearTimeout(timer);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timer) {
      clearTimeout(timer);
    }
    onSearch?.(searchTerm);
  };

  const searchIcon = (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const clearIcon = searchTerm && (
    <Button
      variant="minimal"
      size="small"
      iconOnly
      onClick={handleClear}
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
      aria-label="Clear search"
    >
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </Button>
  );

  const sizes = {
    small: 'py-2 text-sm',
    medium: 'py-3 text-base',
    large: 'py-4 text-lg'
  };

  const variants = {
    default: 'border-gray-300 focus:ring-amber-500',
    filled: 'bg-gray-100 border-gray-200 focus:bg-white focus:ring-amber-500',
    minimal: 'border-transparent bg-gray-100 focus:bg-white focus:ring-amber-500'
  };

  if (variant === 'icon-only') {
    return (
      <Button
        variant="minimal"
        size={size}
        iconOnly
        onClick={() => onSearch?.('')}
        className={className}
        aria-label="Search"
        {...props}
      >
        {searchIcon}
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        prefixIcon={searchIcon}
        suffixIcon={clearIcon}
        className={`
          ${sizes[size]}
          ${variants[variant]}
          pr-10
        `}
        {...props}
      />
    </form>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'filled', 'minimal', 'icon-only']),
  className: PropTypes.string,
  immediate: PropTypes.bool,
  debounceTime: PropTypes.number,
};

export default Search;