import { api } from "../../../services/api"; // adjust if your path differs

export const catalogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------------- PRODUCTS ---------------- */
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

    getProductById: builder.query({
      query: (id) => `products/${id}/`,
      providesTags: (r, e, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: "products/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (r, e, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
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
        body: data,
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
      query: ({ product, variant, imageFile, alt_text, is_main, sort_order }) => {
        const fd = new FormData();
        if (product) fd.append("product", product);
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
      query: ({ id, product, variant, imageFile, alt_text, is_main, sort_order }) => {
        const fd = new FormData();
        if (product) fd.append("product", product);
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
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  useGetVariantsQuery,
  useGetVariantByIdQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,

  useGetImagesQuery,
  useGetImageByIdQuery,
  useCreateImageMutation,
  useUpdateImageMutation,
  useDeleteImageMutation,
} = catalogApi;
