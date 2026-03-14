import { useQuery } from "@tanstack/react-query";
import { getSimilarJobsQueryOption } from "../../services/queryOptions";
import SimilarJobSkeleton from "../skeletons/SimilarJobSkeleton";
import { Link } from "react-router";
import CompanyAvatar from "../common/CompanyAvatar";

export default function SimilarJobs({ jobId }) {
    const {
        data: similarJobsData,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery(getSimilarJobsQueryOption(jobId));

    const isSimilarJobsAvailable =
        similarJobsData?.success && similarJobsData?.data.length > 0;

    if (isError) {
        return (
            <div className="card p-6">
                <h2 className="mb-4 text-xl font-semibold">Similar Jobs</h2>
                <p className="text-center text-red-600">{error.message}</p>
            </div>
        );
    }

    return (
        <div
            className="card p-6"
            ref={(node) => {
                if (!node) return;
                if (isSimilarJobsAvailable) return;

                const observer = new IntersectionObserver((entries) => {
                    const entry = entries[0];

                    if (entry.isIntersecting) {
                        refetch();
                        observer.disconnect();
                    }
                });

                if (observer) observer.observe(node);

                return () => {
                    if (observer) observer.disconnect();
                };
            }}
        >
            <h2 className="mb-4 text-xl font-semibold">Similar Jobs</h2>
            {isPending && <SimilarJobSkeleton />}
            {!isPending && isSimilarJobsAvailable && (
                <div className="space-y-4">
                    {similarJobsData?.data.map((similarJobData) => (
                        <article
                            key={similarJobData.id}
                            className="border-border border-b pb-4 last:border-0 last:pb-0"
                        >
                            <div className="flex gap-4">
                                <div className="shrink-0">
                                    <CompanyAvatar
                                        companyInfo={similarJobData.company}
                                        size={12}
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="mb-1 font-semibold">
                                        <Link
                                            to={`/jobs/${similarJobData.slug}`}
                                            className="hover:underline"
                                        >
                                            {similarJobData.title}
                                        </Link>
                                    </h3>
                                    <p className="text-muted-foreground mb-2 text-sm">
                                        {similarJobData.company.name} •{" "}
                                        {similarJobData.location} •{" "}
                                        {similarJobData.workMode}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary text-sm font-medium">
                                            ${similarJobData.salaryMin / 1000}k
                                            - ${similarJobData.salaryMax / 1000}
                                            k
                                        </span>
                                        <Link
                                            to={`/jobs/${similarJobData.slug}`}
                                            className="text-primary text-sm hover:underline"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
