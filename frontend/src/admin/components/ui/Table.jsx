const Table = ({
  columns,
  data,
  emptyText = "No records found",
  maxHeight = "calc(100vh - 260px)",
  footer = null,
}) => {
  const alignClass = (align) => {
    const a = align || "left";
    if (a === "right") return "text-right";
    if (a === "center") return "text-center";
    return "text-left";
  };

  return (
    <div
      className="bg-white shadow-sm ring-1 ring-black/5 overflow-hidden flex flex-col rounded-xl" // ✅ little round
      style={{ maxHeight }}
    >
      {/* BODY SCROLL */}
      <div className="overflow-auto flex-1">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={[
                    "px-5 py-2.5", // ✅ slightly tighter header
                    "text-[11px] font-semibold uppercase tracking-wider",
                    "text-slate-600",
                    "border-b border-slate-200",
                    alignClass(col.align),
                    col.headerClassName || "",
                  ].join(" ")}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-14 text-center text-sm text-slate-500"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={row?.id ?? i}
                  className={[
                    "transition-colors",
                    "hover:bg-indigo-50/40",
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/30",
                  ].join(" ")}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={[
                        "px-5 py-4",
                        "border-b border-slate-100",
                        "text-sm text-slate-800",
                        alignClass(col.align),
                        col.key === columns[0]?.key ? "font-medium" : "",
                        col.key === "actions" ? "whitespace-nowrap" : "",
                        col.cellClassName || "",
                      ].join(" ")}
                    >
                      {col.render ? col.render(row) : (row?.[col.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      {footer && (
        <div className="border-t border-slate-200 bg-slate-50/40 px-5 py-3">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Table;
