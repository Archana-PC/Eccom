
import { PERMISSIONS } from "../constants/permissions";
import {
  LayoutDashboard,
  Users,
  Shield,
  Boxes,
  Tags,
  KeyRound,
  Layers,
  Palette,
  ClipboardCheck,
  Image as ImageIcon,
} from "lucide-react";

// get all permissions of a module safely (VIEW/ADD/EDIT/DELETE etc)
const modelPerms = (obj) =>
  obj ? Object.values(obj).filter((v) => typeof v === "string") : [];

// if module not defined, fallback to something reasonable (so menu still shows)
const modelPermOr = (obj, fallback) => {
  const arr = modelPerms(obj);
  if (arr.length) return arr;
  if (!fallback) return null;
  return Array.isArray(fallback) ? fallback.filter(Boolean) : [fallback].filter(Boolean);
};

const anyPerms = (...arrs) => arrs.flat().filter(Boolean);

export const sidebar = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    permission: PERMISSIONS.DASHBOARD?.VIEW,
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    permission: modelPermOr(PERMISSIONS.USER, PERMISSIONS.DASHBOARD?.VIEW),
    icon: Users,
  },
  {
    label: "Roles",
    path: "/admin/roles",
    permission: modelPermOr(PERMISSIONS.ADMIN_ROLE, PERMISSIONS.DASHBOARD?.VIEW),
    icon: Shield,
  },

  // ✅ Catalog (Categories / Collections / Brands)
  {
    label: "Catalog",
    icon: Tags,
    permission: anyPerms(
      modelPermOr(PERMISSIONS.CATEGORY, null),
      modelPermOr(PERMISSIONS.COLLECTION, null),
      modelPermOr(PERMISSIONS.BRAND, null)
    ),
    children: [
      {
        label: "Categories",
        path: "/admin/categories",
        permission: modelPermOr(PERMISSIONS.CATEGORY, PERMISSIONS.PRODUCT?.VIEW),
        icon: Tags,
      },
      {
        label: "Collections",
        path: "/admin/collections",
        permission: modelPermOr(PERMISSIONS.COLLECTION, PERMISSIONS.CATEGORY?.VIEW || PERMISSIONS.PRODUCT?.VIEW),
        icon: Layers,
      },
      {
        label: "Brands",
        path: "/admin/brands",
        permission: modelPermOr(PERMISSIONS.BRAND, PERMISSIONS.CATEGORY?.VIEW || PERMISSIONS.PRODUCT?.VIEW),
        icon: Tags,
      },
    ],
  },

  // ✅ Products (Product / Variants / Images)
  {
    label: "Products",
    icon: Boxes,
    permission: anyPerms(
      modelPermOr(PERMISSIONS.PRODUCT, null),
      modelPermOr(PERMISSIONS.PRODUCT_VARIANT, null),
      modelPermOr(PERMISSIONS.PRODUCT_IMAGE, null)
    ),
    children: [
      {
        label: "All Products",
        path: "/admin/products",
        permission: modelPermOr(PERMISSIONS.PRODUCT, null),
        icon: Layers,
      },
      {
        label: "Product Variants",
        path: "/admin/variants",
        permission: modelPermOr(PERMISSIONS.PRODUCT_VARIANT, PERMISSIONS.PRODUCT?.VIEW),
        icon: Layers,
      },
      {
        label: "Product Images",
        path: "/admin/images",
        permission: modelPermOr(PERMISSIONS.PRODUCT_IMAGE, PERMISSIONS.PRODUCT?.VIEW),
        icon: ImageIcon,
      },
    ],
  },

  // ✅ Attributes (Style / Color / Fabric / Material)
  {
    label: "Attributes",
    icon: Palette,
    permission: anyPerms(
      modelPermOr(PERMISSIONS.STYLE, null),
      modelPermOr(PERMISSIONS.COLOR, null),
      modelPermOr(PERMISSIONS.FABRIC, null),
      modelPermOr(PERMISSIONS.MATERIAL, null)
    ),
    children: [
      {
        label: "Styles",
        path: "/admin/styles",
        permission: modelPermOr(PERMISSIONS.STYLE, PERMISSIONS.PRODUCT?.VIEW),
        icon: Layers,
      },
      {
        label: "Colors",
        path: "/admin/colors",
        permission: modelPermOr(PERMISSIONS.COLOR, PERMISSIONS.PRODUCT?.VIEW),
        icon: Palette,
      },
      {
        label: "Fabrics",
        path: "/admin/fabrics",
        permission: modelPermOr(PERMISSIONS.FABRIC, PERMISSIONS.PRODUCT?.VIEW),
        icon: Layers,
      },
      {
        label: "Materials",
        path: "/admin/materials",
        permission: modelPermOr(PERMISSIONS.MATERIAL, PERMISSIONS.PRODUCT?.VIEW),
        icon: Layers,
      },
    ],
  },

  {
  label: "Approvals",
  path: "/admin/approvals",
  // ✅ show if user has ANY of these permissions
  permission: [
    "view_approvalinstance",
    "view_approvalaction",
    "add_approvalaction",
    "change_approvalaction",
  ],
  icon: ClipboardCheck,
},

  {
    label: "My Permissions",
    path: "/admin/my-permissions",
    permission: modelPermOr(PERMISSIONS.PERMISSION, PERMISSIONS.DASHBOARD?.VIEW),
    icon: KeyRound,
  },
];
