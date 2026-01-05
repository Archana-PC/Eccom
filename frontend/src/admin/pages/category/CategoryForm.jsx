import { useEffect, useMemo, useState } from "react";
import FormField from "../../components/form/FormField";
import SelectField from "../../components/form/SelectField";
import CheckboxField from "../../components/form/CheckboxField";
import AdminButton from "../../components/ui/AdminButton";

const normalize = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const CategoryForm = ({
  categoriesData,            // raw API data (any shape)
  currentId = null,          // used in edit to exclude self from parent list
  submitLabel = "Save",
  loading = false,
  apiError = null,
  initialValues = null,
  onSubmit,
  onCancel,
}) => {
  const categories = useMemo(() => normalize(categoriesData), [categoriesData]);

  const [form, setForm] = useState({
    name: "",
    parent: "",
    is_active: true,
  });

  const [errors, setErrors] = useState({});

  // ✅ fill initial values (edit)
  useEffect(() => {
    if (!initialValues) return;

    const parentValue =
      initialValues?.parent_id ??
      initialValues?.parent?.id ??
      (typeof initialValues?.parent === "string" ? initialValues.parent : "") ??
      "";

    setForm({
      name: initialValues?.name || "",
      parent: parentValue ? String(parentValue) : "",
      is_active: !!initialValues?.is_active,
    });
  }, [initialValues]);

  const parentOptions = useMemo(() => {
    const selfId = currentId ? String(currentId) : null;
    const filtered = selfId ? categories.filter((c) => String(c.id) !== selfId) : categories;

    return [
      { value: "", label: "None" },
      ...filtered.map((c) => ({ value: String(c.id), label: c.name })),
    ];
  }, [categories, currentId]);

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
    if (!form.name.trim()) e.name = "Category name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    onSubmit?.({
      name: form.name.trim(),
      parent: form.parent || null,
      is_active: !!form.is_active,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-4">
      <FormField
        label="Category Name"
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Enter category name"
        required
        error={errors.name}
        autoComplete="off"
      />

      <SelectField
        label="Parent Category"
        name="parent"
        value={form.parent}
        onChange={onChange}
        options={parentOptions}
        error={errors.parent}
        required={false}
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

export default CategoryForm;
