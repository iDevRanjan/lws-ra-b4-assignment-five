import { memo } from "react";
import { Clock, MapPin, Send, Users, X } from "lucide-react";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";
import { Link } from "react-router";
import { slugify } from "../../utils/slugify";
import { applicationJobChecking } from "../../utils/applicationJobChecking";
import ApplyNowButton from "../common/ApplyNowButton";
import WithdrawButton from "../common/WithdrawButton";
import CompanyAvatar from "../common/CompanyAvatar";
import { getStatusConfig } from "../../utils/getStatusConfig";

const JobCard = memo(function JobCard({
    job,
    role,
    jobSeekerApplicationData = [],
}) {
    const { exist, status, applicationId } = applicationJobChecking(
        jobSeekerApplicationData,
        job.id,
    );
    const buttonConfig = getStatusConfig(status);

    function renderJobActionButton() {
        if (role === "COMPANY") return null;

        return exist ? (
            status === "New" ? (
                <WithdrawButton applicationId={applicationId} />
            ) : (
                <button
                    className={`btn text-primary-foreground w-full cursor-not-allowed ${buttonConfig.className} whitespace-nowrap`}
                >
                    {buttonConfig.label}
                </button>
            )
        ) : (
            <ApplyNowButton jobId={job.id} />
        );
    }

    return (
        <article className="card p-6 transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="shrink-0">
                    <CompanyAvatar companyInfo={job.company} size={16} />
                </div>
                <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="mb-1 text-lg font-semibold">
                                <Link
                                    to={`/jobs/${job.slug}`}
                                    className="hover:underline"
                                >
                                    {job.title}
                                </Link>
                            </h3>
                            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                                <Link
                                    to={`/companies/${slugify(job.company.name)}`}
                                    className="hover:text-primary font-medium"
                                >
                                    {job.company.name}
                                </Link>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {job.location}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    Posted{" "}
                                    {getDateDifferenceFromNow(job.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                        {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="badge badge-secondary">
                            {job.type}
                        </span>
                        <span className="badge badge-outline">
                            {job.workMode}
                        </span>
                        <span className="border-border border-l-2"></span>
                        {job?.skills.map((skill) => (
                            <span key={skill} className="badge badge-outline">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-4">
                            <span className="text-primary text-sm font-semibold">
                                ${job.salaryMin / 1000}K - $
                                {job.salaryMax / 1000}K
                            </span>
                            <span className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Users className="h-4 w-4" />
                                {job.applicants} applicants
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to={`/jobs/${job.slug}`}
                                className="btn btn-outline w-full cursor-pointer text-sm whitespace-nowrap"
                            >
                                View Details
                            </Link>
                            {renderJobActionButton()}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
});

export default JobCard;
