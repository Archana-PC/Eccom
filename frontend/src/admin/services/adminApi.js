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
      query: () => "roles/",
      providesTags: ["Roles"],
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
      query: () => "users/",
      providesTags: ["Users"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "users/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetPermissionsQuery,
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useGetUsersQuery,
  useCreateUserMutation,
} = adminApi;
