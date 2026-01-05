import { api } from "../../../services/api"; 

export const catalogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------------- ADMIN PRODUCTS (UUID / ID based) ---------------- */
    getAdminProducts: builder.query({
  // ✅ now supports pagination by default
  // usage: useGetAdminProductsQuery({ page: 1, page_size: 20, search: "", ordering: "-created_at" })
  query: ({ page = 1, page_size = 20, ...rest } = {}) => ({
    url: "admin/products/",
    params: { page, page_size, ...rest },
  }),

  providesTags: (res) => {
    const results = Array.isArray(res) ? res : (res?.results ?? []);
    return results.length
      ? [
          ...results.map((p) => ({ type: "Product", id: p.id })),
          { type: "Product", id: "LIST" },
        ]
      : [{ type: "Product", id: "LIST" }];
  },
}),

    getAdminProductById: builder.query({
      query: (id) => `admin/products/${id}/`,
      providesTags: (r, e, id) => [{ type: "Product", id }],
    }),

    // ✅ body can be JSON OR FormData (FormData needed when uploading size_chart_image)
    createAdminProduct: builder.mutation({
      query: (body) => ({
        url: "admin/products/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // ✅ IMPORTANT: use { id, body } so you can pass FormData safely
    updateAdminProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `admin/products/${id}/`,
        method: "PATCH",
        body, // JSON or FormData
      }),
      invalidatesTags: (r, e, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    deleteAdminProduct: builder.mutation({
      query: (id) => ({
        url: `admin/products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    /* ---------------- PUBLIC PRODUCTS (Slug-based, optional for storefront) ---------------- */
    getProducts: builder.query({
      query: (params) => ({
        url: "products/",
        params,
      }),
      providesTags: (res) =>
        res?.results
          ? [
              ...res.results.map((p) => ({ type: "Product", id: p.id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProductBySlug: builder.query({
      query: (slug) => `products/${slug}/`,
      providesTags: (r, e, slug) => [{ type: "Product", id: slug }],
    }),

    /* ---------------- VARIANTS ---------------- */
    getVariants: builder.query({
      query: (params) => ({
        url: "variants/",
        params, // { page, product, search ... } if your backend supports
      }),
      providesTags: (res) =>
        res?.results
          ? [
              ...res.results.map((v) => ({ type: "Variant", id: v.id })),
              { type: "Variant", id: "LIST" },
            ]
          : [{ type: "Variant", id: "LIST" }],
    }),

    getVariantById: builder.query({
      query: (id) => `variants/${id}/`,
      providesTags: (r, e, id) => [{ type: "Variant", id }],
    }),

    createVariant: builder.mutation({
      query: (data) => ({
        url: "variants/",
        method: "POST",
        body: data, // must include product: <UUID> for connection
      }),
      invalidatesTags: [{ type: "Variant", id: "LIST" }],
    }),

    updateVariant: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `variants/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (r, e, { id }) => [
        { type: "Variant", id },
        { type: "Variant", id: "LIST" },
      ],
    }),

    deleteVariant: builder.mutation({
      query: (id) => ({
        url: `variants/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Variant", id: "LIST" }],
    }),

    /* ---------------- IMAGES ---------------- */
    getImages: builder.query({
      query: (params) => ({
        url: "images/",
        params, // { page, product, variant ... } if supported
      }),
      providesTags: (res) =>
        res?.results
          ? [
              ...res.results.map((img) => ({ type: "ProductImage", id: img.id })),
              { type: "ProductImage", id: "LIST" },
            ]
          : [{ type: "ProductImage", id: "LIST" }],
    }),

    getImageById: builder.query({
      query: (id) => `images/${id}/`,
      providesTags: (r, e, id) => [{ type: "ProductImage", id }],
    }),

    // ✅ Assumes backend accepts: product (uuid), variant (uuid optional), image (file), alt_text, is_main, sort_order
    createImage: builder.mutation({
      query: ({ product_id, variant, imageFile, alt_text, is_main, sort_order }) => {
        console.log("Creating image:", { product_id, variant, alt_text, is_main, sort_order });
        const fd = new FormData();
        if (product_id) fd.append("product_id", product_id);
        if (variant) fd.append("variant", variant);
        if (alt_text != null) fd.append("alt_text", alt_text);
        if (is_main != null) fd.append("is_main", String(is_main));
        if (sort_order != null) fd.append("sort_order", String(sort_order));
        fd.append("image", imageFile);

        return {
          url: "images/",
          method: "POST",
          body: fd,
        };
      },
      invalidatesTags: [{ type: "ProductImage", id: "LIST" }],
    }),

    updateImage: builder.mutation({
      query: ({ id, product_id, variant, imageFile, alt_text, is_main, sort_order }) => {
        const fd = new FormData();
        if (product_id) fd.append("product_id", product_id);
        if (variant) fd.append("variant", variant);
        if (alt_text != null) fd.append("alt_text", alt_text);
        if (is_main != null) fd.append("is_main", String(is_main));
        if (sort_order != null) fd.append("sort_order", String(sort_order));
        if (imageFile) fd.append("image", imageFile);

        return {
          url: `images/${id}/`,
          method: "PATCH",
          body: fd,
        };
      },
      invalidatesTags: (r, e, { id }) => [
        { type: "ProductImage", id },
        { type: "ProductImage", id: "LIST" },
      ],
    }),

    deleteImage: builder.mutation({
      query: (id) => ({
        url: `images/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProductImage", id: "LIST" }],
    }),
  }),

  overrideExisting: false,
});

export const {
  // ✅ ADMIN products (use these in admin panel)
  useGetAdminProductsQuery,
  useGetAdminProductByIdQuery,
  useCreateAdminProductMutation,
  useUpdateAdminProductMutation,
  useDeleteAdminProductMutation,

  // (optional) Public products
  useGetProductsQuery,
  useGetProductBySlugQuery,

  // Variants
  useGetVariantsQuery,
  useGetVariantByIdQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,

  // Images
  useGetImagesQuery,
  useGetImageByIdQuery,
  useCreateImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} = catalogApi;
