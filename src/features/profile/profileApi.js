import { baseApi } from "@/api/baseApi";
import { API_ENDPOINTS } from "@/api/endpoints";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: API_ENDPOINTS.PROFILE.ROOT,
                method: "GET",
            }),

            providesTags: ["Profile"],
        }),
    }),
});

export const {
    useGetProfileQuery,
} = profileApi;