import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PERMISSIONS } from "../../constants/permissions";
import {
  useDeleteAdminProductMutation,
  useGetAdminProductsQuery,
} from "../../services/catalog/catalogApi";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import Table from "../../components/ui/Table";
import AdminButton from "../../components/ui/AdminButton";
import AdminPagination from "../../components/ui/AdminPagination";

const safeBigInt = (v) => {
  try {
    if (v === null || v === undefined || v === "") return 0n;
    return BigInt(String(v));
  } catch {
    return 0n;
  }
};

const Products = () => {
  const navigate = useNavigate();
  // ✅ pagination state
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetAdminProductsQuery({ page, page_size: pageSize });

  const [deleteProduct] = useDeleteAdminProductMutation();
  const [deletedIds, setDeletedIds] = useState(new Set());

  // ✅ total count from backend
  const total = data?.count ?? 0;

  const rows = useMemo(() => {
    const list = Array.isArray(data) ? data : data?.results || [];
    return list.filter((p) => !deletedIds.has(p.id));
  }, [data, deletedIds]);

  const getMainImage = (p) => {
    const imgs = p?.images || [];
    const main = imgs.find((i) => i?.is_main) || imgs[0];
    return main?.thumb || main?.card || main?.zoom || "";
  };

  const getTotalStock = (p) => {
    const variants = p?.variants || [];
    const total = variants.reduce((sum, v) => sum + safeBigInt(v?.stock_qty), 0n);
    return total.toString();
  };

  const getMinVariantPrice = (p) => {
    const variants = p?.variants || [];
    const nums = variants
      .map((v) => Number(v?.price))
      .filter((n) => !Number.isNaN(n));
    if (!nums.length) return null;
    return Math.min(...nums);
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (p) => {
        const src = getMainImage(p);
        return src ? (
          <img
            src={src}
            alt={p?.name || "Product"}
            className="h-10 w-10 rounded-lg object-cover border"
          />
        ) : (
          <div className="h-10 w-10 rounded-lg border bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
            —
          </div>
        );
      },
    },
    { key: "name", label: "Product",
  render: (p) => <span className="block max-w-[260px] truncate">{p?.name ?? "—"}</span>
},
    { key: "category", label: "Category", render: (p) => p?.category_name ?? "—" },
    { key: "brand", label: "Brand", render: (p) => p?.brand_name ?? "—" },
    {
      key: "base_price",
      label: "Base Price",
      render: (p) => (p?.base_price != null ? <span className="font-semibold">{p.base_price}</span> : "—"),
    },
    {
      key: "variant_price",
      label: "Variant Min Price",
      render: (p) => {
        const minPrice = getMinVariantPrice(p);
        return minPrice != null ? minPrice : <span className="text-gray-400">—</span>;
      },
    },
    {
      key: "stock",
      label: "Stock",
      render: (p) => getTotalStock(p),
    },
    {
      key: "is_active",
      label: "Status",
      render: (p) =>
        p?.is_active ? (
          <span className="px-2 py-1 text-xs rounded-full bg-green-50 border border-green-200">
            Active
          </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-50 border">
            Inactive
          </span>
        ),
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
              onClick={() => navigate(`/admin/products/${row.id}`)} // ✅ ID route
            >
              Edit
            </AdminButton>
          </Permission>

          <Permission allow={PERMISSIONS.PRODUCT.DELETE}>
            <AdminButton
              size="sm"
              variant="danger"
              onClick={async () => {
                setDeletedIds((prev) => {
                  const next = new Set(prev);
                  next.add(row.id);
                  return next;
                });

                try {
                  await deleteProduct(row.id).unwrap();
                } catch (e) {
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
            <AdminButton variant="outline" onClick={() => refetch()} disabled={isFetching}>
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

      {isLoading && <div className="bg-white border rounded-xl p-4">Loading products...</div>}

      {isError && (
        <div className="bg-white border rounded-xl p-4">
          <div className="font-semibold text-red-600">Failed to load products</div>
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
          <div className="text-sm text-gray-600 mt-1">Create a product to get started.</div>
        </div>
      )}

      {/* ✅ Table */}
{!isLoading && !isError && rows.length > 0 && (
  <>
    <Table
      columns={columns}
      data={rows}
    />

    {/* ✅ Pagination BELOW table (like Categories) */}
    <div className="mt-3">
      <AdminPagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s);
          setPage(1);
        }}
      />
    </div>
  </>
)}

    </>
  );
};

export default Products;
