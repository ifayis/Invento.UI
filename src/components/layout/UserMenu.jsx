import {
    ChevronDown,
    LogOut,
    Settings,
    User,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserMenu = () => {
    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <button className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-900">

                    <Avatar>

                        <AvatarFallback>
                            AD
                        </AvatarFallback>

                    </Avatar>

                    <div className="hidden text-left lg:block">

                        <p className="text-sm font-semibold">
                            Admin
                        </p>

                        <p className="text-xs text-slate-500">
                            Administrator
                        </p>

                    </div>

                    <ChevronDown size={16} />

                </button>

            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >

                <DropdownMenuItem>

                    <User className="mr-2 h-4 w-4" />

                    Profile

                </DropdownMenuItem>

                <DropdownMenuItem>

                    <Settings className="mr-2 h-4 w-4" />

                    Settings

                </DropdownMenuItem>

                <DropdownMenuItem className="text-red-600">

                    <LogOut className="mr-2 h-4 w-4" />

                    Logout

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    );
};

export default UserMenu;