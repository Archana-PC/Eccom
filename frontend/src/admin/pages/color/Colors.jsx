import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import {
  useGetColorsQuery,
  useDeleteColorMutation,
} from "../../services/catalog/adminAttributesApi";
import AdminPagination from "../../components/ui/AdminPagination";

const Colors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetColorsQuery({ page, page_size: pageSize });
  const rows = data?.results ?? [];
  const total = data?.count ?? 0;

  const [deleteColor] = useDeleteColorMutation();
  const [deletedIds, setDeletedIds] = useState(new Set());

  useEffect(() => {
    if (
      location.state?.newColor ||
      location.state?.created ||
      location.state?.updated
    ) {
      refetch();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  const colors = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const tableData = useMemo(
    () => colors.filter((c) => !deletedIds.has(c.id)),
    [colors, deletedIds]
  );

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this color?");
    if (!ok) return;

    setDeletedIds((prev) => new Set(prev).add(id));

    try {
      await deleteColor(id).unwrap();
    } catch (e) {
      console.error("Delete color failed", e);
      setDeletedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const columns = [
    { key: "name", label: "Color Name" },

    // ✅ hex_code column added (minimal UI)
    {
      key: "hex_code",
      label: "Hex",
      render: (row) => (
        <div className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded border"
            style={{ backgroundColor: row?.hex_code || "#000000" }}
          />
          <span className="text-sm">{row?.hex_code || "-"}</span>
        </div>
      ),
    },

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
          <Permission action="change" entity="color">
            <AdminButton
              size="sm"
              variant="secondary"
              onClick={() => navigate(`/admin/colors/${row.id}/edit`)}
            >
              Edit
            </AdminButton>
          </Permission>

          <Permission action="delete" entity="color">
            <AdminButton
              variant="danger"
              size="sm"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </AdminButton>
          </Permission>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Colors"
        actions={
          <div className="flex gap-2">
            <AdminButton
              variant="secondary"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>

            <Permission action="add" entity="color">
              <AdminButton onClick={() => navigate("/admin/colors/create")}>
                + Add Color
              </AdminButton>
            </Permission>
          </div>
        }
      />

      {isLoading && (
        <div className="p-4 rounded-lg border bg-white">Loading colors...</div>
      )}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">
            Failed to load colors
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3">
            <AdminButton onClick={() => refetch()}>Try again</AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && tableData.length === 0 && (
        <div className="p-6 rounded-lg border bg-white text-center">
          <div className="text-lg font-semibold">No colors found</div>
          <div className="text-sm text-gray-600 mt-1">
            Create a color to start.
          </div>
        </div>
      )}

      {!isLoading && !isError && tableData.length > 0 && (
        <>
          <Table columns={columns} data={rows} />

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

export default Colors;
