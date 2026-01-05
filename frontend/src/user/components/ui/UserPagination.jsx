import React from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

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

export default function UserPagination({
  page = 1,
  pageSize = 12,
  total = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [12, 24, 36, 48],
  className = "",
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, total);

  const items = getPageItems(safePage, totalPages);

  const btnBase =
    "h-10 min-w-10 px-3 rounded-2xl text-sm font-semibold transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/35 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const btnGhost =
    "bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-sm";

  const btnActive =
    "bg-gradient-to-r from-sky-600 to-orange-500 text-white border border-white/40 shadow";

  return (
    <div className={cx("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-slate-600">
          Showing <span className="font-semibold text-slate-900">{start}</span>–
          <span className="font-semibold text-slate-900">{end}</span> of{" "}
          <span className="font-semibold text-slate-900">{total}</span>
        </div>

        {onPageSizeChange && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Products</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange?.(1);
              }}
              className="h-10 rounded-2xl bg-white border border-slate-200 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/35"
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>
                  {s} / page
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          className={cx(btnBase, btnGhost)}
          disabled={safePage <= 1}
          onClick={() => onPageChange?.(safePage - 1)}
        >
          Prev
        </button>

        {items.map((it, idx) =>
          it === "…" ? (
            <span key={`dots-${idx}`} className="px-2 text-slate-400">
              …
            </span>
          ) : (
            <button
              key={it}
              className={cx(btnBase, it === safePage ? btnActive : btnGhost)}
              onClick={() => onPageChange?.(it)}
            >
              {it}
            </button>
          )
        )}

        <button
          className={cx(btnBase, btnGhost)}
          disabled={safePage >= totalPages}
          onClick={() => onPageChange?.(safePage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
