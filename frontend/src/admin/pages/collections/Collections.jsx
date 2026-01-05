import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import { useDeleteCollectionMutation, useGetCollectionsQuery } from "../../services/catalog/adminCollectionApi";


const Collections = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetCollectionsQuery();

  const [deleteCollection] = useDeleteCollectionMutation();
  const [deletedIds, setDeletedIds] = useState(new Set());

  useEffect(() => {
    if (location.state?.created || location.state?.updated) {
      refetch();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  const collections = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const tableData = useMemo(
    () => collections.filter((x) => !deletedIds.has(x.id)),
    [collections, deletedIds]
  );

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this collection?");
    if (!ok) return;

    setDeletedIds((prev) => new Set(prev).add(id)); // optimistic UI hide
    try {
      await deleteCollection(id).unwrap();
    } catch (e) {
      console.error("Delete collection failed", e);
      setDeletedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const columns = [
    { key: "name", label: "Collection Name" },
    { key: "code", label: "Code", render: (row) => row?.code || <span className="text-gray-400">—</span> },
    {
      key: "description",
      label: "Description",
      render: (row) =>
        row?.description ? (
          <span className="line-clamp-2">{row.description}</span>
        ) : (
          <span className="text-gray-400">—</span>
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
          <Permission action="change" entity="collection">
            <AdminButton size="sm" onClick={() => navigate(`/admin/collections/${row.id}/edit`)}>
              Edit
            </AdminButton>
          </Permission>

          <Permission action="delete" entity="collection">
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
        title="Collections"
        actions={
          <div className="flex gap-2">
            <AdminButton variant="secondary" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>

            <Permission action="add" entity="collection">
              <AdminButton onClick={() => navigate("/admin/collections/create")}>
                + Add Collection
              </AdminButton>
            </Permission>
          </div>
        }
      />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading collections...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load collections</div>
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
          <div className="text-lg font-semibold">No collections found</div>
          <div className="text-sm text-gray-600 mt-1">Create a collection to start.</div>
        </div>
      )}

      {!isLoading && !isError && tableData.length > 0 && (
        <Table columns={columns} data={tableData} />
      )}
    </div>
  );
};

export default Collections;
