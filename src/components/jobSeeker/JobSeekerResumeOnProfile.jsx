import { Download, FileText, Upload } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../../utils/formatDate";

export default function JobSeekerResumeOnProfile({ profileData = {} }) {
    return (
        <div className="card p-6">
            <h3 className="mb-4 text-lg font-semibold">Resume</h3>
            <div className="space-y-4">
                <div className="bg-secondary rounded-lg p-4">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
                            <FileText className="text-primary h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                {profileData.resumeOriginalName ?? "n/a.pdf"}
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Updated{" "}
                                {formatDate(profileData.resumeUploadDate) ??
                                    "N/A"}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            to={`${import.meta.env.VITE_API_BASE_URL}${profileData.resumeUrl ?? "#"}`}
                            className="btn btn-outline h-9 w-full text-xs"
                        >
                            <Download className="mr-2 h-3 w-3" />
                            Download
                        </Link>
                    </div>
                </div>
                <Link
                    to="/edit-jobseeker-profile"
                    className="btn btn-outline w-full"
                >
                    <Upload className="mr-2 h-4 w-4" />
                    Update Resume
                </Link>
            </div>
        </div>
    );
}
