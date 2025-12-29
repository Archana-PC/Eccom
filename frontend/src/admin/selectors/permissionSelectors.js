// src/admin/selectors/permissionSelectors.js

export const selectRawPermissions = (state) =>
  state.auth?.user?.permissions || [];

export const selectUserRole = (state) =>
  state.auth?.user?.role || null;

export const selectIsSuperAdmin = (state) =>
  state.auth?.user?.is_superadmin || false;
