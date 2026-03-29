import { redirect } from "react-router";
import { authContext } from "../context";
import { queryClient } from "./queryClient";
import {
    getApplicantProfileQueryOption,
    getCompanyBySlugQueryOption,
    getCompanyDashboardStatsQueryOption,
    getJobBySlugQueryOption,
} from "./queryOptions";
import { store } from "../store";

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

export async function roleBasedLoader({ context }) {
    const authMiddlewareData = context.get(authContext);

    if (!authMiddlewareData.isLoggedin) throw redirect("/login");

    return { ...authMiddlewareData };
}

export async function getCompanyDashboardStatsLoader() {
    const authData = store.getState().authData;

    if (authData.role === "COMPANY")
        await queryClient.ensureQueryData(
            getCompanyDashboardStatsQueryOption(),
        );
}

export async function getApplicantProfileLoader({ params }) {
    if (!params.applicantId) throw new Error("No applicant id provided");

    await queryClient.ensureQueryData(
        getApplicantProfileQueryOption(params.applicantId),
    );
}
