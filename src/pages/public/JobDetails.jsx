import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getJobBySlugQueryOption } from "../../services/queryOptions";
import { getDateDifferenceFromNow } from "../../utils/getDateDifferenceFromNow";
import { Flag, Send } from "lucide-react";
import JobHeader from "../../components/jobs/JobHeader";
import JobOverview from "../../components/jobs/JobOverview";
import JobDescription from "../../components/jobs/JobDescription";
import CompanyInfo from "../../components/company/CompanyInfo";
import ShareJob from "../../components/jobs/ShareJob";
import SimilarJobs from "../../components/jobs/SimilarJobs";

export default function JobDetails() {
    const params = useParams();

    const { data: jobDetails } = useSuspenseQuery(
        getJobBySlugQueryOption(params.jobSlug),
    );

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <JobHeader jobDetailsData={jobDetails.data} />
                    <JobOverview jobDetailsData={jobDetails.data} />
                    <JobDescription jobDetailsData={jobDetails.data} />
                    <div className="card p-6">
                        <h2 className="mb-4 text-xl font-semibold">
                            Required Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {jobDetails.data?.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="badge badge-secondary"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <SimilarJobs jobId={jobDetails.data.id} />
                </div>
                <div className="space-y-6 lg:col-span-1">
                    {/* Apply Section (Sticky) */}
                    <div className="card p-6 lg:sticky lg:top-24">
                        <div className="space-y-4">
                            <div className="border-border border-b pb-4 text-center">
                                <p className="text-primary mb-1 text-2xl font-bold">
                                    ${jobDetails.data.salaryMin / 1000}k - $
                                    {jobDetails.data.salaryMax / 1000}k
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {jobDetails.data.salaryPeriod}
                                </p>
                            </div>
                            <button className="btn btn-primary w-full text-base">
                                <Send className="mr-2 h-4 w-4" />
                                Apply Now
                            </button>
                            <div className="border-border space-y-3 border-t pt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Applicants
                                    </span>
                                    <span className="font-medium">
                                        {jobDetails.data.applicants}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Posted
                                    </span>
                                    <span className="font-medium">
                                        {getDateDifferenceFromNow(
                                            jobDetails.data.createdAt,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CompanyInfo companyInfo={jobDetails.data.company} />
                    <ShareJob />
                    <button className="text-muted-foreground hover:text-foreground flex w-full items-center justify-center gap-2 text-sm">
                        <Flag className="h-4 w-4" />
                        Report this job
                    </button>
                </div>
            </div>
        </main>
    );
}
