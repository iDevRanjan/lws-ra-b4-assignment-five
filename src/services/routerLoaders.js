import { getJobBySlugQueryOption } from "./queryOptions";

export async function getJobBySlugLoader(loaderFnArgs, queryClient) {
    const { params } = loaderFnArgs;
    if (!params.jobSlug) throw new Error("No job slug provided");

    await queryClient.ensureQueryData(getJobBySlugQueryOption(params.jobSlug));

    // return { jobSlug: params.jobSlug };
}
