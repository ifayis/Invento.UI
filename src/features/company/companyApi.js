import { baseApi } from "@/api/baseApi";
import { API_ENDPOINTS } from "@/api/endpoints";

export const companyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCompany: builder.query({
            query: () => ({
                url: API_ENDPOINTS.COMPANY.ROOT,
                method: "GET",
            }),

            providesTags: ["Company"],
        }),

        updateCompany: builder.mutation({
            query: ({
                companyName,
                email,
                phoneNumber,
                address,
                logoUrl,
                taxNumber,
                website,
            }) => ({
                url: API_ENDPOINTS.COMPANY.ROOT,
                method: "PUT",
                body: {
                    companyName,
                    email,
                    phoneNumber,
                    address,
                    logoUrl,
                    taxNumber,
                    website,
                },
            }),

            invalidatesTags: ["Company"],
        }),
    }),
});

export const {
    useGetCompanyQuery,
    useUpdateCompanyMutation,
} = companyApi;