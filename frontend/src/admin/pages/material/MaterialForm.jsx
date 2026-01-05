import { useEffect, useState } from "react";
import FormField from "../../components/form/FormField";
import CheckboxField from "../../components/form/CheckboxField";
import AdminButton from "../../components/ui/AdminButton";

const MaterialForm = ({
  submitLabel = "Save",
  loading = false,
  apiError = null,
  initialValues = null,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({ name: "", is_active: true });
  const [errors, setErrors] = useState({});

  // ✅ set initial values for edit
  useEffect(() => {
    if (!initialValues) return;
    setForm({
      name: initialValues?.name || "",
      is_active: !!initialValues?.is_active,
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Material name is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit?.({
      name: form.name.trim(),
      is_active: !!form.is_active,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-4">
      <FormField
        label="Material Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter material name"
        required
        error={errors.name}
        autoComplete="off"
      />

      <CheckboxField
        label="Active"
        name="is_active"
        checked={form.is_active}
        onChange={handleChange}
      />

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

export default MaterialForm;
