import { baseApi } from "@/api/baseApi";
import { API_ENDPOINTS } from "@/api/endpoints";

export const forgotPasswordApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            forgotPassword: builder.mutation({
                query: (email) => ({
                    url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
                    method: "POST",
                    body: {
                        email,
                    },
                }),
            }),
        }),
    });

export const {
    useForgotPasswordMutation,
} = forgotPasswordApi;