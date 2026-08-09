import { useState } from "react";

import {
    Eye,
    EyeOff,
    Loader2,
    LockKeyhole,
    Mail,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLoginMutation } from "@/features/auth/authApi";
import { loginSchema } from "@/features/auth/validation/loginSchema";
import {
    saveLoginSession,
} from "@/features/auth/authSession";
import {
    setCredentials,
} from "@/features/auth/authSlice";
import {
    getApiErrorMessage,
} from "@/features/auth/authUtils";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        login,
        { isLoading },
    ] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const onSubmit = async (values) => {
        try {
            const response = await login(
                values
            ).unwrap();

            const session =
                saveLoginSession(response);

            dispatch(
                setCredentials({
                    user: null,
                    expiresAt:
                        session.expiresAt,
                    mustChangePassword:
                        session.mustChangePassword,
                })
            );

            toast.success(
                response.message ||
                "Login successful."
            );

            if (session.mustChangePassword) {
                toast(
                    "Password change is required. Complete the password-change setup before continuing."
                );

                return;
            }
            navigate(
                "/dashboard",
                { replace: true }
            );
        } catch (error) {
            toast.error(
                getApiErrorMessage(
                    error,
                    "Unable to sign in. Please check your credentials."
                )
            );
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
        >
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium"
                >
                    Email address
                </label>

                <div className="relative">
                    <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />

                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        className="h-12 rounded-xl pl-10"
                        {...register("email")}
                        aria-invalid={
                            Boolean(errors.email)
                        }
                    />
                </div>

                {errors.email && (
                    <p className="text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="text-sm font-medium"
                >
                    Password
                </label>

                <div className="relative">
                    <LockKeyhole
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />

                    <Input
                        id="password"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="h-12 rounded-xl pl-10 pr-11"
                        {...register("password")}
                        aria-invalid={
                            Boolean(errors.password)
                        }
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                (value) => !value
                            )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                {errors.password && (
                    <p className="text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/forgot-password"
                        )
                    }
                    className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
                >
                    Forgot password?
                </button>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-xl"
            >
                {isLoading ? (
                    <>
                        <Loader2
                            className="mr-2 animate-spin"
                            size={18}
                        />

                        Signing in...
                    </>
                ) : (
                    "Sign in"
                )}
            </Button>
        </form>
    );
};

export default LoginForm;