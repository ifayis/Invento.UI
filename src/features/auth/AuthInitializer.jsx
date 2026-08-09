import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    setCredentials,
    setInitialized,
} from "./authSlice";

import {
    authStorage,
} from "@/utils/authStorage";

import {
    refreshSession,
} from "./refreshManager";

const AuthInitializer = ({
    children,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;

        const initialize = async () => {
            const accessToken =
                authStorage.getAccessToken();

            const refreshToken =
                authStorage.getRefreshToken();

            if (
                !accessToken &&
                !refreshToken
            ) {
                if (mounted) {
                    dispatch(
                        setInitialized(true)
                    );
                }

                return;
            }
            if (accessToken) {
                if (mounted) {
                    dispatch(
                        setCredentials({
                            user: null,

                            expiresAt:
                                authStorage.getExpiresAt(),

                            mustChangePassword:
                                false,
                        })
                    );

                    dispatch(
                        setInitialized(true)
                    );
                }

                return;
            }

            try {
                const session =
                    await refreshSession();

                if (!session) {
                    throw new Error(
                        "Authentication session could not be restored."
                    );
                }

                if (mounted) {
                    dispatch(
                        setCredentials({
                            user: null,

                            expiresAt:
                                session.expiresAt,

                            mustChangePassword:
                                session.mustChangePassword,
                        })
                    );
                }
            } catch {
                authStorage.clear();
            } finally {
                if (mounted) {
                    dispatch(
                        setInitialized(true)
                    );
                }
            }
        };

        initialize();

        return () => {
            mounted = false;
        };
    }, [dispatch]);

    return children;
};

export default AuthInitializer;