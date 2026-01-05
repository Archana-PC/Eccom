
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import {
  useGetCollectionQuery,
  useUpdateCollectionMutation,
} from "../../services/catalog/adminCollectionApi";
import CollectionForm from "./CollectionForm";

const EditCollectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch, isFetching } = useGetCollectionQuery(id);
  const [updateCollection, { isLoading: saving, isError: saveErr, error: saveError }] =
    useUpdateCollectionMutation();

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (!data) return;
    setInitialValues({
      name: data?.name || "",
      code: data?.code || "",
      description: data?.description || "",
      is_active: !!data?.is_active,
    });
  }, [data]);

  const handleUpdate = async (payload) => {
    try {
      await updateCollection({ id, ...payload }).unwrap();
      navigate("/admin/collections", { state: { updated: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Collection" />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading collection...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load collection</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3 flex gap-2">
            <AdminButton onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => navigate("/admin/collections")}>
              Back
            </AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        // ✅ Permission is mandatory for edit
        <Permission action="change" entity="collection">
          <div className="max-w-2xl">
            <CollectionForm
              initialValues={initialValues}
              submitLabel="Update Collection"
              loading={saving}
              apiError={saveErr ? saveError : null}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/admin/collections")}
            />
          </div>
        </Permission>
      )}
    </div>
  );
};

export default EditCollectionPage;
