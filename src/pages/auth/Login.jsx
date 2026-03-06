import { Eye, EyeOff, Lock, LogIn, Mail, ShieldCheck } from "lucide-react";
import FormDropdownMenu from "../../components/common/FormDropdownMenu";
import { loginRoleOptionData } from "../../data/loginRoleOptionData";
import Field from "../../components/common/Field";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { applicationLogin } from "../../services/authApi";
import { useAuth } from "../../hooks/useAuth";

const localStorageData = {
    isLoggedin: false,
    token: undefined,
    userId: undefined,
    role: undefined,
};

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const { login } = useAuth();
    const { mutate: mutateLogin } = useMutation({
        mutationFn: (loginFormData) => applicationLogin(loginFormData),
        onSuccess: (data) => {
            const authLocalStorageData = {
                isLoggedin: data.success,
                token: data.token,
                loggedinClientId: data.data.id,
                role: data.data.role,
            };
            login(authLocalStorageData);
        },
    });

    function onSubmit(formData) {
        mutateLogin(formData);
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-md">
                <div className="mb-8 text-center">
                    <div className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                        <LogIn className="text-primary h-8 w-8" />
                    </div>
                    <h1 className="mb-3 text-4xl font-bold tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Sign in to access your account
                    </p>
                </div>
                <div className="card p-8 md:p-10">
                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
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
                                placeholder="you@example.com"
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
                            label="Password"
                            htmlFor="password"
                            error={errors.password}
                        >
                            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="input pl-10"
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
                                onClick={() => setShowPassword((prev) => !prev)}
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
                            label="Select role"
                            htmlFor="role"
                            error={errors.role}
                        >
                            <FormDropdownMenu
                                selectId="role"
                                itemsData={loginRoleOptionData}
                                required={true}
                                selectRegister={register("role", {
                                    required: {
                                        value: true,
                                        message: "Role is required",
                                    },
                                })}
                            />
                        </Field>
                        <button
                            type="submit"
                            className="btn btn-primary h-11 w-full cursor-pointer text-base"
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
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
                        Don't have an account?{" "}
                        <a
                            href="register.html"
                            className="text-primary font-medium hover:underline"
                            id="signupLink"
                        >
                            Sign up as Job Seeker
                        </a>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4" />
                        <p>
                            Your information is protected with industry-standard
                            encryption
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
