import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../../shared/Input/Input";
import Button from "../../../shared/Button/Button";


const LoginForm = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  error,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    handleSubmit();
  };

  return (
    <div
      className="max-w-md mx-auto bg-white rounded-2xl p-8"
      style={{ border: "1px solid var(--border-default)" }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Welcome Back
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Sign in to access your orders, wishlist, and exclusive styles.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          className="rounded-lg p-3 mb-4"
          style={{
            backgroundColor: "rgba(239,68,68,0.08)",
            color: "#ef4444",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <form className="space-y-5" onSubmit={onSubmit}>
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        {/* Remember / Forgot */}
        <div className="flex items-center justify-between">
          <label
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <input
              id="rememberMe"
              type="checkbox"
              className="h-4 w-4"
              style={{ accentColor: "var(--brand-primary)" }}
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium underline"
            style={{ color: "var(--brand-primary)" }}
          >
            Forgot password?
          </Link>
        </div>

        {/* CTA */}
        <Button type="submit" loading={isLoading} fullWidth>
          Sign In
        </Button>

        {/* Footer */}
        <p
          className="text-xs text-center mt-4"
          style={{ color: "var(--text-muted)" }}
        >
          New here?{" "}
          <Link
            to="/register"
            className="underline"
            style={{ color: "var(--brand-primary)" }}
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
