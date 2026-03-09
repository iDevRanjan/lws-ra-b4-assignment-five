import {
    Bell,
    Briefcase,
    Building2,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Phone,
    ShieldCheck,
    User,
    UserPlus,
} from "lucide-react";
import { useForm } from "react-hook-form";
import Field from "../../components/common/Field";
import FormDropdownMenu from "../../components/common/FormDropdownMenu";
import { experienceLevelRegisterOptionData } from "../../data/experienceLevelRegisterOptionData";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { clientRegisterMutationOption } from "../../services/mutationOptions";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function JobSeekerRegister() {
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

        const updatedData = {
            ...formData,
            role: "USER",
        };

        mutateRegister(updatedData, {
            onSuccess: () => {
                toast.success("You have registered successfully!");
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
                        "Job Seeker register failed",
                });
            },
        });
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 text-center">
                    <div className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                        <UserPlus className="text-primary h-8 w-8" />
                    </div>
                    <h1 className="mb-3 text-4xl font-bold tracking-tight">
                        Create Your Account
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Join thousands of professionals finding their dream jobs
                    </p>
                </div>
                <div className="w-full text-center">
                    <div className="card mx-auto mb-8 inline-flex w-full max-w-md p-2">
                        <div className="grid w-full grid-cols-2 gap-2">
                            <button className="btn btn-primary text-center">
                                <User className="mr-2 h-4 w-4" />
                                Job Seeker
                            </button>
                            <Link
                                to="/company-register"
                                className="btn btn-ghost text-center"
                            >
                                <Building2 className="mr-2 h-4 w-4" />
                                Employer
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card p-8 md:p-10">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <Field label="Name" htmlFor="name" error={errors.name}>
                            <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <input
                                type="text"
                                id="name"
                                className="input pl-10"
                                placeholder="John"
                                autoComplete="name"
                                required={true}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required",
                                    },
                                })}
                            />
                        </Field>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                                    placeholder="john.doe@example.com"
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
                            <Field
                                label="Phone Number"
                                htmlFor="phone"
                                error={errors.phone}
                            >
                                <Phone className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <input
                                    type="tel"
                                    id="phone"
                                    className="input pl-10"
                                    placeholder="+1 (555) 000-0000"
                                    autoComplete="tel"
                                    required={true}
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: "Phone number is required",
                                        },
                                    })}
                                />
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field
                                label="Years of Experience"
                                htmlFor="experience"
                                error={errors.experience}
                            >
                                <FormDropdownMenu
                                    selectId="experience"
                                    itemsData={
                                        experienceLevelRegisterOptionData
                                    }
                                    required={true}
                                    selectRegister={register("experience", {
                                        required: {
                                            value: true,
                                            message:
                                                "Please select your experience level",
                                        },
                                    })}
                                />
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <Field
                                label="Password"
                                htmlFor="password"
                                error={errors.password}
                            >
                                <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="input pr-10 pl-10"
                                    placeholder="Enter your password"
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
                                        setShowConfirmPassword((prev) => !prev)
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
                            Password must be at least 8 characters with letters
                            and numbers
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="border-border text-primary focus:ring-ring mt-1 h-4 w-4 rounded"
                                    required={true}
                                    {...register("terms", {
                                        required: {
                                            value: true,
                                            message:
                                                "You must agree to the terms and privacy policy",
                                        },
                                    })}
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-muted-foreground text-sm"
                                >
                                    I agree to the{" "}
                                    <Link className="text-primary hover:underline">
                                        Terms of Service{" "}
                                    </Link>
                                    and{" "}
                                    <Link className="text-primary hover:underline">
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
                            <UserPlus className="mr-2 h-4 w-4" />
                            Create Account
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
                            <Briefcase className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="mb-1 text-sm font-semibold">
                                Thousands of Jobs
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Access opportunities from top companies
                                worldwide
                            </p>
                        </div>
                    </div>
                    <div className="bg-muted/50 flex items-start gap-3 rounded-lg p-4">
                        <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                            <Bell className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="mb-1 text-sm font-semibold">
                                Job Alerts
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Get notified when new jobs match your profile
                            </p>
                        </div>
                    </div>
                    <div className="bg-muted/50 flex items-start gap-3 rounded-lg p-4">
                        <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                            <ShieldCheck className="text-primary h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="mb-1 text-sm font-semibold">
                                Secure &amp; Private
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Your data is protected with industry-standard
                                security
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        By creating an account, you'll get access to thousands
                        of job opportunities from top companies worldwide.
                    </p>
                </div>
            </div>
        </main>
    );
}
