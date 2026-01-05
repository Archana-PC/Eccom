import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import AdminPagination from "../../components/ui/AdminPagination"; // ✅ add this
import { useGetAdminCategoriesQuery } from "../../services/catalog/adminCategoryApi";



const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // ✅ fetch with paging
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAdminCategoriesQuery({ page, page_size: pageSize });

  // ✅ Optional: local delete hide (UI only)
  const [deletedIds, setDeletedIds] = useState(new Set());

  // ✅ Refetch after coming back from create page
  useEffect(() => {
    if (location.state?.newCategory) {
      setPage(1);          // ✅ go to first page
      refetch();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  // ✅ IMPORTANT: with DRF pagination use results
  const categories = useMemo(() => data?.results ?? [], [data]);

  // ✅ total count from backend
  const total = data?.count ?? 0;

  // ✅ Apply local delete filter
  const tableData = useMemo(() => {
    return categories.filter((c) => !deletedIds.has(c.id));
  }, [categories, deletedIds]);

  const renderParent = (row) => {
    const parent = row?.parent_name ?? row?.parent?.name ?? row?.parent ?? null;
    if (!parent) return <span className="text-gray-400">—</span>;
    return <span>{parent}</span>;
  };

  const columns = [
    { key: "name", label: "Category Name" },
    { key: "parent", label: "Parent", render: (row) => renderParent(row) },
    {
      key: "is_active",
      label: "Status",
      render: (row) =>
        row?.is_active ? (
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
          <Permission action="change" entity="category">
            <AdminButton
              size="sm"
              variant="secondary"
              onClick={() => navigate(`/admin/categories/${row.id}`)}
            >
              Edit
            </AdminButton>
          </Permission>

          <Permission action="delete" entity="category">
            <AdminButton
              variant="danger"
              size="sm"
              onClick={() =>
                setDeletedIds((prev) => {
                  const next = new Set(prev);
                  next.add(row.id);
                  return next;
                })
              }
            >
              Delete
            </AdminButton>
          </Permission>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <PageHeader
        
        subtitle={`Total: ${total}`}
        actions={
          <div className="flex gap-2">
            <AdminButton
              variant="secondary"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>

            <Permission action="add" entity="category">
              <AdminButton onClick={() => navigate("/admin/categories/create")}>
                + Add Category
              </AdminButton>
            </Permission>
          </div>
        }
      />

      {/* Loading */}
      {isLoading && (
        <div className="p-4 rounded-lg border bg-white">Loading categories...</div>
      )}

      {/* Error */}
      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load categories</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3">
            <AdminButton onClick={() => refetch()}>Try again</AdminButton>
          </div>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && tableData.length === 0 && (
        <div className="p-6 rounded-lg border bg-white text-center">
          <div className="text-lg font-semibold">No categories found</div>
          <div className="text-sm text-gray-600 mt-1">
            Create a category to start organizing products.
          </div>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && tableData.length > 0 && (
        <>
          <Table columns={columns} data={tableData} />

          {/* ✅ Pagination UI */}
          <div className="pt-3">
            <AdminPagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
