import { baseApi } from "@/api/baseApi";
import { API_ENDPOINTS } from "@/api/endpoints";

export const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: API_ENDPOINTS.AUTH.REGISTER,
                method: "POST",
                body: {
                    companyName:
                        credentials.companyName,
                    fullName:
                        credentials.fullName,
                    email:
                        credentials.email,
                    password:
                        credentials.password,
                },
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
} = registerApi;