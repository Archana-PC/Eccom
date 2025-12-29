import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { sidebar } from "../config/sidebar";
import {
  PanelLeft,
  Columns2,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function useOutside(ref, onClose) {
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && onClose?.();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, onClose]);
}

function getMeta(items, pathname) {
  for (const item of items) {
    if (item.children?.length) {
      const hit = item.children.find((c) => pathname.startsWith(c.path));
      if (hit) return { section: item.label, title: hit.label };
    }
    if (item.path && pathname.startsWith(item.path)) return { section: "Menu", title: item.label };
  }
  return { section: "Dashboard", title: "Dashboard" };
}

export default function AdminHeader({
  isDesktop = false,
  collapsed = false,
  onToggleCollapsed = () => {},
  onOpenMobileSidebar = () => {},
  onLogout = () => console.log("logout"),
  onProfile = () => console.log("profile"),
  onSettings = () => console.log("settings"),
  onNotifications = () => console.log("notifications"),
}) {
  const { pathname } = useLocation();
  const { permissions = [], isSuperAdmin, user } = useSelector((s) => s.auth);

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

  const meta = useMemo(() => getMeta(visibleSidebar, pathname), [visibleSidebar, pathname]);

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useOutside(menuRef, () => setOpen(false));

  const name = user?.name || user?.email?.split("@")?.[0] || "Admin";
  const email = user?.email || "";
  const role = user?.role_label || user?.role || (isSuperAdmin ? "Super Admin" : "Admin");

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-40">
      {/* ✅ solid white + same border as sidebar */}
      <div className="border-b border-slate-200 bg-white">
        {/* ✅ fixed height to match sidebar brand (h-16) */}
        <div className="h-16 px-4 flex items-center justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            {!isDesktop && (
              <IconBtn title="Open menu" onClick={onOpenMobileSidebar}>
                <PanelLeft className="h-5 w-5" />
              </IconBtn>
            )}

            {isDesktop && (
              <IconBtn
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                onClick={onToggleCollapsed}
              >
                <Columns2 className="h-5 w-5" />
              </IconBtn>
            )}

            <div className="min-w-0">
              <div className="text-xs text-slate-500 truncate">{meta.section}</div>
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="text-[15px] sm:text-base font-semibold text-slate-900 truncate">
                  {meta.title}
                </h1>
                <span className="hidden sm:inline-flex text-[11px] px-2 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700">
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* CENTER search (desktop) */}
          {/* <div className="hidden lg:flex items-center gap-2 h-10 px-3 rounded-2xl border border-slate-200 bg-slate-50 w-[520px]">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
            />
            <span className="text-[11px] text-slate-500 border border-slate-200 rounded-lg px-2 py-0.5 bg-white">
              Ctrl K
            </span>
          </div> */}

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <IconBtn className="lg:hidden" title="Search" onClick={() => console.log("mobile search")}>
              <Search className="h-5 w-5" />
            </IconBtn>

            <IconBtn title="Notifications" onClick={onNotifications} dot>
              <Bell className="h-5 w-5" />
            </IconBtn>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="h-10 pl-2 pr-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 inline-flex items-center gap-2 transition active:scale-[0.98]"
              >
                <div className="h-8 w-8 rounded-2xl bg-slate-900 text-white text-sm font-bold grid place-items-center">
                  {initials}
                </div>

                <div className="hidden sm:block text-left leading-tight">
                  <div className="text-sm font-semibold text-slate-900 max-w-[140px] truncate">
                    {name}
                  </div>
                  <div className="text-xs text-slate-500 max-w-[140px] truncate">
                    {email}
                  </div>
                </div>

                <ChevronDown className={cx("h-4 w-4 text-slate-500 transition", open && "rotate-180")} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white font-bold grid place-items-center">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 truncate">{name}</div>
                        <div className="text-xs text-slate-500 truncate">{email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <DropItem icon={<User className="h-4 w-4" />} label="Profile" onClick={() => { setOpen(false); onProfile(); }} />
                    <DropItem icon={<Settings className="h-4 w-4" />} label="Settings" onClick={() => { setOpen(false); onSettings(); }} />
                    <div className="my-2 h-px bg-slate-200" />
                    <DropItem danger icon={<LogOut className="h-4 w-4" />} label="Logout" onClick={() => { setOpen(false); onLogout(); }} />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

function IconBtn({ children, title, onClick, className = "", dot = false }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cx(
        "relative h-10 w-10 rounded-2xl",
        "bg-white hover:bg-slate-50 border border-slate-200",
        "inline-flex items-center justify-center text-slate-800 transition active:scale-[0.98]",
        className
      )}
    >
      {children}
      {dot && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500" />}
    </button>
  );
}

function DropItem({ icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full px-3 py-2 rounded-xl flex items-center gap-2 text-sm transition",
        "hover:bg-slate-50 active:scale-[0.99]",
        danger ? "text-rose-600 hover:bg-rose-50" : "text-slate-800"
      )}
    >
      <span
        className={cx(
          "h-8 w-8 rounded-xl grid place-items-center border",
          danger ? "bg-rose-50 border-rose-200" : "bg-white border-slate-200"
        )}
      >
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
