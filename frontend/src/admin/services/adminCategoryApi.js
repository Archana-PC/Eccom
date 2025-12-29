import { api } from "../../services/api";

export const adminCategoryApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getCategories: builder.query({
      query: () => "categories/",
      providesTags: ["Categories"],
    }),

    getCategoryById: builder.query({
      query: (id) => `categories/${id}/`,
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `categories/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = adminCategoryApi;
