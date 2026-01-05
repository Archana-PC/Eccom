import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import FabricForm from "./FabricForm";
import { useGetFabricQuery, useUpdateFabricMutation } from "../../services/catalog/adminAttributesApi";

const EditFabric = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch, isFetching } = useGetFabricQuery(id);
  const [updateFabric, { isLoading: saving, isError: saveErr, error: saveError }] =
    useUpdateFabricMutation();

  const handleUpdate = async (payload) => {
    try {
      await updateFabric({ id, ...payload }).unwrap();
      navigate("/admin/fabrics", { state: { updated: true } });
    } catch {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Fabric" />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading fabric...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load fabric</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3 flex gap-2">
            <AdminButton onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => navigate("/admin/fabrics")}>
              Back
            </AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        // ✅ Permission mandatory
        <Permission action="change" entity="fabric">
          <div className="max-w-2xl">
            <FabricForm
              mode="edit"
              initialValues={data}
              submitLabel="Update Fabric"
              loading={saving}
              apiError={saveErr ? saveError : null}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/admin/fabrics")}
            />
          </div>
        </Permission>
      )}
    </div>
  );
};

export default EditFabric;
