import { useQuery } from "@tanstack/react-query";
import { getRecommendedJobsQueryOption } from "../../services/queryOptions";
import JobCardSkeleton from "../skeletons/JobCardSkeleton";
import JobCard from "./JobCard";
import { useApplications } from "../../hooks/useApplications";
import { useState } from "react";
import LoadMoreJobs from "./LoadMoreJobs";

export default function RecommendedJobsContainer() {
    const {
        isPending,
        isError,
        error,
        data: recommendedJobsData,
    } = useQuery(getRecommendedJobsQueryOption());
    const { data: jobSeekerApplicationData } = useApplications();
    const [pageIndex, setPageIndex] = useState(5);

    if (isPending) {
        return <JobCardSkeleton />;
    }

    if (isError) {
        return <p className="text-center text-red-600">{error.message}</p>;
    }

    const recommendedJobs = recommendedJobsData?.data ?? [];
    const isRecommendedJobsAvailable =
        recommendedJobsData?.success && recommendedJobs.length > 0;

    if (!isRecommendedJobsAvailable) {
        return (
            <p className="text-center">
                No job recommendations available for you right now
            </p>
        );
    }

    const processedRecommendedJobs = recommendedJobs.slice(0, pageIndex);
    const hasMoreJobs = pageIndex < recommendedJobs.length;

    function handleFetchNextPage() {
        if (hasMoreJobs) {
            setPageIndex((prev) => prev + 5);
        }
    }

    return (
        <div className="space-y-4">
            {processedRecommendedJobs.map((recommendedJob) => (
                <JobCard
                    key={recommendedJob.id}
                    job={recommendedJob}
                    role="USER"
                    jobSeekerApplicationData={jobSeekerApplicationData?.data}
                />
            ))}
            <LoadMoreJobs
                displayedJobsCount={processedRecommendedJobs.length}
                availableJobs={recommendedJobs.length}
                fetchNextPage={handleFetchNextPage}
                hasMoreJobs={hasMoreJobs}
            />
        </div>
    );
}
