import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import RoleForm from "./RoleForm";

import { useCreateRoleMutation } from "../../services/adminApi";
import { useGetAdminCategoriesQuery } from "../../services/catalog/adminCategoryApi";

const CreateRolePage = () => {
  const navigate = useNavigate();

  // login-time permissions
  const loginPermissions = useAppSelector((s) => s.auth.permissions);

  const { data: categoriesData, isFetching: catLoading } = useGetAdminCategoriesQuery();
  const [createRole, { isLoading, isError, error }] = useCreateRoleMutation();

  const handleCreate = async (payload) => {
    try {
      await createRole(payload).unwrap();
      navigate("/admin/roles", { state: { newRole: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create Role" />

      {/* ✅ permission mandatory */}
      <Permission action="add" entity="adminrole">
        <div className="max-w-5xl">
          <RoleForm
            categoriesData={categoriesData}
            loginPermissions={loginPermissions}
            submitLabel="Create Role"
            loading={isLoading || catLoading}
            apiError={isError ? error : null}
            onSubmit={handleCreate}
            onCancel={() => navigate(-1)}
          />
        </div>
      </Permission>
    </div>
  );
};

export default CreateRolePage;
