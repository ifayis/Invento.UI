import { useSelector } from "react-redux";

import {
    selectTenantId,
} from "@/features/profile/profileSelectors";

const SidebarHeader = () => {
    const tenantId = useSelector(
        selectTenantId
    );

    return (
        <div className="flex h-20 items-center border-b border-slate-200 dark:border-slate-800 px-8">

            <div className="min-w-0">

                <h1 className="text-2xl font-bold tracking-tight">
                    INVENTO
                </h1>

                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {tenantId
                        ? "Business Workspace"
                        : "Business Management"}
                </p>

            </div>

        </div>
    );
};

export default SidebarHeader;