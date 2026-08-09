import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { authStorage } from "@/utils/authStorage";

import {
    clearCredentials,
} from "@/features/auth/authSlice";

import {
    refreshSession,
} from "@/features/auth/refreshManager";

const rawBaseQuery = fetchBaseQuery({
    baseUrl:
        import.meta.env.VITE_API_BASE_URL || "",

    prepareHeaders: (headers) => {
        const accessToken =
            authStorage.getAccessToken();

        if (accessToken) {
            headers.set(
                "Authorization",
                `Bearer ${accessToken}`
            );
        }

        headers.set(
            "Accept",
            "application/json"
        );

        return headers;
    },
});

const baseQueryWithReauth = async (
    args,
    api,
    extraOptions
) => {
    let result = await rawBaseQuery(
        args,
        api,
        extraOptions
    );

    if (
        result.error &&
        result.error.status === 401
    ) {
        try {
            const session =
                await refreshSession();

            if (session) {
                result = await rawBaseQuery(
                    args,
                    api,
                    extraOptions
                );

                if (
                    result.error &&
                    result.error.status === 401
                ) {
                    authStorage.clear();

                    api.dispatch(
                        clearCredentials()
                    );
                }
            } else {
                authStorage.clear();

                api.dispatch(
                    clearCredentials()
                );
            }
        } catch {
            authStorage.clear();

            api.dispatch(
                clearCredentials()
            );
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",

    baseQuery: baseQueryWithReauth,

    tagTypes: [
        "Auth",
        "Profile",
        "Company",
        "Dashboard",
        "Balance",
        "Category",
        "Product",
        "Inventory",
        "Customer",
        "Supplier",
        "Purchase",
        "Sale",
        "Report",
    ],

    endpoints: () => ({}),
});