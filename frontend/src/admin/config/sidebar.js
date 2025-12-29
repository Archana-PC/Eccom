import { PERMISSIONS } from "../constants/permissions";
import {
  LayoutDashboard,
  Users,
  Shield,
  Boxes,
  Tags,
  KeyRound,
  Layers,
  Image as ImageIcon,
} from "lucide-react";

export const sidebar = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    permission: PERMISSIONS.DASHBOARD.VIEW,
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    permission: PERMISSIONS.USER.VIEW,
    icon: Users,
  },
  {
    label: "Roles",
    path: "/admin/roles",
    permission: PERMISSIONS.ADMIN_ROLE.VIEW,
    icon: Shield,
  },

  // ✅ Products with submenu
  {
    label: "Products",
    path: "/admin/products",
    permission: PERMISSIONS.PRODUCT.VIEW,
    icon: Boxes,
    children: [
      {
        label: "All Products",
        path: "/admin/products",
        permission: PERMISSIONS.PRODUCT.VIEW,
        icon: Layers,
      },
      {
        label: "Product Variants",
        path: "/admin/variants",
        permission: PERMISSIONS.PRODUCT_VARIANT?.VIEW || PERMISSIONS.PRODUCT.VIEW,
        icon: Layers,
      },
      {
        label: "Product Images",
        path: "/admin/images",
        permission: PERMISSIONS.PRODUCT_IMAGE?.VIEW || PERMISSIONS.PRODUCT.VIEW,
        icon: ImageIcon,
      },
    ],
  },

  {
    label: "Categories",
    path: "/admin/categories",
    permission: PERMISSIONS.CATEGORY.VIEW,
    icon: Tags,
  },
  {
    label: "My Permissions",
    path: "/admin/my-permissions",
    permission: PERMISSIONS.PERMISSION.VIEW,
    icon: KeyRound,
  },
];
