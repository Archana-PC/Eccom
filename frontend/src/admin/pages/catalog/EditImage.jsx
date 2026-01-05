import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminButton from "../../components/ui/AdminButton";
import { useGetImageByIdQuery, useUpdateImageMutation } from "../../services/catalog/catalogApi";


const EditImage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetImageByIdQuery(id);
  const [updateImage, { isLoading: saving }] = useUpdateImageMutation();

  const [form, setForm] = useState({
    product: "",
    variant: "",
    imageFile: null,
    alt_text: "",
    is_main: false,
    sort_order: "",
  });

  useEffect(() => {
    if (!data) return;
    setForm({
      product: data.product || "",
      variant: data.variant || "",
      imageFile: null,
      alt_text: data.alt_text || "",
      is_main: !!data.is_main,
      sort_order: String(data.sort_order ?? ""),
    });
  }, [data]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await updateImage({
        id,
        product: form.product || null,
        variant: form.variant || null,
        imageFile: form.imageFile || undefined, // only if changed
        alt_text: form.alt_text,
        is_main: form.is_main,
        sort_order: form.sort_order || 0,
      }).unwrap();

      navigate("/admin/images");
    } catch (err) {
      console.error("Update image failed", err);
    }
  };

  if (isLoading) return <div className="bg-white p-4 rounded-xl border">Loading…</div>;

  return (
    <form onSubmit={submit} className="max-w-5xl bg-white p-6 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-semibold">Edit Image</h2>

      {data?.image && (
        <div className="flex items-center gap-4">
          <img src={data.image} alt={data.alt_text || ""} className="h-20 w-20 rounded object-cover border" />
          <div className="text-sm text-gray-600">Current image preview</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product ID</label>
          <input className="w-full border rounded px-3 py-2"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Variant ID</label>
          <input className="w-full border rounded px-3 py-2"
            value={form.variant}
            onChange={(e) => setForm({ ...form, variant: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Replace Image (optional)</label>
        <input type="file" accept="image/*" className="w-full border rounded px-3 py-2"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })}
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
          <input type="checkbox" checked={form.is_main}
            onChange={(e) => setForm({ ...form, is_main: e.target.checked })} />
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

      <div className="flex justify-end gap-2">
        <AdminButton variant="secondary" type="button" onClick={() => navigate(-1)}>Back</AdminButton>
        <AdminButton variant="primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Image"}
        </AdminButton>
      </div>
    </form>
  );
};

export default EditImage;
