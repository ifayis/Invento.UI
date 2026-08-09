import { baseApi } from "@/api/baseApi";
import { API_ENDPOINTS } from "@/api/endpoints";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: API_ENDPOINTS.AUTH.LOGIN,
                method: "POST",
                body: {
                    email: credentials.email,
                    password: credentials.password,
                },
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: API_ENDPOINTS.AUTH.REGISTER,
                method: "POST",
                body: {
                    companyName: data.companyName,
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password,
                },
            }),
        }),

        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: API_ENDPOINTS.AUTH.REFRESH_TOKEN,
                method: "POST",
                body: {
                    refreshToken,
                },
            }),
        }),

        logout: builder.mutation({
            query: (refreshToken) => ({
                url: API_ENDPOINTS.AUTH.LOGOUT,
                method: "POST",
                body: {
                    refreshToken,
                },
            }),
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
                method: "POST",
                body: {
                    email,
                },
            }),
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
                method: "POST",
                body: {
                    token: data.token,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
                },
            }),
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
                method: "POST",
                body: {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
                },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = authApi;