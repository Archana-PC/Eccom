
import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  onClick,
  className = "",
  iconOnly = false,
  icon,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    border rounded-lg
  `;

  /* 🎯 COLOR VIA CSS VARIABLES (GUARANTEED) */
  const variantStyles = {
    primary: {
      backgroundColor: "var(--brand-primary)",
      borderColor: "var(--brand-primary)",
      color: "#fff",
    },
    secondary: {
      backgroundColor: "#fff",
      borderColor: "var(--border-default)",
      color: "var(--text-secondary)",
    },
    outline: {
      backgroundColor: "transparent",
      borderColor: "var(--brand-primary)",
      color: "var(--brand-primary)",
    },
    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: "var(--text-secondary)",
    },
    danger: {
      backgroundColor: "#ef4444",
      borderColor: "#ef4444",
      color: "#fff",
    },
    success: {
      backgroundColor: "#22c55e",
      borderColor: "#22c55e",
      color: "#fff",
    },
  };

  const sizes = {
    small: iconOnly
      ? "p-2"
      : "px-3 py-1.5 text-sm min-h-[32px]",
    medium: iconOnly
      ? "p-2.5"
      : "px-4 py-2 text-sm min-h-[40px]",
    large: iconOnly
      ? "p-3"
      : "px-6 py-3 text-base min-h-[48px]",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={variantStyles[variant]}
      className={[
        baseClasses,
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
      )}

      {icon && !loading && (
        <span className={children ? "mr-2" : ""}>{icon}</span>
      )}

      {children}
    </button>
  );
};

export default Button;
