import { useEffect, useState } from "react";
import FormField from "../../components/form/FormField";
import CheckboxField from "../../components/form/CheckboxField";
import TextareaField from "../../components/form/TextareaField";
import AdminButton from "../../components/ui/AdminButton";

const CollectionForm = ({
  submitLabel = "Save",
  loading = false,
  apiError = null,
  initialValues = null,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});

  // ✅ set initial values (for edit also)
  useEffect(() => {
    if (initialValues) {
      setForm((p) => ({
        ...p,
        name: initialValues?.name ?? "",
        code: initialValues?.code ?? "",
        description: initialValues?.description ?? "",
        is_active: !!initialValues?.is_active,
      }));
    }
  }, [initialValues]);

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
    if (!form.name.trim()) e.name = "Collection name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
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
      <FormField
        label="Name"
        name="name"
        value={form.name}
        onChange={onChange}
        required
        error={errors.name}
      />

      <FormField
        label="Code"
        name="code"
        value={form.code}
        onChange={onChange}
        placeholder="Optional"
        error={errors.code}
      />

      <TextareaField
        label="Description"
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Optional"
        error={errors.description}
      />

      <CheckboxField
        label="Active"
        name="is_active"
        checked={form.is_active}
        onChange={onChange}
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

export default CollectionForm;
