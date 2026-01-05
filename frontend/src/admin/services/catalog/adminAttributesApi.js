import { api } from "../../../services/api";

export const adminAttributesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- STYLES (ADMIN) ----------
    getStyles: builder.query({
  // usage: useGetStylesQuery({ page: 1, page_size: 10, search: "" })
  query: ({ page = 1, page_size = 10, ...rest } = {}) => ({
    url: "/admin/styles/",
    params: { page, page_size, ...rest },
  }),
  providesTags: (res) => {
    const results = Array.isArray(res) ? res : (res?.results ?? []);
    return results.length
      ? [
          ...results.map((s) => ({ type: "Style", id: s.id })),
          { type: "Style", id: "LIST" },
        ]
      : [{ type: "Style", id: "LIST" }];
  },
}),

    getStyle: builder.query({
      query: (id) => `/admin/styles/${id}/`,
      providesTags: ["Style"],
    }),
    createStyle: builder.mutation({
      query: (body) => ({
        url: "/admin/styles/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Style"],
    }),
    updateStyle: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/styles/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Style"],
    }),
    deleteStyle: builder.mutation({
      query: (id) => ({
        url: `/admin/styles/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Style"],
    }),

    // ---------- COLORS (ADMIN) ----------
    getColors: builder.query({
  // usage: useGetColorsQuery({ page: 1, page_size: 20, search: "" })
  query: ({ page = 1, page_size = 20, ...rest } = {}) => ({
    url: "/admin/colors/",
    params: { page, page_size, ...rest },
  }),

  providesTags: (res) => {
    const results = Array.isArray(res) ? res : (res?.results ?? []);
    return results.length
      ? [
          ...results.map((c) => ({ type: "Color", id: c.id })),
          { type: "Color", id: "LIST" },
        ]
      : [{ type: "Color", id: "LIST" }];
  },
}),

    getColor: builder.query({
      query: (id) => `/admin/colors/${id}/`,
      providesTags: ["Color"],
    }),
    createColor: builder.mutation({
      query: (body) => ({ url: "/admin/colors/", method: "POST", body }),
      invalidatesTags: ["Color"],
    }),
    updateColor: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/colors/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Color"],
    }),
    deleteColor: builder.mutation({
      query: (id) => ({ url: `/admin/colors/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Color"],
    }),

    // ---------- FABRICS (ADMIN) ----------
   getFabrics: builder.query({
  // usage: useGetFabricsQuery({ page: 1, page_size: 10, search: "" })
  query: ({ page = 1, page_size = 10, ...rest } = {}) => ({
    url: "/admin/fabrics/",
    params: { page, page_size, ...rest },
  }),

  providesTags: (res) => {
    const results = Array.isArray(res) ? res : (res?.results ?? []);
    return results.length
      ? [
          ...results.map((f) => ({ type: "Fabric", id: f.id })),
          { type: "Fabric", id: "LIST" },
        ]
      : [{ type: "Fabric", id: "LIST" }];
  },
}),

    getFabric: builder.query({
      query: (id) => `/admin/fabrics/${id}/`,
      providesTags: ["Fabric"],
    }),
    createFabric: builder.mutation({
      query: (body) => ({
        url: "/admin/fabrics/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Fabric"],
    }),
    updateFabric: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/fabrics/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Fabric"],
    }),
    deleteFabric: builder.mutation({
      query: (id) => ({
        url: `/admin/fabrics/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Fabric"],
    }),

    // ---------- MATERIALS (ADMIN) ----------
    getMaterials: builder.query({
  // usage: useGetMaterialsQuery({ page: 1, page_size: 10, search: "" })
  query: ({ page = 1, page_size = 10, ...rest } = {}) => ({
    url: "/admin/materials/",
    params: { page, page_size, ...rest },
  }),
  providesTags: (res) => {
    const results = Array.isArray(res) ? res : (res?.results ?? []);
    return results.length
      ? [
          ...results.map((m) => ({ type: "Material", id: m.id })),
          { type: "Material", id: "LIST" },
        ]
      : [{ type: "Material", id: "LIST" }];
  },
}),

    getMaterial: builder.query({
      query: (id) => `/admin/materials/${id}/`,
      providesTags: ["Material"],
    }),
    createMaterial: builder.mutation({
      query: (body) => ({
        url: "/admin/materials/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Material"],
    }),
    updateMaterial: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/materials/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Material"],
    }),
    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/admin/materials/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Material"],
    }),
  }),
});

export const {
  // styles
  useGetStylesQuery,
  useGetStyleQuery,
  useCreateStyleMutation,
  useUpdateStyleMutation,
  useDeleteStyleMutation,

  // colors
  useGetColorsQuery,
  useGetColorQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,

  // fabrics
  useGetFabricsQuery,
  useGetFabricQuery,
  useCreateFabricMutation,
  useUpdateFabricMutation,
  useDeleteFabricMutation,

  // materials
  useGetMaterialsQuery,
  useGetMaterialQuery,
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = adminAttributesApi;
