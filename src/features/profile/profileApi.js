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

        updateProfile: builder.mutation({
            query: ({ fullName, email }) => ({
                url: API_ENDPOINTS.PROFILE.ROOT,
                method: "PUT",
                body: {
                    fullName,
                    email,
                },
            }),

            invalidatesTags: ["Profile"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
} = profileApi;