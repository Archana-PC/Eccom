import React from "react";
import AdminButton from "./AdminButton";

function getPageItems(page, totalPages) {
  const items = [];
  const add = (v) => items.push(v);

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) add(i);
    return items;
  }

  add(1);
  const left = Math.max(2, page - 1);
  const right = Math.min(totalPages - 1, page + 1);

  if (left > 2) add("…");
  for (let i = left; i <= right; i++) add(i);
  if (right < totalPages - 1) add("…");

  add(totalPages);
  return items;
}

export default function AdminPagination({
  page = 1,
  pageSize = 20,
  total = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
}) {
  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const start = total ? (safePage - 1) * pageSize + 1 : 0;
  const end = total ? Math.min(safePage * pageSize, total) : 0;

  const items = getPageItems(safePage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-slate-600">
        Showing <span className="font-semibold text-slate-900">{start}</span>–
        <span className="font-semibold text-slate-900">{end}</span> of{" "}
        <span className="font-semibold text-slate-900">{total}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Rows</span>
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange?.(Number(e.target.value));
              onPageChange?.(1);
            }}
            className="h-9 rounded-md bg-white border border-slate-200 px-3 text-slate-900"
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <AdminButton size="sm" variant="secondary" className="rounded-md" disabled={safePage <= 1} onClick={() => onPageChange?.(1)}>First</AdminButton>
            <AdminButton size="sm" variant="secondary" className="rounded-md" disabled={safePage <= 1} onClick={() => onPageChange?.(safePage - 1)}>Prev</AdminButton>

            {items.map((it, idx) =>
              it === "…" ? (
                <span key={idx} className="px-2 text-slate-400">…</span>
              ) : (
                <AdminButton
                  key={it}
                  size="sm"
                  variant={it === safePage ? "primary" : "secondary"}
                  className="min-w-10 rounded-md"
                  onClick={() => onPageChange?.(it)}
                >
                  {it}
                </AdminButton>
              )
            )}

            <AdminButton size="sm" variant="secondary" className="rounded-md" disabled={safePage >= totalPages} onClick={() => onPageChange?.(safePage + 1)}>Next</AdminButton>
            <AdminButton size="sm" variant="secondary" className="rounded-md" disabled={safePage >= totalPages} onClick={() => onPageChange?.(totalPages)}>Last</AdminButton>
          </div>
        )}
      </div>
    </div>
  );
}
