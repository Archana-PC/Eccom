import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout } from '../features/auth/authSlice'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include', // 🔥 cookies
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // try refresh
    const refreshResult = await rawBaseQuery(
      { url: '/auth/refresh/', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult?.data) {
      // retry original request
      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}
// api is a helper object with Redux powers. in above
