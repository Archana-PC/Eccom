import { useEffect, useMemo, useState } from "react";
import FormField from "../../components/form/FormField";
import CheckboxField from "../../components/form/CheckboxField";
import TextareaField from "../../components/form/TextareaField";
import AdminButton from "../../components/ui/AdminButton";

// Random slug like: JEeLGs-EWqsAtsvlFpLS8
const makeRandomSlug = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const pick = (n) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${pick(6)}-${pick(14)}`;
};

const FabricForm = ({
  submitLabel = "Save",
  loading = false,
  apiError = null,
  initialValues = null,
  mode = "create", // "create" | "edit"
  onSubmit,
  onCancel,
}) => {
  const initialSlug = useMemo(() => makeRandomSlug(), []);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    slug: initialSlug,          // ✅ keep slug in form (your edit code expects it)
    description: "",
    composition: "",
    care_instructions: "",
    weight: "",
    is_active: true,
    is_natural: false,
    is_stretch: false,
    deleted_at: null,           // read-only display
  });

  // ✅ set initial values for edit
  useEffect(() => {
    if (!initialValues) return;

    const row = initialValues?.data ?? initialValues; // supports {data:{...}} or direct

    setForm({
      name: row?.name || "",
      slug: row?.slug || initialSlug,
      description: row?.description || "",
      composition: row?.composition || "",
      care_instructions: row?.care_instructions || "",
      weight: row?.weight || "",
      is_active: !!row?.is_active,
      is_natural: !!row?.is_natural,
      is_stretch: !!row?.is_stretch,
      deleted_at: row?.deleted_at || null,
    });
  }, [initialValues, initialSlug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Fabric name is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    onSubmit?.({
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: (form.description || "").trim(),
      composition: (form.composition || "").trim(),
      care_instructions: (form.care_instructions || "").trim(),
      weight: (form.weight || "").trim(),
      is_active: !!form.is_active,
      is_natural: !!form.is_natural,
      is_stretch: !!form.is_stretch,
      deleted_at: form.deleted_at ? new Date(form.deleted_at).toISOString() : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-4">
      <FormField
        label="Fabric Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        error={errors.name}
        autoComplete="off"
      />

      <div className="space-y-2">
        <FormField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          error={errors.slug}
          autoComplete="off"
          disabled={mode === "edit"} // ✅ usually keep slug stable in edit
        />

        {mode === "create" ? (
          <div className="flex justify-end">
            <AdminButton
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setForm((p) => ({ ...p, slug: makeRandomSlug() }))}
            >
              Regenerate Slug
            </AdminButton>
          </div>
        ) : null}
      </div>

      <TextareaField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Short description"
        error={errors.description}
      />

      <TextareaField
        label="Composition"
        name="composition"
        value={form.composition}
        onChange={handleChange}
        placeholder="e.g. 100% Cotton"
        error={errors.composition}
      />

      <TextareaField
        label="Care Instructions"
        name="care_instructions"
        value={form.care_instructions}
        onChange={handleChange}
        placeholder="e.g. Machine wash cold..."
        error={errors.care_instructions}
      />

      <FormField
        label="Weight"
        name="weight"
        value={form.weight}
        onChange={handleChange}
        placeholder="e.g. 180 GSM"
        error={errors.weight}
        autoComplete="off"
      />

      {/* Deleted At (read-only) */}
      {mode === "edit" ? (
        <div className="space-y-1">
          <div className="text-sm font-medium">Deleted At</div>
          <div className="text-sm text-gray-700 rounded-xl border bg-gray-50 px-3 py-2">
            {form.deleted_at ? String(form.deleted_at) : "—"}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CheckboxField label="Active" name="is_active" checked={form.is_active} onChange={handleChange} />
        <CheckboxField label="Natural" name="is_natural" checked={form.is_natural} onChange={handleChange} />
        <CheckboxField label="Stretch" name="is_stretch" checked={form.is_stretch} onChange={handleChange} />
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

export default FabricForm;
