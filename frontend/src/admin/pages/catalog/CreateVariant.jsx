import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminButton from "../../components/ui/AdminButton";
import { useCreateVariantMutation } from "../../services/catalog/catalogApi";


const CreateVariant = () => {
  const navigate = useNavigate();
  const [createVariant, { isLoading }] = useCreateVariantMutation();

  const [form, setForm] = useState({
    color_id: "",
    size: "",
    price: "",
    compare_at_price: "",
    stock_qty: "", // keep as STRING (bigint safe)
    is_active: true,
  });

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      color_id: form.color_id,
      size: form.size,
      price: form.price, // DRF decimal ok as string
      compare_at_price: form.compare_at_price,
      stock_qty: form.stock_qty, // string (important)
      is_active: form.is_active,
    };

    try {
      await createVariant(payload).unwrap();
      navigate("/admin/variants");
    } catch (err) {
      console.error("Create variant failed", err);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-5xl bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold">Create Variant</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Color ID (UUID)</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.color_id}
          onChange={(e) => setForm({ ...form, color_id: e.target.value })}
          required
        />
      </div>

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
          <label className="block text-sm font-medium mb-1">Compare at Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2"
            value={form.compare_at_price}
            onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock Qty (bigint)</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={form.stock_qty}
          onChange={(e) => setForm({ ...form, stock_qty: e.target.value.replace(/[^\d]/g, "") })}
          placeholder="Example: 9223372036854776000"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Keep it as text to avoid JS number precision issues.
        </p>
      </div>

      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
        />
        Active
      </label>

      <div className="flex justify-end">
        <AdminButton variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Create Variant"}
        </AdminButton>
      </div>
    </form>
  );
};

export default CreateVariant;
