import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    UserRound,
    Mail,
    ShieldCheck,
    CheckCircle2,
    Pencil,
    X,
    Save,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
    selectProfile,
    selectProfileRole,
    selectProfileIsActive,
} from "@/features/profile/profileSelectors";

import {
    useUpdateProfileMutation,
} from "@/features/profile/profileApi";

const ProfilePage = () => {
    const profile = useSelector(selectProfile);
    const role = useSelector(selectProfileRole);
    const isActive = useSelector(
        selectProfileIsActive
    );

    const [
        updateProfile,
        {
            isLoading: isUpdating,
        },
    ] = useUpdateProfileMutation();

    const [isEditing, setIsEditing] =
        useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!profile) {
            return;
        }

        setForm({
            fullName: profile.fullName ?? "",
            email: profile.email ?? "",
        });
    }, [profile]);

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));
    };

    const validate = () => {
        const nextErrors = {};

        const fullName =
            form.fullName.trim();

        const email =
            form.email.trim();

        if (!fullName) {
            nextErrors.fullName =
                "Full name is required.";
        }

        if (!email) {
            nextErrors.email =
                "Email address is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email
            )
        ) {
            nextErrors.email =
                "Enter a valid email address.";
        }

        setErrors(nextErrors);

        return (
            Object.keys(nextErrors).length === 0
        );
    };

    const handleEdit = () => {
        setErrors({});
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (profile) {
            setForm({
                fullName:
                    profile.fullName ?? "",
                email:
                    profile.email ?? "",
            });
        }

        setErrors({});
        setIsEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            await updateProfile({
                fullName:
                    form.fullName.trim(),
                email:
                    form.email.trim(),
            }).unwrap();

            toast.success(
                "Profile updated successfully."
            );

            setIsEditing(false);
        } catch (error) {
            const message =
                error?.data?.message ||
                error?.data?.title ||
                "Unable to update your profile.";

            toast.error(message);
        }
    };

    if (!profile) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2
                    className="animate-spin text-slate-500"
                    size={28}
                />
            </div>
        );
    }

    const initials =
        profile.fullName
            ?.trim()
            ?.split(/\s+/)
            ?.slice(0, 2)
            ?.map((part) => part[0])
            ?.join("")
            ?.toUpperCase() || "U";

    return (
        <div className="mx-auto w-full max-w-5xl space-y-6">
            {/* Page header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Account settings
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Manage your personal information
                        and account details.
                    </p>
                </div>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-950"
                    >
                        <Pencil size={16} />
                        Edit profile
                    </button>
                )}
            </div>

            {/* Profile overview */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-6 dark:border-slate-800 dark:bg-slate-950/40 sm:px-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-2xl font-semibold text-white shadow-sm dark:bg-white dark:text-slate-950">
                            {initials}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-xl font-semibold text-slate-950 dark:text-white">
                                {profile.fullName ||
                                    "Unnamed user"}
                            </h2>

                            <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                                {profile.email}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                {role !== null && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                        <ShieldCheck
                                            size={13}
                                        />
                                        {String(role)}
                                    </span>
                                )}

                                <span
                                    className={
                                        isActive
                                            ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                                            : "inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                                    }
                                >
                                    <CheckCircle2
                                        size={13}
                                    />
                                    {isActive
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <form
                    onSubmit={handleSubmit}
                    className="p-5 sm:p-7"
                >
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                            Personal information
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Update the information associated
                            with your account.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Full name */}
                        <div>
                            <label
                                htmlFor="profile-fullName"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Full name
                            </label>

                            <div className="relative">
                                <UserRound
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="profile-fullName"
                                    name="fullName"
                                    type="text"
                                    value={
                                        form.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        !isEditing ||
                                        isUpdating
                                    }
                                    autoComplete="name"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
                                />
                            </div>

                            {errors.fullName && (
                                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                                    {
                                        errors.fullName
                                    }
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="profile-email"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="profile-email"
                                    name="email"
                                    type="email"
                                    value={
                                        form.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        !isEditing ||
                                        isUpdating
                                    }
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                                    {
                                        errors.email
                                    }
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    {isEditing && (
                        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={
                                    handleCancel
                                }
                                disabled={
                                    isUpdating
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                <X size={16} />
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={
                                    isUpdating
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save
                                            size={16}
                                        />
                                        Save changes
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </section>
        </div>
    );
};

export default ProfilePage;