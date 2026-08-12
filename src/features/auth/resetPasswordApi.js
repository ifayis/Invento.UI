import { baseApi } from "@/api/baseApi";
import { API_ENDPOINTS } from "@/api/endpoints";

export const resetPasswordApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            resetPassword: builder.mutation({
                query: ({
                    token,
                    newPassword,
                    confirmPassword,
                }) => ({
                    url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
                    method: "POST",
                    body: {
                        token,
                        newPassword,
                        confirmPassword,
                    },
                }),
            }),
        }),
    });

export const {
    useResetPasswordMutation,
} = resetPasswordApi;