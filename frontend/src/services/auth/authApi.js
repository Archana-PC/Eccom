import { api } from "../../services/api";
import { setUser, logout } from "./authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "auth/signup/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user)); // automatically log in after signup
        } catch {}
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login/",
        method: "POST",
        body: data,
      }),
    }),

    getMe: builder.query({
      query: () => "auth/profile/",
    }),

      logout: builder.mutation({
      query: () => ({
        url: "auth/logout/",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled; // try server logout
        } catch (e) {
          // even if server fails, we still logout locally
        } finally {
          dispatch(logout());
          dispatch(api.util.resetApiState()); // ✅ clears all RTK Query cached data
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useLogoutMutation,
  useSignupMutation,
} = authApi;
