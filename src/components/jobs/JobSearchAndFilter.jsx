import SearchInput from "../common/SearchInput";
import JobFiltersContainer from "./JobFiltersContainer";
import { useQueryObject } from "../../hooks/useQueryObject";
import { getJobParams } from "../../utils/getJobParams";
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
        const jobParams = getJobParams(queryObject);
        if (jobParams === queryParamsProps) return;
        handleQueryParams(jobParams);
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
