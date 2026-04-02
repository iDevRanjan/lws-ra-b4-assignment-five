import { Calendar, Eye, FileText, Mail, MailQuestionMark } from "lucide-react";
import JobSeekerAvatar from "../common/JobSeekerAvatar";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";
import { Link } from "react-router";
import { getStatusConfig } from "../../utils/getStatusConfig";
import { useState } from "react";
import { createPortal } from "react-dom";
import CoverLetterModal from "./CoverLetterModal";
import ActionSelectMenu from "../common/ActionSelectMenu";
import { applicantStatusMap } from "../../data/applicantStatusMap";

export default function ApplicantsCard({
    companyApplicantData,
    isCard,
    onApplicantStatusUpdate,
    isUpdating,
}) {
    const [showModal, setShowModal] = useState(false);

    const resumeUrl = companyApplicantData.resumeUrl?.startsWith("http")
        ? companyApplicantData.resumeUrl
        : `${import.meta.env.VITE_API_BASE_URL}${companyApplicantData.resumeUrl}`;

    const status = companyApplicantData?.status || "New";
    const badgeConfig = getStatusConfig(status);
    const applicantStatusItemsData = applicantStatusMap[status] ?? [];

    function handleValueChange(data) {
        if (!data) return;
        onApplicantStatusUpdate(companyApplicantData.id, data);
    }

    return (
        <article
            className={`p-6 transition-shadow hover:shadow-md ${isCard ? "card" : ""}`}
        >
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="shrink-0">
                    <JobSeekerAvatar
                        jobSeekerProfileData={companyApplicantData.user}
                        size={16}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h3 className="mb-1 text-lg font-semibold">
                                {companyApplicantData.user.name}
                            </h3>
                            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                                <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {companyApplicantData.user.email}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {getDateDifferenceFromNow(
                                        companyApplicantData.createdAt,
                                    )}
                                </span>
                            </div>
                        </div>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${badgeConfig.className}`}
                        >
                            {badgeConfig.label === "Applied"
                                ? "New"
                                : badgeConfig.label}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            to={`/applicants/${companyApplicantData.userId}`}
                            className="btn btn-outline h-9 text-sm"
                        >
                            <Eye className="mr-2 h-3 w-3" />
                            View Profile
                        </Link>
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline h-9 text-sm"
                        >
                            <FileText className="mr-2 h-3 w-3" />
                            Resume
                        </a>
                        <>
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn btn-outline h-9 cursor-pointer text-sm"
                            >
                                <MailQuestionMark className="mr-2 h-3 w-3" />
                                Cover letter
                            </button>
                            {showModal &&
                                createPortal(
                                    <CoverLetterModal
                                        onClose={() => setShowModal(false)}
                                        content={
                                            companyApplicantData.coverLetter
                                        }
                                    />,
                                    document.getElementById("modal-container"),
                                )}
                        </>
                        {applicantStatusItemsData.length > 0 && (
                            <div>
                                <ActionSelectMenu
                                    selectTitle="Update Applicant Status"
                                    itemsData={applicantStatusItemsData}
                                    onValueChange={handleValueChange}
                                    defaultSelect="Applicant Status"
                                    disabled={isUpdating}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
