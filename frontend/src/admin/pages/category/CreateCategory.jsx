import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import CategoryForm from "./CategoryForm";
import {
  useCreateCategoryMutation,
  useGetAdminCategoriesQuery,
 
} from "../../services/catalog/adminCategoryApi";

const CreateCategoryPage = () => {
  const navigate = useNavigate();

  const { data: categoriesData, isFetching: catsFetching } = useGetAdminCategoriesQuery();
  const [createCategory, { isLoading, isError, error }] = useCreateCategoryMutation();

  const handleCreate = async (payload) => {
    try {
      await createCategory(payload).unwrap();
      navigate("/admin/categories", { state: { newCategory: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create Category" />

      {/* ✅ Permission is mandatory */}
      <Permission action="add" entity="category">
        <div className="max-w-2xl">
          <CategoryForm
            categoriesData={categoriesData}
            submitLabel="Create Category"
            loading={isLoading || catsFetching}
            apiError={isError ? error : null}
            onSubmit={handleCreate}
            onCancel={() => navigate(-1)}
          />
        </div>
      </Permission>
    </div>
  );
};

export default CreateCategoryPage;
