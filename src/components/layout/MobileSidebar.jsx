import { X } from "lucide-react";

import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";

import { navigation } from "@/constants/navigation";

import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarItem from "./SidebarItem";

const MobileSidebar = ({
    open,
    onOpenChange,
}) => {

    return (

        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >

            <SheetContent
                side="left"
                className="w-72 p-0"
            >

                <div className="flex h-full flex-col">

                    <SidebarHeader />

                    <nav className="flex-1 space-y-2 overflow-y-auto p-5">

                        {navigation.map((item) => (

                            <SidebarItem
                                key={item.path}
                                item={item}
                                onClick={() => onOpenChange(false)}
                            />
                        ))}

                    </nav>

                    <SidebarFooter />

                </div>

            </SheetContent>

        </Sheet>

    );

};

export default MobileSidebar;