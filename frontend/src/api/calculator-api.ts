// import { QueryClient } from "@tanstack/react-query";

// export const queryClient = new QueryClient()

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const calculatorApi = createApi({
    reducerPath: 'calculatorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URI
    }),
    endpoints: (builder) => ({
        getExpression: builder.query({
            query: ({userId}:{userId:number}) => ({
                url:`/users/${userId}/expressions`,
                method:'GET'
            })
        }),
        createExpression: builder.mutation({
            query: ({ expression, result, userId }: { expression: string, result: number, userId:number }) => ({
                url: `/users/${userId}/expressions`,
                method: 'POST',
                body: { expression, result }
            })
        })
    }),
});

export const {useCreateExpressionMutation, useGetExpressionQuery}=calculatorApi;