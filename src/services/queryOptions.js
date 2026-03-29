import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/constants";
import {
    getAllJobs,
    getJobBySlug,
    getRecommendedJobs,
    getSimilarJobs,
} from "./jobApi";
import {
    getApplicantProfile,
    getCompanyApplicants,
    getCompanyBySlug,
    getCompanyDashboardStats,
    getCompanyOpenPositions,
    getCompanyOpenPositionsForOwn,
    getCompanyProfile,
} from "./companyApi";
import { getJobSeekerApplications, getUserProfile } from "./userApi";

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

export function getCompanyBySlugQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyBySlug, params],
        queryFn: () => getCompanyBySlug(params),
    });
}

export function getCompanyOpenPositionsQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyOpenPositions, params],
        queryFn: () => getCompanyOpenPositions(params),
    });
}

export function getClientProfileQueryOption(authData) {
    return queryOptions({
        queryKey: [QUERY_KEYS.clientProfile, authData.role],
        queryFn: () => {
            if (authData.role === "USER") {
                return getUserProfile();
            }
            if (authData.role === "COMPANY") {
                return getCompanyProfile();
            }

            throw new Error("Invalid role");
        },
        enabled: authData.isLoggedin,
        retry: false,
    });
}

export function getJobSeekerApplicationsQueryOption(
    isLoggedinJobSeeker,
    params,
) {
    return queryOptions({
        queryKey: [QUERY_KEYS.jobSeekerApplications, params],
        queryFn: () => getJobSeekerApplications(params),
        enabled: isLoggedinJobSeeker,
        retry: false,
    });
}

export function getRecommendedJobsQueryOption() {
    return queryOptions({
        queryKey: [QUERY_KEYS.recommendedJobs],
        queryFn: getRecommendedJobs,
    });
}

export function getCompanyDashboardStatsQueryOption() {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyDashboardStats],
        queryFn: getCompanyDashboardStats,
    });
}

export function getCompanyOpenPositionsForOwnQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyOpenPositionsForOwn, params],
        queryFn: () => getCompanyOpenPositionsForOwn(params),
    });
}

export function getCompanyApplicantsQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.companyApplicants, params],
        queryFn: () => getCompanyApplicants(params),
    });
}

export function getApplicantProfileQueryOption(params) {
    return queryOptions({
        queryKey: [QUERY_KEYS.applicantProfile, params],
        queryFn: () => getApplicantProfile(params),
    });
}
