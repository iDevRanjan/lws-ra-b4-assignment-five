import { useQuery } from "@tanstack/react-query";
import { getRecommendedJobsQueryOption } from "../../services/queryOptions";
import JobCardSkeleton from "../skeletons/JobCardSkeleton";
import JobCard from "./JobCard";

export default function RecommendedJobsContainer() {
    const {
        isPending,
        isError,
        error,
        data: recommendedJobsData,
    } = useQuery(getRecommendedJobsQueryOption());

    if (isPending) {
        return <JobCardSkeleton />;
    }

    if (isError) {
        return <p className="text-center text-red-600">{error.message}</p>;
    }

    const isRecommendedJobsAvailable =
        recommendedJobsData?.success && recommendedJobsData?.data.length > 0;

    if (!isRecommendedJobsAvailable) {
        return (
            <p className="text-center">
                No job recommendations available for you right now
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {recommendedJobsData?.data.map((recommendedJobData) => (
                <JobCard
                    key={recommendedJobData.id}
                    job={recommendedJobData}
                    role="USER"
                />
            ))}
        </div>
    );
}
