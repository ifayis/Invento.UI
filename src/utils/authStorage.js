import { STORAGE_KEYS } from "@/constants/storage";

export const authStorage = {
    getAccessToken() {
        return sessionStorage.getItem(
            STORAGE_KEYS.ACCESS_TOKEN
        );
    },

    setAccessToken(token) {
        if (!token) {
            sessionStorage.removeItem(
                STORAGE_KEYS.ACCESS_TOKEN
            );

            return;
        }

        sessionStorage.setItem(
            STORAGE_KEYS.ACCESS_TOKEN,
            token
        );
    },

    getRefreshToken() {
        return sessionStorage.getItem(
            STORAGE_KEYS.REFRESH_TOKEN
        );
    },

    setRefreshToken(token) {
        if (!token) {
            sessionStorage.removeItem(
                STORAGE_KEYS.REFRESH_TOKEN
            );

            return;
        }

        sessionStorage.setItem(
            STORAGE_KEYS.REFRESH_TOKEN,
            token
        );
    },

    clear() {
        sessionStorage.removeItem(
            STORAGE_KEYS.ACCESS_TOKEN
        );

        sessionStorage.removeItem(
            STORAGE_KEYS.REFRESH_TOKEN
        );
    },

    hasAccessToken() {
        return Boolean(
            sessionStorage.getItem(
                STORAGE_KEYS.ACCESS_TOKEN
            )
        );
    },
};