import { authStorage } from "@/utils/authStorage";

const validateAuthResponse = (response) => {
    if (!response?.success) {
        throw new Error(
            response?.message ||
                "Authentication request failed."
        );
    }

    if (!response?.data?.accessToken) {
        throw new Error(
            "Authentication response did not contain an access token."
        );
    }
};

export const saveLoginSession = (response) => {
    validateAuthResponse(response);

    const data = response.data;

    authStorage.setAccessToken(
        data.accessToken
    );

    if (data.refreshToken) {
        authStorage.setRefreshToken(
            data.refreshToken
        );
    }

    if (data.expiresAt) {
        authStorage.setExpiresAt(
            data.expiresAt
        );
    }

    return {
        expiresAt:
            data.expiresAt ?? null,

        mustChangePassword:
            data.mustChangePassword === true,
    };
};

export const saveRefreshSession = (response) => {
    validateAuthResponse(response);

    const data = response.data;

    authStorage.setAccessToken(
        data.accessToken
    );

    if (data.refreshToken) {
        authStorage.setRefreshToken(
            data.refreshToken
        );
    }

    if (data.expiresAt) {
        authStorage.setExpiresAt(
            data.expiresAt
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