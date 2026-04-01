import { Search } from "lucide-react";
import ActionSelectMenu from "../common/ActionSelectMenu";
import { manageJobsStatusOptionData } from "../../data/manageJobsStatusOptionData";
import { manageJobsSortingOptionData } from "../../data/manageJobsSortingOptionData";
import { useImmer } from "use-immer";
import { initialManageJobsQueryObject } from "../../data/initialManageJobsQueryObject";
import toast from "react-hot-toast";
import { getJobParams } from "../../utils/getJobParams";
import { useDebounce } from "../../hooks/useDebounce";

export default function ManageJobsSearchAndFilter({
    queryParamsProps,
    handleQueryParams,
    resetPage,
    resetSelectedItems,
}) {
    const [manageJobsQueryObject, setManageJobsQueryObject] = useImmer(
        initialManageJobsQueryObject,
    );

    function handleQueryObjectSearch(event) {
        const sanitizedValue = event.target.value.trim();

        if (!sanitizedValue && manageJobsQueryObject.search === "") {
            toast("ℹ️ No search query are available");
            return;
        }

        setManageJobsQueryObject((draft) => {
            draft.search = sanitizedValue;
        });
    }

    function handleQueryObjectStatus(statusValue) {
        setManageJobsQueryObject((draft) => {
            draft.status = statusValue !== "All" ? statusValue : "";
        });
    }

    function handleQueryObjectSort(sortValue) {
        setManageJobsQueryObject((draft) => {
            draft.sort = sortValue;
        });
    }

    function generateQueryPath() {
        const manageJobsParams = getJobParams(manageJobsQueryObject);
        if (manageJobsParams === queryParamsProps) return;
        handleQueryParams(manageJobsParams);
        resetPage();
        resetSelectedItems();
    }

    useDebounce(generateQueryPath, 300)();

    return (
        <div className="card mb-6 p-4">
            <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                        <input
                            type="search"
                            placeholder="Search jobs by title, location..."
                            onChange={handleQueryObjectSearch}
                            className="input pl-10"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm whitespace-nowrap">
                            Job status:
                        </span>
                        <ActionSelectMenu
                            selectTitle="Manage Jobs Status"
                            itemsData={manageJobsStatusOptionData}
                            onValueChange={handleQueryObjectStatus}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm whitespace-nowrap">
                            Sort by:
                        </span>
                        <ActionSelectMenu
                            selectTitle="Manage Jobs Sorting"
                            itemsData={manageJobsSortingOptionData}
                            onValueChange={handleQueryObjectSort}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
