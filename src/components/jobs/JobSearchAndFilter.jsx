import SearchInput from "../common/SearchInput";
import JobFiltersContainer from "./JobFiltersContainer";
import { useQueryObject } from "../../hooks/useQueryObject";
import { getSearchAndFilterParams } from "../../utils/getSearchAndFilterParams";
import { useDebounce } from "../../hooks/useDebounce";

export default function JobSearchAndFilter({
    handleQueryParams,
    queryParamsProps,
}) {
    const {
        queryObject,
        handleSetQuerySearch,
        handleSetQueryFilter,
        clearFiltersKey,
    } = useQueryObject();

    function generateQueryPath() {
        const params = getSearchAndFilterParams(queryObject);
        if (params === queryParamsProps) return;
        handleQueryParams(params);
    }

    useDebounce(generateQueryPath, 300)();

    return (
        <section className="mb-8">
            <div className="card p-6">
                <div>
                    <SearchInput
                        queryObject={queryObject}
                        handleSetQuerySearch={handleSetQuerySearch}
                        clearFiltersKey={clearFiltersKey}
                    />
                    <JobFiltersContainer
                        handleSetQueryFilter={handleSetQueryFilter}
                        clearFiltersKey={clearFiltersKey}
                    />
                </div>
            </div>
        </section>
    );
}
