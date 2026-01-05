import { useState } from "react";
import AdminButton from "../../components/ui/AdminButton";
import { useCreateImageMutation } from "../../services/catalog/catalogApi";


const ImagesSection = ({ productId }) => {
  const [createImage, { isLoading }] = useCreateImageMutation();

  const [form, setForm] = useState({
    product_id: productId,
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
        product_id: productId, 
        variant: null,
        imageFile: form.imageFile,
        alt_text: form.alt_text,
        is_main: form.is_main,
        sort_order: form.sort_order || 0,
      }).unwrap();

      setForm({
        product_id: "",
        imageFile: null,
        alt_text: "",
        is_main: true,
        sort_order: "",
      });
    } catch (err) {
      console.error("Create image failed", err);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Images</h3>
        <div className="text-xs text-gray-500">
          Product ID: <span className="font-mono">{productId}</span>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Image File</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border rounded px-3 py-2"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                imageFile: e.target.files?.[0] || null,
              }))
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alt Text</label>
          <input
            className="w-full border rounded px-3 py-2"
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
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <AdminButton type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Image"}
          </AdminButton>
        </div>
      </form>
    </div>
  );
};

export default ImagesSection;
