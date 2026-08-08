import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <main className="min-h-screen bg-[var(--background)]">
            <Outlet />
        </main>
    );
};

export default DashboardLayout;