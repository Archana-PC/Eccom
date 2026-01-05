import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import ColorForm from "./ColorForm";
import { useGetColorQuery, useUpdateColorMutation } from "../../services/catalog/adminAttributesApi";

const EditColor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch, isFetching } = useGetColorQuery(id);
  const [updateColor, { isLoading: saving, isError: saveErr, error: saveError }] =
    useUpdateColorMutation();

  const handleUpdate = async (payload) => {
    try {
      await updateColor({ id, ...payload }).unwrap();
      navigate("/admin/colors", { state: { updated: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Color" />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading color...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load color</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3 flex gap-2">
            <AdminButton onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => navigate("/admin/colors")}>
              Back
            </AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        // ✅ Permission mandatory (wrap the whole form)
        <Permission action="change" entity="color">
          <div className="max-w-2xl">
            <ColorForm
              initialValues={data}
              submitLabel="Update Color"
              loading={saving}
              apiError={saveErr ? saveError : null}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/admin/colors")}
            />
          </div>
        </Permission>
      )}
    </div>
  );
};

export default EditColor;
