import { api } from "../../services/api";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // =====================
    // PERMISSIONS
    // =====================
    getPermissions: builder.query({
      query: () => "permissions/",
      providesTags: ["Permissions"],
    }),

    // =====================
    // ROLES
    // =====================
   getRoles: builder.query({
  // usage: useGetRolesQuery({ page: 1, page_size: 20, search: "" })
  query: ({ page = 1, page_size = 10, ...rest } = {}) => ({
    url: "roles/",
    params: { page, page_size, ...rest },
  }),
  providesTags: (res) => {
    const results = Array.isArray(res) ? res : (res?.results ?? []);
    return results.length
      ? [
          ...results.map((r) => ({ type: "Roles", id: r.id })),
          { type: "Roles", id: "LIST" },
        ]
      : [{ type: "Roles", id: "LIST" }];
  },
}),

    getRole: builder.query({
      query: (id) => `/roles/${id}/`,
    }),

    createRole: builder.mutation({
      query: (data) => ({
        url: "roles/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Roles"],
    }),

    updateRole: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `roles/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Roles"],
    }),

    // =====================
    // USERS
    // =====================
   getUsers: builder.query({
  // usage: useGetUsersQuery({ page: 1, page_size: 20, search: "", ordering: "-created_at" })
  query: ({ page = 1, page_size = 10, ...rest } = {}) => ({
    url: "users/",
    params: { page, page_size, ...rest },
  }),

  providesTags: (res) => {
    const results = Array.isArray(res) ? res : (res?.results ?? []);
    return results.length
      ? [
          ...results.map((u) => ({ type: "Users", id: u.id })),
          { type: "Users", id: "LIST" },
        ]
      : [{ type: "Users", id: "LIST" }];
  },
}),
    getUser: builder.query({
      query: (id) => `/users/${id}/`,
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "users/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}/`,
        method: "PUT", // or PATCH
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPermissionsQuery,
  useGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = adminApi;
