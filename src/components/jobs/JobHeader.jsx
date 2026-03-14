import { Link } from "react-router";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";
import { Bookmark, Clock, MapPin } from "lucide-react";
import CompanyAvatar from "../common/CompanyAvatar";

export default function JobHeader({ jobDetailsData }) {
    return (
        <div className="card p-6">
            <div className="flex items-start gap-4">
                <div className="shrink-0">
                    <CompanyAvatar
                        companyInfo={jobDetailsData.company}
                        size={20}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-start justify-between gap-4">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold">
                                {jobDetailsData.title}
                            </h1>
                            <div className="text-muted-foreground flex flex-wrap items-center gap-3">
                                <Link
                                    to={`/companies/${jobDetailsData.company.slug}`}
                                    className="hover:text-primary text-lg font-medium"
                                >
                                    {jobDetailsData.company.name}
                                </Link>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {jobDetailsData.location}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {getDateDifferenceFromNow(
                                        jobDetailsData.createdAt,
                                    )}
                                </span>
                            </div>
                        </div>
                        <button
                            className="btn-ghost shrink-0 p-2"
                            title="Save job"
                        >
                            <Bookmark className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="badge badge-secondary">
                            {jobDetailsData.type}
                        </span>
                        <span className="badge badge-outline">
                            {jobDetailsData.workMode}
                        </span>
                        <span className="badge badge-outline">
                            {jobDetailsData.experienceLevel}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
