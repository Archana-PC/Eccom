import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";
import RoleForm from "./RoleForm";

import { useGetRoleQuery, useUpdateRoleMutation } from "../../services/adminApi";
import { useGetAdminCategoriesQuery } from "../../services/catalog/adminCategoryApi";

const EditRolePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const loginPermissions = useAppSelector((s) => s.auth.permissions);

  const { data: categoriesData, isFetching: catLoading } = useGetAdminCategoriesQuery();

  const { data: role, isLoading, isError, error, refetch, isFetching } = useGetRoleQuery(id);
  const [updateRole, { isLoading: saving, isError: saveErr, error: saveError }] =
    useUpdateRoleMutation();

  const handleUpdate = async (payload) => {
    try {
      await updateRole({ id, ...payload }).unwrap();
      navigate("/admin/roles", { state: { updatedRole: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Role" />

      {isLoading && <div className="p-4 rounded-lg border bg-white">Loading role...</div>}

      {isError && (
        <div className="p-4 rounded-lg border bg-white">
          <div className="font-semibold text-red-600">Failed to load role</div>
          <div className="text-sm text-gray-600 mt-1">
            {error?.data?.detail || error?.error || "Unknown error"}
          </div>
          <div className="mt-3 flex gap-2">
            <AdminButton onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Retrying..." : "Try again"}
            </AdminButton>
            <AdminButton variant="secondary" onClick={() => navigate("/admin/roles")}>
              Back
            </AdminButton>
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <Permission action="change" entity="adminrole">
          <div className="max-w-5xl">
            <RoleForm
              initialValues={role}
              categoriesData={categoriesData}
              loginPermissions={loginPermissions}
              submitLabel="Update Role"
              loading={saving || catLoading}
              apiError={saveErr ? saveError : null}
              onSubmit={handleUpdate}
              onCancel={() => navigate("/admin/roles")}
            />
          </div>
        </Permission>
      )}
    </div>
  );
};

export default EditRolePage;
