import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import MaterialForm from "./MaterialForm";
import { useGetMaterialQuery, useUpdateMaterialMutation } from "../../services/catalog/adminAttributesApi";

const EditMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch, isFetching } = useGetMaterialQuery(id);
  const [updateMaterial, { isLoading: saving, isError: saveErr, error: saveError }] =
    useUpdateMaterialMutation();

  const handleUpdate = async (payload) => {
    try {
      await updateMaterial({ id, ...payload }).unwrap();
      navigate("/admin/materials", { state: { updated: true } });
    } catch {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Material" />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading material...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load material</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3 flex gap-2">
            <AdminButton onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => navigate("/admin/materials")}>
              Back
            </AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        // ✅ Permission mandatory (wrap whole form)
        <Permission action="change" entity="material">
          <div className="max-w-2xl">
            <MaterialForm
              initialValues={data}
              submitLabel="Update Material"
              loading={saving}
              apiError={saveErr ? saveError : null}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/admin/materials")}
            />
          </div>
        </Permission>
      )}
    </div>
  );
};

export default EditMaterial;
