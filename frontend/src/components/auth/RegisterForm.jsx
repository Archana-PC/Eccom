import React from "react";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";

const RegisterForm = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  error,
}) => {
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Please accept the terms to continue";
    }

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
      className="max-w-lg mx-auto bg-white rounded-2xl p-8"
      style={{ border: "1px solid var(--border-default)" }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Join the Style Club
        </h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Be the first to discover new arrivals, exclusive offers, and style
          inspiration.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />

          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>

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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="password2"
          placeholder="Confirm your password"
          value={formData.password2}
          onChange={handleChange}
          error={errors.password2}
          required
        />

        {/* Terms */}
        <div className="flex items-start gap-2">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4"
            style={{ accentColor: "var(--brand-primary)" }}
          />
          <label
            htmlFor="acceptTerms"
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            I agree to the{" "}
            <span
              className="cursor-pointer underline"
              style={{ color: "var(--brand-primary)" }}
            >
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span
              className="cursor-pointer underline"
              style={{ color: "var(--brand-primary)" }}
            >
              Privacy Policy
            </span>
          </label>
        </div>

        {errors.acceptTerms && (
          <p className="text-sm text-red-500">{errors.acceptTerms}</p>
        )}

        {/* CTA */}
        <Button type="submit" loading={isLoading} fullWidth>
          Create My Account
        </Button>

        {/* Footer text */}
        <p
          className="text-xs text-center mt-4"
          style={{ color: "var(--text-muted)" }}
        >
          Already a member?{" "}
          <span
            className="cursor-pointer underline"
            style={{ color: "var(--brand-primary)" }}
          >
            Sign in here
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
