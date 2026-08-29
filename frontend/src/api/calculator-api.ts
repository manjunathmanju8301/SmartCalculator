// import { QueryClient } from "@tanstack/react-query";

// export const queryClient = new QueryClient()

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IExpression } from "../app-types";

export const calculatorApi = createApi({
    reducerPath: 'calculatorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URI
    }),
    endpoints: (builder) => ({
        getExpression: builder.query<IExpression[], {userId:number}>({
            query: ({userId}) => ({
                url:`/users/${userId}/expressions`,
                method:'GET'
            })
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
            })
        })
    }),
});

export const {useCreateExpressionMutation, useLazyGetExpressionQuery,useGetExpressionQuery}=calculatorApi;