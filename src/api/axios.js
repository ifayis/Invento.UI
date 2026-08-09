import axios from "axios";

import { authStorage } from "@/utils/authStorage";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    console.warn(
        "VITE_API_BASE_URL is not configured. API requests will not work until it is set."
    );
}

const apiClient = axios.create({
    baseURL: API_BASE_URL || undefined,
    timeout: 30000,

    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken =
            authStorage.getAccessToken();

        if (accessToken) {
            config.headers.Authorization =
                `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

export default apiClient;