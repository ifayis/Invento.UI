import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { useResetPasswordMutation } from "../resetPasswordApi";

const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const token = useMemo(
        () => searchParams.get("token") || "",
        [searchParams]
    );

    const [
        resetPassword,
        {
            isLoading,
            isSuccess,
            data,
            error,
            reset,
        },
    ] = useResetPasswordMutation();

    const [newPassword, setNewPassword] =
        useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const [errors, setErrors] =
        useState({});

    useEffect(() => {
        if (!error) {
            return;
        }

        const message =
            error?.data?.message ||
            error?.data?.title ||
            "Unable to reset your password.";

        toast.error(message);
    }, [error]);

    useEffect(() => {
        if (!isSuccess) {
            return;
        }

        toast.success(
            data?.message ||
                "Password reset successfully."
        );
    }, [isSuccess, data]);

    const validate = () => {
        const nextErrors = {};

        if (!token) {
            nextErrors.token =
                "This password reset link is invalid or incomplete.";
        }

        if (!newPassword) {
            nextErrors.newPassword =
                "New password is required.";
        } else if (
            newPassword.length < 8
        ) {
            nextErrors.newPassword =
                "Password must contain at least 8 characters.";
        }

        if (!confirmPassword) {
            nextErrors.confirmPassword =
                "Please confirm your new password.";
        } else if (
            newPassword !== confirmPassword
        ) {
            nextErrors.confirmPassword =
                "Passwords do not match.";
        }

        setErrors(nextErrors);

        return (
            Object.keys(nextErrors).length === 0
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            toast.error(
                "Please correct the highlighted fields."
            );

            return;
        }

        await resetPassword({
            token,
            newPassword,
            confirmPassword,
        });
    };

    const handleNewPasswordChange = (
        event
    ) => {
        setNewPassword(event.target.value);

        setErrors((current) => {
            if (!current.newPassword) {
                return current;
            }

            const next = {
                ...current,
            };

            delete next.newPassword;

            return next;
        });

        if (isSuccess) {
            reset();
        }
    };

    const handleConfirmPasswordChange = (
        event
    ) => {
        setConfirmPassword(event.target.value);

        setErrors((current) => {
            if (!current.confirmPassword) {
                return current;
            }

            const next = {
                ...current,
            };

            delete next.confirmPassword;

            return next;
        });

        if (isSuccess) {
            reset();
        }
    };

    const inputClass = (field) => `
        h-12
        w-full
        rounded-xl
        border
        bg-white
        pl-11
        pr-12
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
            errors[field]
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 dark:border-slate-800 dark:focus:border-white dark:focus:ring-white/10"
        }
    `;

    if (isSuccess) {
        return (
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="flex min-h-screen items-center justify-center px-5 py-10">
                    <div className="w-full max-w-md">

                        <div className="mb-8 flex items-center justify-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                <span className="text-lg font-black">
                                    I
                                </span>
                            </div>

                            <span className="text-xl font-bold tracking-tight">
                                INVENTO
                            </span>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <CheckCircle2
                                    size={28}
                                />
                            </div>

                            <h1 className="mt-6 text-2xl font-semibold tracking-tight">
                                Password reset complete
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Your password has been
                                updated successfully.
                                You can now sign in with
                                your new password.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/login",
                                        {
                                            replace: true,
                                        }
                                    )
                                }
                                className="
                                    mt-8
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
                                    transition
                                    hover:bg-slate-800
                                    dark:bg-white
                                    dark:text-slate-950
                                    dark:hover:bg-slate-200
                                "
                            >
                                Continue to sign in

                                <ArrowRight
                                    size={17}
                                />
                            </button>

                        </div>
                    </div>
                </div>
            </main>
        );
    }

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
                                Account security
                            </p>

                            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                                Create a new secure
                                password.
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                                Choose a strong password
                                to protect access to your
                                INVENTO workspace.
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

                {/* Form */}

                <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

                    <div className="w-full max-w-md">

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
                                <LockKeyhole
                                    size={22}
                                />
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                Reset your password
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Create a new password for
                                your INVENTO account.
                            </p>

                        </div>

                        {!token && (
                            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600 dark:border-red-950 dark:bg-red-950/30 dark:text-red-400">
                                This reset link does not
                                contain a valid reset token.
                                Please request a new password
                                reset link.
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-5"
                        >

                            {/* New password */}

                            <div>

                                <label
                                    htmlFor="newPassword"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    New password
                                </label>

                                <div className="relative">

                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="new-password"
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={
                                            handleNewPasswordChange
                                        }
                                        className={inputClass(
                                            "newPassword"
                                        )}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (current) =>
                                                    !current
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff
                                                size={18}
                                            />
                                        ) : (
                                            <Eye
                                                size={18}
                                            />
                                        )}
                                    </button>

                                </div>

                                {errors.newPassword && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {
                                            errors.newPassword
                                        }
                                    </p>
                                )}

                            </div>

                            {/* Confirm password */}

                            <div>

                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">

                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="new-password"
                                        placeholder="Repeat your new password"
                                        value={
                                            confirmPassword
                                        }
                                        onChange={
                                            handleConfirmPasswordChange
                                        }
                                        className={inputClass(
                                            "confirmPassword"
                                        )}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (current) =>
                                                    !current
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff
                                                size={18}
                                            />
                                        ) : (
                                            <Eye
                                                size={18}
                                            />
                                        )}
                                    </button>

                                </div>

                                {errors.confirmPassword && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {
                                            errors.confirmPassword
                                        }
                                    </p>
                                )}

                            </div>

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={
                                    isLoading ||
                                    !token
                                }
                                className="
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

                                        Resetting password...
                                    </>
                                ) : (
                                    <>
                                        Reset password

                                        <ArrowRight
                                            size={17}
                                        />
                                    </>
                                )}
                            </button>

                        </form>

                    </div>

                </section>

            </div>

        </main>
    );
};

export default ResetPasswordPage;