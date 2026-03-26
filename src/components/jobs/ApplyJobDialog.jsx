import { FileText, Send, X } from "lucide-react";
import { useProfile } from "../../hooks/useProfile";
import Field from "../common/Field";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { applyAJobMutationOption } from "../../services/mutationOptions";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ApplyJobDialog({ jobId, onClose }) {
    const [coverLetterCharCount, setCoverLetterCharCount] = useState(500);
    const { data: jobSeekerProfile } = useProfile();
    const { isPending, mutate: mutateApplyAJob } = useMutation(
        applyAJobMutationOption(jobId),
    );

    const jobSeekerProfileData = jobSeekerProfile?.data;
    const hasResume = !!jobSeekerProfileData?.resumeUrl;

    function handleChangeCoverLetter(event) {
        const charLength = event.target.value.length;
        setCoverLetterCharCount(500 - charLength);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());

        mutateApplyAJob(formDataObject, {
            onSuccess: () => {
                toast.success("Application submitted successfully!");
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || error.message);
            },
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto">
                <div className="space-y-6 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                Apply for Position
                            </h2>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Complete the form below to submit your
                                application
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="btn-ghost flex size-10 cursor-pointer items-center justify-center rounded-full p-2"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        <p className="mb-1 text-sm font-medium">Resume</p>
                        <div className="border-border rounded-lg border p-2">
                            {hasResume ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-secondary flex h-10 w-10 items-center justify-center rounded-lg">
                                            <FileText className="text-primary h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {
                                                    jobSeekerProfileData.resumeOriginalName
                                                }
                                            </p>
                                            <p className="text-muted-foreground text-xs">
                                                {
                                                    jobSeekerProfileData.resumeSize
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground py-2 text-center">
                                    We couldn't find your resume. Please upload
                                    your resume before submitting the
                                    application.{" "}
                                    <Link
                                        to="/edit-jobseeker-profile"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Click here to upload.
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <Field label="Cover Message" htmlFor="coverLetter">
                                <textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    className="textarea"
                                    maxLength={500}
                                    placeholder="Write a brief message about why you're a great fit for this role..."
                                    required={true}
                                    onChange={handleChangeCoverLetter}
                                    onBlur={(event) => {
                                        event.target.value =
                                            event.target.value.trim();
                                    }}
                                />
                            </Field>
                            <p className="text-muted-foreground pb-4 text-xs font-bold">
                                <span
                                    style={{
                                        color:
                                            coverLetterCharCount >= 50
                                                ? "green"
                                                : coverLetterCharCount >= 10
                                                  ? "orange"
                                                  : "red",
                                    }}
                                >
                                    {coverLetterCharCount}
                                </span>{" "}
                                / 500 characters
                            </p>
                        </div>
                        <div className="border-border flex gap-3 border-t pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isPending}
                                className="btn btn-outline flex-1 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!hasResume || isPending}
                                className="btn btn-primary flex-1 cursor-pointer"
                            >
                                <Send className="mr-2 h-4 w-4" />
                                {isPending
                                    ? "Submitting..."
                                    : "Submit Application"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
