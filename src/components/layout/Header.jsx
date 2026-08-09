import { useState } from "react";

import {
    Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import HeaderActions from "./HeaderActions";
import MobileSidebar from "./MobileSidebar";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header
                className="
                    sticky
                    top-0
                    z-50
                    h-20
                    border-b
                    border-slate-200
                    bg-white/70
                    backdrop-blur-xl
                    dark:border-slate-800
                    dark:bg-slate-950/70
                "
            >
                <div className="flex h-full items-center justify-between px-6 lg:px-8">

                    <div className="flex items-center gap-5">

                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setOpen(true)}
                            aria-label="Open navigation menu"
                        >
                            <Menu size={22} />
                        </Button>

                        <Breadcrumbs />

                    </div>

                    <HeaderActions />

                </div>
            </header>

            <MobileSidebar
                open={open}
                onOpenChange={setOpen}
            />
        </>
    );
};

export default Header;