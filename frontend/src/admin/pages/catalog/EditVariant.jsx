import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminButton from "../../components/ui/AdminButton";
import { useGetVariantByIdQuery, useUpdateVariantMutation } from "../../services/catalog/catalogApi";


const EditVariant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetVariantByIdQuery(id);
  const [updateVariant, { isLoading: saving }] = useUpdateVariantMutation();

  const [form, setForm] = useState({
    color_id: "",
    size: "",
    price: "",
    compare_at_price: "",
    stock_qty: "",
    is_active: true,
  });

  useEffect(() => {
    if (!data) return;
    setForm({
      color_id: data.color_id || "",
      size: data.size || "",
      price: data.price ?? "",
      compare_at_price: data.compare_at_price ?? "",
      stock_qty: String(data.stock_qty ?? ""),
      is_active: !!data.is_active,
    });
  }, [data]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await updateVariant({ id, ...form }).unwrap();
      navigate("/admin/variants");
    } catch (err) {
      console.error("Update variant failed", err);
    }
  };

  if (isLoading) return <div className="bg-white p-4 rounded-xl border">Loading…</div>;

  return (
    <form onSubmit={submit} className="max-w-5xl bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold">Edit Variant</h2>

      {/* same inputs as CreateVariant */}
      <div>
        <label className="block text-sm font-medium mb-1">Color ID (UUID)</label>
        <input className="w-full border rounded px-3 py-2" value={form.color_id}
          onChange={(e) => setForm({ ...form, color_id: e.target.value })} required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Size</label>
        <input className="w-full border rounded px-3 py-2" value={form.size}
          onChange={(e) => setForm({ ...form, size: e.target.value })} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input type="number" step="0.01" className="w-full border rounded px-3 py-2" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Compare at Price</label>
          <input type="number" step="0.01" className="w-full border rounded px-3 py-2" value={form.compare_at_price}
            onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Stock Qty</label>
        <input className="w-full border rounded px-3 py-2" value={form.stock_qty}
          onChange={(e) => setForm({ ...form, stock_qty: e.target.value.replace(/[^\d]/g, "") })} required />
      </div>

      <label className="flex items-center gap-2 font-medium">
        <input type="checkbox" checked={form.is_active}
          onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
        Active
      </label>

      <div className="flex justify-end gap-2">
        <AdminButton variant="secondary" type="button" onClick={() => navigate(-1)}>
          Back
        </AdminButton>
        <AdminButton variant="primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Variant"}
        </AdminButton>
      </div>
    </form>
  );
};

export default EditVariant;
