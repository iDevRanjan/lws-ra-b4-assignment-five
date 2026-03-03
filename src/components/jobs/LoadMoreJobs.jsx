import { ChevronDown } from "lucide-react";

export default function LoadMoreJobs({
    displayedJobsCount,
    availableJobs,
    fetchNextPage,
    hasMoreJobs,
}) {
    return (
        <div className="mt-12 flex flex-col items-center gap-4">
            <button
                onClick={fetchNextPage}
                disabled={!hasMoreJobs}
                className="btn btn-outline cursor-pointer"
            >
                {hasMoreJobs ? "Load" : "No"} More Jobs
                <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <p className="text-muted-foreground text-sm">
                Showing {displayedJobsCount} of {availableJobs} jobs
            </p>
        </div>
    );
}
