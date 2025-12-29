
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import { useCreateUserMutation, useGetRolesQuery } from "../../services/adminApi";
import UserForm from "./UserForm";

const CreateUserPage = () => {
  const navigate = useNavigate();

  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();
  const roles = useMemo(() => {
    if (!rolesData) return [];
    if (Array.isArray(rolesData)) return rolesData;
    if (Array.isArray(rolesData?.results)) return rolesData.results;
    if (Array.isArray(rolesData?.data)) return rolesData.data;
    return [];
  }, [rolesData]);

  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();

  const handleCreate = async (payload) => {
    try {
      await createUser(payload).unwrap();
      navigate("/admin/users");
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create User" />

      <Permission action="add" entity="user">
        <div className="max-w-2xl">
          <UserForm
            roles={roles}
            submitLabel="Create User"
            loading={isLoading || rolesLoading}
            apiError={isError ? error : null}
            onSubmit={handleCreate}
            onCancel={() => navigate(-1)}
          />
        </div>
      </Permission>
    </div>
  );
};

export default CreateUserPage;
