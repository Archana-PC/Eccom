import React from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

const AdminButton = ({
  children,
  className = "",
  variant = "primary", // primary | secondary | soft | outline | ghost | danger | dangerOutline
  size = "md",         // sm | md | lg
  loading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  type = "button",
  ...props
}) => {
  const isDisabled = disabled || loading;

  const base =
    "inline-flex items-center justify-center gap-2 select-none " +
    "rounded-2xl font-semibold transition-all duration-200 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 " +
    "active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };

  // Light theme: white surfaces + slate borders + premium hover
  const variants = {
    primary:
      "bg-slate-900 text-white shadow-sm " +
      "ring-1 ring-inset ring-slate-900/10 " +
      "hover:bg-slate-800 hover:shadow-md",

    secondary:
      "bg-white text-slate-900 shadow-sm " +
      "ring-1 ring-inset ring-slate-200 " +
      "hover:bg-slate-50 hover:shadow-md",

    // ✅ for table Edit (clean subtle)
    soft:
      "bg-slate-50 text-slate-900 " +
      "ring-1 ring-inset ring-slate-200 " +
      "hover:bg-slate-100",

    outline:
      "bg-transparent text-slate-900 " +
      "ring-1 ring-inset ring-slate-200 " +
      "hover:bg-slate-50",

    ghost:
      "bg-transparent text-slate-700 " +
      "hover:bg-slate-100",

    danger:
      "bg-rose-600 text-white shadow-sm " +
      "ring-1 ring-inset ring-rose-600/20 " +
      "hover:bg-rose-500 hover:shadow-md",

    // ✅ for Delete (outline red)
    dangerOutline:
      "bg-transparent text-rose-700 " +
      "ring-1 ring-inset ring-rose-200 " +
      "hover:bg-rose-50",
  };

  const spinner = {
    primary: "border-white/30 border-t-white",
    danger: "border-white/30 border-t-white",
    secondary: "border-slate-300 border-t-slate-700",
    soft: "border-slate-300 border-t-slate-700",
    outline: "border-slate-300 border-t-slate-700",
    ghost: "border-slate-300 border-t-slate-700",
    dangerOutline: "border-rose-200 border-t-rose-700",
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {loading && (
        <span
          className={cx(
            "h-4 w-4 rounded-full border-2 animate-spin",
            spinner[variant] || spinner.primary
          )}
        />
      )}

      {!loading && LeftIcon && <LeftIcon className="h-4 w-4" />}
      <span>{children}</span>
      {!loading && RightIcon && <RightIcon className="h-4 w-4" />}
    </button>
  );
};

export default AdminButton;
