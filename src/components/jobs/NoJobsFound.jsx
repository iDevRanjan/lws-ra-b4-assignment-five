import { Search } from "lucide-react";
import ClearFilters from "../common/ClearFilters";

export default function NoJobsFound() {
    return (
        <div className="card p-12 text-center" id="empty-state">
            <Search className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">No jobs found</h3>
            <p className="text-muted-foreground mb-4 text-sm">
                Try adjusting your filters or search terms to find more
                opportunities.
            </p>
            <ClearFilters />
        </div>
    );
}
