import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL as string,
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (body) => ({
                url: `/users`,
                method: 'POST',
                body,
            }),
        }),
        getUsers: builder.query({
            query: ({page}) => ({
                url: `/users?page=${page}`,
                method: 'GET',
            })
        }),
        login: builder.mutation({
            query: (body) => ({
                url: `/login`,
                method: 'POST',
                body,
            }),
        }),
    }),
}) 
export const { useCreateUserMutation, useLazyGetUsersQuery, useLoginMutation } = userApi;