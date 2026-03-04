import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/constants";
import { getAllJobs, getJobBySlug, getSimilarJobs } from "./jobApi";

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

export function getSimilarJobsQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.similarJobs, params],
        queryFn: () => getSimilarJobs(params),

        // Learn more about:
        /**
         * https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries
         * https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries
         */
        enabled: false,
    });
}
