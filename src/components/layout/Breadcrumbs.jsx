import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const { pathname } = useLocation();

    const title =
        pathname
            .split("/")
            .filter(Boolean)
            .pop() || "Dashboard";

    return (
        <div>

            <p className="text-sm text-slate-500">
                Dashboard
            </p>

            <h1 className="text-2xl font-bold capitalize">
                {title.replace("-", " ")}
            </h1>

        </div>
    );
};

export default Breadcrumbs;