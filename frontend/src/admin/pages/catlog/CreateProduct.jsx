import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminButton from "../../components/ui/AdminButton";
import { useCreateProductMutation } from "../../services/catalog/catalogApi";
import { useGetCategoriesQuery } from "../../services/adminCategoryApi";


// 🔹 enums (match your backend choices)
const FIT_CHOICES = [
  { value: "SLIM", label: "Slim" },
  { value: "REGULAR", label: "Regular" },
  { value: "OVERSIZED", label: "Oversized" },
];

const COLLAR_CHOICES = [
  { value: "CREW_NECK", label: "Crew Neck" },
  { value: "POLO", label: "Polo" },
  { value: "V_NECK", label: "V Neck" },
];

const SLEEVE_CHOICES = [
  { value: "SHORT", label: "Short" },
  { value: "FULL", label: "Full" },
  { value: "SLEEVELESS", label: "Sleeveless" },
];

const PATTERN_CHOICES = [
  { value: "SOLID", label: "Solid" },
  { value: "STRIPED", label: "Striped" },
  { value: "PRINTED", label: "Printed" },
];

const CreateProduct = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // you already have categories query
  const { data: categories } = useGetCategoriesQuery();

  // If you have these APIs later, replace input with dropdowns
  // const { data: brands } = useGetBrandsQuery();
  // const { data: fabrics } = useGetFabricsQuery();
  // const { data: materials } = useGetMaterialsQuery();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    brand: "",
    fabric: "",
    fabric_composition: "",
    fit: "SLIM",
    size_chart_image: "",
    size_chart_description: "",
    measurements: "",
    style_code: "",
    collar_type: "CREW_NECK",
    sleeve_type: "SHORT",
    pattern: "SOLID",
    material: "",
    dimensions: "",
    description: "",
    base_price: "",
    is_active: true,
    meta_title: "",
    meta_description: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category || null,
      brand: form.brand || null,
      fabric: form.fabric || null,
      fabric_composition: form.fabric_composition || "",
      fit: form.fit,
      size_chart_image: form.size_chart_image || "",
      size_chart_description: form.size_chart_description || "",
      measurements: form.measurements || "",
      style_code: form.style_code || "",
      collar_type: form.collar_type,
      sleeve_type: form.sleeve_type,
      pattern: form.pattern,
      material: form.material || null,
      dimensions: form.dimensions || "",
      description: form.description || "",
      base_price: form.base_price, // decimal as string ok
      is_active: form.is_active,
      meta_title: form.meta_title || "",
      meta_description: form.meta_description || "",
    };

    try {
      await createProduct(payload).unwrap();
      navigate("/admin/products");
    } catch (err) {
      console.error("Create product failed", err);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-6xl bg-white p-6 rounded-xl shadow space-y-6"
    >
      <h2 className="text-xl font-semibold">Create Product</h2>

      {/* BASIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="example-product-slug"
            required
          />
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select category</option>
          {categories?.results?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* UUID FIELDS (brand/fabric/material) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Brand (UUID)</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            placeholder="brand uuid"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fabric (UUID)</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.fabric}
            onChange={(e) => setForm({ ...form, fabric: e.target.value })}
            placeholder="fabric uuid"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Material (UUID)</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.material}
            onChange={(e) => setForm({ ...form, material: e.target.value })}
            placeholder="material uuid"
          />
        </div>
      </div>

      {/* CHOICES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fit</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.fit}
            onChange={(e) => setForm({ ...form, fit: e.target.value })}
          >
            {FIT_CHOICES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Collar Type</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.collar_type}
            onChange={(e) => setForm({ ...form, collar_type: e.target.value })}
          >
            {COLLAR_CHOICES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sleeve Type</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.sleeve_type}
            onChange={(e) => setForm({ ...form, sleeve_type: e.target.value })}
          >
            {SLEEVE_CHOICES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pattern</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.pattern}
            onChange={(e) => setForm({ ...form, pattern: e.target.value })}
          >
            {PATTERN_CHOICES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SIZE CHART URL */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Size Chart Image URL
        </label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.size_chart_image}
          onChange={(e) => setForm({ ...form, size_chart_image: e.target.value })}
          placeholder="https://..."
        />
      </div>

      {/* TEXT FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fabric Composition</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.fabric_composition}
            onChange={(e) => setForm({ ...form, fabric_composition: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Style Code</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.style_code}
            onChange={(e) => setForm({ ...form, style_code: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Size Chart Description</label>
        <textarea
          className="w-full border rounded px-3 py-2 min-h-[90px]"
          value={form.size_chart_description}
          onChange={(e) => setForm({ ...form, size_chart_description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Measurements</label>
        <textarea
          className="w-full border rounded px-3 py-2 min-h-[90px]"
          value={form.measurements}
          onChange={(e) => setForm({ ...form, measurements: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Dimensions</label>
        <textarea
          className="w-full border rounded px-3 py-2 min-h-[90px]"
          value={form.dimensions}
          onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2 min-h-[140px]"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* PRICE + ACTIVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Base Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2"
            value={form.base_price}
            onChange={(e) => setForm({ ...form, base_price: e.target.value })}
            required
          />
        </div>

        <label className="flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          Active
        </label>
      </div>

      {/* SEO */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="font-semibold">SEO</h3>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.meta_title}
            onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[90px]"
            value={form.meta_description}
            onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">
        <AdminButton variant="secondary" type="button" onClick={() => navigate(-1)}>
          Back
        </AdminButton>
        <AdminButton variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Create Product"}
        </AdminButton>
      </div>
    </form>
  );
};

export default CreateProduct;
