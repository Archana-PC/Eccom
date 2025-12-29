import { api } from "../../services/api";

export const catalogApi = api.injectEndpoints({
  endpoints: (builder) => ({

    /* =========================
       CATEGORIES
    ========================= */
    getCategories: builder.query({
      query: () => "categories/",
    }),

    getCategoryTree: builder.query({
      query: () => "categories/tree/",
    }),

    /* =========================
       COLLECTIONS
    ========================= */
    getCollections: builder.query({
      query: () => "collections/",
    }),
    getProductsByCategorySlug: builder.query({
      query: (slug) => `/categories/${slug}/products/`,
    }),

    /* =========================
       BRANDS
    ========================= */
    getBrands: builder.query({
      query: () => "brands/",
    }),

    /* =========================
       PRODUCTS
    ========================= */
    getProducts: builder.query({
      query: (params) => ({
        url: "products/",
        params, // category, collection, search, price, etc
      }),
    }),

    getProductBySlug: builder.query({
      query: (slug) => `products/${slug}/`,
    }),

    /* =========================
       VARIANTS
    ========================= */
    getVariantsByProduct: builder.query({
      query: (productId) => `variants/?product=${productId}`,
    }),
/* =========================
       HOME PRODUCTS
    ========================= */

    getHomeProducts: builder.query({
  query: () => "home/products/",
}),

  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryTreeQuery,
  useGetProductsByCategorySlugQuery,
  useGetCollectionsQuery,
  useGetBrandsQuery,
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetVariantsByProductQuery,
  useGetHomeProductsQuery
} = catalogApi;
