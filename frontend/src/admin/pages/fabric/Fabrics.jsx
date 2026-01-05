import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import {
  useGetFabricsQuery,
  useDeleteFabricMutation,
} from "../../services/catalog/adminAttributesApi";
import AdminPagination from "../../components/ui/AdminPagination";

const Fabrics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetFabricsQuery({ page, page_size: pageSize });

  const rows = data?.results ?? [];
  const total = data?.count ?? 0;

  const [deleteFabric] = useDeleteFabricMutation();
  const [deletedIds, setDeletedIds] = useState(new Set());

  useEffect(() => {
    if (location.state?.newFabric || location.state?.created || location.state?.updated) {
      refetch();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  const fabrics = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const tableData = useMemo(
    () => fabrics.filter((f) => !deletedIds.has(f.id)),
    [fabrics, deletedIds]
  );

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this fabric?");
    if (!ok) return;

    setDeletedIds((prev) => new Set(prev).add(id));

    try {
      await deleteFabric(id).unwrap();
    } catch (e) {
      console.error("Delete fabric failed", e);
      setDeletedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const columns = [
    { key: "name", label: "Fabric Name" },
    { key: "slug", label: "Slug" },

    {
      key: "flags",
      label: "Flags",
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row?.is_natural && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-50 border border-blue-200">
              Natural
            </span>
          )}
          {row?.is_stretch && (
            <span className="px-2 py-1 text-xs rounded-full bg-purple-50 border border-purple-200">
              Stretch
            </span>
          )}
          {!row?.is_natural && !row?.is_stretch && (
            <span className="text-xs text-gray-500">—</span>
          )}
        </div>
      ),
    },

    {
      key: "weight",
      label: "Weight",
      render: (row) => row?.weight ? <span>{row.weight}</span> : <span className="text-gray-500">—</span>,
    },

    {
      key: "deleted_at",
      label: "Deleted",
      render: (row) =>
        row?.deleted_at ? (
          <span className="px-2 py-1 text-xs rounded-full bg-red-50 border border-red-200">
            Deleted
          </span>
        ) : (
          <span className="px-2 py-1 text-xs rounded-full bg-green-50 border border-green-200">
            Not Deleted
          </span>
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
          <Permission action="change" entity="fabric">
            <AdminButton size="sm" 
            variant="secondary"
            onClick={() => navigate(`/admin/fabrics/${row.id}/edit`)}>
              Edit
            </AdminButton>
          </Permission>

          <Permission action="delete" entity="fabric">
            <AdminButton variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
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
        title="Fabrics"
        actions={
          <div className="flex gap-2">
            <AdminButton variant="secondary" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>

            <Permission action="add" entity="fabric">
              <AdminButton onClick={() => navigate("/admin/fabrics/create")}>
                + Add Fabric
              </AdminButton>
            </Permission>
          </div>
        }
      />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading fabrics...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load fabrics</div>
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
          <div className="text-lg font-semibold">No fabrics found</div>
          <div className="text-sm text-gray-600 mt-1">Create a fabric to start.</div>
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

export default Fabrics;
