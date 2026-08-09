import { Navigate, useLocation } from "react-router-dom";

import { authStorage } from "@/utils/authStorage";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    const isAuthenticated =
        authStorage.hasAccessToken();

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