
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminButton from "../../components/ui/AdminButton";
import { useCreateImageMutation } from "../../services/catalog/catalogApi";


const CreateImage = () => {
  const navigate = useNavigate();
  const [createImage, { isLoading }] = useCreateImageMutation();

  const [form, setForm] = useState({
    product: "",   // UUID (recommended)
    variant: "",   // UUID (optional)
    imageFile: null,
    alt_text: "",
    is_main: true,
    sort_order: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.imageFile) return;

    try {
      await createImage({
        product: form.product || null,
        variant: form.variant || null,
        imageFile: form.imageFile,
        alt_text: form.alt_text,
        is_main: form.is_main,
        sort_order: form.sort_order || 0,
      }).unwrap();

      navigate("/admin/images");
    } catch (err) {
      console.error("Create image failed", err);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-5xl bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold">Create Image</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product ID (UUID)</label>
          <input className="w-full border rounded px-3 py-2"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            placeholder="product uuid"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Variant ID (UUID) optional</label>
          <input className="w-full border rounded px-3 py-2"
            value={form.variant}
            onChange={(e) => setForm({ ...form, variant: e.target.value })}
            placeholder="variant uuid"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image File</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border rounded px-3 py-2"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Alt Text</label>
        <input className="w-full border rounded px-3 py-2"
          value={form.alt_text}
          onChange={(e) => setForm({ ...form, alt_text: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={form.is_main}
            onChange={(e) => setForm({ ...form, is_main: e.target.checked })}
          />
          Is Main
        </label>

        <div>
          <label className="block text-sm font-medium mb-1">Sort Order</label>
          <input type="number" className="w-full border rounded px-3 py-2"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <AdminButton variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Create Image"}
        </AdminButton>
      </div>
    </form>
  );
};

export default CreateImage;
