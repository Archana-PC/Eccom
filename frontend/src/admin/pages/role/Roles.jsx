import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetRolesQuery } from "../../services/adminApi";
import Permission from "../../components/ui/Permission";
import PageHeader from "../../components/ui/PageHeader";
import Table from "../../components/ui/Table";
import AdminButton from "../../components/ui/AdminButton";
import AdminPagination from "../../components/ui/AdminPagination";

const Roles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const { data, isLoading, isError, error, refetch, isFetching  } = useGetRolesQuery({ page, page_size: pageSize });

  const rows = data?.results ?? [];
  const total = data?.count ?? 0;

 

  // ✅ Optional: local delete hide (UI only)
  const [deletedIds, setDeletedIds] = useState(new Set());

  // ✅ If you want to refetch after coming back from create page
  useEffect(() => {
    if (location.state?.newRole) {
      refetch();
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refetch]);

  // ✅ Normalize API response -> always an array
  const roles = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  // ✅ Apply local delete filter
  const tableData = useMemo(() => {
    return roles.filter((r) => !deletedIds.has(r.id));
  }, [roles, deletedIds]);

  // ✅ Render permissions nicely (works with permission_codenames OR permissions)
  const renderPermissions = (row) => {
    const perms =
      row?.permission_codenames ??
      row?.permissions ??
      row?.permission_details?.map((p) => p.codename) ??
      [];

    if (!perms.length) return <span className="text-gray-400">—</span>;

    const first = perms.slice(0, 3);
    const extra = perms.length - first.length;

    return (
      <div className="flex flex-wrap gap-2">
        {first.map((p) => (
          <span
            key={p}
            className="px-2 py-1 text-xs rounded-full bg-gray-100 border"
            title={p}
          >
            {p}
          </span>
        ))}
        {extra > 0 && (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 border">
            +{extra}
          </span>
        )}
      </div>
    );
  };

  const columns = [
    { key: "name", label: "Role Name" },
    {
      key: "role",
      label: "Role",
      render: (row) => row?.role ?? <span className="text-gray-400">—</span>,
    },
    {
      key: "category",
      label: "Category",
      render: (row) => row?.category ?? <span className="text-gray-400">—</span>,
    },
    {
      key: "permissions",
      label: "Permissions",
      render: (row) => renderPermissions(row),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Permission action="change" entity="adminrole">
            <AdminButton size="sm"  variant="soft" onClick={() => navigate(`/admin/roles/${row.id}`)}>
              Edit
            </AdminButton>
          </Permission>

          <Permission action="delete" entity="adminrole">
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
    <div className="space-y-6">
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

            <Permission action="add" entity="adminrole">
              <AdminButton  variant="primary" onClick={() => navigate("/admin/roles/create")}>
                + Add Role
              </AdminButton>
            </Permission>
          </div>
        }
      />

      {/* ✅ Loading */}
      {isLoading && (
        <div className="p-4 rounded-lg border bg-white">Loading roles...</div>
      )}

      {/* ✅ Error */}
      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load roles</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3">
            <AdminButton onClick={() => refetch()}>Try again</AdminButton>
          </div>
        </div>
      )}

      {/* ✅ Empty */}
      {!isLoading && !isError && tableData.length === 0 && (
        <div className="p-6 rounded-lg border bg-white text-center">
          <div className="text-lg font-semibold">No roles found</div>
          <div className="text-sm text-gray-600 mt-1">
            Create a role to start assigning permissions.
          </div>
        </div>
      )}

      {/* ✅ Table */}
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

export default Roles;
