import {
    Building2,
    ChevronRight,
    KeyRound,
    UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

const settingsItems = [
    {
        title: "Profile",
        description:
            "Manage your name, email address, and personal account information.",
        path: "/settings/profile",
        icon: UserRound,
    },
    {
        title: "Company",
        description:
            "Manage your company information and business details.",
        path: "/company",
        icon: Building2,
    },
    {
        title: "Change Password",
        description:
            "Update your account password and keep your account secure.",
        path: "/settings/change-password",
        icon: KeyRound,
    },
];

const SettingsPage = () => {
    return (
        <div className="mx-auto w-full max-w-5xl space-y-6">
            <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Preferences & security
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                    Settings
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Manage your profile, company information,
                    and account security.
                </p>
            </div>

            <div className="grid gap-4">
                {settingsItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-white dark:group-hover:text-slate-950">
                                <Icon size={20} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
                                    {item.title}
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {item.description}
                                </p>
                            </div>

                            <ChevronRight
                                size={18}
                                className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SettingsPage;