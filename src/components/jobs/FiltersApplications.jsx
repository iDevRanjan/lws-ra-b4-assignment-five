import { RotateCcw } from "lucide-react";
import { statusFiltersData } from "../../data/statusFiltersData";
import { dateFiltersData } from "../../data/dateFiltersData";
import FilterItem from "../common/FilterItem";
import FilterSection from "../common/FilterSection";

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
                    {statusFiltersData.map((item) => (
                        <FilterItem
                            key={item.id}
                            label={item.name}
                            type="checkbox"
                            name="status"
                            value={item.value}
                            onQueryFilter={handleSetApplicationQueryFilter}
                        />
                    ))}
                </FilterSection>
                <FilterSection
                    key={`date-${resetFiltersKey}`}
                    title="Application Date"
                >
                    {dateFiltersData.map((item) => (
                        <FilterItem
                            key={item.id}
                            id={item.id}
                            label={item.name}
                            value={item.value}
                            type="radio"
                            name="date"
                            onQueryFilter={handleSetApplicationQueryFilter}
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
