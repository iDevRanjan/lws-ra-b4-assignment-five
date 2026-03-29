import { useQuery } from "@tanstack/react-query";
import RecentJobsCard from "./RecentJobsCard";
import { getCompanyOpenPositionsForOwnQueryOption } from "../../services/queryOptions";
import RecentJobsCardSkeleton from "../skeletons/RecentJobsCardSkeleton";
import { Link } from "react-router";
import OpenPositions from "./OpenPositions";

export default function RecentJobsContainer() {
    const {
        isPending,
        isError,
        error,
        data: openPositionsForOwn,
    } = useQuery(getCompanyOpenPositionsForOwnQueryOption("limit=5"));

    return (
        <div className="card">
            <div className="border-border border-b p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recent Job Posts</h2>
                    <Link
                        to="/manage-jobs"
                        className="text-primary text-sm hover:underline"
                    >
                        View All
                    </Link>
                </div>
            </div>
            <div className="divide-border divide-y">
                {isPending && <RecentJobsCardSkeleton />}
                {isError && (
                    <p className="py-4 text-center text-red-600">
                        {error.message}
                    </p>
                )}
                {openPositionsForOwn?.success &&
                    (openPositionsForOwn.data.length > 0 ? (
                        openPositionsForOwn.data.map((openPositionForOwn) => (
                            <RecentJobsCard
                                key={openPositionForOwn.id}
                                openPositionForOwnData={openPositionForOwn}
                            />
                        ))
                    ) : (
                        <p className="text-muted-foreground py-4 text-center">
                            You have no recent job
                        </p>
                    ))}
            </div>
        </div>
    );
}
