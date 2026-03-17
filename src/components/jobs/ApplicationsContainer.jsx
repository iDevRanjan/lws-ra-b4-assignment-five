import { useImmer } from "use-immer";
import { applicationSortingOptionData } from "../../data/applicationSortingOptionData";
import { getApplicationParams } from "../../utils/getApplicationParams";
import { useDebounce } from "../../hooks/useDebounce";
import FiltersApplications from "./FiltersApplications";
import SortDropdownMenu from "../common/SortDropdownMenu";
import { initialApplicationQueryObject } from "../../data/initialApplicationQueryObject";

export default function ApplicationsContainer({
    handleQueryParams,
    queryParamsProps,
    children,
}) {
    const [applicationQueryObject, setApplicationQueryObject] = useImmer(
        initialApplicationQueryObject,
    );

    function handleSetApplicationQueryFilter(data) {
        const { name, value } = data;

        setApplicationQueryObject((draft) => {
            if (name === "status") {
                const index = draft.status.indexOf(value);

                if (index !== -1) {
                    draft.status.splice(index, 1);
                } else {
                    draft.status.push(value);
                }
            } else if (name === "date") {
                draft.date = value;
            }
        });
    }

    function handleSetApplicationQuerySort(data) {
        setApplicationQueryObject((draft) => {
            draft.sort = data;
        });
    }

    function generateQueryPath() {
        const applicationParams = getApplicationParams(applicationQueryObject);
        if (applicationParams === queryParamsProps) return;
        handleQueryParams(applicationParams);
    }

    useDebounce(generateQueryPath, 300)();

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <FiltersApplications
                handleSetApplicationQueryFilter={
                    handleSetApplicationQueryFilter
                }
            />
            <div className="space-y-4 lg:col-span-3">
                <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">
                            Sort by:
                        </span>
                        <SortDropdownMenu
                            selectTitle="Applications Sorting"
                            itemsData={applicationSortingOptionData}
                            handleSetQuerySort={handleSetApplicationQuerySort}
                        />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
