import { useEffect, useState } from "react";
import {
    Building2,
    Globe,
    Mail,
    MapPin,
    Pencil,
    Phone,
    ReceiptText,
    Save,
    X,
    Loader2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import {
    selectCompany,
} from "@/features/company/companySelectors";

import {
    useUpdateCompanyMutation,
} from "@/features/company/companyApi";

const CompanyPage = () => {
    const company = useSelector(
        selectCompany
    );

    const [
        updateCompany,
        {
            isLoading: isUpdating,
        },
    ] = useUpdateCompanyMutation();

    const [isEditing, setIsEditing] =
        useState(false);

    const [form, setForm] = useState({
        companyName: "",
        email: "",
        phoneNumber: "",
        address: "",
        logoUrl: "",
        taxNumber: "",
        website: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!company) {
            return;
        }

        setForm({
            companyName:
                company.companyName ?? "",
            email:
                company.email ?? "",
            phoneNumber:
                company.phoneNumber ?? "",
            address:
                company.address ?? "",
            logoUrl:
                company.logoUrl ?? "",
            taxNumber:
                company.taxNumber ?? "",
            website:
                company.website ?? "",
        });
    }, [company]);

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

        const companyName =
            form.companyName.trim();

        const email =
            form.email.trim();

        const website =
            form.website.trim();

        if (!companyName) {
            nextErrors.companyName =
                "Company name is required.";
        }

        if (email) {
            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    email
                )
            ) {
                nextErrors.email =
                    "Enter a valid email address.";
            }
        }

        if (website) {
            try {
                new URL(website);
            } catch {
                nextErrors.website =
                    "Enter a valid website URL.";
            }
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
        if (company) {
            setForm({
                companyName:
                    company.companyName ?? "",
                email:
                    company.email ?? "",
                phoneNumber:
                    company.phoneNumber ?? "",
                address:
                    company.address ?? "",
                logoUrl:
                    company.logoUrl ?? "",
                taxNumber:
                    company.taxNumber ?? "",
                website:
                    company.website ?? "",
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
            await updateCompany({
                companyName:
                    form.companyName.trim(),
                email:
                    form.email.trim(),
                phoneNumber:
                    form.phoneNumber.trim(),
                address:
                    form.address.trim(),
                logoUrl:
                    form.logoUrl.trim(),
                taxNumber:
                    form.taxNumber.trim(),
                website:
                    form.website.trim(),
            }).unwrap();

            toast.success(
                "Company information updated successfully."
            );

            setIsEditing(false);
        } catch (error) {
            const message =
                error?.data?.message ||
                error?.data?.title ||
                "Unable to update company information.";

            toast.error(message);
        }
    };

    if (!company) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2
                    size={28}
                    className="animate-spin text-slate-500"
                />
            </div>
        );
    }

    const companyName =
        company.companyName?.trim() ||
        "Your Company";

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Business settings
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                        Company
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Manage your company information
                        and business identity.
                    </p>
                </div>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                    >
                        <Pencil size={16} />
                        Edit company
                    </button>
                )}
            </div>

            {/* Company identity */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-7 dark:border-slate-800 dark:bg-slate-950/40 sm:px-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                            {company.logoUrl ? (
                                <img
                                    src={
                                        company.logoUrl
                                    }
                                    alt={`${companyName} logo`}
                                    className="h-full w-full object-contain p-2"
                                    onError={(
                                        event
                                    ) => {
                                        event.currentTarget.style.display =
                                            "none";
                                    }}
                                />
                            ) : (
                                <Building2
                                    size={32}
                                    className="text-slate-400"
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-xl font-semibold text-slate-950 dark:text-white">
                                {companyName}
                            </h2>

                            {company.website && (
                                <a
                                    href={
                                        company.website
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 inline-flex max-w-full items-center gap-1.5 truncate text-sm text-slate-500 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                                >
                                    <Globe
                                        size={14}
                                    />

                                    <span className="truncate">
                                        {
                                            company.website
                                        }
                                    </span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Company form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-5 sm:p-7"
                >
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                            Company information
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Keep your business details
                            accurate for your INVENTO
                            workspace.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Company name */}
                        <div>
                            <label
                                htmlFor="company-name"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Company name
                            </label>

                            <div className="relative">
                                <Building2
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="company-name"
                                    name="companyName"
                                    type="text"
                                    value={
                                        form.companyName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        !isEditing ||
                                        isUpdating
                                    }
                                    autoComplete="organization"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
                                />
                            </div>

                            {errors.companyName && (
                                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                                    {
                                        errors.companyName
                                    }
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="company-email"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Email
                            </label>

                            <div className="relative">
                                <Mail
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="company-email"
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
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
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

                        {/* Phone */}
                        <div>
                            <label
                                htmlFor="company-phone"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Phone number
                            </label>

                            <div className="relative">
                                <Phone
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="company-phone"
                                    name="phoneNumber"
                                    type="tel"
                                    value={
                                        form.phoneNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        !isEditing ||
                                        isUpdating
                                    }
                                    autoComplete="tel"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
                                />
                            </div>
                        </div>

                        {/* Tax number */}
                        <div>
                            <label
                                htmlFor="company-tax"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Tax number
                            </label>

                            <div className="relative">
                                <ReceiptText
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="company-tax"
                                    name="taxNumber"
                                    type="text"
                                    value={
                                        form.taxNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        !isEditing ||
                                        isUpdating
                                    }
                                    autoComplete="off"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="company-address"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Address
                            </label>

                            <div className="relative">
                                <MapPin
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-3 text-slate-400"
                                />

                                <textarea
                                    id="company-address"
                                    name="address"
                                    value={
                                        form.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        !isEditing ||
                                        isUpdating
                                    }
                                    rows={4}
                                    autoComplete="street-address"
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
                                />
                            </div>
                        </div>

                        {/* Logo URL */}
                        <div>
                            <label
                                htmlFor="company-logo"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Logo URL
                            </label>

                            <input
                                id="company-logo"
                                name="logoUrl"
                                type="url"
                                value={
                                    form.logoUrl
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    !isEditing ||
                                    isUpdating
                                }
                                placeholder="https://example.com/logo.png"
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
                            />

                            {errors.logoUrl && (
                                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                                    {
                                        errors.logoUrl
                                    }
                                </p>
                            )}
                        </div>

                        {/* Website */}
                        <div>
                            <label
                                htmlFor="company-website"
                                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                                Website
                            </label>

                            <div className="relative">
                                <Globe
                                    size={17}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="company-website"
                                    name="website"
                                    type="url"
                                    value={
                                        form.website
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        !isEditing ||
                                        isUpdating
                                    }
                                    placeholder="https://example.com"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-slate-500 dark:focus:ring-slate-800 dark:disabled:bg-slate-950/50"
                                />
                            </div>

                            {errors.website && (
                                <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                                    {
                                        errors.website
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

export default CompanyPage;