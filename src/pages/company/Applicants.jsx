import { useState } from "react";
import ApplicantsFilter from "../../components/company/ApplicantsFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCompanyApplicantsQueryOption } from "../../services/queryOptions";
import ApplicantsCardGrid from "../../components/company/ApplicantsCardGrid";
import LoadMoreJobs from "../../components/jobs/LoadMoreJobs";
import ApplicantsCardSkeleton from "../../components/skeletons/ApplicantsCardSkeleton";

export default function Applicants() {
    const [params, setParams] = useState("");

    const {
        isPending,
        isFetching,
        isError,
        error,
        data: companyApplicants,
        isPlaceholderData,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(getCompanyApplicantsQueryOption(params));

    const pageDetails = companyApplicants?.pages[0] || {};
    const isApplicantsAvailable = pageDetails.data?.length > 0;

    const createPageData = {
        totalJobsCount: pageDetails.count ?? 0,
        displayedJobsCount:
            companyApplicants?.pages.reduce(
                (acc, crr) => crr.data.length + acc,
                0,
            ) ?? 0,
    };

    function handleQueryParams(queryParams) {
        setParams(queryParams);
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold">
                            Job Applicants
                        </h1>
                        <p className="text-muted-foreground">
                            Review and manage applicants
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                <ApplicantsFilter
                    queryParamsProps={params}
                    handleQueryParams={handleQueryParams}
                />
                <div className="lg:col-span-3">
                    {!isPending && !isError && isApplicantsAvailable && (
                        <ApplicantsCardGrid
                            companyApplicants={companyApplicants}
                            isPlaceholderData={isPlaceholderData}
                        />
                    )}
                    {isFetching &&
                        (!isPlaceholderData || !isApplicantsAvailable) && (
                            <ApplicantsCardSkeleton isCard={true} />
                        )}
                    {isError && !isFetching && (
                        <p className="py-4 text-center text-red-600">
                            {error.message}
                        </p>
                    )}
                    {!isApplicantsAvailable && !isError && !isFetching && (
                        <p className="text-muted-foreground py-4 text-center">
                            You have no applicant
                        </p>
                    )}
                    {isApplicantsAvailable && (
                        <LoadMoreJobs
                            displayedJobsCount={
                                createPageData.displayedJobsCount
                            }
                            availableJobs={createPageData.totalJobsCount}
                            fetchNextPage={fetchNextPage}
                            hasMoreJobs={hasNextPage}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
