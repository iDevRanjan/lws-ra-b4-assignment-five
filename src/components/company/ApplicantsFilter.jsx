import { useImmer } from "use-immer";
import { dateFiltersData } from "../../data/dateFiltersData";
import { experienceLevelRegisterOptionData as experienceLevelFiltersData } from "../../data/experienceLevelRegisterOptionData";
import { statusFiltersData } from "../../data/statusFiltersData";
import FilterItem from "../common/FilterItem";
import FilterSection from "../common/FilterSection";
import { initialApplicantQueryObject } from "../../data/initialApplicantQueryObject";
import { getQueryParams } from "../../utils/getQueryParams";
import { useDebounce } from "../../hooks/useDebounce";
import { useState } from "react";
import { queryChecking } from "../../utils/queryChecking";
import toast from "react-hot-toast";

export default function ApplicantsFilter({
    queryParamsProps,
    handleQueryParams,
}) {
    const [applicantQueryObject, setApplicantQueryObject] = useImmer(
        initialApplicantQueryObject,
    );
    const [resetFiltersKey, setResetFiltersKey] = useState(0);

    function handleSetApplicantQueryFilter(data) {
        const { name, value } = data;

        setApplicantQueryObject((draft) => {
            if (name === "status") {
                const index = draft.status.indexOf(value);

                if (index !== -1) {
                    draft.status.splice(index, 1);
                } else {
                    draft.status.push(value);
                }
            } else if (name === "experienceLevel") {
                const index = draft.experienceLevel.indexOf(value);

                if (index !== -1) {
                    draft.experienceLevel.splice(index, 1);
                } else {
                    draft.experienceLevel.push(value);
                }
            } else if (name === "date") {
                draft.date = value !== "all" ? value : "";
            }
        });
    }

    function handleResetQueryFilter() {
        const isAnyQueryNotAvailableWithoutSortValue =
            queryChecking(applicantQueryObject);

        if (isAnyQueryNotAvailableWithoutSortValue) {
            toast("ℹ️ No active filters to reset");
            return;
        }

        setApplicantQueryObject(initialApplicantQueryObject);
        setResetFiltersKey((prev) => prev + 1);
    }

    function generateQueryPath() {
        const applicantParams = getQueryParams(applicantQueryObject, ["All"]);
        if (applicantParams === queryParamsProps) return;
        handleQueryParams(applicantParams);
    }

    useDebounce(generateQueryPath, 300)();

    return (
        <aside className="lg:col-span-1">
            <div className="card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold">Filters</h2>
                    <button
                        onClick={handleResetQueryFilter}
                        className="text-primary cursor-pointer text-sm hover:underline"
                    >
                        Reset
                    </button>
                </div>
                <FilterSection
                    key={`status-${resetFiltersKey}`}
                    title="Applicants Status"
                >
                    {statusFiltersData.map((item) => (
                        <FilterItem
                            key={item.id}
                            label={item.name}
                            type="checkbox"
                            name="status"
                            value={item.value}
                            onQueryFilter={handleSetApplicantQueryFilter}
                        />
                    ))}
                </FilterSection>
                <FilterSection
                    key={`experienceLevel-${resetFiltersKey}`}
                    title="Experience Level"
                >
                    {experienceLevelFiltersData.map((item) => (
                        <FilterItem
                            key={item.id}
                            label={item.name}
                            value={item.value}
                            type="checkbox"
                            name="experienceLevel"
                            onQueryFilter={handleSetApplicantQueryFilter}
                        />
                    ))}
                </FilterSection>
                <FilterSection
                    key={`date-${resetFiltersKey}`}
                    title="Applied Date"
                >
                    {dateFiltersData.map((item) => (
                        <FilterItem
                            key={item.id}
                            label={item.name}
                            value={item.value}
                            type="radio"
                            name="date"
                            onQueryFilter={handleSetApplicantQueryFilter}
                        />
                    ))}
                </FilterSection>
            </div>
        </aside>
    );
}
