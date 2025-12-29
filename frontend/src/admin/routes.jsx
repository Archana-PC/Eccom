// import { Routes, Route, Navigate } from "react-router-dom";
// import Products from "./pages/Products";
// import  Categories  from "./pages/category/Categories";
// import Dashboard from "./pages/Dashboard";
// import MyPermissions from "./pages/MyPermissions";
// import AdminLayout from "../layouts/AdminLayout";
// import AdminProtectedRoute from "./routes/AdminProtectedRoute";
// import PermissionRoute from "./routes/PermissionRoute";
// import { PERMISSIONS } from "./constants/permissions";
// import UsersList from "./pages/users/UsersList";
// import CreateUser from "./pages/users/CreateUser";
// import CreateRole from "./pages/role/CreateRole";
// import Roles from "./pages/role/Roles";
// import CreateCategory from "./pages/category/CreateCategory";


// const AdminRoutes = () => {
//   return (
//      <Routes>
//       <Route element={<AdminProtectedRoute />}>
//         <Route element={<AdminLayout />}>

//           {/* 🔹 DASHBOARD */}
//           <Route
//             element={
//               <PermissionRoute permission={PERMISSIONS.DASHBOARD.VIEW} />
//             }
//           >
//             <Route index element={<Navigate to="dashboard" replace />} />
//             <Route path="dashboard" element={<Dashboard />} />
//           </Route>

//           {/* 🔹 ROLES */}
//           <Route
//             element={
//               <PermissionRoute permission={PERMISSIONS.ADMIN_ROLE.VIEW} />
//             }
//           >
//             <Route path="roles" element={<Roles />} />

//             <Route
//               element={
//                 <PermissionRoute permission={PERMISSIONS.ADMIN_ROLE.ADD} />
//               }
//             >
//               <Route path="roles/create" element={<CreateRole />} />
//             </Route>
//           </Route>

//           {/* 🔹 USERS */}
//           <Route
//             element={
//               <PermissionRoute permission={PERMISSIONS.USER.VIEW} />
//             }
//           >
//             <Route path="users" element={<UsersList />} />
//           </Route>
//           <Route
//             element={
//               <PermissionRoute permission={PERMISSIONS.USER.ADD} />
//             }
//           >
//             <Route path="/users/create" element={<CreateUser />} />
//           </Route>

//           {/* 🔹 CATEGORIES */}
//           <Route
//             element={
//               <PermissionRoute permission={PERMISSIONS.CATEGORY.VIEW} />
//             }
//           >
//             <Route path="categories" element={<Categories />} />
            
//           </Route>
//                     <Route
//             element={
//               <PermissionRoute permission={PERMISSIONS.CATEGORY.ADD} />
//             }
//           >
//             <Route path="categories/create" element={<CreateCategory />} />
            
//           </Route>

//           {/* 🔹 PRODUCTS */}
//           <Route
//             element={
//               <PermissionRoute permission={PERMISSIONS.PRODUCT.VIEW} />
//             }
//           >
//             <Route path="products" element={<Products />} />
//           </Route>

//           {/* 🔹 MY PERMISSIONS */}
//           <Route
//             element={
//               <PermissionRoute permission={PERMISSIONS.PERMISSION.VIEW} />
//             }
//           >
//             <Route path="my-permissions" element={<MyPermissions />} />
//           </Route>

//         </Route>
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import Categories from "./pages/category/Categories";
import Dashboard from "./pages/Dashboard";
import MyPermissions from "./pages/MyPermissions";
import AdminLayout from "../layouts/AdminLayout";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import PermissionRoute from "./routes/PermissionRoute";
import { PERMISSIONS } from "./constants/permissions";
import UsersList from "./pages/users/UsersList";
import CreateUser from "./pages/users/CreateUser";
import CreateRole from "./pages/role/CreateRole";
import Roles from "./pages/role/Roles";
import CreateCategory from "./pages/category/CreateCategory";
import Products from "./pages/catlog/Products";
import CreateProduct from "./pages/catlog/CreateProduct";
import EditProduct from "./pages/catlog/EditProduct";
import Variants from "./pages/catlog/Variants";
import CreateVariant from "./pages/catlog/CreateVariant";
import EditVariant from "./pages/catlog/EditVariant";
import Images from "./pages/catlog/Images";
import CreateImage from "./pages/catlog/CreateImage";
import EditImage from "./pages/catlog/EditImage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>

          {/* 🔹 DASHBOARD */}
          <Route element={<PermissionRoute permission={PERMISSIONS.DASHBOARD.VIEW} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* 🔹 ROLES */}
          <Route element={<PermissionRoute permission={PERMISSIONS.ADMIN_ROLE.VIEW} />}>
            <Route path="roles" element={<Roles />} />

            <Route element={<PermissionRoute permission={PERMISSIONS.ADMIN_ROLE.ADD} />}>
              <Route path="roles/create" element={<CreateRole />} />
            </Route>
          </Route>

          {/* 🔹 USERS */}
          <Route element={<PermissionRoute permission={PERMISSIONS.USER.VIEW} />}>
            <Route path="users" element={<UsersList />} />
          </Route>

          <Route element={<PermissionRoute permission={PERMISSIONS.USER.ADD} />}>
            {/* ⚠️ you had "/users/create" (absolute). better keep consistent "users/create" */}
            <Route path="users/create" element={<CreateUser />} />
          </Route>

          {/* 🔹 CATEGORIES */}
          <Route element={<PermissionRoute permission={PERMISSIONS.CATEGORY.VIEW} />}>
            <Route path="categories" element={<Categories />} />
          </Route>

          <Route element={<PermissionRoute permission={PERMISSIONS.CATEGORY.ADD} />}>
            <Route path="categories/create" element={<CreateCategory />} />
          </Route>

          {/* ✅ PRODUCTS (VIEW + ADD + CHANGE) */}
          <Route element={<PermissionRoute permission={PERMISSIONS.PRODUCT.VIEW} />}>
            <Route path="products" element={<Products />} />

            <Route element={<PermissionRoute permission={PERMISSIONS.PRODUCT.ADD} />}>
              <Route path="products/create" element={<CreateProduct />} />
            </Route>

            <Route element={<PermissionRoute permission={PERMISSIONS.PRODUCT.CHANGE} />}>
              <Route path="products/:id" element={<EditProduct />} />
            </Route>
          </Route>

          {/* ✅ VARIANTS (VIEW + ADD + CHANGE) */}
          <Route element={<PermissionRoute permission={PERMISSIONS.VARIANT.VIEW} />}>
            <Route path="variants" element={<Variants />} />

            <Route element={<PermissionRoute permission={PERMISSIONS.VARIANT.ADD} />}>
              <Route path="variants/create" element={<CreateVariant />} />
            </Route>

            <Route element={<PermissionRoute permission={PERMISSIONS.VARIANT.CHANGE} />}>
              <Route path="variants/:id" element={<EditVariant />} />
            </Route>
          </Route>

          {/* ✅ PRODUCT IMAGES (VIEW + ADD + CHANGE) */}
          <Route element={<PermissionRoute permission={PERMISSIONS.PRODUCT_IMAGE.VIEW} />}>
            <Route path="images" element={<Images />} />

            <Route element={<PermissionRoute permission={PERMISSIONS.PRODUCT_IMAGE.ADD} />}>
              <Route path="images/create" element={<CreateImage />} />
            </Route>

            <Route element={<PermissionRoute permission={PERMISSIONS.PRODUCT_IMAGE.CHANGE} />}>
              <Route path="images/:id" element={<EditImage />} />
            </Route>
          </Route>

          {/* 🔹 MY PERMISSIONS */}
          <Route element={<PermissionRoute permission={PERMISSIONS.PERMISSION.VIEW} />}>
            <Route path="my-permissions" element={<MyPermissions />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
