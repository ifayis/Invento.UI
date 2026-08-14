import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
import companyReducer from "@/features/company/companySlice";

import { baseApi } from "@/api/baseApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        company: companyReducer,

        [baseApi.reducerPath]:
            baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware
        ),
});