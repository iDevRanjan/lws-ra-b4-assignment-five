import { useQuery } from "@tanstack/react-query";
import { getCompanyOpenPositionsQueryOption } from "../../services/queryOptions";
import JobCardSkeleton from "../skeletons/JobCardSkeleton";
import JobCard from "../jobs/JobCard";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useApplications } from "../../hooks/useApplications";
import { useAuth } from "../../hooks/useAuth";

export default function OpenPositions({ companySlug }) {
    const { authData } = useAuth();
    const {
        data: openPositions,
        isPending,
        isError,
        error,
    } = useQuery(getCompanyOpenPositionsQueryOption(companySlug));
    const { data: jobSeekerApplicationData } = useApplications();

    const isOpenPositionsAvailable =
        openPositions?.success && openPositions?.data.length > 0;

    return (
        <div className="card p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Open Positions</h2>
                <span className="text-muted-foreground text-sm">
                    {openPositions?.count || 0} jobs available
                </span>
            </div>
            <div className="space-y-4">
                {isPending && <JobCardSkeleton />}
                {isError && (
                    <p className="text-center text-red-600">{error.message}</p>
                )}
                {isOpenPositionsAvailable &&
                    openPositions.data.map((openPosition) => (
                        <JobCard
                            key={openPosition.id}
                            job={openPosition}
                            role={authData.role}
                            jobSeekerApplicationData={
                                jobSeekerApplicationData?.data
                            }
                        />
                    ))}
            </div>
            <div className="mt-6 text-center">
                <Link to="/" className="btn btn-outline">
                    View All Open Positions
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
