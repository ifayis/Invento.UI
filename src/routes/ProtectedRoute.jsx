import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    selectAuthInitialized,
    selectIsAuthenticated,
} from "@/features/auth/authSelectors";

const ProtectedRoute = ({
    children,
}) => {
    const location = useLocation();

    const isAuthenticated =
        useSelector(
            selectIsAuthenticated
        );

    const isInitialized =
        useSelector(
            selectAuthInitialized
        );

    if (!isInitialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    return children;
};

export default ProtectedRoute;