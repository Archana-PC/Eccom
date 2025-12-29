import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "../../services/adminCategoryApi";
import Button from "../../../shared/Button/Button";



const CreateCategory = () => {
  const navigate = useNavigate();

  const { data: categories, isFetching } = useGetCategoriesQuery();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  // ✅ normalize categories -> array
  const categoryList = (() => {
    if (!categories) return [];
    if (Array.isArray(categories)) return categories;
    if (Array.isArray(categories?.results)) return categories.results;
    if (Array.isArray(categories?.data)) return categories.data;
    return [];
  })();

  const [form, setForm] = useState({
    name: "",
    parent: "",
    is_active: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      parent: form.parent ? Number(form.parent) : null,
      is_active: !!form.is_active,
    };

    try {
      await createCategory(payload).unwrap();
      navigate("/admin/categories", { state: { newCategory: true } });
    } catch (err) {
      console.error("Create category failed", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl bg-white p-6 rounded-xl shadow space-y-6"
    >
      <h2 className="text-xl font-semibold">Create Category</h2>

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium mb-1">Category Name</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      {/* PARENT (optional) */}
      <div>
        <label className="block text-sm font-medium mb-1">Parent Category</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={form.parent}
          onChange={(e) => setForm({ ...form, parent: e.target.value })}
          disabled={isFetching}
        >
          <option value="">None</option>
          {categoryList.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* ACTIVE */}
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
        />
        Active
      </label>

      {/* ACTION */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Create Category"}
        </Button>
      </div>
    </form>
  );
};

export default CreateCategory;
