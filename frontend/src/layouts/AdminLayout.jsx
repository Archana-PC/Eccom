import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../admin/layout/AdminSidebar";
import AdminHeader from "../admin/layout/AdminHeader";
import useMediaQuery from "../hooks/useMediaQuery";
import { useLogoutMutation } from "../services/auth/authApi";


export default function AdminLayout() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const [doLogout, { isLoading: logoutLoading }] = useLogoutMutation();

  // when you go desktop, close mobile drawer automatically
  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  const handleLogout = async () => {
    try {
      await doLogout().unwrap(); // calls backend + clears state (from onQueryStarted)
    } catch (e) {
      // even if api fails, we still redirect (your onQueryStarted can clear state)
    } finally {
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Render ONLY ONE sidebar */}
      {isDesktop ? (
        <AdminSidebar collapsed={collapsed} />
      ) : (
        <AdminSidebar
          collapsed={false}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader
          collapsed={collapsed}
          isDesktop={isDesktop}
          onToggleCollapsed={() => isDesktop && setCollapsed((v) => !v)}
          onOpenMobileSidebar={() => !isDesktop && setMobileOpen(true)}
          onLogout={logoutLoading ? undefined : handleLogout} // ✅ logout from header menu
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
