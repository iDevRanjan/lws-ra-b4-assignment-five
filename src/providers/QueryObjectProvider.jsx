import { useImmer } from "use-immer";
import { QueryObjectContext } from "../context";
import { initialQueryObject } from "../data/initialQueryObject";
import { useCallback, useState } from "react";
import { queryChecking } from "../utils/queryChecking";
import toast from "react-hot-toast";

export default function QueryObjectProvider({ children }) {
    const [queryObject, setQueryObject] = useImmer(initialQueryObject);
    const [clearFiltersKey, setClearFiltersKey] = useState(0);

    function handleSetQuerySearch(data) {
        setQueryObject((draft) => {
            draft.search = data;
        });
    }

    const handleSetQueryFilter = useCallback(
        (data) => {
            const { name, value } = data;

            setQueryObject((draft) => {
                const fieldMap = {
                    "job-type": "type",
                    "experience-lavel": "experienceLevel",
                    skills: "skills",
                };

                const field = fieldMap[name];

                if (field) {
                    const index = draft[field].indexOf(value);

                    if (index !== -1) {
                        draft[field].splice(index, 1);
                    } else {
                        draft[field].push(value);
                    }
                } else if (name === "salary-range") {
                    const [min, max] = value.split("-").map(Number);

                    draft.minSalary = min ?? null;
                    draft.maxSalary = max ?? null;
                }
            });
        },
        [setQueryObject],
    );

    function handleSetQuerySort(data) {
        setQueryObject((draft) => {
            draft.sort = data;
        });
    }

    function handleClearQueryFilter() {
        const isAnyQueryNotAvailableWithoutSortValue =
            queryChecking(queryObject);

        if (isAnyQueryNotAvailableWithoutSortValue) {
            toast("ℹ️ No active filters to clear");
            return;
        }

        setQueryObject((draft) => {
            draft.search = "";
            draft.type = [];
            draft.experienceLevel = [];
            draft.minSalary = null;
            draft.maxSalary = null;
            draft.skills = [];
        });
        setClearFiltersKey((c) => c + 1);
    }

    return (
        <QueryObjectContext
            value={{
                queryObject,
                handleSetQuerySearch,
                handleSetQueryFilter,
                handleSetQuerySort,
                handleClearQueryFilter,
                clearFiltersKey,
            }}
        >
            {children}
        </QueryObjectContext>
    );
}
