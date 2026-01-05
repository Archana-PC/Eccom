import { useEffect, useMemo, useState } from "react";

import AdminButton from "../../components/ui/AdminButton";
import FormField from "../../components/form/FormField";
import SelectField from "../../components/form/SelectField";
import CheckboxField from "../../components/form/CheckboxField";
import TextareaField from "../../components/form/TextareaField";
import MultiSelectChipsField from "../../components/form/MultiSelectChipsField";

import MeasurementsEditor from "./MeasurementsEditor";
import {
  MEASUREMENT_PROFILES,
  MEASUREMENT_COLUMNS,
} from "../../constants/measurementSchemas";

import {
  FIT_CHOICES,
  COLLAR_CHOICES,
  SLEEVE_CHOICES,
  PATTERN_CHOICES,
} from "../../constants/productChoices";

/** helpers */
const asId = (v) => {
  if (!v) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (typeof v === "object" && v.id) return String(v.id);
  return "";
};

const asArrayIds = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(asId).filter(Boolean);
  return [];
};

const safeList = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const ProductForm = ({
  categories = [],
  fabrics = [],
  materials = [],
  styles = [],
  collections = [],

  submitLabel = "Save",
  loading = false,
  apiError = null,
  initialValues = null, // for edit
  onSubmit,
  onCancel,
}) => {
  const categoryList = useMemo(() => safeList(categories), [categories]);
  const fabricList = useMemo(() => safeList(fabrics), [fabrics]);
  const materialList = useMemo(() => safeList(materials), [materials]);
  const styleList = useMemo(() => safeList(styles), [styles]);
  const collectionList = useMemo(() => safeList(collections), [collections]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    brand: "",
    fabric: "",
    fabric_composition: "",
    fit: "",
    size_chart_image: null,
    size_chart_description: "",

    // measurements
    measurement_profile: "TOPS",
    measurement_unit: "in",
    measurements_rows: [],

    // merchandising
    styles: [],
    collections: [],

    style_code: "",
    collar_type: "",
    sleeve_type: "",
    pattern: "",
    material: "",

    // dimensions
    weight: "",
    weight_unit: "g",
    packed_length: "",
    packed_width: "",
    packed_height: "",
    dimension_unit: "cm",

    description: "",
    base_price: "",
    is_active: true,

    meta_title: "",
    meta_description: "",
  });

  const [errors, setErrors] = useState({});

  /** set initial values for EDIT */
  useEffect(() => {
    if (!initialValues) return;

    const m = initialValues?.measurements || {};
    const d = initialValues?.dimensions || {};

    setForm((p) => ({
      ...p,

      name: initialValues?.name || "",
      slug: initialValues?.slug || "",
      category: asId(initialValues?.category),
      brand: asId(initialValues?.brand),
      fabric: asId(initialValues?.fabric),
      fabric_composition: initialValues?.fabric_composition || "",
      fit: initialValues?.fit || "",

      // keep file null on edit unless user uploads new
      size_chart_image: null,
      size_chart_description: initialValues?.size_chart_description || "",

      measurement_profile: m?.profile || p.measurement_profile,
      measurement_unit: m?.unit || p.measurement_unit,
      measurements_rows: Array.isArray(m?.rows) ? m.rows : [],

      styles: asArrayIds(initialValues?.styles),
      collections: asArrayIds(initialValues?.collections),

      style_code: initialValues?.style_code || "",
      collar_type: initialValues?.collar_type || "",
      sleeve_type: initialValues?.sleeve_type || "",
      pattern: initialValues?.pattern || "",
      material: asId(initialValues?.material),

      weight: d?.weight ?? "",
      weight_unit: d?.weight_unit || "g",
      packed_length: d?.packed?.l ?? "",
      packed_width: d?.packed?.w ?? "",
      packed_height: d?.packed?.h ?? "",
      dimension_unit: d?.packed?.unit || "cm",

      description: initialValues?.description || "",
      base_price: initialValues?.base_price ?? "",
      is_active:
        typeof initialValues?.is_active === "boolean"
          ? initialValues.is_active
          : true,

      meta_title: initialValues?.meta_title || "",
      meta_description: initialValues?.meta_description || "",
    }));
  }, [initialValues]);

  /** options */
  const categoryOptions = useMemo(
    () => [
      { value: "", label: "Select category" },
      ...categoryList.map((c) => ({ value: String(c.id), label: c.name })),
    ],
    [categoryList]
  );

  const fabricOptions = useMemo(
    () => [
      { value: "", label: "Select fabric" },
      ...fabricList.map((f) => ({ value: String(f.id), label: f.name })),
    ],
    [fabricList]
  );

  const materialOptions = useMemo(
    () => [
      { value: "", label: "Select material" },
      ...materialList.map((m) => ({ value: String(m.id), label: m.name })),
    ],
    [materialList]
  );

  const styleOptions = useMemo(
    () => styleList.map((s) => ({ value: String(s.id), label: s.name })),
    [styleList]
  );

  const collectionOptions = useMemo(
    () => collectionList.map((c) => ({ value: String(c.id), label: c.name })),
    [collectionList]
  );

  const fitOptions = useMemo(
    () => [{ value: "", label: "Select fit" }, ...FIT_CHOICES],
    []
  );

  const collarOptions = useMemo(
    () => [{ value: "", label: "Select collar" }, ...COLLAR_CHOICES],
    []
  );

  const sleeveOptions = useMemo(
    () => [{ value: "", label: "Select sleeve" }, ...SLEEVE_CHOICES],
    []
  );

  const patternOptions = useMemo(
    () => [{ value: "", label: "Select pattern" }, ...PATTERN_CHOICES],
    []
  );

  /** change handlers */
  const onBasicChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const onFabricChange = (e) => {
    const id = e.target.value;
    const selected = fabricList.find((x) => String(x.id) === String(id));

    setForm((p) => ({
      ...p,
      fabric: id,
      fabric_composition: p.fabric_composition?.trim()
        ? p.fabric_composition
        : selected?.composition || "",
    }));
    setErrors((p) => ({ ...p, fabric: "" }));
  };

  /** validation */
  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Name is required";
    if (!form.slug?.trim()) e.slug = "Slug is required";
    if (!form.category) e.category = "Category is required";
    if (form.base_price === "" || form.base_price === null)
      e.base_price = "Base price is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /** build FormData (same as your create logic) */
  const buildFormData = () => {
    const fd = new FormData();

    fd.append("name", form.name.trim());
    fd.append("slug", form.slug.trim());
    fd.append("category", form.category);

    if (form.brand) fd.append("brand", form.brand);

    if (form.fabric) fd.append("fabric", form.fabric);
    if (form.fabric_composition?.trim())
      fd.append("fabric_composition", form.fabric_composition.trim());

    if (form.fit) fd.append("fit", form.fit);
    if (form.collar_type) fd.append("collar_type", form.collar_type);
    if (form.sleeve_type) fd.append("sleeve_type", form.sleeve_type);
    if (form.pattern) fd.append("pattern", form.pattern);
    if (form.material) fd.append("material", form.material);

    // arrays
    if (Array.isArray(form.styles)) 
      (form.styles || [])
        .filter(Boolean)
        .forEach((id) => {
          fd.append("styles", String(id));
        });
    if (Array.isArray(form.collections))
      // fd.append("collections", JSON.stringify(form.collections));
      (form.collections || [])
      .filter(Boolean)
      .forEach((id) => {
        fd.append("collections", String(id)); // UUID string
      });

    // file
    if (form.size_chart_image instanceof File) {
      fd.append("size_chart_image", form.size_chart_image);
    }
    if (form.size_chart_description?.trim())
      fd.append("size_chart_description", form.size_chart_description.trim());

    // measurements JSON
    const measurementsPayload = {
      unit: form.measurement_unit,
      profile: form.measurement_profile,
      rows: form.measurements_rows || [],
      guide: "Garment measurements. Allow ±1–2 cm variation.",
    };
    fd.append("measurements", JSON.stringify(measurementsPayload));

    if (form.style_code?.trim()) fd.append("style_code", form.style_code.trim());
    if (form.description?.trim()) fd.append("description", form.description.trim());

    // dimensions JSON only if something entered
    const hasDim =
      (form.weight && String(form.weight).trim()) ||
      (form.packed_length && String(form.packed_length).trim()) ||
      (form.packed_width && String(form.packed_width).trim()) ||
      (form.packed_height && String(form.packed_height).trim());

    if (hasDim) {
      const dimensionsPayload = {
        weight: form.weight ? String(form.weight).trim() : "",
        weight_unit: form.weight_unit || "g",
        packed: {
          l: form.packed_length ? String(form.packed_length).trim() : "",
          w: form.packed_width ? String(form.packed_width).trim() : "",
          h: form.packed_height ? String(form.packed_height).trim() : "",
          unit: form.dimension_unit || "cm",
        },
      };
      fd.append("dimensions", JSON.stringify(dimensionsPayload));
    }

    fd.append("base_price", String(form.base_price || ""));
    fd.append("is_active", form.is_active ? "true" : "false");

    if (form.meta_title?.trim()) fd.append("meta_title", form.meta_title.trim());
    if (form.meta_description?.trim())
      fd.append("meta_description", form.meta_description.trim());

    return fd;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const fd = buildFormData();
    onSubmit?.(fd); // send FormData to page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-xl p-5 space-y-6"
    >
      {/* BASIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Name"
          name="name"
          value={form.name}
          onChange={onBasicChange}
          required
          error={errors.name}
        />

        <FormField
          label="Slug"
          name="slug"
          value={form.slug}
          onChange={onBasicChange}
          placeholder="example-product-slug"
          required
          error={errors.slug}
        />
      </div>

      <SelectField
        label="Category"
        name="category"
        value={form.category}
        onChange={onBasicChange}
        options={categoryOptions}
        required
        error={errors.category}
      />

      {/* MERCHANDISING */}
      <div className="border rounded-xl p-4 space-y-4">
        <h3 className="font-semibold">Merchandising</h3>

        <MultiSelectChipsField
          label="Styles"
          options={styleOptions}
          values={form.styles}
          onChange={(vals) => setForm((p) => ({ ...p, styles: vals }))}
          placeholder="Select style"
          addLabel="Add"
        />

        <MultiSelectChipsField
          label="Collections"
          options={collectionOptions}
          values={form.collections}
          onChange={(vals) => setForm((p) => ({ ...p, collections: vals }))}
          placeholder="Select collection"
          addLabel="Add"
        />
      </div>

      {/* UUID / ATTRIBUTES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Brand (UUID)"
          name="brand"
          value={form.brand}
          onChange={onBasicChange}
          placeholder="brand uuid"
        />

        <SelectField
          label="Fabric"
          name="fabric"
          value={form.fabric}
          onChange={onFabricChange}
          options={fabricOptions}
        />

        <SelectField
          label="Material"
          name="material"
          value={form.material}
          onChange={onBasicChange}
          options={materialOptions}
        />
      </div>

      {/* CHOICES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SelectField
          label="Fit"
          name="fit"
          value={form.fit}
          onChange={onBasicChange}
          options={fitOptions}
        />

        <SelectField
          label="Collar Type"
          name="collar_type"
          value={form.collar_type}
          onChange={onBasicChange}
          options={collarOptions}
        />

        <SelectField
          label="Sleeve Type"
          name="sleeve_type"
          value={form.sleeve_type}
          onChange={onBasicChange}
          options={sleeveOptions}
        />

        <SelectField
          label="Pattern"
          name="pattern"
          value={form.pattern}
          onChange={onBasicChange}
          options={patternOptions}
        />
      </div>

      {/* SIZE CHART */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Fabric Composition"
          name="fabric_composition"
          value={form.fabric_composition}
          onChange={onBasicChange}
        />

        <FormField
          label="Style Code"
          name="style_code"
          value={form.style_code}
          onChange={onBasicChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Size Chart Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-lg px-3 py-2"
          onChange={(e) =>
            setForm((p) => ({ ...p, size_chart_image: e.target.files?.[0] || null }))
          }
        />
        {initialValues?.size_chart_image && (
          <p className="text-xs text-slate-500 mt-1">
            On edit: upload only if you want to replace the existing image.
          </p>
        )}
      </div>

      <TextareaField
        label="Size Chart Description"
        name="size_chart_description"
        value={form.size_chart_description}
        onChange={onBasicChange}
        rows={3}
      />

      {/* MEASUREMENTS */}
      <div className="border rounded-xl p-4 space-y-4">
        <h3 className="font-semibold">Measurements</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Measurement Type"
            name="measurement_profile"
            value={form.measurement_profile}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                measurement_profile: e.target.value,
                measurements_rows: [],
              }))
            }
            options={MEASUREMENT_PROFILES}
          />

          <SelectField
            label="Measurement Unit"
            name="measurement_unit"
            value={form.measurement_unit}
            onChange={onBasicChange}
            options={[
              { value: "in", label: "Inches" },
              { value: "cm", label: "CM" },
            ]}
          />
        </div>

        <MeasurementsEditor
          columns={MEASUREMENT_COLUMNS[form.measurement_profile]}
          rows={form.measurements_rows}
          unit={form.measurement_unit}
          onChange={(rows) => setForm((p) => ({ ...p, measurements_rows: rows }))}
        />
      </div>

      {/* DIMENSIONS */}
      <div className="border rounded-xl p-4 space-y-4">
        <h3 className="font-semibold">Shipping Dimensions</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Weight</label>
            <div className="flex gap-2">
              <input
                className="w-full border rounded-lg px-3 py-2"
                value={form.weight}
                onChange={(e) => setForm((p) => ({ ...p, weight: e.target.value }))}
                placeholder="e.g. 450"
              />
              <select
                className="border rounded-lg px-3 py-2"
                value={form.weight_unit}
                onChange={(e) => setForm((p) => ({ ...p, weight_unit: e.target.value }))}
              >
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Packed Dimensions</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="L"
                value={form.packed_length}
                onChange={(e) => setForm((p) => ({ ...p, packed_length: e.target.value }))}
              />
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="W"
                value={form.packed_width}
                onChange={(e) => setForm((p) => ({ ...p, packed_width: e.target.value }))}
              />
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="H"
                value={form.packed_height}
                onChange={(e) => setForm((p) => ({ ...p, packed_height: e.target.value }))}
              />
            </div>

            <div className="mt-2">
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={form.dimension_unit}
                onChange={(e) => setForm((p) => ({ ...p, dimension_unit: e.target.value }))}
              >
                <option value="cm">cm</option>
                <option value="in">in</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <TextareaField
        label="Description"
        name="description"
        value={form.description}
        onChange={onBasicChange}
        rows={5}
      />

      {/* PRICE + ACTIVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <FormField
          label="Base Price"
          name="base_price"
          type="number"
          value={form.base_price}
          onChange={onBasicChange}
          required
          error={errors.base_price}
        />

        <div className="pt-2">
          <CheckboxField
            label="Active"
            name="is_active"
            checked={form.is_active}
            onChange={onBasicChange}
          />
        </div>
      </div>

      {/* SEO */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="font-semibold">SEO</h3>

        <FormField
          label="Meta Title"
          name="meta_title"
          value={form.meta_title}
          onChange={onBasicChange}
        />

        <TextareaField
          label="Meta Description"
          name="meta_description"
          value={form.meta_description}
          onChange={onBasicChange}
          rows={3}
        />
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

      {/* ACTIONS */}
      <div className="flex gap-3 justify-end pt-2">
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

export default ProductForm;
