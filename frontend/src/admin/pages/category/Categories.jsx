import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Button from "../../../shared/Button/Button";
import Permission from "../../components/ui/Permission";

import { useGetCategoriesQuery } from "../../../services/catalog/catalogApi";

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetCategoriesQuery();

  // ✅ Optional: local delete hide (UI only)
  const [deletedIds, setDeletedIds] = useState(new Set());

  // ✅ Refetch after coming back from create page
  useEffect(() => {
    if (location.state?.newCategory) {
      refetch();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  // ✅ Normalize API response -> always an array
  const categories = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  // ✅ Apply local delete filter
  const tableData = useMemo(() => {
    return categories.filter((c) => !deletedIds.has(c.id));
  }, [categories, deletedIds]);

  // ✅ helper: show parent name safely (depends on your backend shape)
  const renderParent = (row) => {
    const parent =
      row?.parent_name ??
      row?.parent?.name ??
      row?.parent ??
      null;

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
            <Button
              size="sm"
              onClick={() => navigate(`/admin/categories/${row.id}`)}
            >
              Edit
            </Button>
          </Permission>

          <Permission action="delete" entity="category">
            <Button
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
            </Button>
          </Permission>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        actions={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </Button>

            <Permission action="add" entity="category">
              <Button onClick={() => navigate("/admin/categories/create")}>
                + Add Category
              </Button>
            </Permission>
          </div>
        }
      />

      {/* ✅ Loading */}
      {isLoading && (
        <div className="p-4 rounded-lg border bg-white">Loading categories...</div>
      )}

      {/* ✅ Error */}
      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load categories</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3">
            <Button onClick={() => refetch()}>Try again</Button>
          </div>
        </div>
      )}

      {/* ✅ Empty */}
      {!isLoading && !isError && tableData.length === 0 && (
        <div className="p-6 rounded-lg border bg-white text-center">
          <div className="text-lg font-semibold">No categories found</div>
          <div className="text-sm text-gray-600 mt-1">
            Create a category to start organizing products.
          </div>
        </div>
      )}

      {/* ✅ Table */}
      {!isLoading && !isError && tableData.length > 0 && (
        <Table columns={columns} data={tableData} />
      )}
    </div>
  );
};

export default Categories;
