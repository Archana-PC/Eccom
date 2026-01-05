import React from "react";
import AdminButton from "../../components/ui/AdminButton";

const emptyRow = (columns) =>
  columns.reduce((acc, c) => ({ ...acc, [c.key]: "" }), {});

export default function MeasurementsEditor({ columns, rows, unit, onChange }) {
  const addRow = () => onChange([...(rows || []), emptyRow(columns)]);
  const removeRow = (idx) => onChange(rows.filter((_, i) => i !== idx));

  const updateCell = (rowIndex, key, val) => {
    const next = rows.map((r, i) => (i === rowIndex ? { ...r, [key]: val } : r));
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">Measurements (Size Chart)</div>
          <div className="text-xs text-gray-500">
            Garment measurements in {unit}. Add rows for sizes.
          </div>
        </div>

        <div className="flex gap-2">
          <AdminButton type="button" variant="secondary" onClick={addRow}>
            + Add Row
          </AdminButton>
          <AdminButton type="button" variant="outline" onClick={() => onChange([])}>
            Clear
          </AdminButton>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="text-left p-3 font-semibold text-gray-700">
                  {c.label}
                  {c.key !== "size" ? ` (${unit})` : ""}
                </th>
              ))}
              <th className="p-3" />
            </tr>
          </thead>

          <tbody>
            {(rows?.length || 0) === 0 ? (
              <tr>
                <td className="p-4 text-gray-500" colSpan={columns.length + 1}>
                  No measurements added.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="border-t">
                  {columns.map((c) => (
                    <td key={c.key} className="p-2">
                      <input
                        className="w-full border rounded px-3 py-2"
                        value={row?.[c.key] ?? ""}
                        placeholder={c.placeholder}
                        onChange={(e) => updateCell(idx, c.key, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className="p-2 text-right">
                    <AdminButton
                      type="button"
                      variant="danger"
                      size="sm"
                      onClick={() => removeRow(idx)}
                    >
                      Remove
                    </AdminButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
