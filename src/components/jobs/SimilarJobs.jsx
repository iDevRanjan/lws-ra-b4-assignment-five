import { useQuery } from "@tanstack/react-query";
import { getSimilarJobsQueryOption } from "../../services/queryOptions";
import SimilarJobSkeleton from "../skeletons/SimilarJobSkeleton";

export default function SimilarJobs({ jobId }) {
    const {
        data: similarJobsData,
        isPending,
        isError,
        error,
        refetch,
    } = useQuery(getSimilarJobsQueryOption(jobId));

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
                if (similarJobsData?.success) return;

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
            {!isPending && similarJobsData?.success && (
                <div className="space-y-4">
                    {similarJobsData?.data.map((similarJobData) => (
                        <article
                            key={similarJobData.id}
                            className="border-border border-b pb-4 last:border-0 last:pb-0"
                        >
                            <div className="flex gap-4">
                                <div className="shrink-0">
                                    <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-lg">
                                        <img
                                            src={similarJobData.company.logoUrl}
                                            alt={similarJobData.company.name}
                                        />
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="mb-1 font-semibold">
                                        <a
                                            href="job-details.html"
                                            className="hover:underline"
                                        >
                                            {similarJobData.title}
                                        </a>
                                    </h3>
                                    <p className="text-muted-foreground mb-2 text-sm">
                                        {similarJobData.company.name} •
                                        {similarJobData.location} •{" "}
                                        {similarJobData.workMode}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary text-sm font-medium">
                                            ${similarJobData.salaryMin / 1000}k
                                            - ${similarJobData.salaryMax / 1000}
                                            k
                                        </span>
                                        <a
                                            href="job-details.html"
                                            className="text-primary text-sm hover:underline"
                                        >
                                            View Details
                                        </a>
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
