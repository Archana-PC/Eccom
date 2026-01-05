
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
import EditProduct from "./pages/products/EditProduct";
import EditVariant from "./pages/catalog/EditVariant";
import Products from "./pages/products/Products";
import CreateProduct from "./pages/products/CreateProduct";
import Variants from "./pages/catalog/Variants";
import CreateVariant from "./pages/catalog/CreateVariant";
import Images from "./pages/catalog/Images";
import CreateImage from "./pages/catalog/CreateImage";
import EditImage from "./pages/catalog/EditImage";
import Colors from "./pages/color/Colors";
import CreateColor from "./pages/color/CreateColor";
import EditColor from "./pages/color/EditColor";
import Fabrics from "./pages/fabric/Fabrics";
import CreateFabric from "./pages/fabric/CreateFabric";
import EditFabric from "./pages/fabric/EditFabric";
import Materials from "./pages/material/Materials";
import CreateMaterial from "./pages/material/CreateMaterial";
import EditMaterial from "./pages/material/EditMaterial";
import Collections from "./pages/collections/Collections";
import CreateCollection from "./pages/collections/CreateCollection";
import EditCollection from "./pages/collections/EditCollection";
import EditCategory from "./pages/category/EditCategory";
import EditRolePage from "./pages/role/EditRolePage";
import EditUserPage from "./pages/users/EditUserPage";
import Styles from "./pages/style/Styles";
import CreateStyle from "./pages/style/CreateStyle";
import EditStyle from "./pages/style/EditStyle";
import ApprovalDetail from "./pages/approvals/ApprovalDetail";
import ApprovalsInbox from "./pages/approvals/ApprovalsInbox";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          {/* 🔹 DASHBOARD */}
          <Route
            element={
              <PermissionRoute permission={PERMISSIONS.DASHBOARD.VIEW} />
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* 🔹 ROLES */}
          <Route
            element={
              <PermissionRoute permission={PERMISSIONS.ADMIN_ROLE.VIEW} />
            }
          >
            <Route path="roles" element={<Roles />} />

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.ADMIN_ROLE.ADD} />
              }
            >
              <Route path="roles/create" element={<CreateRole />} />
            </Route>
             <Route
              element={
                <PermissionRoute permission={PERMISSIONS.ADMIN_ROLE.CHANGE} />
              }
            >
              <Route path="roles/:id" element={<EditRolePage />} />
            </Route>
          </Route>

          {/* 🔹 USERS */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.USER.VIEW} />}
          >
            <Route path="users" element={<UsersList />} />
          </Route>

          <Route
            element={<PermissionRoute permission={PERMISSIONS.USER.ADD} />}
          >
            <Route path="users/create" element={<CreateUser />} />
          </Route>

<Route
            element={<PermissionRoute permission={PERMISSIONS.USER.ADD} />}
          >
            <Route path="users/:id" element={<EditUserPage />} />
          </Route>
          {/* 🔹 CATEGORIES */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.CATEGORY.VIEW} />}
          >
            <Route path="categories" element={<Categories />} />
          </Route>

          <Route
            element={<PermissionRoute permission={PERMISSIONS.CATEGORY.ADD} />}
          >
            <Route path="categories/create" element={<CreateCategory />} />
          </Route>
          {/* ✅ EDIT CATEGORY */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.CATEGORY.CHANGE} />}
          >
            <Route path="categories/:id" element={<EditCategory />} />
          </Route>

          {/* ✅ PRODUCTS (VIEW + ADD + CHANGE) */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.PRODUCT.VIEW} />}
          >
            <Route path="products" element={<Products />} />

            <Route
              element={<PermissionRoute permission={PERMISSIONS.PRODUCT.ADD} />}
            >
              <Route path="products/create" element={<CreateProduct />} />
            </Route>

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.PRODUCT.CHANGE} />
              }
            >
              <Route path="products/:id" element={<EditProduct />} />
            </Route>
          </Route>

          {/* ✅ VARIANTS (VIEW + ADD + CHANGE) */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.VARIANT.VIEW} />}
          >
            <Route path="variants" element={<Variants />} />

            <Route
              element={<PermissionRoute permission={PERMISSIONS.VARIANT.ADD} />}
            >
              <Route path="variants/create" element={<CreateVariant />} />
            </Route>

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.VARIANT.CHANGE} />
              }
            >
              <Route path="variants/:id" element={<EditVariant />} />
            </Route>
          </Route>

          {/* ✅ PRODUCT IMAGES (VIEW + ADD + CHANGE) */}
          <Route
            element={
              <PermissionRoute permission={PERMISSIONS.PRODUCT_IMAGE.VIEW} />
            }
          >
            <Route path="images" element={<Images />} />

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.PRODUCT_IMAGE.ADD} />
              }
            >
              <Route path="images/create" element={<CreateImage />} />
            </Route>

            <Route
              element={
                <PermissionRoute
                  permission={PERMISSIONS.PRODUCT_IMAGE.CHANGE}
                />
              }
            >
              <Route path="images/:id" element={<EditImage />} />
            </Route>
          </Route>

          {/* 🔹 MY PERMISSIONS */}
          <Route
            element={
              <PermissionRoute permission={PERMISSIONS.PERMISSION.VIEW} />
            }
          >
            <Route path="my-permissions" element={<MyPermissions />} />
          </Route>

          {/* ✅ STYLES */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.STYLE.VIEW} />}
          >
            <Route path="styles" element={<Styles />} />

            <Route
              element={<PermissionRoute permission={PERMISSIONS.STYLE.ADD} />}
            >
              <Route path="styles/create" element={<CreateStyle />} />
            </Route>

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.STYLE.CHANGE} />
              }
            >
              <Route path="styles/:id/edit" element={<EditStyle />} />{" "}
              {/* ✅ changed */}
            </Route>
          </Route>

          {/* ✅ COLORS */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.COLOR.VIEW} />}
          >
            <Route path="colors" element={<Colors />} />

            <Route
              element={<PermissionRoute permission={PERMISSIONS.COLOR.ADD} />}
            >
              <Route path="colors/create" element={<CreateColor />} />
            </Route>

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.COLOR.CHANGE} />
              }
            >
              <Route path="colors/:id/edit" element={<EditColor />} />
            </Route>
          </Route>

          {/* ✅ FABRICS */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.FABRIC.VIEW} />}
          >
            <Route path="fabrics" element={<Fabrics />} />

            <Route
              element={<PermissionRoute permission={PERMISSIONS.FABRIC.ADD} />}
            >
              <Route path="fabrics/create" element={<CreateFabric />} />
            </Route>

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.FABRIC.CHANGE} />
              }
            >
              <Route path="fabrics/:id/edit" element={<EditFabric />} />{" "}
              {/* ✅ changed */}
            </Route>
          </Route>

          {/* ✅ MATERIALS */}
          <Route
            element={<PermissionRoute permission={PERMISSIONS.MATERIAL.VIEW} />}
          >
            <Route path="materials" element={<Materials />} />

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.MATERIAL.ADD} />
              }
            >
              <Route path="materials/create" element={<CreateMaterial />} />
            </Route>

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.MATERIAL.CHANGE} />
              }
            >
              <Route path="materials/:id/edit" element={<EditMaterial />} />{" "}
              {/* ✅ changed */}
            </Route>
          </Route>

          {/* ✅ COLLECTIONS */}
          <Route
            element={
              <PermissionRoute permission={PERMISSIONS.COLLECTION.VIEW} />
            }
          >
            <Route path="collections" element={<Collections />} />

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.COLLECTION.ADD} />
              }
            >
              <Route path="collections/create" element={<CreateCollection />} />
            </Route>

            <Route
              element={
                <PermissionRoute permission={PERMISSIONS.COLLECTION.CHANGE} />
              }
            >
              <Route path="collections/:id/edit" element={<EditCollection />} />{" "}
              {/* ✅ changed */}
            </Route>
          </Route>

          {/* ✅ APPROVALS */}
<Route element={<PermissionRoute permission={PERMISSIONS.WORKFLOW.VIEW} />}>
  <Route path="approvals" element={<ApprovalsInbox />} />

  {/* Detail page: allow view permission also */}
  <Route path="approvals/:id" element={<ApprovalDetail />} />
</Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
