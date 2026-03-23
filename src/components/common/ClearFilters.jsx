import { useQueryObject } from "../../hooks/useQueryObject";

export default function ClearFilters() {
    const { handleClearQueryFilter } = useQueryObject();

    return (
        <button
            onClick={handleClearQueryFilter}
            className="btn btn-outline cursor-pointer whitespace-nowrap"
        >
            Clear Filters
        </button>
    );
}
