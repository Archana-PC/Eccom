import { useEffect, useState } from "react";
import FormField from "../../components/form/FormField";
import CheckboxField from "../../components/form/CheckboxField";
import AdminButton from "../../components/ui/AdminButton";

const isValidHex = (v = "") =>
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(String(v).trim());

const ColorForm = ({
  submitLabel = "Save",
  loading = false,
  apiError = null,
  initialValues = null,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({
    name: "",
    hex_code: "#000000",
    is_active: true,
  });

  const [errors, setErrors] = useState({});

  // ✅ set initial values (edit)
  useEffect(() => {
    if (!initialValues) return;
    setForm({
      name: initialValues?.name || "",
      hex_code: initialValues?.hex_code || "#000000",
      is_active: !!initialValues?.is_active,
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Color name is required";
    if (!form.hex_code?.trim()) e.hex_code = "Hex code is required";
    else if (!isValidHex(form.hex_code)) e.hex_code = "Hex must be like #FF0000 (or #F00)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    onSubmit?.({
      name: form.name.trim(),
      hex_code: form.hex_code.trim(),
      is_active: !!form.is_active,
    });
  };

  const previewHex = isValidHex(form.hex_code) ? form.hex_code.trim() : "#000000";

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-4">
      <FormField
        label="Color Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter color name"
        required
        error={errors.name}
        autoComplete="off"
      />

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <FormField
            label="Hex Code"
            name="hex_code"
            value={form.hex_code}
            onChange={handleChange}
            placeholder="#FF0000"
            required
            error={errors.hex_code}
            autoComplete="off"
          />
        </div>

        <div className="pb-1">
          <div className="text-xs text-gray-500 mb-1">Preview</div>
          <div
            className="w-12 h-10 rounded-lg border"
            style={{ backgroundColor: previewHex }}
            title={previewHex}
          />
        </div>
      </div>

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

export default ColorForm;
