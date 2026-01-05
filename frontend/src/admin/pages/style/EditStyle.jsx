import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import StyleForm from "./StyleForm";
import {
  useGetStyleQuery,
  useUpdateStyleMutation,
} from "../../services/catalog/adminAttributesApi";

const EditStyle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch, isFetching } = useGetStyleQuery(id);
  const [updateStyle, { isLoading: saving, isError: saveErr, error: saveError }] =
    useUpdateStyleMutation();

  const handleUpdate = async (payload) => {
    try {
      await updateStyle({ id, ...payload }).unwrap();
      navigate("/admin/styles", { state: { updated: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Style" />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading style...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load style</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3 flex gap-2">
            <AdminButton onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => navigate("/admin/styles")}>
              Back
            </AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        // ✅ Permission mandatory for edit
        <Permission action="change" entity="style">
          <div className="max-w-2xl">
            <StyleForm
              initialValues={data}
              showSlug
              submitLabel="Update Style"
              loading={saving}
              apiError={saveErr ? saveError : null}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/admin/styles")}
            />
          </div>
        </Permission>
      )}
    </div>
  );
};

export default EditStyle;
