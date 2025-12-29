import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import { useGetCategoriesQuery } from "../../../services/catalog/catalogApi";
import { useCreateRoleMutation } from "../../services/adminApi";
import PermissionMatrix from "../../components/ui/PermissionMatrix";
import { ROLE_CHOICES } from "../../constants/roles";
import AdminButton from "../../components/ui/AdminButton";


const CreateRole = () => {
  const navigate = useNavigate();

  // 🔹 login-time permissions (DO NOT refetch)
  const loginPermissions = useAppSelector(
    (state) => state.auth.permissions
  );

  const [createRole, { isLoading }] = useCreateRoleMutation();
  const { data: categories } = useGetCategoriesQuery();

  const [form, setForm] = useState({
    name: "",
    role: "",
    category: "",
    permissions: [],
    isSuperAdmin: false,
  });

  /* ---------------- handlers ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      role: form.role,
      category: form.category || null,
      permissions: form.isSuperAdmin ? [] : form.permissions,
    };

    try {
      await createRole(payload).unwrap();
      navigate("/admin/roles");
    } catch (err) {
      console.error("Create role failed", err);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl bg-white p-6 rounded-xl shadow space-y-6"
    >
      <h2 className="text-xl font-semibold">Create Role</h2>

      {/* ROLE NAME */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Role Name
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />
      </div>

      {/* ROLE TYPE */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Role Type
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
          required
        >
          <option value="">Select role</option>
          {ROLE_CHOICES.map((role) => (
      <option key={role.value} value={role.value}>
        {role.label}
      </option>
    ))}
        </select>
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="">None</option>
          {categories?.results?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* SUPER ADMIN */}
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={form.isSuperAdmin}
          onChange={(e) =>
            setForm({
              ...form,
              isSuperAdmin: e.target.checked,
              permissions: [],
            })
          }
        />
        Super Admin (all permissions)
      </label>

      {/* PERMISSIONS MATRIX */}
      {!form.isSuperAdmin && (
        <div>
          <h3 className="font-medium mb-3">
            Assign Permissions
          </h3>

          <PermissionMatrix
            permissions={loginPermissions}        // 👈 login-time permissions
            selected={form.permissions}
            onChange={(perms) =>
              setForm({ ...form, permissions: perms })
            }
            readonly={false}
          />
        </div>
      )}

      {/* ACTION */}
      <div className="flex justify-end">
        <AdminButton  variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Create Role"}
        </AdminButton>
      </div>
    </form>
  );
};

export default CreateRole;
