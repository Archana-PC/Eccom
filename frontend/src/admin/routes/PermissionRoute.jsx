import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const PermissionRoute = ({ permission }) => {
  const { user, loading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  // 🔹 auth safety
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // 🔹 super admin bypass
  if (user?.is_superadmin) {
    return <Outlet />;
  }

  // 🔹 permission check
  if (!user?.permissions?.includes(permission)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default PermissionRoute;
