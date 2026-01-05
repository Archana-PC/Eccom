
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminButton from "../../components/ui/AdminButton";
import Table from "../../components/ui/Table";
import PageHeader from "../../components/ui/PageHeader";
import { useDeleteVariantMutation, useGetVariantsQuery } from "../../services/catalog/catalogApi";


const Variants = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, refetch } = useGetVariantsQuery();
  const [deleteVariant] = useDeleteVariantMutation();
  const [deletedIds, setDeletedIds] = useState(new Set());

  const rows = useMemo(() => {
    const arr = Array.isArray(data) ? data : data?.results || [];
    return arr.filter((v) => !deletedIds.has(v.id));
  }, [data, deletedIds]);

  const columns = [
    { key: "id", label: "ID", render: (r) => String(r.id).slice(0, 8) + "…" },
    { key: "size", label: "Size" },
    { key: "color_id", label: "Color ID", render: (r) => r.color_id || "—" },
    { key: "price", label: "Price", render: (r) => r.price ?? "—" },
    { key: "compare_at_price", label: "Compare", render: (r) => r.compare_at_price ?? "—" },
    { key: "stock_qty", label: "Stock", render: (r) => String(r.stock_qty ?? "—") },
    { key: "is_active", label: "Active", render: (r) => (r.is_active ? "Yes" : "No") },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <AdminButton size="sm" variant="soft" onClick={() => navigate(`/admin/variants/${row.id}`)}>
            Edit
          </AdminButton>

          <AdminButton
            size="sm"
            variant="danger"
            onClick={async () => {
              setDeletedIds((p) => new Set(p).add(row.id));
              try {
                await deleteVariant(row.id).unwrap();
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
        title="Variants"
        actions={
          <div className="flex gap-2">
            <AdminButton variant="secondary" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>
            <AdminButton variant="primary" onClick={() => navigate("/admin/variants/create")}>
              + Add Variant
            </AdminButton>
          </div>
        }
      />

      {isLoading ? (
        <div className="bg-white p-4 rounded-xl border">Loading variants…</div>
      ) : (
        <Table columns={columns} data={rows} />
      )}
    </div>
  );
};

export default Variants;
