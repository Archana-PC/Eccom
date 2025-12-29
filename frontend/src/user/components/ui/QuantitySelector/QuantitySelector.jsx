import React from 'react';

const QuantitySelector = ({
  value = 1,
  onChange,  // ✅ This is the correct prop name
  min = 1,
  max = 99,
  size = 'medium',
  disabled = false,
  className = '',
  showLabel = false,
  label = 'Quantity:'
}) => {
  const handleDecrease = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const handleInputBlur = (e) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue) || newValue < min) {
      onChange(min);
    } else if (newValue > max) {
      onChange(max);
    }
  };

  // Size variants
  const sizeClasses = {
    small: {
      container: 'h-8',
      button: 'px-2 text-sm',
      input: 'px-2 text-sm w-12',
      label: 'text-sm'
    },
    medium: {
      container: 'h-10',
      button: 'px-3 text-base',
      input: 'px-3 text-base w-14',
      label: 'text-sm'
    },
    large: {
      container: 'h-12',
      button: 'px-4 text-lg',
      input: 'px-4 text-lg w-16',
      label: 'text-base'
    }
  };

  const sizeConfig = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {showLabel && (
        <span className={`text-gray-700 ${sizeConfig.label}`}>
          {label}
        </span>
      )}
      
      <div className={`flex items-center border border-gray-300 rounded-lg bg-white ${sizeConfig.container}`}>
        {/* Decrease Button */}
        <button
          type="button"
          onClick={handleDecrease}
          disabled={disabled || value <= min}
          className={`flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-r border-gray-300 ${sizeConfig.button}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        {/* Quantity Display */}
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          min={min}
          max={max}
          disabled={disabled}
          className={`text-center bg-transparent border-none outline-none font-medium text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${sizeConfig.input}`}
        />

        {/* Increase Button */}
        <button
          type="button"
          onClick={handleIncrease}
          disabled={disabled || value >= max}
          className={`flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border-l border-gray-300 ${sizeConfig.button}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;  // ✅ Only one export at the end