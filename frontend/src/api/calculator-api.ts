// import { QueryClient } from "@tanstack/react-query";

// export const queryClient = new QueryClient()

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IExpression } from "../app-types";

export const calculatorApi = createApi({
    reducerPath: 'calculatorApi',
    tagTypes: ['Expression'], // is used for cache data keep update along with data mutation
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URI
    }),
    endpoints: (builder) => ({
        getExpression: builder.query<{message:string, data:IExpression[]}, {userId:number}>({
            query: ({userId}) => ({
                url:`/users/${userId}/expressions`,
                method:'GET'
            }),
            providesTags: (_result, _error, { userId }) => [ // Provide a tag for the specific user ID to enable cache invalidation
                { type: 'Expression', id: userId },
            ],
        }),
        createExpression: builder.mutation<
            IExpression,
            {
                expression: string;
                result: number;
                userId: number;
            }
        >({
            query: ({ expression, result, userId }: { expression: string, result: number, userId:number }) => ({
                url: `/users/${userId}/expressions`,
                method: 'POST',
                body: { expression, result }
            }),
            invalidatesTags: (_result, _error, { userId }) => [ // Invalidate the cache for the specific user ID to trigger a refetch
                { type: 'Expression', id: userId },
            ],
        })
    }),
});

export const {useCreateExpressionMutation, useLazyGetExpressionQuery,useGetExpressionQuery}=calculatorApi;