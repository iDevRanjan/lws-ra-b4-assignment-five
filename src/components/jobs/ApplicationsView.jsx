import { useState } from "react";
import ApplicationJobCardSkeleton from "../skeletons/ApplicationJobCardSkeleton";
import ApplicationJobCard from "./ApplicationJobCard";
import LoadMoreJobs from "./LoadMoreJobs";

export default function ApplicationsView({
    isPending,
    isError,
    error,
    jobSeekerApplicationData,
}) {
    const [pageIndex, setPageIndex] = useState(5);

    if (isPending) {
        return <ApplicationJobCardSkeleton />;
    }

    if (isError) {
        return <p className="text-center text-red-600">{error.message}</p>;
    }

    const applicationsJobs = jobSeekerApplicationData?.data ?? [];
    const isApplicationAvailable =
        jobSeekerApplicationData?.success && applicationsJobs.length > 0;

    if (!isApplicationAvailable) {
        return <p className="text-center">No applications found</p>;
    }

    const processedApplicationJobs = applicationsJobs.slice(0, pageIndex);
    const hasMoreJobs = pageIndex < applicationsJobs.length;

    function handleFetchNextPage() {
        if (hasMoreJobs) {
            setPageIndex((prev) => prev + 5);
        }
    }

    return (
        <>
            {processedApplicationJobs.map((applicationData) => (
                <ApplicationJobCard
                    key={applicationData.id}
                    applicationData={applicationData}
                />
            ))}
            <LoadMoreJobs
                displayedJobsCount={processedApplicationJobs.length}
                availableJobs={applicationsJobs.length}
                fetchNextPage={handleFetchNextPage}
                hasMoreJobs={hasMoreJobs}
            />
        </>
    );
}
