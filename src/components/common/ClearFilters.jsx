import { useQueryObject } from "../../hooks/useQueryObject";

export default function ClearFilters() {
    const { handleClearQueryFilter } = useQueryObject();

    console.log("Render");

    return (
        <button
            onClick={handleClearQueryFilter}
            className="btn btn-outline cursor-pointer"
        >
            Clear Filters
        </button>
    );
}
