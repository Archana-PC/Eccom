import { useMemo } from "react";
import { normalizePermissions } from "../../utils/normalizePermissions";


const PermissionMatrix = ({
  permissions = [],
  selected = [],
  onChange = () => {},
  readonly = false,
  useIds = false,
}) => {
  const groupedPermissions = useMemo(
    () => normalizePermissions(permissions),
    [permissions]
  );

  const toggle = (value) => {
    if (readonly) return;

    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  if (!Object.keys(groupedPermissions).length) {
    return (
      <div className="bg-yellow-50 border p-4 rounded">
        No permissions available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedPermissions).map(
        ([entity, actions]) => (
          <div
            key={entity}
            className="bg-white border rounded-lg p-4"
          >
            <h3 className="font-semibold mb-3 capitalize">
              {entity.replace(/_/g, " ")}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {actions.map((action) => {
                const value = useIds
                  ? action.id
                  : `${action}_${entity}`;

                const checked = selected.includes(value);

                return (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {!readonly && (
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-blue-600"
                        checked={checked}
                        onChange={() => toggle(value)}
                      />
                    )}

                    <span
                      className={`text-sm ${
                        checked
                          ? "font-medium text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {action}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PermissionMatrix;
