import { Clock, MapPin, Users } from "lucide-react";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";
import { Link } from "react-router";

export default function JobCard({ job }) {
    return (
        <article className="card p-6 transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="shrink-0">
                    <div className="bg-secondary flex h-16 w-16 items-center justify-center rounded-lg">
                        <img src={job.company.logoUrl} alt={job.company.name} />
                    </div>
                </div>
                <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="mb-1 text-lg font-semibold">
                                <Link
                                    to={`/job-details/${job.slug}`}
                                    className="hover:underline"
                                >
                                    {job.title}
                                </Link>
                            </h3>
                            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                                <a
                                    href="company-profile.html"
                                    className="hover:text-primary font-medium"
                                >
                                    {job.company.name}
                                </a>
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
                            <a
                                href="job-seeker/job-details.html"
                                className="btn btn-outline text-sm"
                            >
                                View Details
                            </a>
                            <button className="btn btn-primary cursor-pointer text-sm">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
