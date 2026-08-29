// import { QueryClient } from "@tanstack/react-query";

// export const queryClient = new QueryClient()

// import { buildClerkJSScriptAttributes } from "@clerk/react/internal";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../app-types";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URI
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => '/users'
        }),
        createUser: builder.mutation<
            IUser,
            { name: string; email: string }
        >({
            query: ({ name, email }) => ({
                url: '/users',
                method: 'POST',
                body: { name, email }
            })
        })
    }),
});

export const {useCreateUserMutation, useGetUsersQuery} = userApi;
