import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from './slices/calculatore-slice';
import userReducer from './slices/user-slice';
import { userApi } from "../api/user-api";
import { calculatorApi } from "../api/calculator-api";

export const appStore = configureStore({
    reducer: {
        calculator: calculatorReducer,
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [calculatorApi.reducerPath]: calculatorApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(calculatorApi.middleware),
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
