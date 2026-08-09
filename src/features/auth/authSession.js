import { authStorage } from "@/utils/authStorage";

export const saveLoginSession = (response) => {
    if (!response?.success) {
        throw new Error(
            response?.message ||
                "Authentication failed."
        );
    }

    const data = response.data;

    if (!data?.accessToken) {
        throw new Error(
            "Login response did not contain an access token."
        );
    }

    authStorage.setAccessToken(
        data.accessToken
    );

    if (data.refreshToken) {
        authStorage.setRefreshToken(
            data.refreshToken
        );
    }

    return {
        expiresAt:
            data.expiresAt ?? null,

        mustChangePassword:
            data.mustChangePassword === true,
    };
};

export const clearLoginSession = () => {
    authStorage.clear();
};