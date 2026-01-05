import { api } from "../../../services/api";

export const adminCategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCategories: builder.query({
  query: ({ page = 1, page_size = 10 } = {}) =>
    `/admin/categories/?page=${page}&page_size=${page_size}`,
  providesTags: ["AdminCategories"],
}),

getAdminRootCategories: builder.query({
  query: () =>
    `/admin/categories/roots/`,
  providesTags: ["AdminCategories"],
}),

    getCategoryById: builder.query({
      query: (id) => `/admin/categories/${id}/`,
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/categories/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

  }),
});

export const {
  useGetAdminCategoriesQuery,
  useGetAdminRootCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = adminCategoryApi;
