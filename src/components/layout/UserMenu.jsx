import {
    ChevronDown,
    LogOut,
    Settings,
    User,
} from "lucide-react";

import { useSelector } from "react-redux";

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

import {
    selectProfileName,
    selectProfileEmail,
} from "@/features/profile/profileSelectors";

const getInitials = (name) => {
    if (!name) {
        return "U";
    }

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) =>
            part.charAt(0).toUpperCase()
        )
        .join("");
};

const UserMenu = () => {
    const fullName = useSelector(
        selectProfileName
    );

    const email = useSelector(
        selectProfileEmail
    );

    const displayName =
        fullName || "User";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-2
                        py-1
                        transition
                        hover:bg-slate-100
                        dark:hover:bg-slate-900
                    "
                >
                    <Avatar>
                        <AvatarFallback>
                            {getInitials(
                                displayName
                            )}
                        </AvatarFallback>
                    </Avatar>

                    <div className="hidden text-left lg:block">
                        <p className="max-w-32 truncate text-sm font-semibold">
                            {displayName}
                        </p>

                        <p className="max-w-40 truncate text-xs text-slate-500 dark:text-slate-400">
                            {email || "Account"}
                        </p>
                    </div>

                    <ChevronDown size={16} />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-60"
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