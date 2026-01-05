import { useEffect, useMemo, useState } from "react";
import Button from "../../../shared/Button/Button";
import FormField from "../../components/form/FormField";
import SelectField from "../../components/form/SelectField";
import CheckboxField from "../../components/form/CheckboxField";
import AdminButton from "../../components/ui/AdminButton";

const UserForm = ({
  roles = [],
  submitLabel = "Save",
  loading = false,
  apiError = null,
  initialValues = null,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    role_group: "",
    is_active: true,
    is_staff: true,
  });

  const [errors, setErrors] = useState({});

  // ✅ set initial values (for edit also)
  useEffect(() => {
    if (initialValues) {
      setForm((p) => ({
        ...p,
        ...initialValues,
        password: "", // keep empty on edit unless you want to set new password
      }));
    }
  }, [initialValues]);

  // ✅ auto-select first role if empty
  useEffect(() => {
    if (!form.role_group && roles.length > 0) {
      setForm((p) => ({ ...p, role_group: roles[0].id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);

  const roleOptions = useMemo(() => {
    return roles.map((r) => ({
      value: r.id,
      label: `${r.name} (${r.role})`,
    }));
  }, [roles]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    if (!form.full_name) e.full_name = "Full name is required";
    if (!form.role_group) e.role_group = "Role is required";

    // password required only if initialValues is null (create)
    const isCreate = !initialValues;
    if (isCreate && !form.password) e.password = "Password is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload = {
      email: form.email.trim(),
      full_name: form.full_name.trim(),
      role_group: form.role_group,
      is_active: form.is_active,
      is_staff: form.is_staff,
    };

    // include password only if user typed it
    if (form.password) payload.password = form.password;

    onSubmit?.(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-xl p-5 space-y-4"
    >
      <FormField
        label="EmployeeId"
        name="employee_id"
        value={form.employee_id}
        placeholder="user@example.com"
        autoComplete="off"
        disabled
        error={errors.email}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        placeholder="user@example.com"
        autoComplete="off"
        required
        error={errors.email}
      />

      <FormField
        label="Full Name"
        name="full_name"
        value={form.full_name}
        onChange={onChange}
        placeholder="Full name"
        autoComplete="off"
        required
        error={errors.full_name}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        placeholder="Password"
        autoComplete="new-password"
        required={!initialValues}
        error={errors.password}
      />

      <SelectField
        label="Role Group"
        name="role_group"
        value={form.role_group}
        onChange={onChange}
        options={roleOptions}
        required
        error={errors.role_group}
      />

      <div className="flex gap-6 pt-1">
        <CheckboxField
          label="Active"
          name="is_active"
          checked={form.is_active}
          onChange={onChange}
        />
        <CheckboxField
          label="Staff"
          name="is_staff"
          checked={form.is_staff}
          onChange={onChange}
        />
      </div>

      {apiError && (
        <div className="p-3 rounded-lg border text-sm text-red-600">
          {apiError?.data?.detail ||
            (typeof apiError?.data === "object"
              ? JSON.stringify(apiError.data)
              : apiError?.error) ||
            "Something went wrong"}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <AdminButton type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </AdminButton>

        <AdminButton type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </AdminButton>
      </div>
    </form>
  );
};

export default UserForm;
