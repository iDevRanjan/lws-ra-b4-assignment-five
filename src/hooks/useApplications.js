import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useAxios } from "./useAxios";
import { getJobSeekerApplicationsQueryOption } from "../services/queryOptions";

export function useApplications() {
    const { authData } = useAuth();
    const axiosInstance = useAxios();

    const isLoggedinJobSeeker = authData.isLoggedin && authData.role === "USER";

    return useQuery(
        getJobSeekerApplicationsQueryOption(axiosInstance, isLoggedinJobSeeker),
    );
}
