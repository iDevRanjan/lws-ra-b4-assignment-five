import {
    Building,
    Building2,
    Calendar,
    ChartLine,
    Eye,
    EyeOff,
    Globe,
    Lock,
    Mail,
    MapPin,
    Shield,
    User,
    Users,
    Zap,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import Field from "../../components/common/Field";
import FormDropdownMenu from "../../components/common/FormDropdownMenu";
import { clientRegisterMutationOption } from "../../services/mutationOptions";
import { industryOptionData } from "../../data/industryOptionData";
import { employeeCountOptionData } from "../../data/employeeCountOptionData";

export default function CompanyRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
        clearErrors,
    } = useForm();

    const { mutate: mutateRegister, isPending } = useMutation(
        clientRegisterMutationOption(),
    );
    const navigate = useNavigate();

    function onSubmit(formData) {
        delete formData.confirmPassword;
        delete formData.terms;
        delete formData.verified;

        const updatedData = {
            ...formData,
            role: "COMPANY",
        };

        mutateRegister(updatedData, {
            onSuccess: () => {
                toast.success("Company registered successfully!");
                navigate("/login", {
                    replace: true,
                });
            },
            onError: (error) => {
                setError("register", {
                    type: "server",
                    message:
                        error.response?.data?.message ||
                        error.message ||
                        "Company registration failed",
                });
            },
        });
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                    <div className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                        <Building2 className="text-primary h-8 w-8" />
                    </div>
                    <h1 className="mb-3 text-4xl font-bold tracking-tight">
                        Register Your Company
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Start hiring top talent for your organization
                    </p>
                </div>
                <div className="w-full text-center">
                    <div className="card mx-auto mb-8 inline-flex w-full max-w-md p-2">
                        <div className="grid w-full grid-cols-2 gap-2">
                            <Link
                                to="/jobseeker-register"
                                className="btn btn-ghost text-center"
                            >
                                <User className="mr-2 h-4 w-4" />
                                Job Seeker
                            </Link>
                            <button className="btn btn-primary text-center">
                                <Building2 className="mr-2 h-4 w-4" />
                                Employer
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card p-8 md:p-10">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-5">
                            <div className="border-border flex items-center gap-2 border-b pb-2">
                                <Building className="text-primary h-5 w-5" />
                                <h2 className="text-lg font-semibold">
                                    Company Information
                                </h2>
                            </div>
                            <Field
                                label="Company Name"
                                htmlFor="name"
                                error={errors.name}
                            >
                                <Building2 className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <input
                                    type="text"
                                    id="name"
                                    className="input pl-10"
                                    placeholder="e.g., TechCorp Solutions"
                                    autoComplete="name"
                                    required={true}
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Company name is required",
                                        },
                                    })}
                                />
                            </Field>
                            <Field
                                label="Email Address"
                                htmlFor="email"
                                error={errors.email}
                            >
                                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <input
                                    type="email"
                                    id="email"
                                    className="input pl-10"
                                    placeholder="john.doe@company.com"
                                    autoComplete="email"
                                    required={true}
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required",
                                        },
                                    })}
                                />
                            </Field>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Company Website"
                                    htmlFor="websiteUrl"
                                    error={errors.websiteUrl}
                                >
                                    <Globe className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <input
                                        type="url"
                                        id="websiteUrl"
                                        className="input pl-10"
                                        placeholder="https://example.com"
                                        required={true}
                                        {...register("websiteUrl", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Company website is required",
                                            },
                                            pattern: {
                                                value: /^https?:\/\/.+/,
                                                message:
                                                    "Please enter a valid URL starting with http:// or https://",
                                            },
                                        })}
                                    />
                                </Field>
                                <Field
                                    label="Industry"
                                    htmlFor="industry"
                                    error={errors.industry}
                                >
                                    <FormDropdownMenu
                                        selectId="industry"
                                        itemsData={industryOptionData}
                                        required={true}
                                        selectRegister={register("industry", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please select an industry",
                                            },
                                        })}
                                    />
                                </Field>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Company Size"
                                    htmlFor="employeeCount"
                                    error={errors.employeeCount}
                                >
                                    <FormDropdownMenu
                                        selectId="employeeCount"
                                        itemsData={employeeCountOptionData}
                                        required={true}
                                        selectRegister={register(
                                            "employeeCount",
                                            {
                                                required: {
                                                    value: true,
                                                    message:
                                                        "Please select an company size",
                                                },
                                            },
                                        )}
                                    />
                                </Field>
                                <Field
                                    label="Founded Year"
                                    htmlFor="foundedYear"
                                    error={errors.foundedYear}
                                >
                                    <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <input
                                        type="number"
                                        id="foundedYear"
                                        className="input pl-10"
                                        placeholder="e.g., 2010"
                                        {...register("foundedYear", {
                                            min: {
                                                value: 1800,
                                                message:
                                                    "Please enter a valid year (1800 or later)",
                                            },
                                            max: {
                                                value: new Date().getFullYear(),
                                                message:
                                                    "Founded year cannot be in the future",
                                            },
                                        })}
                                    />
                                </Field>
                            </div>
                            <Field
                                label="Headquarters Location"
                                htmlFor="location"
                                error={errors.location}
                            >
                                <MapPin className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <input
                                    type="text"
                                    id="location"
                                    className="input pl-10"
                                    placeholder="City, Country"
                                    required={true}
                                    {...register("location", {
                                        required: {
                                            value: true,
                                            message:
                                                "Headquarters location is required",
                                        },
                                    })}
                                />
                            </Field>
                            <Field
                                label="Company Description"
                                htmlFor="description"
                                error={errors.description}
                            >
                                <textarea
                                    id="description"
                                    className="textarea min-h-30"
                                    placeholder="Tell us about your company, mission, and what makes it a great place to work..."
                                    required={true}
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message:
                                                "Company description is required",
                                        },
                                        minLength: {
                                            value: 100,
                                            message:
                                                "Description must be at least 100 characters",
                                        },
                                    })}
                                />
                                <p className="text-muted-foreground mt-5 text-xs">
                                    Minimum 100 characters. This will be
                                    displayed on your company profile.
                                </p>
                            </Field>
                        </div>
                        <div className="space-y-5">
                            <div className="border-border flex items-center gap-2 border-b pb-2">
                                <Shield className="text-primary h-5 w-5" />
                                <h2 className="text-lg font-semibold">
                                    Account Security
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Password"
                                    htmlFor="password"
                                    error={errors.password}
                                >
                                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password"
                                        className="input pr-10 pl-10"
                                        placeholder="Create a strong password"
                                        required={true}
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: "Password is required",
                                            },
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Your password must be at least 8 characters",
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                                                message:
                                                    "Password must contain at least one letter and one number",
                                            },
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                                    >
                                        {showPassword ? (
                                            <Eye className="h-4 w-4" />
                                        ) : (
                                            <EyeOff className="h-4 w-4" />
                                        )}
                                    </button>
                                </Field>
                                <Field
                                    label="Confirm Password"
                                    htmlFor="confirmPassword"
                                    error={errors.confirmPassword}
                                >
                                    <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        id="confirmPassword"
                                        className="input pr-10 pl-10"
                                        placeholder="Re-enter your password"
                                        required={true}
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Please confirm your password",
                                            },
                                            validate: (value) =>
                                                value === watch("password") ||
                                                "Passwords do not match",
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev,
                                            )
                                        }
                                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                                    >
                                        {showConfirmPassword ? (
                                            <Eye className="h-4 w-4" />
                                        ) : (
                                            <EyeOff className="h-4 w-4" />
                                        )}
                                    </button>
                                </Field>
                            </div>
                            <p className="text-muted-foreground -mt-2 text-xs">
                                Password must be at least 8 characters with
                                letters and numbers
                            </p>
                        </div>
                        <div className="space-y-3 pt-2">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="border-border text-primary focus:ring-ring mt-1 h-4 w-4 rounded"
                                        {...register("terms", {
                                            required: {
                                                value: true,
                                                message:
                                                    "You must agree to the Terms of Service and Privacy Policy",
                                            },
                                        })}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-muted-foreground text-sm"
                                    >
                                        I agree to the{" "}
                                        <Link
                                            to="#"
                                            className="text-primary hover:underline"
                                        >
                                            Terms of Service{" "}
                                        </Link>
                                        and{" "}
                                        <Link
                                            to="#"
                                            className="text-primary hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>
                                {errors.terms && (
                                    <p className="text-red-600">
                                        {errors.terms.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="verified"
                                        className="border-border text-primary focus:ring-ring mt-1 h-4 w-4 rounded"
                                        {...register("verified", {
                                            required: {
                                                value: true,
                                                message:
                                                    "You must confirm that you are an authorized representative",
                                            },
                                        })}
                                    />
                                    <label
                                        htmlFor="verified"
                                        className="text-muted-foreground text-sm"
                                    >
                                        I confirm that I am an authorized
                                        representative of this company and have
                                        the right to register on its behalf
                                    </label>
                                </div>
                                {errors.verified && (
                                    <p className="text-red-600">
                                        {errors.verified.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="updates"
                                    className="border-border text-primary focus:ring-ring mt-1 h-4 w-4 rounded"
                                />
                                <label
                                    htmlFor="updates"
                                    className="text-muted-foreground text-sm"
                                >
                                    Send me product updates, hiring tips, and
                                    promotional offers via email
                                </label>
                            </div>
                        </div>
                        {errors.register && (
                            <p className="text-center text-red-600">
                                {errors.register.message}
                            </p>
                        )}
                        <button
                            type="submit"
                            onClick={() => clearErrors("register")}
                            disabled={isPending}
                            className="btn btn-primary mt-2 h-11 w-full text-base"
                        >
                            <Building2 className="mr-2 h-4 w-4" />
                            Register Company
                        </button>
                    </form>
                    <div className="relative my-8">
                        <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                        >
                            <div className="border-border w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-card text-muted-foreground px-4 font-medium">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="text-muted-foreground mt-8 text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary font-medium hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 flex items-start gap-3 rounded-lg p-4">
                        <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                            <Users className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="mb-1 text-sm font-semibold">
                                Access Top Talent
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Connect with thousands of qualified candidates
                                actively looking for opportunities
                            </p>
                        </div>
                    </div>
                    <div className="bg-muted/50 flex items-start gap-3 rounded-lg p-4">
                        <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                            <Zap className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="mb-1 text-sm font-semibold">
                                Easy Job Posting
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Post jobs in minutes with our intuitive
                                interface and smart templates
                            </p>
                        </div>
                    </div>
                    <div className="bg-muted/50 flex items-start gap-3 rounded-lg p-4">
                        <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                            <ChartLine className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="mb-1 text-sm font-semibold">
                                Smart Analytics
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Track applications and optimize your hiring with
                                detailed insights
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
