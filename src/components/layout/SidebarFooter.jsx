import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

const SidebarFooter = () => {
    return (
        <div className="border-t border-slate-200 dark:border-slate-800 p-5">

            <Button
                variant="outline"
                className="w-full justify-start gap-2"
            >
                <LogOut size={18} />

                Logout
            </Button>

        </div>
    );
};

export default SidebarFooter;