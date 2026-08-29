// import { QueryClient } from "@tanstack/react-query";

// export const queryClient = new QueryClient()

import { buildClerkJSScriptAttributes } from "@clerk/react/internal";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URI
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users'
        }),
        createUser: builder.mutation({
            query: ({ name, email }: { name: string, email: string }) => ({
                url: '/users',
                method: 'POST',
                body: { name, email }
            })
        })
    }),
});

export const {useCreateUserMutation, useGetUsersQuery} = userApi;
