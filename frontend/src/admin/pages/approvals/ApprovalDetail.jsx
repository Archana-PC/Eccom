import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageHeader from "../../components/ui/PageHeader";
import AdminButton from "../../components/ui/AdminButton";
import Permission from "../../components/ui/Permission";
import { useApproveApprovalMutation, useCommentApprovalMutation, useGetApprovalQuery, useRejectApprovalMutation } from "../../services/approvalApi";

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

const ApprovalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isSuperAdmin, permissions = [] } = useSelector((s) => s.auth);

  const { data, isLoading, isError, error, refetch, isFetching } = useGetApprovalQuery(id);

  const [commentText, setCommentText] = useState("");
  const [decisionText, setDecisionText] = useState("");

  const [commentApproval, { isLoading: commenting }] = useCommentApprovalMutation();
  const [approveApproval, { isLoading: approving }] = useApproveApprovalMutation();
  const [rejectApproval, { isLoading: rejecting }] = useRejectApprovalMutation();

  // show decision box if super admin OR user has change_approvalinstance permission
  const canDecide = useMemo(() => {
    if (isSuperAdmin) return true;
    return permissions.includes("change_approvalinstance");
  }, [isSuperAdmin, permissions]);

  const onSubmitComment = async () => {
    if (!commentText.trim()) return;
    try {
      await commentApproval({ id, comment: commentText.trim() }).unwrap();
      setCommentText("");
    } catch (e) {}
  };

  const onApprove = async () => {
    try {
      await approveApproval({ id, comment: decisionText.trim() }).unwrap();
      setDecisionText("");
    } catch (e) {}
  };

  const onReject = async () => {
    try {
      await rejectApproval({ id, comment: decisionText.trim() }).unwrap();
      setDecisionText("");
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Approval Detail"
        actions={
          <div className="flex gap-2">
            <AdminButton variant="secondary" onClick={() => navigate(-1)}>
              Back
            </AdminButton>
            <AdminButton variant="secondary" onClick={refetch} disabled={isFetching}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </AdminButton>
          </div>
        }
      />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load approval</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
        </div>
      )}

      {!isLoading && !isError && data && (
        <>
          {/* Summary */}
          <div className="bg-white border rounded-xl p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{data.entity_ref}</div>
                <div className="text-sm text-gray-600">
                  {data.workflow_name} • {data.step_name} • Pending with{" "}
                  <span className="font-medium">{data.required_role}</span>
                </div>
              </div>
              <div>{statusBadge(data.status)}</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border rounded-xl p-5">
            <div className="font-semibold mb-3">Timeline</div>

            {Array.isArray(data.actions) && data.actions.length > 0 ? (
              <div className="space-y-3">
                {data.actions.map((a) => (
                  <div key={a.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        {(a.action || "").toUpperCase()} • {a.performed_by_name || "—"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {a.performed_at ? new Date(a.performed_at).toLocaleString() : "—"}
                      </div>
                    </div>
                    {a.comment ? (
                      <div className="text-sm text-gray-700 mt-2">{a.comment}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-600">No actions yet.</div>
            )}
          </div>

          {/* Comment box (Tech Designer / others) */}
          <Permission allow="add_approvalaction">
            <div className="bg-white border rounded-xl p-5">
              <div className="font-semibold mb-3">Add Comment</div>

              <textarea
                className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write comment for Admin review..."
              />

              <div className="pt-3">
                <AdminButton onClick={onSubmitComment} disabled={commenting}>
                  {commenting ? "Submitting..." : "Submit Comment"}
                </AdminButton>
              </div>
            </div>
          </Permission>

          {/* Admin decision */}
          {canDecide && (
            <div className="bg-white border rounded-xl p-5">
              <div className="font-semibold mb-3">Admin Decision</div>

              <textarea
                className="w-full border rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                rows={3}
                value={decisionText}
                onChange={(e) => setDecisionText(e.target.value)}
                placeholder="Optional comment..."
              />

              <div className="flex gap-2 pt-3">
                <AdminButton onClick={onApprove} disabled={approving}>
                  {approving ? "Approving..." : "Approve"}
                </AdminButton>

                <AdminButton variant="danger" onClick={onReject} disabled={rejecting}>
                  {rejecting ? "Rejecting..." : "Reject"}
                </AdminButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApprovalDetail;
