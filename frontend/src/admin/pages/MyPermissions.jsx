// import { useMemo } from "react";
// import { useAppSelector } from "../../hooks/redux";
// import { selectRawPermissions } from "../selectors/permissionSelectors";
// import { normalizePermissions } from "../utils/normalizePermissions";

// const MyPermissions = () => {
//   const rawPermissions = useAppSelector(selectRawPermissions);

//   const groupedPermissions = useMemo(() => {
//     return normalizePermissions(rawPermissions);
//   }, [rawPermissions]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">My Permissions</h1>

//       {Object.keys(groupedPermissions).length === 0 ? (
//         <div className="bg-yellow-50 border p-4 rounded">
//           No permissions available
//         </div>
//       ) : (
//         Object.entries(groupedPermissions).map(([entity, actions]) => (
//           <div key={entity} className="bg-white border rounded-xl p-4 mb-4">
//             <div className="font-semibold capitalize mb-2">
//               {entity.replace(/_/g, " ")}
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {actions.map((action) => (
//                 <span
//                   key={action}
//                   className="px-3 py-1 text-sm rounded-full bg-gray-100 border"
//                 >
//                   {action}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyPermissions;

import { useAppSelector } from "../../hooks/redux";
import PermissionMatrix from "../components/ui/PermissionMatrix";

import { selectRawPermissions } from "../selectors/permissionSelectors";

const MyPermissions = () => {
  const rawPermissions = useAppSelector(selectRawPermissions);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Permissions
      </h1>

      <PermissionMatrix
        permissions={rawPermissions}
        selected={rawPermissions}
        readonly={true}
      />
    </div>
  );
};

export default MyPermissions;

