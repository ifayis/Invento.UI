import { navigation } from "@/constants/navigation";

import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {

    return (

        <aside
            className="
            hidden
            lg:flex
            w-72
            shrink-0
            flex-col
            border-r
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-950
            "
        >

            <SidebarHeader />

            <nav className="flex-1 space-y-2 overflow-y-auto p-5">

                {navigation.map((item) => (

                    <SidebarItem
                        key={item.path}
                        item={item}
                    />

                ))}

            </nav>

            <SidebarFooter />

        </aside>

    );

};

export default Sidebar;