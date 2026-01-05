import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth',"Roles",'Categories','Users', 'Fabric', 'Material', 'Color',"Style", "Material",],
  endpoints: () => ({}),
})
