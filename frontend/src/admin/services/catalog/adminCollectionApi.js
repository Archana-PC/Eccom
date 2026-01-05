import { api } from "../../../services/api";

export const adminCollectionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => "/admin/collections/",
      providesTags: (result) => {
        const list = Array.isArray(result)
          ? result
          : Array.isArray(result?.results)
          ? result.results
          : Array.isArray(result?.data)
          ? result.data
          : [];

        return [
          { type: "Collection", id: "LIST" },
          ...list.map((x) => ({ type: "Collection", id: x.id })),
        ];
      },
    }),

    getCollection: builder.query({
      query: (id) => `/admin/collections/${id}/`,
      providesTags: (r, e, id) => [{ type: "Collection", id }],
    }),

    createCollection: builder.mutation({
      query: (body) => ({
        url: "/admin/collections/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Collection", id: "LIST" }],
    }),

    updateCollection: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/collections/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (r, e, { id }) => [
        { type: "Collection", id },
        { type: "Collection", id: "LIST" },
      ],
    }),

    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `/admin/collections/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (r, e, id) => [
        { type: "Collection", id },
        { type: "Collection", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionQuery,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} = adminCollectionApi;
