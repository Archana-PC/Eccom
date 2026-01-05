import { useMemo, useState } from "react";
import AdminButton from "../../components/ui/AdminButton";
import { useCreateVariantMutation } from "../../services/catalog/catalogApi";
import { useGetColorsQuery } from "../../services/catalog/adminAttributesApi";

const VariantsSection = ({ productId }) => {
  const [createVariant, { isLoading }] = useCreateVariantMutation();
  const { data: colorsData, isFetching: isFetchingColors } = useGetColorsQuery();

  const colorList = useMemo(() => {
    if (!colorsData) return [];
    if (Array.isArray(colorsData)) return colorsData;
    if (Array.isArray(colorsData?.results)) return colorsData.results;
    if (Array.isArray(colorsData?.data)) return colorsData.data;
    return [];
  }, [colorsData]);

  const [form, setForm] = useState({
    product_id: productId,
    color_id: "",
    size: "",
    price: "",
    compare_at_price: "",
    stock_qty: "",
    is_active: true,
  });

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      product_id: productId, // ✅ auto connect
      color_id: form.color_id,
      size: form.size,
      price: form.price,
      compare_at_price: form.compare_at_price || null,
      stock_qty: form.stock_qty,
      is_active: form.is_active,
    };

    try {
      await createVariant(payload).unwrap();

      // reset
      setForm({
        product_id: productId,
        color_id: "",
        size: "",
        price: "",
        compare_at_price: "",
        stock_qty: "",
        is_active: true,
      });
    } catch (err) {
      console.error("Create variant failed", err);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="text-xs text-gray-500">
          Product ID: <span className="font-mono">{productId}</span>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {/* Color */}
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.color_id}
            onChange={(e) => setForm({ ...form, color_id: e.target.value })}
            disabled={isFetchingColors}
            required
          >
            <option value="">Select color</option>
            {colorList.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
            placeholder="XS / S / M / L ..."
            required
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              className="w-full border rounded px-3 py-2"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Compare at Price
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full border rounded px-3 py-2"
              value={form.compare_at_price}
              onChange={(e) =>
                setForm({ ...form, compare_at_price: e.target.value })
              }
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1">Stock Qty</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.stock_qty}
            onChange={(e) =>
              setForm({
                ...form,
                stock_qty: e.target.value.replace(/[^\d]/g, ""),
              })
            }
            placeholder="Example: 10"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Keep it as text to avoid JS number precision issues.
          </p>
        </div>

        {/* Active */}
        <label className="flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
          />
          Active
        </label>

        <div className="flex justify-end">
          <AdminButton type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Add Variant"}
          </AdminButton>
        </div>
      </form>
    </div>
  );
};

export default VariantsSection;
