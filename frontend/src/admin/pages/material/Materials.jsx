import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import {
  useGetMaterialsQuery,
  useDeleteMaterialMutation,
} from "../../services/catalog/adminAttributesApi";
import AdminPagination from "../../components/ui/AdminPagination";

const Materials = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetMaterialsQuery({ page, page_size: pageSize });
  const rows = data?.results ?? [];
  const total = data?.count ?? 0;

  const [deleteMaterial] = useDeleteMaterialMutation();
  const [deletedIds, setDeletedIds] = useState(new Set());

  useEffect(() => {
    if (location.state?.newMaterial || location.state?.created) {
      refetch();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  const materials = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const tableData = useMemo(
    () => materials.filter((m) => !deletedIds.has(m.id)),
    [materials, deletedIds]
  );

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this material?");
    if (!ok) return;

    setDeletedIds((prev) => new Set(prev).add(id));

    try {
      await deleteMaterial(id).unwrap();
    } catch (e) {
      console.error("Delete material failed", e);
      setDeletedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const columns = [
    { key: "name", label: "Material Name" },
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
          <Permission action="change" entity="material">
            <AdminButton
              size="sm"
              variant="secondary"
              onClick={() => navigate(`/admin/materials/${row.id}/edit`)}
            >
              Edit
            </AdminButton>
          </Permission>

          <Permission action="delete" entity="material">
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
        title="Materials"
        actions={
          <div className="flex gap-2">
            <AdminButton
              variant="secondary"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>

            <Permission action="add" entity="material">
              <AdminButton onClick={() => navigate("/admin/materials/create")}>
                + Add Material
              </AdminButton>
            </Permission>
          </div>
        }
      />

      {isLoading && (
        <div className="p-4 rounded-lg border bg-white">
          Loading materials...
        </div>
      )}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">
            Failed to load materials
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
          <div className="text-lg font-semibold">No materials found</div>
          <div className="text-sm text-gray-600 mt-1">
            Create a material to start.
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

export default Materials;
