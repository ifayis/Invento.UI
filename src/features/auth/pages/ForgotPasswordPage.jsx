import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Mail,
    ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { useForgotPasswordMutation } from "../forgotPasswordApi";

const ForgotPasswordPage = () => {
    const [
        forgotPassword,
        {
            isLoading,
            isSuccess,
            data,
            error,
            reset,
        },
    ] = useForgotPasswordMutation();

    const [email, setEmail] =
        useState("");

    const [validationError, setValidationError] =
        useState("");

    useEffect(() => {
        if (!isSuccess) {
            return;
        }

        toast.success(
            data?.message ||
                "If the email exists, password reset instructions have been sent."
        );
    }, [isSuccess, data]);

    useEffect(() => {
        if (!error) {
            return;
        }

        const message =
            error?.data?.message ||
            error?.data?.title ||
            "Unable to process your request.";

        toast.error(message);
    }, [error]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const normalizedEmail =
            email.trim();

        if (!normalizedEmail) {
            setValidationError(
                "Email address is required."
            );

            return;
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                normalizedEmail
            )
        ) {
            setValidationError(
                "Enter a valid email address."
            );

            return;
        }

        setValidationError("");

        await forgotPassword({
            email: normalizedEmail,
        });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);

        if (validationError) {
            setValidationError("");
        }

        if (isSuccess) {
            reset();
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">

            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Brand panel */}

                <section className="relative hidden overflow-hidden bg-slate-950 lg:flex">

                    <div className="absolute inset-0">

                        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

                        <div className="absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-3xl" />

                    </div>

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-xl">
                                <span className="text-lg font-black">
                                    I
                                </span>
                            </div>

                            <span className="text-xl font-bold tracking-tight text-white">
                                INVENTO
                            </span>

                        </div>

                        <div className="max-w-xl">

                            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                                Secure access
                            </p>

                            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                                Get back into your
                                business workspace.
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                                We will help you securely
                                recover access to your
                                INVENTO account.
                            </p>

                            <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                                    <ShieldCheck
                                        size={18}
                                    />
                                </div>

                                Secure password recovery

                            </div>

                        </div>

                        <p className="text-xs text-slate-500">
                            © {new Date().getFullYear()}{" "}
                            INVENTO. All rights
                            reserved.
                        </p>

                    </div>

                </section>

                {/* Form panel */}

                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

                    <div className="w-full max-w-md">

                        {/* Mobile brand */}

                        <div className="mb-10 flex items-center gap-3 lg:hidden">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                <span className="font-black">
                                    I
                                </span>
                            </div>

                            <span className="text-xl font-bold tracking-tight">
                                INVENTO
                            </span>

                        </div>

                        {/* Back */}

                        <Link
                            to="/login"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                        >
                            <ArrowLeft
                                size={16}
                            />

                            Back to sign in
                        </Link>

                        <div className="mb-8">

                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white">
                                <Mail size={22} />
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                Forgot your password?
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Enter the email address
                                associated with your account
                                and we'll help you reset your
                                password.
                            </p>

                        </div>

                        {isSuccess ? (
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

                                <div className="flex items-start gap-4">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                        <CheckCircle2
                                            size={20}
                                        />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-950 dark:text-white">
                                            Check your email
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                            If an account exists
                                            for{" "}
                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                {email.trim()}
                                            </span>
                                            , password reset
                                            instructions have been
                                            sent.
                                        </p>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setEmail("");
                                    }}
                                    className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                    Use another email
                                </button>

                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                noValidate
                                className="space-y-5"
                            >

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        Email address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            autoFocus
                                            placeholder="you@company.com"
                                            value={email}
                                            onChange={
                                                handleEmailChange
                                            }
                                            className={`
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                bg-white
                                                pl-11
                                                pr-4
                                                text-sm
                                                text-slate-900
                                                outline-none
                                                transition
                                                placeholder:text-slate-400
                                                focus:ring-2
                                                dark:bg-slate-950
                                                dark:text-white
                                                dark:placeholder:text-slate-500
                                                ${
                                                    validationError
                                                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                                                        : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 dark:border-slate-800 dark:focus:border-white dark:focus:ring-white/10"
                                                }
                                            `}
                                        />

                                    </div>

                                    {validationError && (
                                        <p className="mt-1.5 text-xs text-red-500">
                                            {
                                                validationError
                                            }
                                        </p>
                                    )}

                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="
                                        group
                                        flex
                                        h-12
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-slate-950
                                        px-5
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-lg
                                        shadow-slate-950/10
                                        transition
                                        hover:bg-slate-800
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                        dark:bg-white
                                        dark:text-slate-950
                                        dark:hover:bg-slate-200
                                    "
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send reset instructions

                                            <ArrowRight
                                                size={17}
                                                className="transition-transform group-hover:translate-x-0.5"
                                            />
                                        </>
                                    )}
                                </button>

                            </form>
                        )}

                        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">

                            Remember your password?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-slate-950 underline-offset-4 hover:underline dark:text-white"
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </section>

            </div>

        </main>
    );
};

export default ForgotPasswordPage;