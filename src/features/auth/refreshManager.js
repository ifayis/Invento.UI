import { authStorage } from "@/utils/authStorage";
import { API_ENDPOINTS } from "@/api/endpoints";
import { saveRefreshSession } from "./authSession";

let refreshPromise = null;

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "";

export const refreshSession = async () => {
    if (refreshPromise) {
        return refreshPromise;
    }

    const refreshToken =
        authStorage.getRefreshToken();

    if (!refreshToken) {
        return null;
    }

    refreshPromise = fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },

            body: JSON.stringify({
                refreshToken,
            }),
        }
    )
        .then(async (response) => {
            let data = null;

            try {
                data = await response.json();
            } catch {
                data = null;
            }

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Unable to refresh authentication session."
                );
            }

            return saveRefreshSession(data);
        })
        .finally(() => {
            refreshPromise = null;
        });

    return refreshPromise;
};