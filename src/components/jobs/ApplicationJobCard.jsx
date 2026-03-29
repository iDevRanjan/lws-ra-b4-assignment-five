import { Calendar, DollarSign, MapPin } from "lucide-react";
import { Link } from "react-router";
import CompanyAvatar from "../common/CompanyAvatar";
import { formatDate } from "../../utils/formatDate";
import { getStatusConfig } from "../../utils/getStatusConfig";
import WithdrawButton from "../common/WithdrawButton";
import { memo } from "react";

const ApplicationJobCard = memo(function ApplicationJobCard({
    applicationData = {},
}) {
    const status = applicationData?.status || "New";
    const badgeConfig = getStatusConfig(status);

    return (
        <article className="border-border card rounded-lg border p-4">
            <div className="flex items-start gap-4">
                <div className="shrink-0">
                    <CompanyAvatar
                        companyInfo={applicationData.job.company}
                        size={12}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                            <h3 className="mb-1 font-semibold">
                                <Link
                                    to={`/jobs/${applicationData.job.slug}`}
                                    className="hover:underline"
                                >
                                    {applicationData.job.title}
                                </Link>
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {applicationData.job.company.name}
                            </p>
                        </div>
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${badgeConfig.className}`}
                        >
                            {badgeConfig.label}
                        </span>
                    </div>
                    <div className="text-muted-foreground mb-3 flex flex-wrap items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {applicationData.job.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Applied on {formatDate(applicationData.createdAt)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />$
                            {applicationData.job.salaryMin / 1000}k - $
                            {applicationData.job.salaryMax / 1000}k
                        </span>
                    </div>
                    <div className="mt-4 flex max-w-fit items-center gap-2">
                        <Link
                            to={`/jobs/${applicationData.job.slug}`}
                            className="btn btn-outline h-auto! w-full cursor-pointer whitespace-nowrap"
                        >
                            View Job
                        </Link>
                        {status === "New" && (
                            <WithdrawButton
                                applicationId={applicationData.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
});

export default ApplicationJobCard;
