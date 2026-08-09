import { STORAGE_KEYS } from "@/constants/storage";

const getStorage = () => {
    return sessionStorage;
};

export const authStorage = {
    getAccessToken() {
        return getStorage().getItem(
            STORAGE_KEYS.ACCESS_TOKEN
        );
    },

    setAccessToken(token) {
        if (!token) {
            getStorage().removeItem(
                STORAGE_KEYS.ACCESS_TOKEN
            );

            return;
        }

        getStorage().setItem(
            STORAGE_KEYS.ACCESS_TOKEN,
            token
        );
    },

    getRefreshToken() {
        return getStorage().getItem(
            STORAGE_KEYS.REFRESH_TOKEN
        );
    },

    setRefreshToken(token) {
        if (!token) {
            getStorage().removeItem(
                STORAGE_KEYS.REFRESH_TOKEN
            );

            return;
        }

        getStorage().setItem(
            STORAGE_KEYS.REFRESH_TOKEN,
            token
        );
    },

    clear() {
        getStorage().removeItem(
            STORAGE_KEYS.ACCESS_TOKEN
        );

        getStorage().removeItem(
            STORAGE_KEYS.REFRESH_TOKEN
        );
    },

    hasAccessToken() {
        return Boolean(
            getStorage().getItem(
                STORAGE_KEYS.ACCESS_TOKEN
            )
        );
    },
};