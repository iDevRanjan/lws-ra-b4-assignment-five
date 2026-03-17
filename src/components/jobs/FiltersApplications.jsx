import { RotateCcw } from "lucide-react";
import { ApplicationsStatusFiltersData } from "../../data/ApplicationsStatusFiltersData";
import { ApplicationsDateFiltersData } from "../../data/ApplicationsDateFiltersData";
import ApplicationsFilterItem from "./ApplicationsFilterItem";

function FilterSection({ title, children }) {
    return (
        <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium">{title}</h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

export default function FiltersApplications({
    handleSetApplicationQueryFilter,
    handleResetQueryFilter,
    resetFiltersKey,
}) {
    return (
        <aside className="lg:col-span-1">
            <div className="card sticky top-20 p-6">
                <h2 className="mb-4 text-lg font-semibold">Filters</h2>
                <FilterSection
                    key={`status-${resetFiltersKey}`}
                    title="Application Status"
                >
                    {ApplicationsStatusFiltersData.map((item) => (
                        <ApplicationsFilterItem
                            key={item.id}
                            label={item.name}
                            type="checkbox"
                            name="status"
                            value={item.value}
                            handleSetApplicationQueryFilter={
                                handleSetApplicationQueryFilter
                            }
                        />
                    ))}
                </FilterSection>
                <FilterSection
                    key={`date-${resetFiltersKey}`}
                    title="Application Date"
                >
                    {ApplicationsDateFiltersData.map((item) => (
                        <ApplicationsFilterItem
                            key={item.id}
                            id={item.id}
                            label={item.name}
                            value={item.value}
                            type="radio"
                            name="date"
                            handleSetApplicationQueryFilter={
                                handleSetApplicationQueryFilter
                            }
                        />
                    ))}
                </FilterSection>
                <button
                    onClick={handleResetQueryFilter}
                    className="btn btn-outline mt-2 w-full cursor-pointer"
                >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset Filters
                </button>
            </div>
        </aside>
    );
}
