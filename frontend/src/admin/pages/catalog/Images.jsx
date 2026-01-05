import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminButton from "../../components/ui/AdminButton";
import Table from "../../components/ui/Table";
import PageHeader from "../../components/ui/PageHeader";
import { useDeleteImageMutation, useGetImagesQuery } from "../../services/catalog/catalogApi";


const Images = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch } = useGetImagesQuery();
  const [deleteImage] = useDeleteImageMutation();
  const [deletedIds, setDeletedIds] = useState(new Set());

  const rows = useMemo(() => {
    const arr = Array.isArray(data) ? data : data?.results || [];
    return arr.filter((img) => !deletedIds.has(img.id));
  }, [data, deletedIds]);

  const columns = [
    {
      key: "preview",
      label: "Preview",
      render: (r) =>
        r.image ? (
          <img src={r.image} alt={r.alt_text || ""} className="h-10 w-10 rounded object-cover border" />
        ) : (
          "—"
        ),
    },
    { key: "alt_text", label: "Alt Text", render: (r) => r.alt_text || "—" },
    { key: "is_main", label: "Main", render: (r) => (r.is_main ? "Yes" : "No") },
    { key: "sort_order", label: "Order", render: (r) => String(r.sort_order ?? "—") },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <AdminButton size="sm" variant="soft" onClick={() => navigate(`/admin/images/${row.id}`)}>
            Edit
          </AdminButton>
          <AdminButton
            size="sm"
            variant="danger"
            onClick={async () => {
              setDeletedIds((p) => new Set(p).add(row.id));
              try {
                await deleteImage(row.id).unwrap();
              } catch (e) {
                setDeletedIds((p) => {
                  const n = new Set(p);
                  n.delete(row.id);
                  return n;
                });
                console.error(e);
              }
            }}
          >
            Delete
          </AdminButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Images"
        actions={
          <div className="flex gap-2">
            <AdminButton variant="secondary" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>
            <AdminButton variant="primary" onClick={() => navigate("/admin/images/create")}>
              + Add Image
            </AdminButton>
          </div>
        }
      />

      {isLoading ? (
        <div className="bg-white p-4 rounded-xl border">Loading images…</div>
      ) : (
        <Table columns={columns} data={rows} />
      )}
    </div>
  );
};

export default Images;
