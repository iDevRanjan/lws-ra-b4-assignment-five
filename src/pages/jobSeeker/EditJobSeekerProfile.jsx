import {
    FileText,
    Github,
    Globe,
    Linkedin,
    Plus,
    Save,
    Trash2,
    Upload,
    User,
    X,
} from "lucide-react";
import { useProfile } from "../../hooks/useProfile";
import { useFieldArray, useForm } from "react-hook-form";
import Field from "../../components/common/Field";
import { useRef } from "react";
import { employmentTypeOptionData } from "../../data/employmentTypeOptionData";
import FormDropdownMenu from "../../components/common/FormDropdownMenu";

export default function EditJobSeekerProfile() {
    const { data: jobSeekerProfile } = useProfile();
    const skillInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        control,
    } = useForm({
        defaultValues: {
            ...jobSeekerProfile.data,
            skills: jobSeekerProfile.data.skills.map((skill) => ({
                value: skill,
            })),
        },
    });

    const {
        fields: skillFields,
        append: appendSkill,
        remove: removeSkill,
    } = useFieldArray({
        control,
        name: "skills",
    });

    const {
        fields: experienceFields,
        append: appendExperience,
        remove: removeExperience,
    } = useFieldArray({
        control,
        name: "experience",
    });

    function addSkill() {
        const sanitizedValue = skillInputRef.current.value.trim();

        if (sanitizedValue) {
            appendSkill({ value: sanitizedValue });
            skillInputRef.current.value = "";
        }
    }

    function addExperience() {
        appendExperience({
            title: "",
            companyName: "",
            location: "",
            employmentType: "",
            startDate: "",
            endDate: "",
            description: "",
        });
    }

    function onSubmit(formData) {
        const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
            acc[key] = formData[key];
            return acc;
        }, {});

        console.log(updatedData);
    }

    return (
        <main className="container mx-auto max-w-4xl px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold">
                            Edit Profile
                        </h1>
                        <p className="text-muted-foreground">
                            Update your personal information and preferences
                        </p>
                    </div>
                    <a href="user-profile.html" className="btn btn-outline">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </a>
                </div>
            </div>
            {/* Profile Photo Section */}
            <div className="card mb-6 p-6">
                <h2 className="mb-6 text-xl font-semibold">Profile Photo</h2>
                <div className="flex flex-col items-center gap-6 md:flex-row">
                    <div className="relative shrink-0">
                        <div className="bg-secondary flex h-32 w-32 items-center justify-center rounded-full">
                            <User className="text-primary h-16 w-16" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-2 font-medium">
                            Upload Profile Picture
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                            JPG, PNG or GIF. Max size of 5MB.
                        </p>
                        <div className="flex gap-2">
                            <label className="btn btn-primary cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Photo
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* Resume Upload */}
            <div className="card mb-6 p-6">
                <h2 className="mb-6 text-xl font-semibold">Resume/CV</h2>
                <div className="space-y-4">
                    <div className="bg-secondary rounded-lg p-4">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
                                <FileText className="text-primary h-6 w-6" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                    John_Doe_Resume.pdf
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    Updated Nov 28, 2025 • 245 KB
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="btn btn-outline w-full cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New Resume
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                            />
                        </label>
                        <p className="text-muted-foreground mt-2 text-xs">
                            Supported formats: PDF, DOC, DOCX. Max size: 5MB
                        </p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Field label="Name" htmlFor="name" error={errors.name}>
                            <input
                                type="text"
                                id="name"
                                className="input"
                                placeholder="Enter full name"
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
                        <Field
                            label="Email Address"
                            htmlFor="email"
                            error={errors.email}
                        >
                            <input
                                type="email"
                                id="email"
                                className="input"
                                placeholder="Enter email address"
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
                            <input
                                type="tel"
                                id="phone"
                                className="input"
                                placeholder="Enter phone number"
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
                        <Field label="Professional Title" htmlFor="title">
                            <input
                                type="text"
                                id="title"
                                className="input"
                                placeholder="e.g. Full Stack Developer"
                                autoComplete="organization-title"
                                {...register("title")}
                            />
                        </Field>
                    </div>
                </div>
                {/* Location */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">Location</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Field label="City" htmlFor="city" error={errors.city}>
                            <input
                                type="text"
                                id="city"
                                className="input"
                                placeholder="Enter city"
                                autoComplete="address-level2"
                                required={true}
                                {...register("city", {
                                    required: {
                                        value: true,
                                        message: "City is required",
                                    },
                                })}
                            />
                        </Field>
                        <Field
                            label="State/Province"
                            htmlFor="state"
                            error={errors.state}
                        >
                            <input
                                type="text"
                                id="state"
                                className="input"
                                placeholder="Enter state"
                                autoComplete="address-level1"
                                required={true}
                                {...register("state", {
                                    required: {
                                        value: true,
                                        message: "State is required",
                                    },
                                })}
                            />
                        </Field>
                        <Field
                            label="Country"
                            htmlFor="country"
                            error={errors.country}
                        >
                            <input
                                type="text"
                                id="country"
                                className="input"
                                placeholder="Enter country"
                                autoComplete="country-name"
                                required={true}
                                {...register("country", {
                                    required: {
                                        value: true,
                                        message: "Country is required",
                                    },
                                })}
                            />
                        </Field>
                        <Field label="Zip Code" htmlFor="zipCode">
                            <input
                                type="text"
                                id="zipCode"
                                className="input"
                                placeholder="Enter zip code"
                                autoComplete="postal-code"
                                {...register("zipCode")}
                            />
                        </Field>
                    </div>
                </div>
                {/* About */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">About</h2>
                    <Field label="Professional Summary" htmlFor="bio">
                        <textarea
                            id="bio"
                            className="textarea"
                            placeholder="Write a brief summary about yourself, your experience, and what you're looking for..."
                            {...register("bio")}
                        />
                    </Field>
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
                            Add skills relevant to your profession. Press Enter
                            or click Add to add each skill.
                        </p>
                    </div>
                    <div>
                        <label className="label mb-3 block">
                            Current Skills
                        </label>
                        <div className="flex flex-wrap gap-2">
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
                </div>
                {/* Experience */}
                <div className="card p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            Work Experience
                        </h2>
                        <button
                            type="button"
                            className="btn btn-outline cursor-pointer"
                            onClick={addExperience}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Experience
                        </button>
                    </div>
                    <div className="space-y-6">
                        {experienceFields.length === 0 && (
                            <p className="text-muted-foreground py-4 text-center">
                                No experience added yet
                            </p>
                        )}
                        {experienceFields.map((field, index) => {
                            return (
                                <div
                                    key={field.id}
                                    className="border-border rounded-lg border p-4"
                                >
                                    <div className="mb-2 flex justify-end">
                                        <button
                                            type="button"
                                            className="btn-ghost flex size-10 cursor-pointer items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                                            onClick={() =>
                                                removeExperience(index)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 [&>*:last-child]:md:col-span-2">
                                        <Field
                                            label="Title"
                                            htmlFor={`experience.${index}.title`}
                                        >
                                            <input
                                                type="text"
                                                id={`experience.${index}.title`}
                                                className="input"
                                                placeholder="Enter job title"
                                                autoComplete="organization-title"
                                                {...register(
                                                    `experience.${index}.title`,
                                                )}
                                            />
                                        </Field>
                                        <Field
                                            label="Location"
                                            htmlFor={`experience.${index}.location`}
                                        >
                                            <input
                                                type="text"
                                                id={`experience.${index}.location`}
                                                className="input"
                                                placeholder="Enter job location"
                                                {...register(
                                                    `experience.${index}.location`,
                                                )}
                                            />
                                        </Field>
                                        <Field
                                            label="Company"
                                            htmlFor={`experience.${index}.companyName`}
                                        >
                                            <input
                                                type="text"
                                                id={`experience.${index}.companyName`}
                                                className="input"
                                                placeholder="Enter company name"
                                                autoComplete="organization"
                                                {...register(
                                                    `experience.${index}.companyName`,
                                                )}
                                            />
                                        </Field>
                                        <Field
                                            label="Employment Type"
                                            htmlFor={`experience.${index}.employmentType`}
                                        >
                                            <FormDropdownMenu
                                                selectId={`experience.${index}.employmentType`}
                                                itemsData={
                                                    employmentTypeOptionData
                                                }
                                                selectRegister={register(
                                                    `experience.${index}.employmentType`,
                                                )}
                                            />
                                        </Field>
                                        <Field
                                            label="Start Date"
                                            htmlFor={`experience.${index}.startDate`}
                                        >
                                            <input
                                                type="date"
                                                id={`experience.${index}.startDate`}
                                                className="input"
                                                {...register(
                                                    `experience.${index}.startDate`,
                                                )}
                                            />
                                        </Field>
                                        <Field
                                            label="End Date"
                                            htmlFor={`experience.${index}.endDate`}
                                        >
                                            <input
                                                type="date"
                                                id={`experience.${index}.endDate`}
                                                className="input"
                                                {...register(
                                                    `experience.${index}.endDate`,
                                                )}
                                            />
                                        </Field>
                                        <Field
                                            label="Description"
                                            htmlFor={`experience.${index}.description`}
                                        >
                                            <textarea
                                                id={`experience.${index}.description`}
                                                className="textarea"
                                                placeholder="Summarize your relevant experience, key skills, and how they align with this job role..."
                                                {...register(
                                                    `experience.${index}.description`,
                                                )}
                                            />
                                        </Field>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Education */}
                <div className="card p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Education</h2>
                        <button type="button" className="btn btn-outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Education
                        </button>
                    </div>
                    <div className="border-border rounded-lg border p-4">
                        <div className="mb-4 flex items-start justify-between">
                            <h3 className="font-medium">
                                Bachelor of Science in Computer Science
                            </h3>
                            {/* Remove should be implemented on the local state until the user saves the changes. */}
                            <button
                                type="button"
                                className="btn-ghost p-1 text-red-600 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="label mb-2 block">
                                    Institution
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    defaultValue="Stanford University"
                                />
                            </div>
                            <div>
                                <label className="label mb-2 block">
                                    Degree
                                </label>
                                <input
                                    type="text"
                                    className="input"
                                    defaultValue="Bachelor of Science"
                                />
                            </div>
                            <div>
                                <label className="label mb-2 block">
                                    Start Year
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    defaultValue={2016}
                                />
                            </div>
                            <div>
                                <label className="label mb-2 block">
                                    End Year
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    defaultValue={2020}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Resume Upload */}
                {/* Social Links */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Social Profiles
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="linkedin"
                                className="label mb-2 block"
                            >
                                <Linkedin className="mr-1 inline h-4 w-4" />
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                id="linkedin"
                                className="input"
                                placeholder="https://linkedin.com/in/username"
                                defaultValue="https://linkedin.com/in/johndoe"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="github"
                                className="label mb-2 block"
                            >
                                <Github className="mr-1 inline h-4 w-4" />
                                GitHub
                            </label>
                            <input
                                type="url"
                                id="github"
                                className="input"
                                placeholder="https://github.com/username"
                                defaultValue="https://github.com/johndoe"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="portfolio"
                                className="label mb-2 block"
                            >
                                <Globe className="mr-1 inline h-4 w-4" />
                                Portfolio Website
                            </label>
                            <input
                                type="url"
                                id="portfolio"
                                className="input"
                                placeholder="https://yourwebsite.com"
                                defaultValue="https://johndoe.dev"
                            />
                        </div>
                    </div>
                </div>
                {/* Form Actions */}
                <div className="card p-6">
                    <div className="flex flex-col justify-end gap-3 sm:flex-row">
                        <a href="user-profile.html" className="btn btn-outline">
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </a>
                        <button type="submit" className="btn btn-primary">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}
