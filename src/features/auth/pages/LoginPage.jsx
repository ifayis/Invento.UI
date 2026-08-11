import {
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Brand panel */}
                <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.18),transparent_35%)]" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-slate-950">
                                    I
                                </div>

                                <span className="text-xl font-semibold tracking-tight text-white">
                                    INVENTO
                                </span>
                            </div>
                        </div>

                        <div className="max-w-xl">
                            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
                                Business Management
                            </p>

                            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white xl:text-6xl">
                                Run your business with clarity.
                            </h1>

                            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                                Manage inventory, sales,
                                purchases, customers and
                                business performance from one
                                connected workspace.
                            </p>

                            <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">
                                <ShieldCheck
                                    size={18}
                                    className="text-blue-400"
                                />

                                Secure tenant-isolated workspace
                            </div>
                        </div>

                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} INVENTO
                        </p>
                    </div>
                </section>

                {/* Login panel */}
                <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
                    <div className="w-full max-w-md">

                        <div className="mb-10 lg:hidden">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white dark:bg-white dark:text-slate-950">
                                    I
                                </div>

                                <span className="text-xl font-semibold">
                                    INVENTO
                                </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                                Welcome back
                            </p>

                            <h2 className="text-3xl font-semibold tracking-tight">
                                Sign in to INVENTO
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Enter your account credentials
                                to continue to your workspace.
                            </p>
                        </div>

                        <LoginForm />

                        <div className="mt-8 text-center">

                            <p className="text-sm text-slate-500 dark:text-slate-400">

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="font-semibold text-slate-950 underline-offset-4 hover:underline dark:text-white"
                                >
                                    Create an account
                                </Link>

                            </p>

                        </div>

                        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                            <span>
                                Secure authentication
                            </span>

                            <ArrowRight size={12} />

                            <span>
                                Tenant protected
                            </span>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
};

export default LoginPage;