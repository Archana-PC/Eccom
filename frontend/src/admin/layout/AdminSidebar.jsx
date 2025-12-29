import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { sidebar } from "../config/sidebar";
import { ChevronRight, X } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function AdminSidebar({
  collapsed = false,
  mobileOpen = false,
  onCloseMobile = () => {},
}) {
  const { permissions = [], isSuperAdmin } = useSelector((s) => s.auth);
  const location = useLocation();
  const [open, setOpen] = useState({});

  // ✅ if mobile drawer is open, don't collapse labels
  const effectiveCollapsed = mobileOpen ? false : collapsed;

  const canSee = (perm) => isSuperAdmin || !perm || permissions.includes(perm);

  const visibleSidebar = useMemo(() => {
    return sidebar
      .map((item) => {
        if (item.children?.length) {
          const children = item.children.filter((c) => canSee(c.permission));
          if (!canSee(item.permission) && children.length === 0) return null;
          return { ...item, children };
        }
        return canSee(item.permission) ? item : null;
      })
      .filter(Boolean);
  }, [permissions, isSuperAdmin]);

  useEffect(() => {
    const next = {};
    visibleSidebar.forEach((item) => {
      if (item.children?.length) {
        const active = item.children.some((c) =>
          location.pathname.startsWith(c.path)
        );
        if (active) next[item.label] = true;
      }
    });
    setOpen((prev) => ({ ...prev, ...next }));
  }, [location.pathname, visibleSidebar]);

  useEffect(() => {
    if (mobileOpen) onCloseMobile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleGroup = (label) => setOpen((p) => ({ ...p, [label]: !p[label] }));

  const SidebarContent = (
    <div className="h-full flex flex-col bg-white text-slate-900 border-r border-slate-200">
      {/* ✅ Brand height matches header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
            SP
          </div>

          <div className={cx("leading-tight", effectiveCollapsed ? "hidden" : "block")}>
            <div className="font-semibold">Admin Panel</div>
            <div className="text-xs text-slate-500">Shark Plus</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onCloseMobile}
          className="md:hidden h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 inline-flex items-center justify-center"
          title="Close"
        >
          <X className="h-5 w-5 text-slate-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <div
          className={cx(
            "text-[11px] uppercase tracking-wider text-slate-400",
            effectiveCollapsed ? "px-2" : "px-3"
          )}
        >
          Menu
        </div>

        <nav className="mt-2 space-y-1">
          {visibleSidebar.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children?.length > 0;

            if (!hasChildren) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={effectiveCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    cx(
                      "group flex items-center gap-3 rounded-2xl transition",
                      effectiveCollapsed ? "px-3 py-3 justify-center" : "px-3 py-2.5",
                      isActive
                        ? "bg-slate-100 border border-slate-200"
                        : "hover:bg-slate-50"
                    )
                  }
                >
                  {Icon ? (
                    <Icon className="h-5 w-5 text-slate-700" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                  )}

                  {!effectiveCollapsed && (
                    <span className="text-sm font-medium text-slate-900">
                      {item.label}
                    </span>
                  )}

                  {!effectiveCollapsed && (
                    <span className="ml-auto opacity-0 group-hover:opacity-100 text-xs text-slate-400">
                      →
                    </span>
                  )}
                </NavLink>
              );
            }

            const isOpen = !!open[item.label];
            const isAnyChildActive = item.children.some((c) =>
              location.pathname.startsWith(c.path)
            );

            return (
              <div key={item.label} className="select-none">
                <button
                  type="button"
                  onClick={() => toggleGroup(item.label)}
                  title={effectiveCollapsed ? item.label : undefined}
                  className={cx(
                    "w-full flex items-center gap-3 rounded-2xl transition",
                    effectiveCollapsed ? "px-3 py-3 justify-center" : "px-3 py-2.5",
                    isAnyChildActive
                      ? "bg-slate-100 border border-slate-200"
                      : "hover:bg-slate-50"
                  )}
                >
                  {Icon ? (
                    <Icon className="h-5 w-5 text-slate-700" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                  )}

                  {!effectiveCollapsed && (
                    <>
                      <span className="text-sm font-medium">{item.label}</span>
                      <ChevronRight
                        className={cx(
                          "ml-auto h-4 w-4 text-slate-500 transition-transform",
                          isOpen ? "rotate-90" : ""
                        )}
                      />
                    </>
                  )}
                </button>

                {!effectiveCollapsed && isOpen && (
                  <div className="mt-1 ml-4 pl-2 border-l border-slate-200 space-y-1">
                    {item.children.map((child) => {
                      const CIcon = child.icon;
                      return (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            cx(
                              "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition",
                              isActive
                                ? "bg-slate-100 border border-slate-200"
                                : "hover:bg-slate-50 text-slate-700"
                            )
                          }
                        >
                          {CIcon ? (
                            <CIcon className="h-4 w-4 text-slate-500" />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          )}
                          <span>{child.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className={cx("p-3 border-t border-slate-200", effectiveCollapsed ? "px-2" : "px-3")}>
        <div className={cx("rounded-2xl bg-slate-50 border border-slate-200 p-3", effectiveCollapsed && "p-2")}>
          {!effectiveCollapsed ? (
            <>
              <div className="text-sm font-semibold text-slate-900">Quick Tip</div>
              <div className="text-xs text-slate-500 mt-1">
                Use collapse to focus on content.
              </div>
            </>
          ) : (
            <div className="h-8 w-full rounded-xl bg-slate-100" />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className={cx("hidden md:block h-screen sticky top-0", collapsed ? "w-20" : "w-72")}>
        {SidebarContent}
      </aside>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onCloseMobile} />
          <aside className="fixed left-0 top-0 h-screen w-[85vw] max-w-[320px] z-50 md:hidden shadow-2xl">
            {SidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
