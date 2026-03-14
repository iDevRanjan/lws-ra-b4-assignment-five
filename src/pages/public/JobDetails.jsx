import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getJobBySlugQueryOption } from "../../services/queryOptions";
import { Flag } from "lucide-react";
import JobHeader from "../../components/jobs/JobHeader";
import JobOverview from "../../components/jobs/JobOverview";
import JobDescription from "../../components/jobs/JobDescription";
import CompanyInfo from "../../components/company/CompanyInfo";
import ShareJob from "../../components/jobs/ShareJob";
import SimilarJobs from "../../components/jobs/SimilarJobs";
import JobApplySection from "../../components/jobs/JobApplySection";
import { useApplications } from "../../hooks/useApplications";

export default function JobDetails() {
    const params = useParams();

    const { data: jobDetails } = useSuspenseQuery(
        getJobBySlugQueryOption(params.jobSlug),
    );
    const { data: jobSeekerApplicationData } = useApplications();

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
                    <JobApplySection
                        jobDetailsData={jobDetails.data}
                        jobSeekerApplicationData={
                            jobSeekerApplicationData?.data ?? []
                        }
                    />
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
