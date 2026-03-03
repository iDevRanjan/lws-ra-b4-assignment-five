import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/constants";
import { getAllJobs, getJobBySlug } from "./jobApi";

export function getAllJobsQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.allJobs, params],
        queryFn: ({ pageParam }) => getAllJobs(pageParam, params),
        initialPageParam: 1,
        placeholderData: keepPreviousData,

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length === 0) {
                return undefined;
            }

            return allPages.length + 1;
        },
    });
}

export function getJobBySlugQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.jobBySlug, params],
        queryFn: () => getJobBySlug(params),
    });
}
