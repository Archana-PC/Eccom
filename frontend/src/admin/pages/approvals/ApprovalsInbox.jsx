import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import AdminButton from "../../components/ui/AdminButton";
import AdminPagination from "../../components/ui/AdminPagination";
import { useGetApprovalsQuery } from "../../services/approvalApi";
import Table from "../../components/ui/Table";

const Badge = ({ text, tone = "gray" }) => {
  const map = {
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-200",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full border ${map[tone] || map.gray}`}>
      {text}
    </span>
  );
};

const statusBadge = (s) => {
  if (s === "APPROVED") return <Badge tone="green" text="Approved" />;
  if (s === "REJECTED") return <Badge tone="red" text="Rejected" />;
  return <Badge tone="yellow" text="In Progress" />;
};

const ApprovalsInbox = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetApprovalsQuery({ page, page_size: pageSize });

  const tableData = data?.results ?? [];
  const total = data?.count ?? 0;

  const approvals = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data)) return data;
    return [];
  }, [data]);

  const columns = [
    { key: "entity_ref", label: "Ref" },
    { key: "entity_type", label: "Type" },
    { key: "workflow_name", label: "Workflow" },
    { key: "step_name", label: "Step" },
    { key: "required_role", label: "Pending With" },
    { key: "status", label: "Status", render: (row) => statusBadge(row?.status) },
    {
      key: "created_at",
      label: "Created",
      render: (row) => (row?.created_at ? new Date(row.created_at).toLocaleString() : "—"),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <AdminButton
            size="sm"
            variant="secondary"
            onClick={() => navigate(`/approvals/${row.id}`)}
          >
            View
          </AdminButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approvals Inbox"
        actions={
          <div className="flex gap-2">
            <AdminButton variant="secondary" onClick={refetch} disabled={isFetching}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>
          </div>
        }
      />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading approvals...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load approvals</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3">
            <AdminButton onClick={refetch}>Try again</AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && approvals.length === 0 && (
        <div className="p-6 rounded-lg border bg-white text-center">
          <div className="text-lg font-semibold">No approvals found</div>
          <div className="text-sm text-gray-600 mt-1">Nothing pending right now.</div>
        </div>
      )}

      {!isLoading && !isError && tableData.length > 0 && (
        <>
          <Table columns={columns} data={tableData} />

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

export default ApprovalsInbox;
