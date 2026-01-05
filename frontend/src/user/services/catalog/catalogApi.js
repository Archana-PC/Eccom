import { api } from "../../../services/api";

export const catalogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /* =========================
       CATEGORIES
    ========================= */
    

    
    getCategories: builder.query({
      query: ({ page = 1, page_size = 10 } = {}) =>
        `/categories/?page=${page}&page_size=${page_size}`,
    }),
    getCategoryTree: builder.query({
      query: () => "categories/tree/",
    }),

    getProductsByCategorySlug: builder.query({
      query: (slug) => `categories/${slug}/products/`,
    }),

    /* =========================
       COLLECTIONS
    ========================= */
    getCollections: builder.query({
      query: () => "collections/",
    }),

    /* =========================
       BRANDS
    ========================= */
    getBrands: builder.query({
      query: () => "brands/",
    }),

    /* =========================
       STYLES
    ========================= */
    getStyles: builder.query({
      query: () => "styles/",
      // return only what UI needs (name + slug for click)
      transformResponse: (res) =>
        (res?.results ?? []).map(({ name, slug }) => ({ name, slug })),
    }),

    // If your backend supports: GET /styles/<slug>/
    getStyleBySlug: builder.query({
      query: (slug) => `styles/${slug}/`,
    }),

    // Option A (BEST if your backend has this route):
    // GET /styles/<slug>/products/
    getProductsByStyleSlug: builder.query({
      query: (slug) => `styles/${slug}/products/`,
    }),

    /* =========================
       PRODUCTS
    ========================= */
    getProducts: builder.query({
      query: (params) => ({
        url: "products/",
        params, // category, collection, search, price, style, etc
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
  useLazyGetCategoriesQuery,
  useGetCategoryTreeQuery,
  useGetProductsByCategorySlugQuery,
  useGetCollectionsQuery,
  useGetBrandsQuery,

  useGetStylesQuery,
  useGetStyleBySlugQuery,
  useGetProductsByStyleSlugQuery,

  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetVariantsByProductQuery,
  useGetHomeProductsQuery,
} = catalogApi;
