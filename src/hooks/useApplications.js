import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getJobSeekerApplicationsQueryOption } from "../services/queryOptions";

export function useApplications(params) {
    const { authData } = useAuth();

    const isLoggedinJobSeeker = authData.isLoggedin && authData.role === "USER";

    return useQuery(
        getJobSeekerApplicationsQueryOption(isLoggedinJobSeeker, params),
    );
}
