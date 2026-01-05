import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetMeQuery, useLoginMutation } from "../../services/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../services/auth/authSlice";

import FormField from "../components/form/FormField"; 
import AdminButton from "../components/ui/AdminButton";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const [login, { isLoading, error }] = useLoginMutation();
  const [getMe, { isLoading: meLoading }] = useLazyGetMeQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setFieldErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ front validation
    const next = {};
    if (!form.email.trim()) next.email = "Email is required";
    if (!form.password.trim()) next.password = "Password is required";
    if (Object.keys(next).length) return setFieldErrors(next);

    try {
      await login({ email: form.email, password: form.password }).unwrap();
      const meRes = await getMe().unwrap();

      // ✅ handle both: {user:{...}} OR direct user object
      const user = meRes?.user ?? meRes;
      dispatch(setUser(user));

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const globalError =
    error ? "Invalid email or password. Please try again." : "";

  const loading = isLoading || meLoading;

  return (
    <div className="min-h-screen grid place-items-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-md">
        {/* Top badge */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-slate-800">
              Admin Panel
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Sign in to manage products, roles & permissions.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 space-y-4"
        >
          {globalError && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {globalError}
            </div>
          )}

          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            autoComplete="email"
            required
            error={fieldErrors.email}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="current-password"
            required
            error={fieldErrors.password}
          />

          <AdminButton
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full"
          >
            Sign In
          </AdminButton>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => navigate("/", { replace: true })}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              ← Back to site
            </button>

            <span className="text-xs text-slate-500">
              Secure admin access
            </span>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
