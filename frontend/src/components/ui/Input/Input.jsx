import React from "react";
import PropTypes from "prop-types";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error = "",
  success = "",
  helperText = "",
  required = false,
  fullWidth = true,
  prefixIcon,
  suffixIcon,
  className = "",
  ...props
}) => {
  const baseClasses = `
    block rounded-lg px-4 py-3
    transition-colors duration-200
    focus:outline-none focus:ring-2
    disabled:cursor-not-allowed disabled:opacity-50
  `;

  /* 🎯 COLOR VIA CSS VARIABLES (SAFE) */
  const inputStyle = {
    backgroundColor: "var(--bg-page)",
    color: "var(--text-primary)",
    borderColor: "var(--border-default)",
  };

  if (error) {
    inputStyle.borderColor = "#ef4444"; // red-500
  } else if (success) {
    inputStyle.borderColor = "#22c55e"; // green-500
  }

  const focusStyle = `
    focus:ring-[var(--brand-primary)]
    focus:border-transparent
  `;

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={fullWidth ? "w-full" : "inline-block"}>
      {label && (
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
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
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={inputStyle}
          className={`
            ${baseClasses}
            ${focusStyle}
            ${widthClass}
            ${prefixIcon ? "pl-10" : ""}
            ${suffixIcon ? "pr-10" : ""}
            border
            ${className}
          `}
          {...props}
        />

        {suffixIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {suffixIcon}
          </div>
        )}
      </div>

      {(error || success || helperText) && (
        <p
          className="mt-1 text-sm"
          style={{
            color: error
              ? "#ef4444"
              : success
              ? "#22c55e"
              : "var(--text-muted)",
          }}
        >
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
