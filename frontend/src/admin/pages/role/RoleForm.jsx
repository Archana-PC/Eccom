import { useEffect, useMemo, useState } from "react";
import FormField from "../../components/form/FormField";
import SelectField from "../../components/form/SelectField";
import CheckboxField from "../../components/form/CheckboxField";
import AdminButton from "../../components/ui/AdminButton";
import PermissionMatrix from "../../components/ui/PermissionMatrix";
import { ROLE_CHOICES } from "../../constants/roles";

const normalize = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const getRolePerms = (role) => {
  const perms =
    role?.permission_codenames ??
    role?.permissions ??
    role?.permission_details?.map((p) => p.codename) ??
    [];
  return Array.isArray(perms) ? perms : [];
};

// ✅ supports many shapes coming from API (single or multiple)
const getRoleCategoryValues = (role) => {
  const ids =
    role?.category_ids ??
    role?.categories?.map((c) => c.id) ??
    role?.category_id ??
    role?.category?.id ??
    role?.category ??
    [];

  const arr = Array.isArray(ids) ? ids : [ids];
  return arr.filter(Boolean).map(String);
};

const RoleForm = ({
  categoriesData,
  loginPermissions = [],
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
    role: "",
    category_ids: [],     // ✅ multi categories
    permissions: [],
    isSuperAdmin: false,
  });

  const [errors, setErrors] = useState({});
  const [catSearch, setCatSearch] = useState("");

  // ✅ Fill initial values (edit)
  useEffect(() => {
    if (!initialValues) return;

    setForm({
      name: initialValues?.name || "",
      role: initialValues?.role || "",
      category_ids: getRoleCategoryValues(initialValues),
      permissions: getRolePerms(initialValues),
      isSuperAdmin: !!(initialValues?.isSuperAdmin || initialValues?.is_superadmin),
    });
  }, [initialValues]);

  const roleOptions = useMemo(
    () => [
      { value: "", label: "Select role" },
      ...ROLE_CHOICES.map((r) => ({ value: r.value, label: r.label })),
    ],
    []
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSuperAdminToggle = (e) => {
    const checked = e.target.checked;
    setForm((p) => ({
      ...p,
      isSuperAdmin: checked,
      permissions: checked ? [] : p.permissions,
    }));
    setErrors((p) => ({ ...p, permissions: "", isSuperAdmin: "" }));
  };

  const toggleCategory = (id, checked) => {
    const v = String(id);
    setForm((p) => {
      const current = (p.category_ids || []).map(String);
      const next = checked
        ? Array.from(new Set([...current, v]))
        : current.filter((x) => x !== v);
      return { ...p, category_ids: next };
    });
    setErrors((p) => ({ ...p, category_ids: "" }));
  };

  const clearCategories = () => {
    setForm((p) => ({ ...p, category_ids: [] }));
    setErrors((p) => ({ ...p, category_ids: "" }));
  };

  const categoryMap = useMemo(() => {
    const m = new Map();
    categories.forEach((c) => m.set(String(c.id), c.name));
    return m;
  }, [categories]);

  const selectedCategoryChips = useMemo(() => {
    return (form.category_ids || []).map((id) => ({
      id,
      name: categoryMap.get(String(id)) || id,
    }));
  }, [form.category_ids, categoryMap]);

  const filteredCategories = useMemo(() => {
    const q = catSearch.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => (c.name || "").toLowerCase().includes(q));
  }, [categories, catSearch]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Role name is required";
    if (!form.role) e.role = "Role type is required";

    // permissions mandatory unless super admin
    if (!form.isSuperAdmin && (!form.permissions || form.permissions.length === 0)) {
      e.permissions = "Select at least one permission";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    onSubmit?.({
      name: form.name.trim(),
      role: form.role,
      category_ids: (form.category_ids || []).map(Number),   // ✅ multi
      permissions: form.isSuperAdmin ? [] : form.permissions,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-5 space-y-4">
      <FormField
        label="Role Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter role name"
        required
        error={errors.name}
        autoComplete="off"
      />

      <SelectField
        label="Role Type"
        name="role"
        value={form.role}
        onChange={handleChange}
        options={roleOptions}
        required
        error={errors.role}
      />

      {/* ✅ Categories (checkbox multi-select UI) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900">Categories</div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{form.category_ids.length} selected</span>
            {form.category_ids.length > 0 && (
              <button
                type="button"
                onClick={clearCategories}
                className="text-xs font-semibold text-gray-700 hover:text-gray-900 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Selected chips */}
        {selectedCategoryChips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCategoryChips.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-white text-xs font-medium text-gray-800"
              >
                {c.name}
                <button
                  type="button"
                  onClick={() => toggleCategory(c.id, false)}
                  className="text-gray-500 hover:text-gray-900"
                  aria-label={`Remove ${c.name}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Search */}
        <input
          value={catSearch}
          onChange={(e) => setCatSearch(e.target.value)}
          placeholder="Search category..."
          className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition
            ${errors.category_ids ? "border-red-500" : "border-gray-200 focus:border-indigo-500"}
          `}
        />

        {/* List */}
        <div className={`rounded-2xl border p-3 ${errors.category_ids ? "border-red-500" : "border-gray-200"}`}>
          <div className="max-h-56 overflow-auto grid grid-cols-1 sm:grid-cols-2 gap-2 pr-1">
            {filteredCategories.map((c) => {
              const isChecked = form.category_ids.map(String).includes(String(c.id));
              return (
                <CheckboxField
                  key={c.id}
                  label={c.name}
                  name={`category_${c.id}`}
                  checked={isChecked}
                  onChange={(e) => toggleCategory(c.id, e.target.checked)}
                />
              );
            })}
          </div>
        </div>

        {errors.category_ids && <p className="text-xs text-red-600">{errors.category_ids}</p>}
      </div>

      <CheckboxField
        label="Super Admin (all permissions)"
        name="isSuperAdmin"
        checked={form.isSuperAdmin}
        onChange={handleSuperAdminToggle}
      />

      {!form.isSuperAdmin && (
        <div className="space-y-2">
          <div className="font-medium">Assign Permissions</div>

          {errors.permissions ? (
            <div className="text-sm text-red-600">{errors.permissions}</div>
          ) : null}

          <PermissionMatrix
            permissions={loginPermissions}
            selected={form.permissions}
            onChange={(perms) => setForm((p) => ({ ...p, permissions: perms }))}
            readonly={false}
          />
        </div>
      )}

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

export default RoleForm;
