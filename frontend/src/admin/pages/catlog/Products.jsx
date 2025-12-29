import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PERMISSIONS } from "../../constants/permissions";
import { useDeleteProductMutation, useGetProductsQuery } from "../../services/catalog/catalogApi";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import Table from "../../components/ui/Table";
import AdminButton from "../../components/ui/AdminButton";


const Products = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [deletedIds, setDeletedIds] = useState(new Set());

  // ✅ DRF pagination safe: supports {results: []} or [] response
  const rows = useMemo(() => {
    const list = Array.isArray(data) ? data : data?.results || [];
    return list.filter((p) => !deletedIds.has(p.id));
  }, [data, deletedIds]);

  const columns = [
    { key: "name", label: "Product Name", render: (r) => r?.name ?? "—" },
    { key: "slug", label: "Slug", render: (r) => r?.slug ?? "—" },
    {
      key: "base_price",
      label: "Base Price",
      render: (r) => (r?.base_price != null ? r.base_price : "—"),
    },
    {
      key: "is_active",
      label: "Active",
      render: (r) => (r?.is_active ? "Yes" : "No"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Permission allow={PERMISSIONS.PRODUCT.CHANGE}>
            <AdminButton
              size="sm"
              variant="secondary"
              onClick={() => navigate(`/admin/products/${row.id}`)}
            >
              Edit
            </AdminButton>
          </Permission>

          <Permission allow={PERMISSIONS.PRODUCT.DELETE}>
            <AdminButton
              size="sm"
              variant="danger"
              onClick={async () => {
                // optimistic hide
                setDeletedIds((prev) => new Set(prev).add(row.id));
                try {
                  await deleteProduct(row.id).unwrap();
                } catch (e) {
                  // rollback if failed
                  setDeletedIds((prev) => {
                    const next = new Set(prev);
                    next.delete(row.id);
                    return next;
                  });
                  console.error("Delete failed", e);
                }
              }}
            >
              Delete
            </AdminButton>
          </Permission>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Products"
        actions={
          <div className="flex gap-2">
            <AdminButton
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>

            <Permission allow={PERMISSIONS.PRODUCT.ADD}>
              <AdminButton
                variant="primary"
                onClick={() => navigate("/admin/products/create")}
              >
                + Add Product
              </AdminButton>
            </Permission>
          </div>
        }
      />

      {isLoading && (
        <div className="bg-white border rounded-xl p-4">
          Loading products...
        </div>
      )}

      {isError && (
        <div className="bg-white border rounded-xl p-4">
          <div className="font-semibold text-red-600">
            Failed to load products
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3">
            <AdminButton onClick={() => refetch()}>Try again</AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && rows.length === 0 && (
        <div className="bg-white border rounded-xl p-6 text-center">
          <div className="text-lg font-semibold">No products found</div>
          <div className="text-sm text-gray-600 mt-1">
            Create a product to get started.
          </div>
        </div>
      )}

      {!isLoading && !isError && rows.length > 0 && (
        <Table columns={columns} data={rows} />
      )}
    </>
  );
};

export default Products;
