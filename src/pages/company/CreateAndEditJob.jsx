import { Link, useLoaderData } from "react-router";
import { Plus, Send, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import Field from "../../components/common/Field";
import FormDropdownMenu from "../../components/common/FormDropdownMenu";
import { jobTypeOptionData } from "../../data/jobTypeOptionData";
import { workModeOptionData } from "../../data/workModeOptionData";
import { categoryOptionData } from "../../data/categoryOptionData";
import { experienceLevelRegisterOptionData as experienceLevelOptionData } from "../../data/experienceLevelRegisterOptionData";
import { salaryPeriodOptionData } from "../../data/salaryPeriodOptionData";
import { useRef } from "react";
import toast from "react-hot-toast";
import { formatDateForInput } from "../../utils/formatDateForInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createCompanyJobMutationOption,
    updateCompanyJobMutationOption,
} from "../../services/mutationOptions";
import { QUERY_KEYS } from "../../utils/constants";

export default function CreateAndEditJob() {
    const data = useLoaderData();

    const { isPending: isCreating, mutateAsync: mutateCreateJobAsync } =
        useMutation(createCompanyJobMutationOption());
    const { isPending: isUpdating, mutateAsync: mutateEditJobAsync } =
        useMutation(updateCompanyJobMutationOption());

    const queryClient = useQueryClient();
    const jobData = data?.jobData ?? {};
    const isEditMode = data?.isEditMode ?? false;

    const skillInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        control,
        reset,
    } = useForm({
        defaultValues: {
            ...jobData,
            skills: jobData.skills?.map((skill) => ({
                value: skill,
            })),
            deadline: formatDateForInput(jobData.deadline),
        },
    });

    const {
        fields: skillFields,
        append: appendSkill,
        remove: removeSkill,
    } = useFieldArray({
        control,
        name: "skills",
        rules: {
            validate: (value) =>
                (value && value.length > 0) || "At least one skill is required",
        },
    });

    function addSkill() {
        const sanitizedValue = skillInputRef.current.value.trim();
        const isSkillExists = skillFields.some(
            (skill) =>
                skill.value.toLowerCase() === sanitizedValue.toLowerCase(),
        );

        if (isSkillExists) {
            toast("ℹ️ The same skill already exists");
            return;
        }

        if (sanitizedValue) {
            appendSkill({ value: sanitizedValue });
            skillInputRef.current.value = "";
        }
    }

    async function onSubmit(formData) {
        const isAnyFieldChange = Object.keys(dirtyFields).length > 0;

        if (!isAnyFieldChange) {
            toast("ℹ️ You haven't made any changes yet");
            return;
        }

        const payload = { ...formData };

        if (payload.skills) {
            payload.skills = payload.skills.map((skill) => skill.value);
        }

        if (isEditMode) {
            const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
                acc[key] = payload[key];
                return acc;
            }, {});
            const applicationId = jobData.id;
            const slug = jobData.slug;

            const ignoredKeys = [
                "id",
                "companyId",
                "slug",
                "status",
                "createdAt",
                "updatedAt",
                "company",
                "applicants",
            ];

            for (const key of ignoredKeys) {
                delete updatedData[key];
            }

            const loadingToast = toast.loading("Updating job...");

            try {
                await mutateEditJobAsync({
                    applicationId,
                    payload: updatedData,
                });

                toast.success("Job updated successfully", { id: loadingToast });

                await Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.companyOpenPositionsForOwn],
                        refetchType: "all",
                    }),
                    queryClient.invalidateQueries({
                        queryKey: [QUERY_KEYS.jobBySlug, slug],
                        exact: true,
                        refetchType: "all",
                    }),
                ]);
                reset(formData);
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message || error.message;
                toast.error(`Job update failed: ${errorMessage}`, {
                    id: loadingToast,
                });
            }
        } else {
            const loadingToast = toast.loading("Posting a new job...");

            try {
                await mutateCreateJobAsync(payload);

                toast.success("Your job has been posted successfully!", {
                    id: loadingToast,
                });

                await queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.companyOpenPositionsForOwn],
                    refetchType: "all",
                });
                reset();
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.message || error.message;
                toast.error(`Job create failed: ${errorMessage}`, {
                    id: loadingToast,
                });
            }
        }
    }

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold">
                            {isEditMode
                                ? "Update Job Posting"
                                : "Post a New Job"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditMode
                                ? "Update the details of your existing job posting"
                                : "Fill in the details to create a new job posting"}
                        </p>
                    </div>
                    <Link to="/company-dashboard" className="btn btn-outline">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </Link>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Basic Information
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <Field
                                label="Job Title"
                                htmlFor="title"
                                error={errors.title}
                            >
                                <input
                                    type="text"
                                    id="title"
                                    className="input"
                                    placeholder="e.g. Senior Full Stack Developer"
                                    autoComplete="organization-title"
                                    required={true}
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: "Title is required",
                                        },
                                    })}
                                />
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Field
                                label="Job Type"
                                htmlFor="jobType"
                                error={errors.type}
                            >
                                <FormDropdownMenu
                                    selectId="jobType"
                                    itemsData={jobTypeOptionData}
                                    required={true}
                                    defaultSelect="Job type"
                                    selectRegister={register("type", {
                                        required: {
                                            value: true,
                                            message: "Job type is required",
                                        },
                                    })}
                                />
                            </Field>
                            <Field
                                label="Work Mode"
                                htmlFor="workMode"
                                error={errors.workMode}
                            >
                                <FormDropdownMenu
                                    selectId="workMode"
                                    itemsData={workModeOptionData}
                                    required={true}
                                    defaultSelect="Work mode"
                                    selectRegister={register("workMode", {
                                        required: {
                                            value: true,
                                            message: "Work mode is required",
                                        },
                                    })}
                                />
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Field
                                label="Category"
                                htmlFor="category"
                                error={errors.category}
                            >
                                <FormDropdownMenu
                                    selectId="category"
                                    itemsData={categoryOptionData}
                                    required={true}
                                    defaultSelect="Category"
                                    selectRegister={register("category", {
                                        required: {
                                            value: true,
                                            message: "category is required",
                                        },
                                    })}
                                />
                            </Field>
                            <Field
                                label="Experience Level"
                                htmlFor="experienceLevel"
                                error={errors.experienceLevel}
                            >
                                <FormDropdownMenu
                                    selectId="experienceLevel"
                                    itemsData={experienceLevelOptionData}
                                    required={true}
                                    defaultSelect="Experience level"
                                    selectRegister={register(
                                        "experienceLevel",
                                        {
                                            required: {
                                                value: true,
                                                message:
                                                    "Experience level is required",
                                            },
                                        },
                                    )}
                                />
                            </Field>
                        </div>
                    </div>
                </div>
                {/* Location & Salary */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Location &amp; Compensation
                    </h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <Field
                                label="Location"
                                htmlFor="location"
                                error={errors.location}
                            >
                                <input
                                    type="text"
                                    id="location"
                                    className="input"
                                    placeholder="e.g. San Francisco"
                                    autoComplete="address-level2"
                                    required={true}
                                    {...register("location", {
                                        required: {
                                            value: true,
                                            message: "Location is required",
                                        },
                                    })}
                                />
                            </Field>
                            <Field
                                label="Minimum Salary ($)"
                                htmlFor="salaryMin"
                                error={errors.salaryMin}
                            >
                                <input
                                    type="number"
                                    id="salaryMin"
                                    className="input"
                                    placeholder="e.g. 100000"
                                    required={true}
                                    {...register("salaryMin", {
                                        required: {
                                            value: true,
                                            message:
                                                "Minimum salary is required",
                                        },
                                    })}
                                />
                            </Field>
                            <Field
                                label="Maximum Salary ($)"
                                htmlFor="salaryMax"
                                error={errors.salaryMax}
                            >
                                <input
                                    type="number"
                                    id="salaryMax"
                                    className="input"
                                    placeholder="e.g. 200000"
                                    required={true}
                                    {...register("salaryMax", {
                                        required: {
                                            value: true,
                                            message:
                                                "Maximum salary is required",
                                        },
                                        validate: (value, formValues) =>
                                            Number(value) >
                                                Number(formValues.salaryMin) ||
                                            "Max salary must be greater than min salary",
                                    })}
                                />
                            </Field>
                            <Field
                                label="Salary Period"
                                htmlFor="salaryPeriod"
                                error={errors.salaryPeriod}
                            >
                                <FormDropdownMenu
                                    selectId="salaryPeriod"
                                    itemsData={salaryPeriodOptionData}
                                    required={true}
                                    defaultSelect="Salary period"
                                    selectRegister={register("salaryPeriod", {
                                        required: {
                                            value: true,
                                            message:
                                                "Salary period is required",
                                        },
                                    })}
                                />
                            </Field>
                        </div>
                    </div>
                </div>
                {/* Job Description */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Job Description
                    </h2>
                    <div className="space-y-6">
                        <Field
                            label="Job Description"
                            htmlFor="description"
                            error={errors.description}
                        >
                            <textarea
                                id="description"
                                className="textarea"
                                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                                required={true}
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "Job description is required",
                                    },
                                })}
                            />
                        </Field>
                        <Field
                            label="Requirements &amp; Qualifications"
                            htmlFor="requirements"
                            error={errors.requirements}
                        >
                            <textarea
                                id="requirements"
                                className="textarea"
                                placeholder="List the required skills, qualifications, and experience..."
                                required={true}
                                {...register("requirements", {
                                    required: {
                                        value: true,
                                        message: "Job requirements is required",
                                    },
                                })}
                            />
                        </Field>
                        <Field
                            label="Benefits &amp; Perks"
                            htmlFor="benefits"
                            error={errors.benefits}
                        >
                            <textarea
                                id="benefits"
                                className="textarea"
                                placeholder="Describe the benefits, perks, and what makes your company a great place to work..."
                                {...register("benefits")}
                            />
                        </Field>
                    </div>
                </div>
                {/* Skills */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">Skills</h2>
                    <div className="mb-4">
                        <label htmlFor="skill" className="label mb-2 block">
                            Add Skills
                        </label>
                        <div className="flex gap-2">
                            <input
                                ref={skillInputRef}
                                type="text"
                                id="skill"
                                className="input flex-1"
                                placeholder="Type a skill and press Enter"
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        addSkill();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={addSkill}
                                className="btn btn-primary cursor-pointer"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add
                            </button>
                        </div>
                        <p className="text-muted-foreground mt-2 text-xs">
                            Add technical and soft skills required for this
                            position.
                        </p>
                    </div>
                    <div>
                        <label className="label mb-3 block">
                            Current Skills
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {skillFields.length === 0 && (
                                <p className="text-muted-foreground py-4 text-center">
                                    No skill added yet
                                </p>
                            )}
                            {skillFields.map((field, index) => (
                                <span
                                    key={field.id}
                                    className="badge badge-secondary inline-flex items-center gap-1"
                                >
                                    <input
                                        type="hidden"
                                        {...register(`skills.${index}.value`)}
                                    />
                                    {field.value}
                                    <button
                                        type="button"
                                        className="cursor-pointer hover:text-red-600"
                                        onClick={() => removeSkill(index)}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    {errors.skills && (
                        <p className="text-red-600">
                            {errors.skills.message ||
                                errors.skills.root?.message}
                        </p>
                    )}
                </div>
                {/* Application Details */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Application Settings
                    </h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <Field
                                label="Number of Vacancies"
                                htmlFor="vacancies"
                                error={errors.vacancies}
                            >
                                <input
                                    type="number"
                                    id="vacancies"
                                    className="input"
                                    placeholder="e.g. 2"
                                    defaultValue={1}
                                    min={1}
                                    {...register("vacancies", {
                                        min: {
                                            value: 1,
                                            message:
                                                "At least 1 vacancy is required",
                                        },
                                    })}
                                />
                            </Field>
                            <Field
                                label="Application Deadline"
                                htmlFor="deadline"
                                error={errors.deadline}
                            >
                                <input
                                    type="date"
                                    id="deadline"
                                    className="input"
                                    required={true}
                                    {...register("deadline", {
                                        required: {
                                            value: true,
                                            message:
                                                "Application deadline is required",
                                        },
                                    })}
                                />
                            </Field>
                        </div>
                    </div>
                </div>
                {/* Form Actions */}
                <div className="card p-6">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="flex-1" />
                        <Link
                            to="/company-dashboard"
                            className="btn btn-outline"
                        >
                            Cancel
                        </Link>
                        <button
                            disabled={isCreating || isUpdating}
                            type="submit"
                            className="btn btn-primary cursor-pointer"
                        >
                            <Send className="mr-2 h-4 w-4" />
                            {isCreating || isUpdating
                                ? "Processing..."
                                : isEditMode
                                  ? "Save Changes"
                                  : "Publish Job"}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}
