import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const AdminProtectedRoute = () => {
  const { isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
