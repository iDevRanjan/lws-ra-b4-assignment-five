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
import { useRef, useState } from "react";
import { employmentTypeOptionData } from "../../data/employmentTypeOptionData";
import FormDropdownMenu from "../../components/common/FormDropdownMenu";
import { formatDateForInput } from "../../utils/formatDateForInput";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { formatFileSize } from "../../utils/formatFileSize";
import { formatDate } from "../../utils/formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    jobSeekerAvatarUpdateMutationOption,
    jobSeekerProfileUpdateMutationOption,
    jobSeekerResumeUpdateMutationOption,
} from "../../services/mutationOptions";
import { QUERY_KEYS } from "../../utils/constants";

export default function EditJobSeekerProfile() {
    const { data: jobSeekerProfile } = useProfile();
    const { isPending: isPendingAvatar, mutateAsync: mutateAvatarAsync } =
        useMutation(jobSeekerAvatarUpdateMutationOption());
    const { isPending: isPendingResume, mutateAsync: mutateResumeAsync } =
        useMutation(jobSeekerResumeUpdateMutationOption());
    const { isPending: isPendingProfile, mutateAsync: mutateProfileAsync } =
        useMutation(jobSeekerProfileUpdateMutationOption());

    const queryClient = useQueryClient();

    const skillInputRef = useRef(null);
    const uploadImageRef = useRef(null);
    const uploadResumeRef = useRef(null);

    const jobSeekerProfileData = jobSeekerProfile?.data ?? {};

    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const [resumeData, setResumeData] = useState({
        resumeOriginalName: jobSeekerProfileData.resumeOriginalName,
        resumeSize: jobSeekerProfileData.resumeSize,
        resumeUploadDate: jobSeekerProfileData.resumeUploadDate,
    });

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
        control,
        reset,
    } = useForm({
        defaultValues: {
            ...jobSeekerProfileData,
            skills: jobSeekerProfileData.skills?.map((skill) => ({
                value: skill,
            })),
            experience: jobSeekerProfileData.experience?.map((exp) => ({
                ...exp,
                startDate: formatDateForInput(exp.startDate),
                endDate: formatDateForInput(exp.endDate),
            })),
            education: jobSeekerProfileData.education?.map((edu) => ({
                ...edu,
                startDate: edu.startDate
                    ? new Date(edu.startDate).getFullYear()
                    : "",
                endDate: edu.endDate ? new Date(edu.endDate).getFullYear() : "",
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

    const {
        fields: educationFields,
        append: appendEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: "education",
    });

    const initialImageUrl = jobSeekerProfileData.profilePictureUrl?.startsWith(
        "http",
    )
        ? jobSeekerProfileData.profilePictureUrl
        : `${import.meta.env.VITE_API_BASE_URL}${jobSeekerProfileData.profilePictureUrl}`;

    const isUpdating = isPendingAvatar || isPendingResume || isPendingProfile;

    function handleChangeUploadImage(event) {
        const file = event.target.files[0];

        if (!file) return;

        const maxSizeInBytes = 5 * 1024 * 1024;
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Invalid file format. Please upload a JPEG, PNG, GIF, or WebP image.",
            );
            event.target.value = "";
            return;
        }

        if (file.size > maxSizeInBytes) {
            toast.error("File is too large. Maximum size allowed is 5MB.");
            event.target.value = ""; // `onChange` ইভেন্টটি ব্রাউজারে কেবল তখনই ট্রিগার হয় যখন ইনপুট ফিল্ডের ভ্যালু বা ফাইলের নাম পরিবর্তিত হয়; তাই ইউজার যদি ভুলবশত একটি বড় সাইজের ফাইল (যেমন ৭ এমবি) সিলেক্ট করেন এবং আপনি `event.target.value = ""` করে সেটি রিসেট না করেন, তবে ব্রাউজারের কাছে ওই ফাইলের নামটিই ইনপুট ভ্যালু হিসেবে থেকে যায়। এর ফলে ইউজার যদি নিজের ভুল বুঝতে পেরে ওই একই ফাইলটি পুনরায় সিলেক্ট করার চেষ্টা করেন, তবে ব্রাউজার মনে করে ভ্যালুর কোনো পরিবর্তন হয়নি এবং `onChange` ফাংশনটি দ্বিতীয়বার আর রান করে না, যা ইউজারের জন্য বিভ্রান্তিকর হতে পারে। এই সমস্যা এড়াতে এবং প্রতিবার সিলেকশনের সুযোগ তৈরি করতে ভ্যালু খালি করে দেওয়া জরুরি।
            return;
        }

        uploadImageRef.current = file;

        if (previewImageUrl && previewImageUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewImageUrl);
        }

        const previewUrl = URL.createObjectURL(file);
        setPreviewImageUrl(previewUrl);
    }

    function handleChangeUploadResume(event) {
        const file = event.target.files[0];

        if (!file) return;

        const maxSizeInBytes = 5 * 1024 * 1024;
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Invalid format. Please upload a PDF or Word document (.doc, .docx).",
            );
            event.target.value = "";
            uploadResumeRef.current = null;
            return;
        }

        if (file.size > maxSizeInBytes) {
            toast.error("File is too large. Maximum size allowed is 5MB.");
            event.target.value = "";
            uploadResumeRef.current = null;
            return;
        }

        uploadResumeRef.current = file;

        setResumeData({
            resumeOriginalName: file.name,
            resumeSize: formatFileSize(file.size),
            resumeUploadDate: new Date().toISOString(),
        });
    }

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

    function addExperience() {
        appendExperience({
            title: "",
            companyName: "",
            location: "",
            employmentType: "Full-time",
            startDate: "",
            endDate: "",
            description: "",
        });
    }

    function addEducation() {
        appendEducation({
            schoolName: "",
            degree: "",
            startDate: "",
            endDate: "",
            fieldOfStudy: "",
        });
    }

    async function onSubmit(formData) {
        const isAnyFieldChange = Object.keys(dirtyFields).length > 0;

        if (
            !isAnyFieldChange &&
            !uploadImageRef.current &&
            !uploadResumeRef.current
        ) {
            toast("ℹ️ You haven't made any changes yet");
            return;
        }

        const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
            acc[key] = formData[key];
            return acc;
        }, {});

        if (updatedData.skills) {
            updatedData.skills = updatedData.skills.map((skill) => skill.value);
        }

        if (updatedData.experience) {
            updatedData.experience = updatedData.experience.map((exp) => ({
                ...exp,
                startDate: exp.startDate
                    ? new Date(exp.startDate).toISOString()
                    : null,
                endDate: exp.endDate
                    ? new Date(exp.endDate).toISOString()
                    : null,
            }));
        }

        if (updatedData.education) {
            updatedData.education = updatedData.education.map((edu) => ({
                ...edu,
                startDate: edu.startDate
                    ? new Date(String(edu.startDate)).toISOString()
                    : null,
                endDate: edu.endDate
                    ? new Date(String(edu.endDate)).toISOString()
                    : null,
            }));
        }

        const ignoredKeys = [
            "id",
            "email",
            "role",
            "location",
            "resumeUrl",
            "resumeOriginalName",
            "resumeSize",
            "resumeUploadDate",
            "profilePictureUrl",
            "createdAt",
            "updatedAt",
        ];

        for (const key of ignoredKeys) {
            delete updatedData[key];
        }

        const updatePromises = [];
        const loadingToast = toast.loading("Updating profile...");

        try {
            if (uploadImageRef.current) {
                const avatarFormData = new FormData();
                avatarFormData.append("profilePicture", uploadImageRef.current);
                updatePromises.push(mutateAvatarAsync(avatarFormData));
            }

            if (uploadResumeRef.current) {
                const resumeFormData = new FormData();
                resumeFormData.append("resume", uploadResumeRef.current);
                updatePromises.push(mutateResumeAsync(resumeFormData));
            }

            if (isAnyFieldChange) {
                updatePromises.push(mutateProfileAsync(updatedData));
            }

            await Promise.all(updatePromises);

            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.clientProfile, "USER"],
            });

            uploadImageRef.current = null;
            uploadResumeRef.current = null;
            reset(formData);

            toast.success("Profile updated successfully", { id: loadingToast });
        } catch (error) {
            toast.error(`Update failed: ${error.message}`, {
                id: loadingToast,
            });
        }
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
                    <Link to="/jobseeker-profile" className="btn btn-outline">
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </Link>
                </div>
            </div>
            {/* Profile Photo Section */}
            <div className="card mb-6 p-6">
                <h2 className="mb-6 text-xl font-semibold">Profile Photo</h2>
                <div className="flex flex-col items-center gap-6 md:flex-row">
                    <div className="bg-secondary flex h-32 w-32 items-center justify-center overflow-hidden rounded-full">
                        <img
                            key={jobSeekerProfileData.name}
                            src={previewImageUrl || initialImageUrl}
                            alt={jobSeekerProfileData.name}
                            className="bg-secondary h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="mb-2 font-medium">
                            Upload Profile Picture
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                            JPG, JPEG, PNG, GIF or WEBP. Max size of 5MB.
                        </p>
                        <div className="flex gap-2">
                            <label className="btn btn-primary cursor-pointer">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Photo
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
                                    hidden
                                    onChange={handleChangeUploadImage}
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
                                    {resumeData.resumeOriginalName ?? "n/a.pdf"}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    Updated{" "}
                                    {formatDate(resumeData.resumeUploadDate) ??
                                        "N/A"}{" "}
                                    • {resumeData.resumeSize ?? "0 Bytes"}
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
                                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                hidden
                                onChange={handleChangeUploadResume}
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
                        {experienceFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="border-border rounded-lg border p-4"
                            >
                                <div className="mb-2 flex justify-end">
                                    <button
                                        type="button"
                                        className="btn-ghost flex size-10 cursor-pointer items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                                        onClick={() => removeExperience(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 [&>*:last-child]:md:col-span-2">
                                    <Field
                                        label="Title"
                                        htmlFor={`experience.${index}.title`}
                                        error={
                                            errors.experience?.[index]?.title
                                        }
                                    >
                                        <input
                                            type="text"
                                            id={`experience.${index}.title`}
                                            className="input"
                                            placeholder="Enter job title"
                                            autoComplete="organization-title"
                                            required={true}
                                            {...register(
                                                `experience.${index}.title`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Job title is required",
                                                    },
                                                },
                                            )}
                                        />
                                    </Field>
                                    <Field
                                        label="Location"
                                        htmlFor={`experience.${index}.location`}
                                        error={
                                            errors.experience?.[index]?.location
                                        }
                                    >
                                        <input
                                            type="text"
                                            id={`experience.${index}.location`}
                                            className="input"
                                            placeholder="Enter job location"
                                            required={true}
                                            {...register(
                                                `experience.${index}.location`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Job location is required",
                                                    },
                                                },
                                            )}
                                        />
                                    </Field>
                                    <Field
                                        label="Company"
                                        htmlFor={`experience.${index}.companyName`}
                                        error={
                                            errors.experience?.[index]
                                                ?.companyName
                                        }
                                    >
                                        <input
                                            type="text"
                                            id={`experience.${index}.companyName`}
                                            className="input"
                                            placeholder="Enter company name"
                                            autoComplete="organization"
                                            required={true}
                                            {...register(
                                                `experience.${index}.companyName`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Company name is required",
                                                    },
                                                },
                                            )}
                                        />
                                    </Field>
                                    <Field
                                        label="Employment Type"
                                        htmlFor={`experience.${index}.employmentType`}
                                        error={
                                            errors.experience?.[index]
                                                ?.employmentType
                                        }
                                    >
                                        <FormDropdownMenu
                                            selectId={`experience.${index}.employmentType`}
                                            itemsData={employmentTypeOptionData}
                                            required={true}
                                            selectRegister={register(
                                                `experience.${index}.employmentType`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Employment type is required",
                                                    },
                                                },
                                            )}
                                        />
                                    </Field>
                                    <Field
                                        label="Start Date"
                                        htmlFor={`experience.${index}.startDate`}
                                        error={
                                            errors.experience?.[index]
                                                ?.startDate
                                        }
                                    >
                                        <input
                                            type="date"
                                            id={`experience.${index}.startDate`}
                                            className="input"
                                            required={true}
                                            {...register(
                                                `experience.${index}.startDate`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Start date is required",
                                                    },
                                                },
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
                                        error={
                                            errors.experience?.[index]
                                                ?.description
                                        }
                                    >
                                        <textarea
                                            id={`experience.${index}.description`}
                                            className="textarea"
                                            placeholder="Summarize your relevant experience, key skills, and how they align with this job role..."
                                            required={true}
                                            {...register(
                                                `experience.${index}.description`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Job description is required",
                                                    },
                                                },
                                            )}
                                        />
                                    </Field>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Education */}
                <div className="card p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Education</h2>
                        <button
                            type="button"
                            className="btn btn-outline cursor-pointer"
                            onClick={addEducation}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Education
                        </button>
                    </div>
                    <div className="space-y-6">
                        {educationFields.length === 0 && (
                            <p className="text-muted-foreground py-4 text-center">
                                No education added yet
                            </p>
                        )}
                        {educationFields.map((field, index) => (
                            <div
                                key={field.id}
                                className="border-border rounded-lg border p-4"
                            >
                                <div className="mb-2 flex justify-end">
                                    <button
                                        type="button"
                                        className="btn-ghost flex size-10 cursor-pointer items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                                        onClick={() => removeEducation(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 [&>*:last-child]:md:col-span-2">
                                    <Field
                                        label="Institution"
                                        htmlFor={`education.${index}.schoolName`}
                                    >
                                        <input
                                            type="text"
                                            id={`education.${index}.schoolName`}
                                            className="input"
                                            placeholder="Enter institution name"
                                            {...register(
                                                `education.${index}.schoolName`,
                                            )}
                                        />
                                    </Field>
                                    <Field
                                        label="Degree"
                                        htmlFor={`education.${index}.degree`}
                                    >
                                        <input
                                            type="text"
                                            id={`education.${index}.degree`}
                                            className="input"
                                            placeholder="e.g. B.Tech, B.Sc, M.A"
                                            {...register(
                                                `education.${index}.degree`,
                                            )}
                                        />
                                    </Field>
                                    <Field
                                        label="Start Year"
                                        htmlFor={`education.${index}.startDate`}
                                        error={
                                            errors.education?.[index].startDate
                                        }
                                    >
                                        <input
                                            type="number"
                                            id={`education.${index}.startDate`}
                                            className="input"
                                            placeholder="e.g. 2020"
                                            required={true}
                                            {...register(
                                                `education.${index}.startDate`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Start year is required",
                                                    },
                                                },
                                            )}
                                        />
                                    </Field>
                                    <Field
                                        label="End Year"
                                        htmlFor={`education.${index}.endDate`}
                                    >
                                        <input
                                            type="number"
                                            id={`education.${index}.endDate`}
                                            className="input"
                                            placeholder="e.g. 2024"
                                            {...register(
                                                `education.${index}.endDate`,
                                            )}
                                        />
                                    </Field>
                                    <Field
                                        label="Field of Study"
                                        htmlFor={`education.${index}.fieldOfStudy`}
                                    >
                                        <input
                                            type="text"
                                            id={`education.${index}.fieldOfStudy`}
                                            className="input"
                                            placeholder="e.g. Computer Science"
                                            {...register(
                                                `education.${index}.fieldOfStudy`,
                                            )}
                                        />
                                    </Field>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Social Links */}
                <div className="card p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Social Profiles
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="linkedin"
                                className="label mb-2 flex items-center gap-1"
                            >
                                <Linkedin className="mr-1 inline h-4 w-4" />
                                LinkedIn
                            </label>
                            <input
                                type="url"
                                id="linkedin"
                                className="input"
                                placeholder="https://linkedin.com/in/username"
                                {...register("linkedinUrl")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="github"
                                className="label mb-2 flex items-center gap-1"
                            >
                                <Github className="mr-1 inline h-4 w-4" />
                                GitHub
                            </label>
                            <input
                                type="url"
                                id="github"
                                className="input"
                                placeholder="https://github.com/username"
                                {...register("githubUrl")}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="portfolio"
                                className="label mb-2 flex items-center gap-1"
                            >
                                <Globe className="mr-1 inline h-4 w-4" />
                                Portfolio Website
                            </label>
                            <input
                                type="url"
                                id="portfolio"
                                className="input"
                                placeholder="https://yourwebsite.com"
                                {...register("portfolioUrl")}
                            />
                        </div>
                    </div>
                </div>
                {/* Form Actions */}
                <div className="card p-6">
                    <div className="flex flex-col justify-end gap-3 sm:flex-row">
                        <Link
                            to="/jobseeker-profile"
                            className="btn btn-outline"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="btn btn-primary"
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {isUpdating ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </main>
    );
}
