import { useEffect, useState } from "react";
import FormField from "../../components/form/FormField";
import CheckboxField from "../../components/form/CheckboxField";
import TextareaField from "../../components/form/TextareaField";
import AdminButton from "../../components/ui/AdminButton";

const StyleForm = ({
  submitLabel = "Save",
  loading = false,
  apiError = null,
  initialValues = null,
  showSlug = false,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    is_active: true,
  });

  const [slug, setSlug] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ set initial values (edit)
  useEffect(() => {
    if (!initialValues) return;

    setForm({
      name: initialValues?.name || "",
      code: initialValues?.code || "",
      description: initialValues?.description || "",
      is_active: !!initialValues?.is_active,
    });

    setSlug(initialValues?.slug || "");
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit?.({
      name: form.name.trim(),
      code: form.code.trim() || "",
      description: form.description.trim() || "",
      is_active: !!form.is_active,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-4">
      {/* ✅ slug read-only (only in edit if you want) */}
      {showSlug && slug ? (
        <div className="space-y-1">
          <label className="text-sm font-medium">Slug</label>
          <input
            value={slug}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-600"
          />
        </div>
      ) : null}

      <FormField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        error={errors.name}
      />

      <FormField
        label="Code"
        name="code"
        value={form.code}
        onChange={handleChange}
        placeholder="Optional"
        error={errors.code}
      />

      <TextareaField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Optional"
        error={errors.description}
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

export default StyleForm;
