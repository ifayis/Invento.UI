import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const DashboardLayout = () => {

    return (

        <div className="flex min-h-screen bg-[var(--background)]">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Header />

                <main className="flex-1 p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;