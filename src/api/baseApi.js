import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { authStorage } from "@/utils/authStorage";

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

export const baseApi = createApi({
    reducerPath: "api",

    baseQuery: rawBaseQuery,

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