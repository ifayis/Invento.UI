import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    Building2,
    Check,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    User,
} from "lucide-react";
import { toast } from "sonner";

import { useRegisterMutation } from "../registerApi";

const initialForm = {
    companyName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const RegisterPage = () => {
    const navigate = useNavigate();

    const [
        register,
        {
            isLoading,
            isSuccess,
            data,
            error,
            reset,
        },
    ] = useRegisterMutation();

    const [form, setForm] =
        useState(initialForm);

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const [errors, setErrors] =
        useState({});

    useEffect(() => {
        if (!isSuccess) {
            return;
        }

        toast.success(
            data?.message ||
            "Account created successfully."
        );

        setForm(initialForm);

        navigate("/login", {
            replace: true,
        });

        reset();
    }, [
        isSuccess,
        data,
        navigate,
        reset,
    ]);

    useEffect(() => {
        if (!error) {
            return;
        }

        const message =
            error?.data?.message ||
            error?.data?.title ||
            "Unable to create your account.";

        toast.error(message);
    }, [error]);

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => {
            if (!current[name]) {
                return current;
            }

            const next = {
                ...current,
            };

            delete next[name];

            return next;
        });
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.companyName.trim()) {
            nextErrors.companyName =
                "Company name is required.";
        }

        if (!form.fullName.trim()) {
            nextErrors.fullName =
                "Full name is required.";
        }

        if (!form.email.trim()) {
            nextErrors.email =
                "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email.trim()
            )
        ) {
            nextErrors.email =
                "Enter a valid email address.";
        }

        if (!form.password) {
            nextErrors.password =
                "Password is required.";
        } else if (
            form.password.length < 8
        ) {
            nextErrors.password =
                "Password must contain at least 8 characters.";
        }

        if (!form.confirmPassword) {
            nextErrors.confirmPassword =
                "Please confirm your password.";
        } else if (
            form.password !==
            form.confirmPassword
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

        await register({
            companyName:
                form.companyName.trim(),
            fullName:
                form.fullName.trim(),
            email:
                form.email.trim(),
            password:
                form.password,
        });
    };

    const inputClass = (field) =>
        `
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
        ${errors[field]
            ? `
                    border-red-400
                    focus:border-red-500
                    focus:ring-red-500/10
                  `
            : `
                    border-slate-200
                    focus:border-slate-900
                    focus:ring-slate-900/10
                    dark:border-slate-800
                    dark:focus:border-white
                    dark:focus:ring-white/10
                  `
        }
    `;

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

                        <div>
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
                        </div>

                        <div className="max-w-xl">

                            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                                Business Management
                            </p>

                            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white xl:text-5xl">
                                Build your business
                                workspace with
                                confidence.
                            </h1>

                            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                                Manage inventory, sales,
                                purchases, customers and
                                financial operations from
                                one secure workspace.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    "Centralized business operations",
                                    "Secure multi-tenant workspace",
                                    "Real-time business visibility",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-slate-300"
                                    >
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                                            <Check
                                                size={14}
                                            />
                                        </span>

                                        {item}
                                    </div>
                                ))}

                            </div>

                        </div>

                        <p className="text-xs text-slate-500">
                            © {new Date().getFullYear()}{" "}
                            INVENTO. All rights
                            reserved.
                        </p>

                    </div>

                </section>

                {/* Register panel */}

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

                        <div className="mb-8">

                            <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                                Get started
                            </p>

                            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                Create your account
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Create your company workspace
                                and start managing your
                                business.
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="space-y-5"
                        >

                            {/* Company */}

                            <div>
                                <label
                                    htmlFor="companyName"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Company name
                                </label>

                                <div className="relative">

                                    <Building2
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        autoComplete="organization"
                                        placeholder="Your company name"
                                        value={
                                            form.companyName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={inputClass(
                                            "companyName"
                                        )}
                                    />

                                </div>

                                {errors.companyName && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {
                                            errors.companyName
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Full name */}

                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Full name
                                </label>

                                <div className="relative">

                                    <User
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Your full name"
                                        value={
                                            form.fullName
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={inputClass(
                                            "fullName"
                                        )}
                                    />

                                </div>

                                {errors.fullName && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {
                                            errors.fullName
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Email */}

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
                                        placeholder="you@company.com"
                                        value={form.email}
                                        onChange={
                                            handleChange
                                        }
                                        className={inputClass(
                                            "email"
                                        )}
                                    />

                                </div>

                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <LockKeyhole
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete="new-password"
                                        placeholder="Create a strong password"
                                        value={
                                            form.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={`${inputClass(
                                            "password"
                                        )} pr-12`}
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

                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {
                                            errors.password
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
                                        placeholder="Repeat your password"
                                        value={
                                            form.confirmPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className={`${inputClass(
                                            "confirmPassword"
                                        )} pr-12`}
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

                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create account

                                        <ArrowRight
                                            size={17}
                                            className="transition-transform group-hover:translate-x-0.5"
                                        />
                                    </>
                                )}
                            </button>

                        </form>

                        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">

                            Already have an account?{" "}

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

export default RegisterPage;