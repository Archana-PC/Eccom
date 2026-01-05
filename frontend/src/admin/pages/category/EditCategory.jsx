import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import CategoryForm from "./CategoryForm";
import {

  
  useGetAdminRootCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../services/catalog/adminCategoryApi";

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: category, isLoading, isError, error, refetch, isFetching } =
    useGetCategoryByIdQuery(id);

  const { data: categoriesData, isFetching: catsFetching } = useGetAdminRootCategoriesQuery();
  const [updateCategory, { isLoading: saving, isError: saveErr, error: saveError }] =
    useUpdateCategoryMutation();

  const handleUpdate = async (payload) => {
    try {
      await updateCategory({ id, body: payload }).unwrap();
      navigate("/admin/categories", { state: { updatedCategory: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Category" />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading category...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load category</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3 flex gap-2">
            <AdminButton onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => navigate("/admin/categories")}>
              Back
            </AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        // ✅ Permission is mandatory
        <Permission action="change" entity="category">
          <div className="max-w-2xl">
            <CategoryForm
              categoriesData={categoriesData}
              currentId={id}
              initialValues={category}
              submitLabel="Update Category"
              loading={saving || catsFetching}
              apiError={saveErr ? saveError : null}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/admin/categories")}
            />
          </div>
        </Permission>
      )}
    </div>
  );
};

export default EditCategoryPage;
