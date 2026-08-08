import { Bell, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import UserMenu from "./UserMenu";

import { useTheme } from "@/theme/useTheme";
import { THEME } from "@/constants/theme";

const HeaderActions = () => {
    const {
        appliedTheme,
        setTheme,
    } = useTheme();

    return (
        <div className="flex items-center gap-2">

            <Button
                variant="ghost"
                size="icon"
            >
                <Bell size={18} />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                    setTheme(
                        appliedTheme === THEME.DARK
                            ? THEME.LIGHT
                            : THEME.DARK
                    )
                }
            >
                {appliedTheme === THEME.DARK
                    ? <Sun size={18}/>
                    : <Moon size={18}/>
                }
            </Button>

            <UserMenu />

        </div>
    );
};

export default HeaderActions;