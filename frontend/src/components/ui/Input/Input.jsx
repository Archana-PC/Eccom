import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  error = '',
  success = '',
  helperText = '',
  required = false,
  fullWidth = true,
  prefixIcon,
  suffixIcon,
  className = '',
  ...props
}) => {
  const baseClasses = 'block rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent';
  
  const stateClasses = error 
    ? 'border-red-500 focus:ring-red-500' 
    : success 
    ? 'border-green-500 focus:ring-green-500' 
    : 'border-gray-300';

  const disabledClasses = 'bg-gray-100 cursor-not-allowed opacity-50';
  const widthClass = fullWidth ? 'w-full' : '';

  const inputClasses = `
    ${baseClasses}
    ${stateClasses}
    ${disabled ? disabledClasses : ''}
    ${widthClass}
    ${className}
  `.trim();

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {prefixIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {prefixIcon}
          </div>
        )}
        
        <input
          type={type}
          className={`
            ${inputClasses}
            ${prefixIcon ? 'pl-10' : ''}
            ${suffixIcon ? 'pr-10' : ''}
          `}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        />
        
        {suffixIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {suffixIcon}
          </div>
        )}
      </div>

      {(error || success || helperText) && (
        <p className={`mt-1 text-sm ${
          error ? 'text-red-600' : 
          success ? 'text-green-600' : 
          'text-gray-500'
        }`}>
          {error || success || helperText}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
  className: PropTypes.string,
};

export default Input;