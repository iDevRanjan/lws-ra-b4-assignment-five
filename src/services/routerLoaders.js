import { authContext } from "../context";
import { queryClient } from "./queryClient";
import {
    getCompanyBySlugQueryOption,
    getJobBySlugQueryOption,
} from "./queryOptions";

export async function getJobBySlugLoader({ params }) {
    if (!params.jobSlug) throw new Error("No job slug provided");

    // Learn more about:
    /**
     * https://tkdodo.eu/blog/react-query-meets-react-router#getquerydata--fetchquery
     * https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientensurequerydata
     */
    await queryClient.ensureQueryData(getJobBySlugQueryOption(params.jobSlug));
}

export async function getCompanyBySlugLoader({ params }) {
    if (!params.companySlug) throw new Error("No company slug provided");

    await queryClient.ensureQueryData(
        getCompanyBySlugQueryOption(params.companySlug),
    );
}

export async function publicLoader({ context }) {
    const authMiddlewareData = context.get(authContext);

    return { ...authMiddlewareData };
}
