import { useMemo,useState } from "react";
import { useNavigate } from "react-router-dom";
import Permission from "../../components/ui/Permission";
import Table from "../../components/ui/Table";
import PageHeader from "../../components/ui/PageHeader";
import { useGetUsersQuery } from "../../services/adminApi";
import AdminButton from "../../components/ui/AdminButton";
import AdminPagination from "../../components/ui/AdminPagination";

const UsersList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(20);

const { data, isLoading, isError, error, refetch, isFetching} = useGetUsersQuery({ page, page_size: pageSize });

const tableData = data?.results ?? [];
const total = data?.count ?? 0;

  // const { data, isLoading, isError, error, refetch, isFetching } =
  //   useGetUsersQuery(undefined, { refetchOnMountOrArgChange: true });

  // ✅ normalize response
  const users = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const columns = [
    { key: "employee_id", label: "Employee ID", render: (row) => row?.employee_id ?? "—" },
    { key: "full_name", label: "Full Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row) => row?.role ?? row?.role_group?.role ?? "—",
    },
    {
      key: "category",
      label: "Category",
      render: (row) => row?.category ?? row?.role_group?.category ?? "—",
    },
    {
      key: "is_active",
      label: "Active",
      render: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full border ${
            row?.is_active ? "bg-gray-100" : "bg-gray-50 text-gray-400"
          }`}
        >
          {row?.is_active ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "is_staff",
      label: "Staff",
      render: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full border ${
            row?.is_staff ? "bg-gray-100" : "bg-gray-50 text-gray-400"
          }`}
        >
          {row?.is_staff ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Permission action="change" entity="user">
            <AdminButton size="sm" 
            variant="secondary"
            onClick={() => navigate(`/admin/users/${row.id}`)}>
              Edit
            </AdminButton>
          </Permission>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        actions={
          <div className="flex gap-2">
            <AdminButton variant="secondary" onClick={refetch} disabled={isFetching}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>

            <Permission action="add_user" >
              <AdminButton onClick={() => navigate("/admin/users/create")}>
                + Add User
              </AdminButton>
            </Permission>
          </div>
        }
      />

      {isLoading && (
        <div className="p-4 rounded-lg border bg-white">Loading users...</div>
      )}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load users</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3">
            <AdminButton onClick={refetch}>Try again</AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && users.length === 0 && (
        <div className="p-6 rounded-lg border bg-white text-center">
          <div className="text-lg font-semibold">No users found</div>
          <div className="text-sm text-gray-600 mt-1">
            Create a user to get started.
          </div>
        </div>
      )}

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

export default UsersList;
