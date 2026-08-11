import {
    configureStore,
} from "@reduxjs/toolkit";

import { baseApi } from "@/api/baseApi";

import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]:
            baseApi.reducer,

        auth: authReducer,

        profile: profileReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware
        ),

    devTools: import.meta.env.DEV,
});