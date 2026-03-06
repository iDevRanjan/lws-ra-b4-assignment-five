import {
    getCompanyBySlugQueryOption,
    getJobBySlugQueryOption,
} from "./queryOptions";

export async function getJobBySlugLoader(loaderFnArgs, queryClient) {
    const { params } = loaderFnArgs;
    if (!params.jobSlug) throw new Error("No job slug provided");

    // Learn more about:
    /**
     * https://tkdodo.eu/blog/react-query-meets-react-router#getquerydata--fetchquery
     * https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientensurequerydata
     */
    await queryClient.ensureQueryData(getJobBySlugQueryOption(params.jobSlug));
}

export async function getCompanyBySlugLoader(loaderFnArgs, queryClient) {
    const { params } = loaderFnArgs;
    if (!params.companySlug) throw new Error("No company slug provided");

    await queryClient.ensureQueryData(
        getCompanyBySlugQueryOption(params.companySlug),
    );
}
