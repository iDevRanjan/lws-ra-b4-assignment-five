import DropdownMenu from "../common/DropdownMenu";
import { jobSortingOptionData } from "../../data/jobSortingOptionData";
import { useQueryObject } from "../../hooks/useQueryObject";

export default function JobSearchingResultsHeader({ availableJobs }) {
    const { handleSetQuerySort } = useQueryObject();

    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-semibold">Available Jobs</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                    Showing {availableJobs} results
                </p>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Sort by:</span>
                <DropdownMenu
                    selectTitle="Job Sorting"
                    itemsData={jobSortingOptionData}
                    handleSetQuerySort={handleSetQuerySort}
                />
            </div>
        </div>
    );
}
