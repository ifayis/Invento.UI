const ProtectedRoute = ({ children }) => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return null;
    }

    return children;
};

export default ProtectedRoute;