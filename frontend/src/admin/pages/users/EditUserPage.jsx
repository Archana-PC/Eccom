import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import UserForm from "./UserForm";
import { useGetRolesQuery, useGetUserQuery, useUpdateUserMutation } from "../../services/adminApi";
import { PERMISSIONS } from "../../constants/permissions";


const normalize = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();
  const roles = useMemo(() => normalize(rolesData), [rolesData]);

  const { data: user, isLoading, isError, error, refetch, isFetching } =
    useGetUserQuery(id);

  const [updateUser, { isLoading: saving, isError: saveErr, error: saveError }] =
    useUpdateUserMutation();

  const handleUpdate = async (payload) => {
    try {
      await updateUser({ id, ...payload }).unwrap();
      navigate("/admin/users");
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit User" />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading user...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load user</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3 flex gap-2">
            <AdminButton onClick={refetch} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => navigate("/admin/users")}>
              Back
            </AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        // ✅ Permission mandatory for edit
        <Permission 
        allow={PERMISSIONS.USER.ADD}
        action="add_user" entity="user">
          <div className="max-w-2xl">
            <UserForm
              roles={roles}
              initialValues={user}
              submitLabel="Update User"
              loading={saving || rolesLoading}
              apiError={saveErr ? saveError : null}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/admin/users")}
            />
          </div>
        </Permission>
      )}
    </div>
  );
};

export default EditUserPage;
