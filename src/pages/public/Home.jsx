import { useInfiniteQuery } from "@tanstack/react-query";
import Hero from "../../components/common/Hero";
import JobCardsGrid from "../../components/jobs/JobCardsGrid";
import JobSearchAndFilter from "../../components/jobs/JobSearchAndFilter";
import JobSearchingResultsHeader from "../../components/jobs/JobSearchingResultsHeader";
import { getAllJobsQueryOption } from "../../services/queryOptions";
import JobCardSkeleton from "../../components/skeletons/JobCardSkeleton";
import LoadMoreJobs from "../../components/jobs/LoadMoreJobs";
import FetchJobError from "../../components/jobs/FetchJobError";
import NoJobsFound from "../../components/jobs/NoJobsFound";
import { useState } from "react";
import { useApplications } from "../../hooks/useApplications";
import { useAuth } from "../../hooks/useAuth";

export default function Home() {
    const [params, setParams] = useState("");

    const { authData } = useAuth();
    const {
        data: allJobsData,
        isPending,
        isFetching,
        isError,
        isPlaceholderData,
        fetchNextPage,
        hasNextPage,
        refetch,
    } = useInfiniteQuery(getAllJobsQueryOption(params));
    const { data: jobSeekerApplicationData } = useApplications();

    const pageDetails = allJobsData?.pages[0] || {};
    const isJobsAvailable = pageDetails.data?.length > 0;

    const createPageData = {
        totalJobsCount: pageDetails.count ?? 0,
        currentPage: pageDetails.currentPage ?? 0,
        displayedJobsCount:
            allJobsData?.pages.reduce((acc, crr) => crr.data.length + acc, 0) ??
            0,
    };

    function handleQueryParams(queryParams) {
        setParams(queryParams);
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <Hero />
            <JobSearchAndFilter
                handleQueryParams={handleQueryParams}
                queryParamsProps={params}
            />
            <JobSearchingResultsHeader
                displayedJobsCount={createPageData.displayedJobsCount}
            />
            {!isPending && !isError && isJobsAvailable && (
                <JobCardsGrid
                    allJobsData={allJobsData}
                    isPlaceholderData={isPlaceholderData}
                    role={authData.role}
                    jobSeekerApplicationData={
                        jobSeekerApplicationData?.data ?? []
                    }
                />
            )}
            {isFetching && (!isPlaceholderData || !isJobsAvailable) && (
                <JobCardSkeleton />
            )}
            {isError && !isFetching && <FetchJobError refetch={refetch} />}
            {!isJobsAvailable && !isError && !isFetching && <NoJobsFound />}
            {isJobsAvailable && (
                <LoadMoreJobs
                    displayedJobsCount={createPageData.displayedJobsCount}
                    availableJobs={createPageData.totalJobsCount}
                    fetchNextPage={fetchNextPage}
                    hasMoreJobs={hasNextPage}
                />
            )}
        </main>
    );
}
