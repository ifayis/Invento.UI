import { useEffect, useMemo, useState } from "react";

import ThemeContext from "./ThemeContext";

import { STORAGE_KEYS, THEME } from "@/constants/theme";

const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEME.DARK
        : THEME.LIGHT;
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEYS.THEME);

        return saved || THEME.SYSTEM;
    });

    const appliedTheme =
        theme === THEME.SYSTEM
            ? getSystemTheme()
            : theme;

    useEffect(() => {
        document.documentElement.classList.remove(
            THEME.LIGHT,
            THEME.DARK
        );

        document.documentElement.classList.add(
            appliedTheme
        );

        localStorage.setItem(
            STORAGE_KEYS.THEME,
            theme
        );
    }, [theme, appliedTheme]);

    useEffect(() => {
        if (theme !== THEME.SYSTEM) return;

        const media = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

        const listener = () => {
            document.documentElement.classList.remove(
                THEME.LIGHT,
                THEME.DARK
            );

            document.documentElement.classList.add(
                getSystemTheme()
            );
        };

        media.addEventListener("change", listener);

        return () =>
            media.removeEventListener(
                "change",
                listener
            );
    }, [theme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            appliedTheme,
        }),
        [theme, appliedTheme]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;