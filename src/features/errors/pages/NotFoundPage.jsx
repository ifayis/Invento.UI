import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6">
            <h1 className="text-7xl font-bold">404</h1>

            <p className="text-gray-500">
                Page not found
            </p>

            <Link
                to="/dashboard"
                className="rounded-xl bg-blue-600 px-5 py-3 text-white"
            >
                Go Dashboard
            </Link>
        </div>
    );
};

export default NotFoundPage;