// const Table = ({ columns, data }) => {
//   return (
//     <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm text-gray-700">
//           {/* HEADER */}
//           <thead className="bg-gray-50 sticky top-0 z-10">
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
//                 >
//                   {col.label}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody className="divide-y divide-gray-100">
//             {data.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="px-6 py-10 text-center text-gray-500"
//                 >
//                   No records found
//                 </td>
//               </tr>
//             ) : (
//               data.map((row, i) => (
//                 <tr
//                   key={i}
//                   className={`
//                     transition
//                     ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                     hover:bg-indigo-50
//                   `}
//                 >
//                   {columns.map((col) => (
//                     <td
//                       key={col.key}
//                       className="px-6 py-4 whitespace-nowrap"
//                     >
//                       {col.render ? col.render(row) : row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Table;
const Table = ({
  columns,
  data,
  emptyText = "No records found",
  maxHeight = "calc(100vh - 260px)",
}) => {
  const alignClass = (align, header = false) => {
    const a = align || "left";
    if (a === "right") return header ? "text-right" : "text-right";
    if (a === "center") return header ? "text-center" : "text-center";
    return header ? "text-left" : "text-left";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
      {/* scroll area */}
      <div className="overflow-auto" style={{ maxHeight }}>
        <table className="min-w-full border-separate border-spacing-0">
          {/* HEADER */}
          <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={[
                    "px-5 py-3",
                    "text-[11px] font-semibold uppercase tracking-wider",
                    "text-slate-600",
                    "border-b border-slate-200",
                    alignClass(col.align, true),
                    col.headerClassName || "",
                  ].join(" ")}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
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
                    "hover:bg-indigo-50/50",
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
                        alignClass(col.align, false),
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

      {/* premium bottom fade line */}
    <div className="h-1 bg-linear-to-r from-transparent via-slate-200/60 to-transparent" />
    </div>
  );
};

export default Table;
