import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  permissions: [],
  isSuperAdmin: false,
  isAuthenticated: false,
  loading: true, // 🔴 CRITICAL
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      // Accept either {user: {...}} OR direct user {...}
      const u = action.payload?.user ?? action.payload ?? null;

      state.user = u;
      state.permissions = u?.permissions ?? [];
      state.isSuperAdmin = u?.is_superadmin ?? false;
      state.isAuthenticated = !!u;
      state.loading = false;
    },

    authResolved(state) {
      // called when /me finishes but user is NOT logged in
      state.loading = false;
    },

    logout(state) {
      state.user = null;
      state.permissions = [];
      state.isSuperAdmin = false;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { setUser, logout, authResolved } = authSlice.actions;
export default authSlice.reducer;
